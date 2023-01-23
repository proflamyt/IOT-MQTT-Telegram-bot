const net = require('net');
const Aedes = require('aedes');
const jwt = require('jsonwebtoken');

const server = net.createServer();
const aedes = new Aedes();

const secret = 'ola' //process.env.SECRET_OR_KEY;


aedes.authenticate = (client, username, password, callback) => {
  if (username === 'oauth2') {
    //console.log(password)
    return jwt.verify(password.toString(), secret, (error, token) => {
      if (error) {
        return callback(error, false);
      }
      client.token = token;
      return callback(null, true);
    });
  }

  return callback(null, false);
};

function checkAnyScope(client, ...requiredScopes) {
  if (typeof client.token.scope !== 'string') {
    throw new TypeError('Token contains no scope');
  }

  const tokenScopes = client.token.scope.split(' ');
  console.log(tokenScopes)
  for (const requiredScope of requiredScopes) {
    if (tokenScopes.includes(requiredScope)) {
      return;
    }
  }

  throw new Error('Insufficient to permissions to publish message');
}

aedes.authorizePublish = (client, packet, callback) => {
  if (client.token instanceof Object) {
    try {
      checkAnyScope(client, 'aedes-write');
      return callback(null);
    } catch (error) {
      return callback(error);
    }
  }

  callback(new Error('Cannot publish'));
};

aedes.authorizeSubscribe = (client, subscription, callback) => {
  if (client.token instanceof Object) {
    try {
      checkAnyScope(client, 'aedes-read');

      return callback(null, subscription);
    } 
    catch (error) {
      return callback(error);
    }
  }
  
  callback(new Error('Cannot subscribe'));
};


// aedes.on('publish', function({topic, payload}) {
//     console.log("broker routing published message", topic, payload?.toString());
// });


// aedes.on('subscribe', (subscriptions, client) => {
//     subscriptions.forEach((sub) => {
//       console.log(`Client ${client.id} subscribed to ${sub.topic}`)
//       // Publish a message to the topic the client subscribed to
//       aedes.publish({
//         topic: sub.topic,
//         payload: `Welcome to ${sub.topic}!`,
//         qos: 1,
//         retain: false,
//         client
//       })
//     })
//   })

server.on('connection', aedes.handle);
server.on('error', console.error);

aedes.on('clientError', (client, error) => console.error(`CLIENT ${error}`));
aedes.on('connectionError', (client, error) => console.error(`ConneCTION ${error}`));

server.listen(1883);
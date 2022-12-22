import * as mqtt from "mqtt"
import * as jwt from 'jsonwebtoken'
require('dotenv').config() 




function verifyJWT(token) {
  try {
    const decoded = jwt.verify(token, 'secret');
    return true;
  } catch (err) {
    return false;
  }
}

const server = mqtt.createServer(function(client) {
  // Extract the JWT token from the client's MQTT username
  const token = client.username;
  if (!verifyJWT(token)) {
    // If the token is invalid, close the connection
    client.stream.end();
    return;
  }
  console.log(client.clientId)

  // If the token is valid, allow the client to connect
  client.on('connect', function(packet) {
    // ...
  });

  client.on('publish', function(packet) {

    server.clients.forEach(function(c) {
        if (c.subscriptions[client.clientId]) {
          c.publish({ topic: client.clientId, payload: packet.payload });
        }
      });
    
  });

  client.on('subscribe', function(packet) {
    
    console.log('Client', client.clientId, 'subscribed to:', packet.subscriptions);
    
    const publisherClientId = packet.subscriptions[0].topic
    server.clients.forEach(function(c) {
        if (c.clientId === publisherClientId) {
          c.subscribe({ topic: client.clientId, qos: packet.subscriptions[0].qos });
  }
})
  });

  client.on('unsubscribe', function(packet) {
    // ...
  });


});

server.listen(1883);

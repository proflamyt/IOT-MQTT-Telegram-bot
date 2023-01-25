const mqtt = require('mqtt');
var jwt = require('jsonwebtoken');

const secret = 'ola' 

const payload = {
  sub: 1,
  email: "email",
  scope: 'test/connection'
 }
 const token = jwt.sign(payload, secret, {
  expiresIn: '2 days',
});

topicName = 'test/connection';

const client = mqtt.connect('mqtt://localhost:1883', {
  username: 'oauth2',
  password: token,
  clientId: 1123
});



client.on('connect', function() {
  console.log('Connected to MQTT broker');

  // Subscribe to a topic
  client.subscribe('test/connection' , function(err) {
    if (!err) {
      console.log('Subscribed to topic');

    }}
    
    );

  client.on('message', (topic, message, packet) => { 
    console.log(packet, packet.payload.toString()); 
    if(topic === topicName) { 
     console.log(JSON.parse(message)); 
    } 

    
});

client.on('close', function(){
  console.log("connection closed")
  client.end()
  })


});

client.on('close', function(){
  console.log("connection closed")
  client.end()
  })
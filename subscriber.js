const mqtt = require('mqtt');

const client = mqtt.connect('mqtt://localhost:1883', {
  username: 'your-jwt-token',
  password: '',
  clientId: 1123
});

client.on('connect', function() {
  console.log('Connected to MQTT broker');

  // Subscribe to a topic
  client.subscribe('my-topic', function(err) {
    if (!err) {
      console.log('Subscribed to topic');
    }
  });

  client.on('message', (topic, message, packet) => { 
    console.log(packet, packet.payload.toString()); 
    if(topic === topicName) { 
     console.log(JSON.parse(message)); 
    } 

    
});


});
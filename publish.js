import * as mqtt from "mqtt"
const clientId = 'mqttjs_' + Math.random().toString(8).slice(2, 4) 


const client = mqtt.connect('mqtt://localhost:1883', {
  username: 'your-jwt-token',
  password: '',
  clientId: clientId,
  clean: false, reconnectPeriod: 1
});


const topicName = 'test/connection' 
const payload = {1: "Hello world", 2: "Welcome to the test connection"} 

client.on('connect', function() {
  console.log('Connected to MQTT broker');

  // Publish a message to the 'my-topic' topic
  client.publish(topicName, JSON.stringify(payload), {qos: 1, retain: true}, function(err) {
    if (!err) {
      console.log('Message published');
    }
  });


});

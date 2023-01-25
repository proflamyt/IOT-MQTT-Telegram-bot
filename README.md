# Simulating Communications between Internet OF Things Using MQTT and JWT 



![sub-brok-pub](https://github.com/proflamyt/IOT-MQTT-Telegram-bot/blob/main/broker.png)

## How it Works
  1. A publisher sends their message to a broker.
  2. The broker continues relaying the message until a new message is published.
  3. A subscriber can attempt to connect to a broker and receive a message.



To make sure the message relied is received by the party the message is intended for , Json Web Token was use as a mean of authentication and authorization.
before publishing or subscribing to a topic , the message broker has to make sure the message is really coming from the the parties who are authorized to receive the messages and publish the messages.

My Use case is implemented in a mobile application , which sadly is an open source . 

the jwt token was signed in the files , but this can be shared using an http authentication server 

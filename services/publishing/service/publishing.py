import os
import time
import paho.mqtt.client  as mqtt
import redis

#connect to mqtt broker
mqttClient = mqtt.Client()
mqttClient.Connect(os.environ['MQTT_BROKER'], os.environ['MQTT_PORT'], 60)

#connect to message bus
messenger = redis.Redis(host=os.environ['MESSENGER_HOST'], port=os.environ['MESSENGER_PORT'])
messageBus = messenger.pubsub()
messageBus.subscribe("AccessRequest")
oldRequester = "Unknown"
sessionRequestCounter = 0
for message in messageBus.listen():
    sleep(0.1)
    newRequester = message["data"]
    if (newRequester != oldRequester)
          mqttClient.publish("AccessRequested", newRequester)
          mqttClient.publish("SessionAccessRequestCount", ++sessionRequestCounter)
          oldRequester = newRequester

mqttClient.disconnect()
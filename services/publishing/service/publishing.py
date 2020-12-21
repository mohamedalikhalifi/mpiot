import os
from time import sleep
import paho.mqtt.client  as mqtt
import redis

#connect to mqtt broker
print("start")
mqttClient = mqtt.Client()
broker = os.environ['MQTT_BROKER']
port = int(os.environ['MQTT_PORT'])
print("Connecting to " + broker + ":" + str(port))
mqttClient.connect(broker, port, 60)
print("Connected to " + broker + ":" + str(port))

#connect to message bus
redisHost = os.environ['MESSENGER_HOST']
redisPort = os.environ['MESSENGER_PORT']
print(" connecting to " + redisHost +":"+str(redisPort))
messenger = redis.Redis(host=redisHost, port=redisPort)
messageBus = messenger.pubsub()
messageBus.subscribe("AccessRequest")

# send MQTT publication on new access request
oldRequester = "Unknown"
sessionRequestCounter = 0
for message in messageBus.listen():
    newRequester = message["data"]
    if (newRequester != oldRequester):
        sessionRequestCounter += 1
        print("AccessRequest from: " + str(newRequester) )
        mqttClient.publish("AccessRequested", newRequester)
        mqttClient.publish("SessionAccessRequestCount", str(sessionRequestCounter))
        oldRequester = newRequester
mqttClient.disconnect()
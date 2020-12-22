import os
from time import sleep
import paho.mqtt.client  as mqtt
import redis
import services.publishing.service.watchdog as Watchdog

watchdog = None
mqttClient = None
messageBus = None
requester = None
old_requester = ""
#connect to mqtt broker
def init_publishing(): 
    global mqttClient
    global messageBus
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

def flush_old_requester():
    global old_requester
    global watchdog
    old_requester = ""
    watchdog.reset()

def listen_and_foreward():
    global old_requester
    global mqttClient
    global messageBus
    global watchdog
    # launch watchdog timer to flush the old requester buffer on inactivity
    watchdog = Watchdog(20, flush_old_requester)

    # send MQTT publication on new access request
    sessionRequestCounter = 0
    for message in messageBus.listen():
        newRequester = message["data"]
        # exclude empty message
        if (newRequester == '1' ):
            continue
        # Notify on new Access request
        if (old_requester != newRequester):
            sessionRequestCounter += 1
            mqttClient.publish("AccessRequested", newRequester)
            mqttClient.publish("SessionAccessRequestCount", str(sessionRequestCounter))
            old_requester = newRequester
    watchdog.reset()

try:
    init_publishing()
    listen_and_foreward()
finally:
    mqttClient.disconnect()
import os
import time
import paho.mqtt.clientgit  as mqtt
import redis


mqttClient = mqtt.Client()
messenger = redis.Redis(host=os.environ['MESSENGER_HOST'], port=os.environ['MESSENGER_PORT'])
mqttClient.Connect(os.environ['MQTT_BROKER'], os.environ['MQTT_PORT'], keepalive)

i = 0
while True:
 time.sleep(5)
 i+=1
 message = str(i)
 if i <=10:
  mqttClient.publish(topic, message)
 else:
  break
client.disconnect()
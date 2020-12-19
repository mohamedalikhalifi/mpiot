# import os
# import time
# import paho.mqtt.client as mqtt

# host_ip = '192.168.0.80'
# port = 1883 
# keepalive = 60
# topic = 'test'
# client = mqtt.Client()
# client.connect(host_ip, port, keepalive)
# i = 0
# while True:
#  time.sleep(5)
#  i+=1
#  message = str(i)
#  if i <=10:
#   client.publish(topic, message)
#  else:
#   break
# client.disconnect()
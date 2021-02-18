import RPi.GPIO as GPIO
import os
import time

# Read data from Raspberry Pi (specifically read GPU temperature)

#temp = os.popen("/opt/vc/bin/vcgencmd measure_temp").read()
#print("GPU temp: {}".format(temp[5:]))

# GPIO setup
GPIO.setmode(GPIO.BOARD)
GPIO.setwarnings(False)
GPIO.setup(32,GPIO.HIGH)
GPIO.setup(36,GPIO.HIGH)
GPIO.setup(38,GPIO.HIGH)
GPIO.setup(40,GPIO.HIGH)

# Turn on/off LED based on user input
try:
    GPIO.output(32,GPIO.LOW)
    time.sleep(0.03)
    GPIO.output(36,GPIO.LOW)
    time.sleep(0.03)
    GPIO.output(38,GPIO.LOW)
    time.sleep(0.03)
    GPIO.output(40,GPIO.LOW)
    print("LEDs are ON")
    print("")
    
except KeyboardInterrupt:
    print ("Quit")
    GPIO.cleanup()
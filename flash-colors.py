#!/usr/bin/env python

import colorsys
import signal
import time
from sys import exit

try:
    from PIL import Image, ImageDraw, ImageFont
except ImportError:
    exit("This script requires the pillow module\nInstall with: sudo pip install pillow")

import unicornhathd

brightness = 0.1
increase = 1
turns = 3

color = sys.argv[1]

if(color == "red")
    r = 255
    g = 0
    b = 0
elif(color == "yellow")
    r = 255
    g = 255
    b = 0
elif(color == "green")
    r = 0
    g = 255
    b = 0
else
    r = 255
    g = 0
    b = 0


unicornhathd.rotation(0)
unicornhathd.brightness(brightness)


width, height = unicornhathd.get_shape()

for z in range(turns * 24):
    for x in range(width):
        for y in range(height):
            unicornhathd.set_pixel(x, y, r, g, b)
    
    if increase:
        brightness += 0.1
    else:
        brightness -= 0.1
    
    if brightness > 1.0:
        increase = 0
    elif brightness < 0.0:
        increase = 1
    
    unicornhathd.show()
    unicornhathd.brightness(brightness)
    time.sleep(0.03)

unicornhathd.off()

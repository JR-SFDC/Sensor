# SFDX App

Two lightning components that dispaly the data coming off your Enviro Phat sensors. 

## Dev, Build and Test

## Resources

## Description of Files and Directories
Uses Lightning empApi and you need to setup the Platform event for this to work. You don't need the Enviro Phat sensor but the demo works a lot better if you do.

SensorReading component: This will display the motion (z axis), temperature, pressuare and lux readings from your sensore.
                         The lux badge will change brightness correspoding with the lux level.
                         The compoenent should be used on the Asset page
                    
LightOutPut component: This will display the RGB and lux readings from the sensor. There are two areas that change style to                          reflect the sensor readings. One will change brightness to correspond with the lux reading and the                            other will change background colour to reflect the RGB values.
                       Can be used anywhere

## Issues
Migrate to LWC

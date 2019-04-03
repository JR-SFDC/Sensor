({
	onInit : function(component, event, helper) {
                
        const empIoT = component.find('empIoT');
		const channelIoT = '/event/Inbound_Payload__e'; 
        const replayId = -1;
        
         empIoT.subscribe(channelIoT, replayId, $A.getCallback(eventReceived => {
         
            console.log('Received event ', JSON.stringify(eventReceived));
          
            var jsonRaw = JSON.parse(JSON.stringify(eventReceived));
            
            var motion = jsonRaw.data.payload.Motion_Z__c ;
            motion = motion.toFixed(4);
             
            var lux = jsonRaw.data.payload.LUX__c ;
          	component.set("v.lux",lux);
            component.set("v.motion",motion);
             
            var temp = jsonRaw.data.payload.Temperature__c.toFixed(2);
             component.set("v.temp",temp);
             
            var pressure = jsonRaw.data.payload.Pressure__c.toFixed(2);  
            component.set("v.pressure",pressure);
             
             var rgb = jsonRaw.data.payload.RGB__c;
             component.set("v.rgb",rgb);
             
            if (lux <= '500') { 
             component.set("v.class", "light20");
             component.set("v.message", "ALERT: Light level critical for pannel Solar X30");
         }
            if(lux >= '501' && lux <= '1000'){
             component.set("v.class","light40");
             component.set("v.message", "WARNING: Light below operating level Solar X30");
         }
            if(lux >= '1001' && lux <= '3000'){component.set("v.class","light60");
         component.set("v.message", "NOTICE: Light level low for pannel Solar X30")
         }
            if(lux >= '3001' && lux <= '6000'){component.set("v.class","light80");
         component.set("v.message", "Normal operating level for pannel Solar X30");
         }
            if(lux >= '6001'){component.set("v.class","light100");
             component.set("v.message", "NOTICE: Maximum level reached for pannel Solar X30");}
               
             if(motion < '0'){
             component.set("v.message", "ALERT: Solar pannel angle change - power output reduced by 80%");
         }
        }))
       empIoT.onError($A.getCallback(error => {
            // Error can be any type of error (subscribe, unsubscribe...)
            console.error('EMP API error: ', error);
        }));
        
	}
})
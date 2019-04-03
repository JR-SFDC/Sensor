({
	onInit : function(component, event, helper) {

        const empIoT = component.find('empIoT');
		const channelIoT = '/event/Inbound_Payload__e'; 
        const replayId = -1;
        
        empIoT.subscribe(channelIoT, replayId, $A.getCallback(eventReceived => {
            // Process event (this is called each time we receive an event)
            console.log('Received event ', JSON.stringify(eventReceived));
          
            var jsonRaw = JSON.parse(JSON.stringify(eventReceived));
            
            var light = jsonRaw.data.payload.Inbound_Reading__c ;
            var rgb = jsonRaw.data.payload.rgb__c;
          	component.set("v.light",light) ;    
            component.set("v.rgb",rgb);
            
            console.log('light: ' + light);
            
            if (light <= '500') { component.set("v.class", "light20");component.set("v.message","Light level critical! lux: " + light);}
            if(light >= '501' && light <= '1000'){component.set("v.class","light40");component.set("v.message","Light level low! lux: " + light);}
            if(light >= '1001' && light <= '3000'){component.set("v.class","light60");component.set("v.message","Light level normal");}
            if(light >= '3001' && light <= '6000'){component.set("v.class","light80");component.set("v.message","Light level normal");}
            if(light >= '6001'){component.set("v.class","light100");component.set("v.message","Light level maximum!");}
               
        }))
       empIoT.onError($A.getCallback(error => {
            // Error can be any type of error (subscribe, unsubscribe...)
            console.error('EMP API error: ', error);
        }));
	}
})
!function(a,b){"function"==typeof define&&define.amd?define(function(){return b(a,a.document)}):"undefined"!=typeof module&&module.exports?module.exports=b(a,a.document):a.Shake=b(a,a.document)}("undefined"!=typeof window?window:this,function(a,b){"use strict";function c(c){if(this.hasDeviceMotion="ondevicemotion"in a,this.options={threshold:15,timeout:1e3},"object"==typeof c)for(var d in c)c.hasOwnProperty(d)&&(this.options[d]=c[d]);if(this.lastTime=new Date,this.lastX=null,this.lastY=null,this.lastZ=null,"function"==typeof b.CustomEvent)this.event=new b.CustomEvent("shake",{bubbles:!0,cancelable:!0});else{if("function"!=typeof b.createEvent)return!1;this.event=b.createEvent("Event"),this.event.initEvent("shake",!0,!0)}}return c.prototype.reset=function(){this.lastTime=new Date,this.lastX=null,this.lastY=null,this.lastZ=null},c.prototype.start=function(){this.reset(),this.hasDeviceMotion&&a.addEventListener("devicemotion",this,!1)},c.prototype.stop=function(){this.hasDeviceMotion&&a.removeEventListener("devicemotion",this,!1),this.reset()},c.prototype.devicemotion=function(b){var d,e,c=b.accelerationIncludingGravity,f=0,g=0,h=0;return null===this.lastX&&null===this.lastY&&null===this.lastZ?(this.lastX=c.x,this.lastY=c.y,void(this.lastZ=c.z)):(f=Math.abs(this.lastX-c.x),g=Math.abs(this.lastY-c.y),h=Math.abs(this.lastZ-c.z),(f>this.options.threshold&&g>this.options.threshold||f>this.options.threshold&&h>this.options.threshold||g>this.options.threshold&&h>this.options.threshold)&&(d=new Date,e=d.getTime()-this.lastTime.getTime(),e>this.options.timeout&&(a.dispatchEvent(this.event),this.lastTime=new Date)),this.lastX=c.x,this.lastY=c.y,void(this.lastZ=c.z))},c.prototype.handleEvent=function(a){if("function"==typeof this[a.type])return this[a.type](a)},c});
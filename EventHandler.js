var EventUtil={
	addHandler:function(element,type,handler){
		if(element.addEventListener){
			element.addEventListener(type,handler,false);
		} else if(element.attachEvent){
			element.attachEvent(type,handler);
		} else {
			element["on"+click]=handler;
		}
	},
	removeHandler:function(){
		if(element.removeEventListener){
			element.removeEventListener(type,handler);
		} else if(element.detachEvent){
			element.detachEvent(type,handler);
		} else{
			element["on"+type]=null;
		}
	}
}
function f1(loopLength){
	var initValue=50;
	for(var i=1;i<loopLength;i++){
		initValue=Math.floor(((initValue/i)-10)/(i+1));
	}
	console.log("f1 endTime="+new Date());
	console.log(initValue);
	return initValue;
}


function f2(loopLength){
	var initValue=50;
	for(var i=1;i<loopLength;i++){
		initValue=initValue+1;
	}
	console.log("f2 endTime="+new Date());
	console.log(initValue);
	return initValue;
}

function f3(){
	var t1=new Date();
	var a=f1(100000000);
	var t2=new Date();
	console.log("beginTime="+t1);
	console.log(a);
	console.log("endTime="+t2);
	f2(10000);
	var t3=new Date();
	console.log("f2 endtime="+t3)
}
function f4(callback){
	setTimeout(function(){
		f1(100000000);
		callback(10000);
	},1000);
}
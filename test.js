function havePlugins(){
	name=name.toLowerCase();
	for (var i=0;i<navigator.plugins.length;i++){
		if (navigator.plugins[i].name.toLowerCase().indexOf(name)>-1){
			return true;
		}
	}
	return false;
}

function testFunction(obj){
	return arguments;
}

var factorial=(function f(num){
	if( num<=1){
		return 1;
	} else {
		return f(num-1);
	}
});

var name='testABC';
function printName(){
	console.log(this.name);
};

var test={name:'aaaa'};

(test.sayHello=printName)();

function logIndex(){
	for(var i;i<5;i++){
		;
	}

	var i;
	console.log(i);
}
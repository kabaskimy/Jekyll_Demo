function range(from,to){
	var r=inherit(range.methods);
	r.from=from;
	r.to=to;
	return r;
}

range.methods={
	include:function(x){
		return  this.from<=x && x<=this.to;
	},
	foreach:function(f){
		var result=[];
		for (var x=Math.ceil(this.from);x<=this.to;x++) {

			f(x,result);
		}
		return result;
	},
	toString:function(){
		return "("+this.from+"..."+this.to+")";
	}
};


function inherit(p){
	if(p==null){
		throw TypeError();
	}
	if(Object.create){
		return Object.create(p);
	};
	var t = typeof p;
	if(t !== "object" && t !== "function"){
		function f(){};
		f.prototype = p;
		return new f();
	}
}


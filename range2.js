function Range(from,to){
	this.from=from;
	this.to=to;
};

Range.prototype={
	include:function(x){
		return this.from<=x && x <= this.to;
	},
	foreach:function(f){
		var result=[];
		for(var x=Math.ceil(this.from);x<=this.to;x++){
			f(x,result);
		}
		return result;
	},
	toString:function(){
		return "("+this.from+"..."+this.to+")";
	}
};
function Init(n){
	if(typeof n!='number'){
		return null;
	} else if(n>0){
		var headNode={next:null,data:{index:1}};
		var tmpNode=headNode;
		for(var i=1;i<n;i++){
			var node={next:null,data:{index:i+1}};
			tmpNode.next=node;
			tmpNode=node;
		}
		tmpNode.next=headNode;
		return headNode;
	}
	return null;
}

function testPrint(a,index){
    var head=a;
    for(var i=0;i<index;i++){
    	head=head.next;
    };
    var guard=head;
    console.log(head.data.index);
    while(guard.next!=head){
    	guard=guard.next;
    	console.log(guard.data.index);
    };
}

function killNode(a){
   while(a.next!=a){
   	var p=a.next;
   	a.next=p.next;
    a=a.next;
    console.log(p.data.index);
   };
   return a;
}
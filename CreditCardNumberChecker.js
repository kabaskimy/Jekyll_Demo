function GetValue(a){
   if(typeof a!='number'){
   	return 'please input number';
   	} 
   	else {
   		var a=new Array(a);
   		for(var i=1;i<=a.length;i++){
   			a[i-1]=i;
   		}
   		var b=a;
   		var index=t;
   		while(b.length!=1){
   			
   		}
   	}
}



function LinkedList(){
   this._length=0;
   this._head=null;
};

LinkedList.prototype={
   add: function(data){
         var node = {
               data:data,
               next:null
             },
             current;
         if(this._head===null){
            this._head=node;
         } else {
            current=this._head;
            while(current.next){
               current=current.next;
            }
            current.next=node;
         }
         this._length++;
   },

   item:function(index){
      if(index>-1&&index<this._length){
         var current=this._head,
             i=0;
             while((i++)<index){
               current=current.next;
             }

             return current.data;

      } else {

         return null;
      }
   },

   remove:function(index){
      if(index>-1&&index<this._length){
         var pre=this._head,
             i=0;
             while(i++<(index-1)){
               pre=pre.next;
             }
             var removedNode=pre.next;
             pre.next=pre.next.next;
             removedNode.next=null;
             this._length--;
             return removedNode;
      } else{
         return null;
      }
   }
};

function GetLuhnCheckNumber(num){
   if(!isNaN(num)){
      var testValue=Math.abs(num),
          models=[],
          odds=[],
          evens=[],
          total=0,
          result=0;
      while(testValue>=10){
            models.push(testValue%10);
            testValue=Math.floor(testValue/10);
         }
         models.push(testValue);
         console.log(models);
         for(var i=0;i<models.length;i++){
            if(i%2){
               evens.push(GetNumberValue(models[i]*2));
               total=total+GetNumberValue(models[i]*2);
            } else {
               odds.push(models[i]);
               total=total+models[i];
            }
         }
         console.log('evens='+evens);
         console.log('total='+total);
         return 10-(total%10);
      } else {
         throw TypeError(" you input a invalid type");
      }
}

function GetNumberValue(num){
   var total=num,
       model=total%10;
       total=((total-model)/10)+model;
       return total;
}
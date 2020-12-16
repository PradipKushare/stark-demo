module.exports = {
    add_in_cart:function(id,data,quantity,price,callback) {
        var oldItems = JSON.parse(localStorage.getItem('cartItems')) || [];
            new Promise((resolve, reject) => {
            var exist = false;
 
      for(var i = 0; i < oldItems.length; i++)
        if(oldItems[i].id === id) {
                exist = true; 
                break;
            }
             if(!exist){
                  oldItems.push(data);
                      resolve(oldItems);
             }else{
                var addCart = {
                    id:id,
                    name:oldItems[i].name,
                    price:oldItems[i].price,
                    quantity:quantity,
                    subtotal:price*quantity,
                    image:oldItems[i].image,
               };

                     var index = oldItems.findIndex(item => item.id === id)
                     oldItems.splice(index, 1, addCart);
                        resolve(oldItems);	
                 }	 		
               }).then((oldItems)=> {
                        module.exports.add_cart_data(oldItems, function(err,result){
                         if(result) {
                          return  callback(null,{myArr:oldItems});;
                         }
                       }); 
             });	
     },
 
     add_cart_data:function(data,callback){
          module.exports.total_cart_count(data,function(err,result){
                     if(result) {
                          module.exports.total_sum_amount(data, function(err,result1){
                                 if(result1){
                          module.exports.original_total_sum_amount(data, function(err,result2){
                              if(result2){
          			  	             localStorage.setItem('cartItems',JSON.stringify(data));

                         callback(null,{status:true});
                                }
                            });
                        }
                    });
                }
            });
                    
          },
 
     total_cart_count:function(data,callback){
         localStorage.setItem('cartCount',JSON.stringify(data.length));
         callback(null,{status:true});
     },
 
 original_total_sum_amount:function(oldItems,callback){
     let items = 0;
     var sumArr = [];
     new Promise((resolve, reject) => {
         oldItems.forEach(function(sum){
             sumArr.push(sum.original_subtotal);
             items += 1;
         });
             if(items == oldItems.length){
                 resolve(sumArr);
                 }
             }).then((sumArr)=> {
             module.exports.calcTotal(sumArr).then((totalSum)=> {
                  localStorage.setItem('cartOriginalAmt',totalSum);
                  callback(null,{status:true});
             });	
         }); 
     },
 
 
     total_sum_amount:function(oldItems,callback){
     let items = 0;
     var sumArr = [];
     new Promise((resolve, reject) => {
         oldItems.forEach(function(sum){
             sumArr.push(sum.subtotal);
             items += 1;
         });
             if(items == oldItems.length){
                 resolve(sumArr);
                 }
             }).then((sumArr)=> {
             module.exports.calcTotal(sumArr).then((totalSum)=> {
                  localStorage.setItem('cartTolAmt',totalSum);
                  callback(null,{status:true});
             });	
         }); 
     },


      calcTotal:function(input){
       return new Promise(resolve => {
         if (toString.call(input) !== "[object Array]")
         resolve(false);  
         var total =  0;
         for(var i=0;i<input.length;i++)
           {                  
             if(isNaN(input[i])){
             continue;
              }
               total += Number(input[i]);
                }
              resolve(total);
               });
         },
 
     removeProduct:function(productId,callback){
     var oldItems = JSON.parse(localStorage.getItem('cartItems')) || [];
     let products = oldItems.filter(product => product.id !== productId );
       module.exports.add_cart_data(products, function(err,result){
                 if(result) {
                      var myArr = JSON.parse(localStorage.getItem('cartItems')) || [];
                       return  callback(null,{success:true,myArr:myArr});
                   }
               });
     }
 }
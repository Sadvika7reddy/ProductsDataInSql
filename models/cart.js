const fs=require('fs')
const path=require('path')

const p=path.join(path.dirname(process.mainModule.filename),
'data',
'cart.json'
)

module.exports=class Cart {
   static addProduct(id,productPrice){
       fs.readFile(p,(err,fileContent)=>{
        let cart={product:[],totalPrice:0}
        if(!err){
           cart=JSON.parse(fileContent)
        }
        const exitingProductIndex=cart.product.findIndex(prodId=>prodId.id==id)
        const exitingProduct=cart.product[exitingProductIndex];
        let updateProduct;
        if(exitingProduct){
           updateProduct={...exitingProduct}
           updateProduct.qty+=1;
           cart.product=[...cart.product]
           cart.product[exitingProductIndex]=updateProduct
        }
        else{
            updateProduct={id:id,qty:1}
            cart.product=[...cart.product,updateProduct];

        }
        cart.totalPrice+=+productPrice;
        fs.writeFile(p,JSON.stringify(cart),err=>{

        })
       })
   } 
}
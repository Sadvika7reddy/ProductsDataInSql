const Product = require('../models/product');

exports.getAddProduct = (req, res, next) => {
  res.render('admin/edit-product', {
    pageTitle: 'Add Product',
    path: '/admin/add-product',
    editing:false
  });
};

exports.postAddProduct = (req, res, next) => {
  const title = req.body.title;
  const imageUrl = req.body.imageUrl;
  const price = req.body.price;
  const description = req.body.description;
 req.user.createProduct(
  {
    title:title,
    price:price,
    imageUrl:imageUrl,
    description:description
  }
 )
  .then(()=>{
    res.redirect('/admin/products')
  })
  .catch(err=>console.lof(err))
};

exports.getEditProduct = (req, res, next) => {
  const editMode=req.query.edit
  // if(!editMode){
  //   return res.redirect('/')
  // }
  const prodId=req.params.productId;
  req.user.getProducts({where:{id:prodId}})
  .then((product)=>{
   const products=product[0]
    res.render('admin/edit-product', {
      pageTitle: 'Edit Product',
      path: '/admin/edit-product',
      editing:true,
      product:products
    });
  })
  .catch(err=>console.log(err))
  
};

exports.postEditPriduct=(req,res,next)=>{
   const prodId=req.body.productId;
   const updateTitle=req.body.title;
   const updatePrice=req.body.price;
   const updatedImageurl=req.body.imageUrl;
   const updatedDescription=req.body.description;
   const updatedProduct=new Product(prodId,updateTitle,updatedImageurl,updatedDescription,updatePrice)
  Product.findByPk(prodId)
  .then((product)=>{
    product.title=updateTitle;
    product.price=updatePrice;
    product.imageUrl=updatedImageurl;
    product.description=updatedDescription;
    return product.save()
  })
  .then(()=>{
    res.redirect('/admin/products')
  })
  .catch(err=>console.log(err));
   
}

exports.getProducts = (req, res, next) => {
  Product.findAll()
  .then((products)=>{
    res.render('admin/products', {
      prods: products,
      pageTitle: 'Admin Products',
      path: '/admin/products'
    });
  })
  .catch(err=>console.log(err))
};

exports.deleteProducts=(req,res,next)=>{
  const prodId=req.body.productId;
  Product.findByPk(prodId)
  .then((product)=>{
    return product.destroy()
  })
  .then(()=>{
    res.redirect('/admin/products')
  })
  .catch(err=>console.log(err))
  
}
const Product = require("../model/product");

exports.getAllProducts = async(req,res)=>{
  try {
    const resp = await Product.findAll();
    console.log("---resp---",resp);
    res.status(200).send({success:true,data:resp})
  } catch (error) {
    console.log("error",error);
  }
  // res.status(200).send({success:true,data:data})
}

exports.addProduct = async(req,res)=>{
  try {
    const payload = req.body;
    console.log("-----payload-----",payload);
    const resp = await Product.create(payload);
    console.log("---resp----",resp); 
    res.status(200).send(resp)
  } catch (error) {
    console.log("error",error);
  }
}

exports.updateProduct = async(req,res)=>{
  try {
    const id = req.params.id;
    const payload = req.body
    console.log(id,payload);
    
    const resp = await Product.update(payload,{
      where:{
        id:id
      }
    });
    console.log("patch",resp); 
    res.status(200).send(resp)
  } catch (error) {
    console.log("error",error);
  }
}

exports.deleteProduct = async(req,res)=>{
  try {
    const id = req.params.id;
    const resp = await Product.destroy({
      where:{
        id:id
      }
    });
    // const resp = await Product.destroy({
    //   truncate: true,
    // })
    console.log("deletes",resp); 
    res.status(200).send(resp)
  } catch (error) {
    console.log("error",error);
  }
}

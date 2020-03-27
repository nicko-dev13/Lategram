const mongoose=require("mongoose");
const Product =require('./models/Comments');

const createProduct= async (res,req,next)=>{
    const createdProduct=new Comment({
        userName:req.body.userName,
        createdAt:req.body.createdAt,
        comment:req.body.comment
    });
    const result= await createdProduct.save();
    res.json(result);
};


exports.createProduct=createProduct;
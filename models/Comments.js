const mongoose= require('mongoose');
const express=require('express');


const commentSchema=new mongoose.Schema({
userName:{type:String, required:true},
createdAt:{type:Date, default:Date.now()},
comment:{type:String,required:true}
});

module.exports=mongoose.model('Comment',commentSchema);
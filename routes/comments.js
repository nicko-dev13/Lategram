const express=require('express');
const router=express.Router();
const Comment=require('\models\Comments');
const mongoPractice= require ('./mongoose');

// const returnComment=async (req,res)=>{
//     const returnedComment= new Comment({
//         userName:req.body.userName,
//         Date:req.body.createdAt,
//         comment:req.body.comment,

//     })
// }

// app.use(bodyParser.urlencoded({
//     extended:true
// }));
router.post('api/comments',mongoPractice.createProduct);

router.get('api/comments',(req,res)=>{
    res.send();
});

router.put('api/comments/:id',(req,res)=>{
    res.send();

});

router.delete('api/comments',(req,res)=>{
    res.send();

});

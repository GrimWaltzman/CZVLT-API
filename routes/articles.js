const express = require('express');
const Article = require('../models/article');
const router = express.Router();

// Gets all the articles
router.get('/', async (req, res)=>{
    try{
        const articles = await Article.find();
        res.json(articles);
    }catch(err){
        res.json({message: err})
    }
    
});

//Gets a specific post
router.get('/:id', async (req, res)=>{
    try{
        const article = await Article.findById(req.params.id);
        res.json(article);
    }catch(err){
        res.status(500).json({message: err});
    }
});


//Saves the article
router.post('/', async (req,res)=>{
    const article = new Article({
        title: req.body.title,
        body: req.body.body,
        author: req.body.author
    });
    console.log(article);
    try{
        const savedArticle = await article.save();
        res.json(savedArticle); 
    }catch(err){
        res.json({message: err});
    }


});

//Deletes the article
router.delete('/:id', async (req, res) => {
    try{
        const removedArticle = await Article.remove({_id: req.params.id});
        res.json(removedArticle);
    }catch(err){
        res.json({message: err})
    }
})

//Updates an article
router.patch('/:id',async (req, res) => {
    try{
        const updatedArticle = await Article.updateOne(
            {_id: req.params.id},
             {$set: {titile: req.body.title}}
        );
        res.json(updatedArticle);
    }catch(err){
        res.json({message:err});
    }
})


module.exports = router;
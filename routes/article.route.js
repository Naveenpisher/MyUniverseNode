const express = require('express');
const router = express.Router();
const articleController = require('./../controllers/article.controller')


router.get('/new', articleController.newArticleView)

router.get('/', articleController.getAllArticle)

router.get('/:id', articleController.getArticleById)

router.delete('/:id', articleController.deleteArticle)

router.get('/edit/:id', articleController.editArticleView)

router.post('/', articleController.addArticle)

router.put('/:id', articleController.updateArticle)



module.exports = router;
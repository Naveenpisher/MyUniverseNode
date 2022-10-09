

const articleSchema = require('./../schemas/article.schema');



const newArticleView = (req, res) => {
    res.render('articles/new', {
        'article': { id: null, title: '', markdown: '' }
    })
}



const getAllArticle = async (req, res) => {

    const articles = await articleSchema.find();

    res.render('articles/index', {
        articles: articles
    });

}

const getArticleById = async (req, res) => {

    try {
        console.log('get test')
        const article = await articleSchema.findById(req.params.id);
        if (!article) res.redirect('/articles');
        res.render('articles/show', { article: article });
    } catch (error) {
        res.redirect('/articles')
    }

}


const deleteArticle = async (req, res) => {

    try {
        console.log('delete test')
        const deleteObject = await articleSchema.findByIdAndDelete(req.params.id);
        console.log(deleteObject);
        res.redirect(`/articles`);
    } catch (error) {
        console.log(error);
        res.send('error');
        //res.redirect('/articles')
    }

}


const editArticleView = async (req, res) => {
    const article = await articleSchema.findById(req.params.id)
    res.render('articles/edit', { article: article })
}



const addArticle = async (req, res) => {

    console.log(req.body);

    let article = new articleSchema({
        title: req.body.title,
        description: req.body.description,
        markdown: req.body.markdown,
    });

    try {
        article = await article.save();
        res.redirect(`/articles`)
    } catch (error) {
        res.render('articles/new', { article: article })
    }
}


const updateArticle = async (req, res) => {

    console.log(req.body);


    const article = await articleSchema.findById(req.params.id);
    article.title = req.body.title
    article.description = req.body.description
    article.markdown = req.body.markdown

    try {
        article = await article.save();
        res.redirect(`/articles`)
    } catch (error) {
        res.redirect(`/articles`)
    }
}



module.exports = { addArticle, deleteArticle, editArticleView, getAllArticle, getArticleById, newArticleView, updateArticle };
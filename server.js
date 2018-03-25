const express = require('express');
const app = express();
const PORT = 3000;
const bodyParser = require('body-parser');
const Article = require('./models/News');
const methodOverride = require('method-override');

const NewsAPI = require('newsapi');
const newsapi = new NewsAPI('d7e306622a244886bc990cf23ef9ef69');
const Request = require('request');
const esProm = require('es6-promise').polyfill();
const fetch = require('isomorphic-fetch');


app.use(bodyParser.json())
app.use(methodOverride('_method'));
const urlencodedParser = bodyParser.urlencoded({ extended: false })
app.set("view engine", "ejs");








// var url = 'https://newsapi.org/v2/top-headlines?' +
//           'country=us&' +
//           'apiKey=d7e306622a244886bc990cf23ef9ef69';
// var req = new Request(url);
// fetch(req)
//     .then(function(response) {
//         console.log(response.json());
//     })



// SHOW ALL
app.get('/articles', (request, response) => {
  Article.showAllArticles().then(allArts => {
    response.render('index', { articles: allArts })
    // response.render('index', { news: allArts });
  });
});

// CREATE get
app.get('/articles/new', (request, response) => {
  response.render('create');
})

// EDIT get
app.get('/articles/:id/edit', (request, response) => {
  let editArticle = parseInt(request.params.id);
  Article.findById(editArticle).then(article => {
    response.render('edit', { article: article});
  })
})

// SHOW ONE
app.get('/articles/:id', (request, response) => {
  const id = parseInt(request.params.id);
  Article.findById(id).then(articleId => {
    response.render('show', { article: articleId });
  });
});

// CREATE
app.post('/articles/new', urlencodedParser, (request, response) => {
  const articleNew = request.body;
  Article.createArticle(articleNew).then(article => {
    // response.redirect(`/${task.id}`);
    response.redirect('/articles');
  })
  .catch((error) => {
    response.send(error);
  })
});

// DELETE
app.delete('/articles/:id', (request, response) => {
  const id = parseInt(request.params.id);
Article.deleteArticle(id);
response.redirect('/articles');
})

// EDIT put
app.put('/articles/:id', urlencodedParser, (request, response) => {
  let id = parseInt(request.params.id);
  let editedArticle = request.body;
  Article.editArticle(id, editedArticle);
    response.redirect(`/articles/${id}`);
});
  // .catch((error) => {
  //   response.send(error);
  // })




app.listen(PORT, () => {
  console.log(`Welcome to the Year ${PORT}, the world of tomorrow!`)
});

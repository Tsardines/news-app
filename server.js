const express = require('express');
const app = express();
const PORT = 4000;
const bodyParser = require('body-parser');
const Article = require('./models/News');
const methodOverride = require('method-override');
const request = require('request');
const fetch = require('node-fetch')

const newsUrl = 'https://newsapi.org/v2/top-headlines?country=us&apiKey=d7e306622a244886bc990cf23ef9ef69';

// serves up static files
// raw: localhost:4000/assets/style.css
app.use('/assets', express.static('assets'));

app.use(bodyParser.json())

app.use(methodOverride('_method'));

const urlencodedParser = bodyParser.urlencoded({ extended: false })

// view engine = ejs
app.set("view engine", "ejs");



// SHOW API articles
let getNewsData = url => {
  return fetch(url).then(response => response.json());
};

app.get('/home', (request, response) => {
  // Article.showAllArticles().then(everyArticle => {
  //   response.render('index', { articles: everyArticle })
    // response.render('index', { news: allArts });
    getNewsData(newsUrl).then(everyAPIArticle => {
      let allArticles = everyAPIArticle.articles;
      response.render('index', { articles: allArticles });
    })
});

app.get('/home', (request, response) => {
    Article.showAllArticles().then(userArticles => {
      let allUserArts = userArticles.articles;
  response.render('index', { articles: allUserArts });
  })
});




// CREATE get
app.get('/home/create', (request, response) => {
  response.render('create');
})

// // EDIT get userArticles
// app.get('/home/:id/edit', (request, response) => {
//   let editArticle = parseInt(request.params.id);
//   Article.findById(editArticle).then(article => {
//     response.render('edit', { article: article});
//   })
// })


// EDIT get
app.get('/home/:id/edit', (request, response) => {
  let editArticle = parseInt(request.params.id);
  Article.findById(editArticle).then(article => {
    response.render('edit', { article: article});
  })
})


// EDIT put
app.put('/home/:id', urlencodedParser, (request, response) => {
  let id = parseInt(request.params.id);
  let editedArticle = request.body;
  Article.editArticle(id, editedArticle);
    response.redirect(`/home/${id}`);
});
  // .catch((error) => {
  //   response.send(error);
  // })


// SHOW ONE
app.get('/home/:id', (request, response) => {
  const id = parseInt(request.params.id);
  Article.findById(id).then(articleId => {
    response.render('onearticle', { article: articleId });
  });
});

// CREATE
// stores data that's in the body of the request
app.post('/home/create', urlencodedParser, (request, response) => {
  const articleNew = request.body;
  Article.createArticle(articleNew).then(article => {
    // response.redirect(`/${task.id}`);
    response.redirect('/home');
  })
  .catch((error) => {
    response.send(error);
  })
});

// DELETE
app.delete('/home/:id', (request, response) => {
  const id = parseInt(request.params.id);
Article.deleteArticle(id);
response.redirect('/home');
})

app.listen(PORT, () => {
  console.log(`'$${PORT}!`)
});

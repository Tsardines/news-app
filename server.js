const express = require('express');
const app = express();
// const PORT = 4000;
const bodyParser = require('body-parser');
const Article = require('./models/News');
const methodOverride = require('method-override');
const request = require('request');
const fetch = require('node-fetch')

const newsUrl = 'https://newsapi.org/v2/top-headlines?country=us&apiKey=d7e306622a244886bc990cf23ef9ef69';

app.set('port', (process.env.PORT || 4000));

// serves up static files
// raw: localhost:4000/assets/style.css
app.use('/assets', express.static('assets'));

app.use(bodyParser.json())

app.use(methodOverride('_method'));

const urlencodedParser = bodyParser.urlencoded({ extended: false })

// view engine = ejs
app.set("view engine", "ejs");


// SHOW API articles
// Fetching the url (see top of page) for proper displaying
let getNewsData = url => {
  return fetch(url).then(response => response.json());
};

// Chains .thens---after the first statement runs, the second continues right after it, rather than stopping after the first one. This would cause the user submissions to not render.
app.get('/', (request, response) => {
    getNewsData(newsUrl).then(res => {
      Article.showAllArticles().then(userArticles => {
        response.render('index', { userArticles: userArticles, apiArticles: res.articles });
      })
    })
});

// CREATE get
// CREATE requires an initial GET
app.get('/home/create', (request, response) => {
  response.render('create');
})


// EDIT get
// The first step toward editing
// 1. Get a single user submitted article by id
app.get('/home/:id/edit', (request, response) => {
  let editArticle = parseInt(request.params.id);
  Article.findById(editArticle).then(article => {
    console.log(article);
    response.render('edit', { article });
  })
})


// EDIT put
app.put('/home/:id/edit', urlencodedParser, (request, response) => {
  let id = parseInt(request.params.id);
  let articleData = request.body;
    console.log('articleData', articleData);
  Article.editArticle(id, articleData).then(articleData => {
    // console.log(article);
    response.redirect('/', { articleData })
  })
});


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

// app.listen(PORT, () => {
//   console.log(`$${PORT}!`)
// });

app.listen(app.get("port"), function() {
 console.log("Node app is running on port", app.get("port"));
});

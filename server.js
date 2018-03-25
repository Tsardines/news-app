const express = require('express');
const app = express();
const PORT = 4000;
const bodyParser = require('body-parser');
const Article = require('./models/News');
const methodOverride = require('method-override');
const request = require('request');

const NewsAPI = require('newsapi');
const newsapi = new NewsAPI('d7e306622a244886bc990cf23ef9ef69');

const apiKey = 'd7e306622a244886bc990cf23ef9ef69';

// const Request = require('request');

// for css styling
app.use(express.static('assets'));


app.use(bodyParser.json())


app.use(methodOverride('_method'));

const urlencodedParser = bodyParser.urlencoded({ extended: false })

// view engine = ejs
app.set("view engine", "ejs");



// newsapi.v2.topHeadlines({
//   sources: 'bbc-news,the-verge',
//   q: 'bitcoin',
//   // category: 'business',
//   language: 'en'
//   // country: 'us'
// }).then(response => {
//    response.json(newsapi);
//   /*
//     {
//       status: "ok",
//       articles: [...]
//     }
//   */
// });


// SHOW ALL
app.get('/articles', (request, response) => {
  Article.showAllArticles().then(everyArticle => {
    response.render('index', { articles: everyArticle })
    // response.render('index', { news: allArts });
  });
});

// CREATE get
app.get('/articles/create', (request, response) => {
  response.render('create');
})

// EDIT get
app.get('/articles/:id/edit', (request, response) => {
  let editArticle = parseInt(request.params.id);
  Article.findById(editArticle).then(article => {
    response.render('edit', { article: article});
  })
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


// SHOW ONE
app.get('/articles/:id', (request, response) => {
  const id = parseInt(request.params.id);
  Article.findById(id).then(articleId => {
    response.render('onearticle', { article: articleId });
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






app.listen(PORT, () => {
  console.log(`'$${PORT} in Nixon buckaroos!`)
});




// app.get('/', (request, response) => {
//   response.render('index');
// })
//
// app.post('/', (request, response) => {
//   response.render('index');
//   console.log(request.body.query);
// })
//
//
// app.post('/', (request, response) => {
//   let query = request.body.query;
//   let url = `https://newsapi.org/v2/everything?q=${query}&apiKey=d7e306622a244886bc990cf23ef9ef69`
//
//
//   request(url, (err, response, body) => {
//     if(err) {
//       response.render('index', {everything: null, error: 'Try again'});
//     } else {
//       let everything = JSON.parse(body)
//       if(everything.main == undefined) {
//         response.render('index', {everything: null, error: 'Try again'});
//       } else {
//         let everythingText = `Here are your headlines:`;
//         response.render('index', {everything: everythingText, error: null});
//       }
//     }
//   });
// })

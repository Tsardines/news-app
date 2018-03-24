const express = require('express');
const app = express();
const PORT = 3000;
const bodyParser = require('body-parser');
const Task = require('./models/News');
const methodOverride = require('method-override');


app.use(bodyParser.json())
app.use(methodOverride('_method'));
const urlencodedParser = bodyParser.urlencoded({ extended: false })
app.set("view engine", "ejs");



// SHOW ALL
app.get('/', (request, response) => {
  Article.showAllArticles().then(allArts => {
    response.render('index', { news: allArts });
  });
});


app.listen(PORT, () => {
  console.log(`Welcome to the Year ${PORT}, the world of tomorrow!`)
});

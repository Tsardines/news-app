// require database setup to use pg-Promise
const pgp = require('pg-promise')({});

const Article = {};

const connectionURL = "postgres://localhost:5432/news_app";

// new database connection
const db = pgp(connectionURL);

Article.showAllArticles = () => {
  return db.any('SELECT * FROM articles');
};

Article.findById = id => {
  return db.one('SELECT * FROM articles WHERE id = $1', [id]);
};

Article.createArticle = article => {
return db.one('INSERT INTO articles(title, url) VALUES($1, $2) RETURNING id', [article.title, article.url]);
};

Article.editArticle = (id, article) => {
  db.none('UPDATE articles SET title = $1, url = $2 WHERE id = $3', [article.title, article.url, id]);
};

Article.deleteArticle = id => {
  return db.one('DELETE FROM articles WHERE id = $1', [id]);
};


module.exports = Article;

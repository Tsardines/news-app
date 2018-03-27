// require database setup to use pg-Promise
const pgp = require('pg-promise')({});

const Article = {};

const connectionURL = "postgres://localhost:5432/news_app";

// new database connection
const db = pgp(connectionURL);

Article.showAllArticles = () => {
  return db.any('SELECT * FROM user_articles');
};

Article.findById = id => {
  return db.one('SELECT * FROM user_articles WHERE id = $1', [id]);
};

// Article.createArticle = article => {
//   return db.one('INSERT INTO user_articles(name, title) VALUES($1, $2) RETURNING id', [article.name, article.title]);
// };


Article.createArticle = article => {
  return db.one('INSERT INTO user_articles(name, author, title, description, url) VALUES($1, $2, $3, $4, $5) RETURNING id', [article.name, article.author, article.title, article.description, article.url]);
};

Article.editArticle = (id, article) => {
  db.none('UPDATE user_articles SET name = $1, author = $2, title = $3, description = $4, url = $5 WHERE id = $6', [article.name, article.author, article.title, article.description, article.url, id]);
};

Article.deleteArticle = id => {
  return db.one('DELETE FROM user_articles WHERE id = $1', [id]);
};

module.exports = Article;

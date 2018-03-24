// require database setup to use pg-Promise
const pgp = require('pg-promise')({});

const Article = {};

// connection url
// 'postgres://username:password@host:port/database';
const connectionURL = "postgres://localhost:5432/news_app";

// new database connection
const db = pgp(connectionURL);

Article.showAllArticles = () => {
  return db.any('SELECT * FROM articles');
};

module.exports = Article;

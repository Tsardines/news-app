CREATE DATABASE news_app;

\c news_app

DROP TABLE articles;

CREATE TABLE user_articles (
  id BIGSERIAL PRIMARY KEY,
  name VARCHAR(255),
  author VARCHAR(255),
  title VARCHAR(255),
  description VARCHAR(255),
  url VARCHAR(255),
  publishedAt timestamp with time zone
);

-- CREATE TABLE api_articles (
   --id BIGSERIAL PRIMARY KEY,
  --name VARCHAR(255),
  --author VARCHAR(255),
  --title VARCHAR(255),
  --description VARCHAR(255),
  --url VARCHAR(255),
  --urlToImage VARCHAR(255),
  --publishedAt timestamp with time zone
-- ); 

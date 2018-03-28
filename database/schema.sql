DROP TABLE user_articles;

CREATE TABLE user_articles (
  id BIGSERIAL PRIMARY KEY,
  name VARCHAR(255),
  author VARCHAR(255),
  title VARCHAR(255),
  description VARCHAR(255),
  url VARCHAR(255)
);

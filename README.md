# news-app

Disclaimer:

To view/edit/delete a single user-submitted article, go to:

`.com/home/1/edit`

Direct links to each one will be fixed in the very near future.





# Table of Contents:

### 1. Project Description
### 2. Priority Matrix
#### - MVP
#### - Post-MVP
### 3. Wireframes
### 4. User Stories
### 5. Database and Tables
### 6. Technologies
#### - APIs
### 7. Pages
#### - Landing Page
#### - Add Article
### 8. Change Log
### 9. Issues and Resolutions




## Project Description

This README and overall project has changed a lot in the past six days. If you're looking to find the README for a job board for programmers, then please check again in six months.

I've created a news aggregator that not only contains generated articles, but user submitted ones as well. The final project form will allow users to create, edit, and delete articles of their choosing.

This app features `newsapi`, that claims to "contain access to over 30,000 different sources." Saves me the pain of connecting multiple news apis. For a list of the APIs used, please scroll down.

A problem I've had with some news websites is that for every thirty-odd results or so, you have to click the "Next" button. While this might be seen as a minor complaint, for me it ruins the flow of the website experience.

Finally, I named the site "Spark Lines." As in, a "headline that sparks your interest." I thought it sounded simple but memorable.

## Priority Matrix

**1. Important & urgent:**
- CRUD
  - Being able to view an article's title, source, timestamp, and brief description
- The index page, in general

**2. Important but not urgent:**
- Connecting the API
- Partials
- Navigation buttons in nav bar
- Edit and Delete buttons

**3. Not important but urgent (how can something be not important but urgent?):**
- The Create, Edit, and single article views

**4. Not important and not urgent:**
- Footer content
  - Linked icons to my GitHub, Linkedin, Instagram, etc.


### MVP
A user will be able to:
  - CRUD articles from sources out

### POST MVP
- Ability to sort results in ascending/descending order
- Fine-tuning the CSS
- Ability to post jobs
- Register with Google account
- User will update account (PUT)

## Wireframes
[Posted to imgur.](https://i.imgur.com/PeGSr6i.png)

## User Stories
“As a person who just likes to browse headlines, I want to see all of my stories on a single page so that I don’t have to click on anything.”

"As a person who is hard of vision, I want to see the headlines in a large font so that I won't have to strain my eyes."

"As a person who likes to collect amusing headlines, I want to be able to submit my own articles so that I can look at them later."

"As a person who likes the _idea_ of collecting headlines, I just want to be able to see the generated ones first so that my user submissions aren't the first thing I see."

"As a person who appreciates formatting, I want the headline, source, author, and description to be spaced accordingly so that I can immediately identify them from a distance."

"As a time junkie, I want to be able to see the exact date and time and article was submitted so that I can reference them down the line."

“As an American, I want all of my articles to be based in the United States so that I can focus on what's relevant to me and ignore the rest of the world.”

"As a picky article submitter, I want to be able to edit a submission so that I have peace of mind."

"As a changer of minds, I want to be able to delete some of my earlier submissions so that I don't have to seem them, ever again."


## The database and tables
**Database name: news_app**

**Table 1:**

``` sql
CREATE TABLE user_articles (
  id BIGSERIAL PRIMARY KEY,
  name VARCHAR(255),
  author VARCHAR(255),
  title VARCHAR(255),
  description VARCHAR(255),
  url VARCHAR(255)
);  

```    

**Table 2:**
***** Unfortunately, as of updating this readme, an attempt to implement Table 2 did not work out *****

``` sql
CREATE TABLE articles (
  id BIGSERIAL PRIMARY KEY,
  name VARCHAR(255),
  author VARCHAR(255),
  title VARCHAR(255),
  description VARCHAR(255),
  url VARCHAR(255),
  urlToImage VARCHAR(255)
);

```

## Technologies
- Express
- pg-promise
- Embedded JavaScript
- nodemon
- debug
- Body Parser
- Method Override


### APIs
- newsapi


## Pages

### Index
- Links to: login, register, profile

### Create Article
Login:
  - Links to: index

### Edit Article
  - Links to: create, index

### Single user-submitted article
  - Links to: Create, edit, delete, index



## Change Log

1. The changing of projects

2. Using partials

3. Implementing Bootstrap

4. Removing search bar from nav

## Issues and Resolutions
1. Had an issue where I could create articles and they'd show up in the database, but they wouldn't render to the index. Several attempts were made, including having getNewsData(newsUrl).then separate from the user-based Article.showAllArticles().then. The issue was resolved by chaining the former `.then` with the latter, as displayed below:

`app.get('/home', (request, response) => {
    getNewsData(newsUrl).then(res => {
      Article.showAllArticles().then(userArticles => {
        response.render('index', { userArticles: userArticles, apiArticles: res.articles });
      })
    })
});`

2. A short time after the above issue, I was able to navigate to the Create page but couldn't submit anything. Which was unfortunate, because it had been working earlier that afternoon. This was resolved by running `server.js` in the debugger and finding out that the $6 parameter in `News.js` was faulty.

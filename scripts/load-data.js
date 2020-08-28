const { mkdir, writeFile } = require("fs");
const { getAllArticles } = require('./api');
require("dotenv").config();


const loadData = async () => {
  const articles = await getAllArticles()
    .then(articles =>
      articles.reduce((obj, article) => (
        {
          ...obj,
          [article.slug]: article
        }), {})
    );

  mkdir(".artifacts", { recursive: true }, err => {
    if (err) {
      console.error(err);
      throw err;
    }
  });


  writeFile(
    '.artifacts/pages.json',
    JSON.stringify({
      articles
    }, undefined, 2),
    err => {
      if (err) {
        console.error(err)
        throw err;
      }
    }
  )
}

(async () => {
  await loadData();
})().catch(err => {
  console.error(err);
  throw (err);
});
const { DeliveryClient } = require('@kentico/kontent-delivery')
const { name, version } = require('../package.json')
require("dotenv").config();

const sourceTrackingHeaderName = 'X-KC-SOURCE'

function getProjectId() {
  switch (process.env.NUM_PAGES) {
    case "512":
      return process.env.KONTENT_PROJECT_ID_512;
    case "4096":
      return process.env.KONTENT_PROJECT_ID_4096;
    case "8192":
      return process.env.KONTENT_PROJECT_ID_8192;
    case "32768":
      return process.env.KONTENT_PROJECT_ID_32768;
    default:
      return process.env.KONTENT_PROJECT_ID;
  }
}

const client = new DeliveryClient({
  projectId: getProjectId(),
  previewApiKey: process.env.KONTENT_PREVIEW_API_KEY,
  globalHeaders: (_queryConfig) => [
    {
      header: sourceTrackingHeaderName,
      value: `${name};${version}`,
    },
  ],
})

function parseArticle(article) {
  return {
    title: article.title.value,
    image: article.image.value.length > 0 ? article.image.value[0].url : undefined,
    content: article.content.value,
    article_number: article.article_number.value,
    slug: article.slug.value,
  }
}

async function getAllArticles(preview) {
  const articles = await client
    .itemsFeedAll()
    .queryConfig({
      usePreviewMode: !!preview,
    })
    .type('article')
    .orderByDescending('elements.article_number')
    .toPromise()
    .then((result) => result.items)
    .then(articles => articles.map(article => parseArticle(article)))

  return articles;
}


module.exports = {
  getAllArticles
}
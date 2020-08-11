import { DeliveryClient } from '@kentico/kontent-delivery'
import { name, version } from '../package.json'

const sourceTrackingHeaderName = 'X-KC-SOURCE'

const client = new DeliveryClient({
  projectId: process.env.KONTENT_PROJECT_ID,
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

export async function getAllArticlesSlugs() {
  const articlesSlugs = await client
    .items()
    .type('article')
    .elementsParameter(['slug'])
    .toPromise()
    .then(articleResponse => articleResponse.items)
    .then(articles => articles.map((article) => article.slug.value));

  return articlesSlugs;
}

export async function getArticleBySlug(slug, preview) {
  const article = await client
    .items()
    .queryConfig({
      usePreviewMode: !!preview,
    })
    .type('article')
    .equalsFilter('elements.slug', slug)
    .toPromise()
    .then((result) => result.getFirstItem())
    .then(article => parseArticle(article))

  return article;
}

export async function getAllArticles(preview) {
  const articles = await client
    .items()
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

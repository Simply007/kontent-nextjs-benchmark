import { useRouter } from 'next/router'
import ErrorPage from 'next/error'
import Link from 'next/link'
import Layout from '../../components/layout_1'
import { getAllArticlesSlugs, getArticleBySlug } from '../../lib/api'

export default function Post({ article, preview }) {
  const router = useRouter()
  if (!router.isFallback && !article?.slug) {
    return <ErrorPage statusCode={404} />
  }
  return (
    <Layout>
      <Link href="/"><a>Go back to index page</a></Link>
      <div>
        <h2>{article.title}</h2>
        {article.image ? (
          <div class="image-wrapper" style={{position: 'relative', overflow: 'hidden'}}>
            <div aria-hidden="true" style={{width: '100%', paddingBottom: '66.4583%'}}></div>
            <picture>
              <source
                srcset={
                  `${article.image}?w=240&amp;h=159 240w,
                  ${article.image}?w=480&amp;h=319 480w,
                  ${article.image}?w=960&amp;h=638 960w,
                  ${article.image}?w=1440&amp;h=956 1440w,
                  ${article.image}?w=1920&amp;h=1275 1920w`
                }
                sizes="(max-width: 960px) 100vw, 960px"/>
                <img
                  sizes="(max-width: 960px) 100vw, 960px"
                  srcset={
                    `${article.image}?w=240&amp;h=159 240w, 
                    ${article.image}?w=480&amp;h=319 480w, 
                    ${article.image}?w=960&amp;h=638 960w, 
                    ${article.image}?w=1440&amp;h=956 1440w,
                    ${article.image}?w=1920&amp;h=1275 1920w`}
                  src={`${article.image}?w=960&amp;h=638`}
                  alt=""
                  loading="lazy"
                  style={{
                    position: 'absolute',
                    top: '0px', 
                    left: '0px', 
                    width: '100%',
                    height: '100%', 
                    objectFit: 'cover', 
                    objectPposition: 'center center',
                    opacity: '1', 
                    transition: 'opacity 500ms ease 0s'}} />
              </picture>
            </div>
        ) : (
            <div>Image can't be displayed</div>
        )}
            <div dangerouslySetInnerHTML={{ __html: article.content }} />
      </div>
    </Layout>
        )
}

export async function getStaticProps({params, preview = null}) {
  const article = await getArticleBySlug(params.slug, preview)

  return {
        props: {
        article,
        preview,
    },
  }
}

export async function getStaticPaths() {
  const slugs = await getAllArticlesSlugs(['slug'])
  return {
        paths: slugs.map(
      (slug) =>
        ({
        params: {
        slug,
          },
        } || [])
    ),
    fallback: false,
  }
}

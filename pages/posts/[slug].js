import { useRouter } from 'next/router'
import ErrorPage from 'next/error'
import Link from 'next/link'
import Layout from '../../components/layout_1'
import { getPostBySlug, getAllPostSlugs } from '../../lib/api'

export default function Post({ post, preview }) {
  const router = useRouter()
  if (!router.isFallback && !post?.slug) {
    return <ErrorPage statusCode={404} />
  }
  return (
    <Layout>
      <Link href="/">Go back to index page</Link>
      <div>
        <h2>{post.title.value}</h2>
        {post.image.value.length > 0 ? (
          <image src={post.image.value[0].url} />
        ) : (
          <div>Image can't be displayed</div>
        )}
        <div dangerouslySetInnerHTML={{ __html: post.content.value }} />
      </div>
    </Layout>
  )
}

export async function getStaticProps({ params, preview = null }) {
  const post = await getPostBySlug(params.slug, preview)

  return {
    props: {
      post,
      preview,
    },
  }
}

export async function getStaticPaths() {
  const slugs = await getAllPostSlugs(['slug'])
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

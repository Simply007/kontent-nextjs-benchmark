import Layout from '../components/layout'
import { getAllPosts } from '../lib/api'


export default function Index({ allPosts, title }) {

    return (
      <Layout>
        {data.site.siteMetadata.siteTitle}
        <ul>
          {allPosts.map(post => (
            <li>
              <Link to={article.slug.value}>{article.title.value}</Link>
            </li>
          ))}
        </ul>
      </Layout>
    )
}

export async function getStaticProps({ preview = false }) {
  const allPosts = await getAllPosts(preview);
  const title = "Next.js Kontent Benchmark"
  return {
    props: { allPosts, title },
  }
};

import Layout from '../components/layout_1'
import Link from 'next/link'


export default function Index({ articles, title }) {

  return (
    <Layout>
      {title}
      <ul>
        {articles.map(article => (
          <li key={article.slug}>
            <Link href={`./posts/${article.slug}`}><a>{article.title}</a></Link>
          </li>
        ))}
      </ul>
    </Layout>
  )
}

export async function getStaticProps({ preview = false }) {
  const articles = Object.values((await import('../.artifacts/pages.json')).articles);
  const title = "Next.js Kontent Benchmark";
  return {
    props: { articles, title },
  }
};

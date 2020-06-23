import Layout from 'components/layout'
import Head from 'next/head'
import Date from 'components/date'
import utilStyles from 'styles/utils.module.css'
import { GetStaticProps, GetStaticPaths } from 'next'
import { getPerson, getAllPosts, getPost } from 'lib/graph-cms'

export default function Post({
  post,
  person
}: {
  post: {
    title: string
    publishedAt: string
    contentHtml: string
  }
  person: {
    name: string,
    profilePicture: { handle: string, width: number, height: number }
    openGraphImage: { url: string }
    socialMediaProfiles: { socialMedia: string, url: string }[]
  }
}) {
  return (
    <Layout person={person}>
      <Head>
        <title>{post.title}</title>
      </Head>
      <article>
        <h1 className={utilStyles.headingXl}>{post.title}</h1>
        <div className={utilStyles.lightText}>
          <Date dateString={post.publishedAt} />
        </div>
        <div dangerouslySetInnerHTML={{ __html: post.contentHtml }} />
      </article>
    </Layout>
  )
}

export const getStaticPaths: GetStaticPaths = async () => {
  const posts = await getAllPosts()
  return {
    paths: posts.map(post => ({
      params: post
    })),
    fallback: false
  }
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const post = await getPost(params.slug as string)
  const person = await getPerson()
  return {
    props: {
      post,
      person
    }
  }
}

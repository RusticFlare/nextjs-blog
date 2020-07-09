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
    openGraphImage: { url: string }
  }
  person: {
    name: string,
    profilePicture: { handle: string, width: number, height: number }
    socialMediaProfiles: { socialMedia: string, url: string }[]
  }
}) {
  return (
    <Layout
      person={person}
      openGraph={{
        title: post.title + ' by ' + person.name,
        image: post.openGraphImage
      }}
    >
      <Head>
        <title>{post.title}</title>
      </Head>
      <article style={{padding: '0 1rem'}}>
        <h1 className={utilStyles.headingXl}>{post.title}</h1>
        <div className={utilStyles.lightText}>
          <Date dateString={post.publishedAt} />
        </div>
        <div className={utilStyles.blog} dangerouslySetInnerHTML={{ __html: post.contentHtml }} />
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

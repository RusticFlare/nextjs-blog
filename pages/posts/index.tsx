import Head from 'next/head'
import Layout from 'components/layout'
import { getPerson, getAllPosts } from 'lib/graph-cms'
import Contents from 'components/contents'

export default function Posts({ posts, person }) {
  return (
    <Layout
      person={person}
      openGraph={{
        image: person.blogOpenGraphImage
      }}
    >
      <Head>
        <title>{'Posts by ' + person.name}</title>
      </Head>
      <Contents
        contents={posts.map(post => ({
          text: post.title,
          image: post.image,
          href: "/posts/[slug]",
          as: `/posts/${post.slug}`,
        }))}
      />
    </Layout>
  )
}

export async function getStaticProps() {
  const posts = await getAllPosts()
  const person = await getPerson()
  return {
    props: {
      posts,
      person
    }
  }
}

import Head from 'next/head'
import Layout from 'components/layout'
import { getPerson } from 'lib/graph-cms'
import Contents from 'components/contents'
import { title } from 'process'

export default function Home({ person }) {
  return (
    <Layout
      person={person}
      openGraph={{
        image: person.openGraphImage
      }}
      home
    >
      <Head>
        <title>{person.name}</title>
      </Head>
      <Contents
        contents={
          [
            {
              image: person.galleryImage,
              href: "/galleries",
              text: "Gallery",
              publishedAt: null,
            },
            {
              image: person.blogImage,
              href: "/posts",
              text: "Blog",
              publishedAt: null,
            }
          ]
        }
      />
    </Layout>
  )
}

export async function getStaticProps() {
  const person = await getPerson()
  return {
    props: {
      person: person
    }
  }
}

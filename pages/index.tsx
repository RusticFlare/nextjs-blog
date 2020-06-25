import Head from 'next/head'
import Layout from 'components/layout'
import { getPerson } from 'lib/graph-cms'
import Contents from 'components/contents'

export default function Home({ person }) {
  return (
    <Layout person={person} home>
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
            },
            {
              image: person.blogImage,
              href: "/posts",
              text: "Blog",
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

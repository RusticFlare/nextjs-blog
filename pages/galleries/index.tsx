import Head from 'next/head'
import Layout from 'components/layout'
import { getAllGalleries, getPerson } from 'lib/graph-cms'
import Contents from 'components/contents'

export default function Home({ galleries, person }) {
  return (
    <Layout
      person={person}
      openGraph={{
        title: 'Gallery by ' + person.name,
        image: person.galleryOpenGraphImage
      }}
    >
      <Head>
        <title>{person.name}</title>
      </Head>
      <Contents
        contents={galleries.map(gallery => ({
          text: gallery.name,
          image: gallery.image,
          href: "/galleries/[slug]",
          as: `/galleries/${gallery.slug}`,
        }))}
      />
    </Layout>
  )
}

export async function getStaticProps() {
  const galleries = await getAllGalleries()
  const person = await getPerson()
  return {
    props: {
      galleries: galleries,
      person: person
    }
  }
}

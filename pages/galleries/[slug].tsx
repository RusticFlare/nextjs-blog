import Head from 'next/head'
import Layout from 'components/layout'
import ImageGallery from "components/image-gallery"
import { getGallery, getAllGalleries, getPerson } from 'lib/graph-cms'
import { GetStaticProps, GetStaticPaths } from 'next'

export default function Gallery({ gallery, person }) {
  return (
    <Layout
      person={person}
      openGraph={{
        image: gallery.openGraphImage
      }}
      wide
    >
      <Head>
        <title>{gallery.name + ' by ' + person.name}</title>
      </Head>
      <ImageGallery photos={gallery.images} />
    </Layout>
  )
}

export const getStaticPaths: GetStaticPaths = async () => {
  const galleries = await getAllGalleries()
  return {
    paths: galleries.map(gallery => ({
      params: gallery
    })),
    fallback: false
  }
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const person = await getPerson()
  const gallery = await getGallery(params.slug as string)
  return {
    props: {
      gallery,
      person
    }
  }
}

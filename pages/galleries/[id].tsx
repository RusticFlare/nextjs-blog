import Head from 'next/head'
import Layout, { siteTitle } from 'components/layout'
import ImageGallery from "components/image-gallery"
import { getAllPhotos, getAllGalleryIds, getPerson } from 'lib/graph-cms'
import { GetStaticProps, GetStaticPaths } from 'next'

export default function Gallery({ photos, person }) {
  return (
    <Layout person={person}>
      <Head>
        <title>A Gallery</title>
      </Head>
      <ImageGallery photos={photos} />
    </Layout>
  )
}

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = await getAllGalleryIds()
  return {
    paths,
    fallback: false
  }
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const person = await getPerson()
  const photos = await getAllPhotos(params.id as string)
  return {
    props: {
      photos,
      person
    }
  }
}

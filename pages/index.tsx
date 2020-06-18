import Head from 'next/head'
import Layout, { siteTitle } from 'components/layout'
import ImageGallery from "components/image-gallery"
import { getAllPhotos } from 'lib/graph-cms'

export default function Home({ photos }) {
  return (
    <Layout home>
      <Head>
        <title>{siteTitle}</title>
      </Head>
      <ImageGallery photos={photos} />
    </Layout>
  )
}

export async function getStaticProps() {
  const photos = await getAllPhotos()
  return {
    props: {
      photos: photos
    }
  }
}

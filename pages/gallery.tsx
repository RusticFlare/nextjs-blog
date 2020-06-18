import Layout from 'components/layout'
import ImageGallery from 'components/image-gallery'
import Head from 'next/head'
import { getAllPhotos } from 'lib/unsplash'

export default function GalleryPage({ allPhotosData }) {
  return (
    <Layout>
      <Head>
        <title>Gallery</title>
      </Head>
      <ImageGallery photos={allPhotosData} />
    </Layout>
  )
}

export async function getStaticProps() {
  const allPhotosData = await getAllPhotos()
  return {
    props: {
      allPhotosData: allPhotosData
    }
  }
}

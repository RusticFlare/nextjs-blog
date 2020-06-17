import Layout from 'components/layout'
import ImageGallery from 'components/image-gallery'
import Head from 'next/head'
import { getAllPhotos } from 'lib/photos'

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
  const allPhotosData = getAllPhotos()
  return {
    props: {
      allPhotosData: allPhotosData
    }
  }
}

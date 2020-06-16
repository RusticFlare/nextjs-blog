import Layout from '../components/layout'
import Head from 'next/head'
import Gallery from "react-photo-gallery";
import { getAllPhotos } from '../lib/photos'

export default function GalleryPage({allPhotosData}) {
  return (
    <Layout>
      <Head>
        <title>Gallery</title>
      </Head>
      <Gallery photos={allPhotosData} />
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

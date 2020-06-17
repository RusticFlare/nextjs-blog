import Head from 'next/head'
import Layout, { siteTitle } from 'components/layout'
import ImageGallery from "components/image-gallery"
import { getAllPhotos } from 'lib/photos'

export default function Home({ allPhotosData }) {
  return (
    <Layout home>
      <Head>
        <title>{siteTitle}</title>
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

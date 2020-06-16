import Head from 'next/head'
import Layout, { siteTitle } from '../components/layout'
import Gallery from "react-photo-gallery"
import { getAllPhotos } from '../lib/photos'

export default function Home({ allPhotosData }) {
  return (
    <Layout home>
      <Head>
        <title>{siteTitle}</title>
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

import Head from 'next/head'
import Layout, { siteTitle } from 'components/layout'
import { getAllGalleries } from 'lib/graph-cms'
import GraphImage from 'graphcms-image'
import Link from 'next/link'

export default function Home({ galleries }) {
  return (
    <Layout home>
      <Head>
        <title>{siteTitle}</title>
      </Head>
      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          margin: '0 auto',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        {galleries.map(gallery => (
          <Link href="/galleries/[id]" as={`/galleries/${gallery.id}`} >
            <a>
              <GraphImage
                image={gallery.image}
                maxWidth={500}
                style={{
                  width: '18rem',
                  height: '18rem',
                  margin: '32px 16px',
                }}
              />
            </a>
          </Link>
        ))}
      </div>
    </Layout>
  )
}

export async function getStaticProps() {
  const galleries = await getAllGalleries()
  return {
    props: {
      galleries: galleries
    }
  }
}

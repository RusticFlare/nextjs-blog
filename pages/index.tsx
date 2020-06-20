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
              <div 
                style={{
                  position: 'relative',
                  width: '18rem',
                  height: '18rem',
                  margin: '32px 16px',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <GraphImage
                  image={gallery.image}
                  maxWidth={500}
                  style={{
                    width: '18rem',
                    height: '18rem',
                  }}
                />
                <h2 
                  style={{
                    color: 'white',
                    position: 'absolute',
                    bottom: '-4rem',
                    left: '1rem',
                    fontSize: '4rem',
                  }}
                >
                  {gallery.name}
                </h2>
              </div>
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

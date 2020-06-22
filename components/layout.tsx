import Head from 'next/head'
import styles from './layout.module.css'
import utilStyles from 'styles/utils.module.css'
import Link from 'next/link'
import GraphImage from 'graphcms-image'
import {SocialMediaIconsReact} from 'social-media-icons-react';

export default function Layout({
  children,
  person ,
  home,
}: {
  children: React.ReactNode
  person: { 
    name: string
    profilePicture: { handle: string, width: number, height: number }
    openGraphImage: { url: string }
  }
  home?: boolean
}) {
  return (
    <div className={styles.container}>
      <Head>
        <link rel="icon" href="/favicon.ico" />
        <meta
          name="description"
          content="Some of my pictures"
        />
        <meta
          property="og:image"
          content={person.openGraphImage.url}
        />
        <meta name="og:title" content={person.name} />
        <meta name="twitter:card" content="summary_large_image" />
      </Head>
      <header className={styles.header}>
        {home ? (
          <div style={{display: 'flex'}}>
            <GraphImage
              image={person.profilePicture}
              className={`${styles.headerHomeImage} ${utilStyles.borderCircle}`}
              alt={person.name}
              maxWidth={400}
            />
            <div style={{display: 'flex', flexDirection: 'column', paddingLeft: '1rem'}}>
              <h1 className={utilStyles.heading2Xl}>{person.name}</h1>
              <SocialMediaIconsReact borderColor="rgba(0,0,0,0)" icon="instagram" iconColor="rgba(0,0,0,1)" backgroundColor="rgba(0,0,0,0)" iconSize="10" url="https://www.instagram.com/james.dudley.baker/" size="20" />
            </div>
          </div>
        ) : (
          <div style={{display: 'flex'}}>
            <Link href="/">
              <a>
                <GraphImage
                  image={person.profilePicture}
                  className={`${styles.headerImage} ${utilStyles.borderCircle}`}
                  alt={person.name}
                  maxWidth={300}
                />
              </a>
            </Link>
            <div style={{display: 'flex', flexDirection: 'column', paddingLeft: '1rem'}}>
              <h2 className={utilStyles.headingLg}>
                <Link href="/">
                  <a className={utilStyles.colorInherit}>{person.name}</a>
                </Link>
              </h2>
              <SocialMediaIconsReact borderColor="rgba(0,0,0,0)" icon="instagram" iconColor="rgba(0,0,0,1)" backgroundColor="rgba(0,0,0,0)" iconSize="10" url="https://www.instagram.com/james.dudley.baker/" size="20" />
            </div>
          </div>
        )}
      </header>
      <main>{children}</main>
      {!home && (
        <div className={styles.backToHome}>
          <Link href="/">
            <a>← Back to home</a>
          </Link>
        </div>
      )}
    </div>
  )
}

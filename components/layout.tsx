import Head from 'next/head'
import Text from 'react'
import styles from './layout.module.css'
import utilStyles from 'styles/utils.module.css'
import Link from 'next/link'
import GraphImage from 'graphcms-image'
import SocialLinks from 'components/social-links'

export default function Layout({
  children,
  person,
  openGraph,
  home,
}: {
  children: React.ReactNode
  person: {
    name: string
    profilePicture: { handle: string, width: number, height: number }
    socialMediaProfiles: { socialMedia: string, url: string }[]
  }
  openGraph: {
    image: { url: string }
  }
  home?: boolean
}) {
  return (
    <div className={styles.container}>
      <Head>
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png"/>
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png"/>
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png"/>
        <link rel="manifest" href="/site.webmanifest"/>
        <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#5bbad5"/>
        <meta name="msapplication-TileColor" content="#ffc40d"/>
        <meta name="theme-color" content="#ffffff"/>
        <meta property="og:image" content={openGraph.image.url}/>
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
          <div style={{display: 'flex', flexDirection: 'column', paddingLeft: '1rem', alignItems: 'center', justifyContent: 'center'}}>
            <h1 className={utilStyles.headingLg} style={{margin: '0'}}>{person.name}</h1>
            <SocialLinks socialMediaProfiles={person.socialMediaProfiles}/>
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
            <div  style={{display: 'flex', flexDirection: 'column', paddingLeft: '1rem', alignItems: 'center', justifyContent: 'center'}}>
              <div  style={{fontWeight: 'bold'}}>
                <Link href="/">
                  <a className={utilStyles.colorInherit}>Home</a>
                </Link>
                {" | "}
                <Link href="/galleries">
                  <a className={utilStyles.colorInherit}>Gallery</a>
                </Link>
                {" | "}
                <Link href="/posts">
                  <a className={utilStyles.colorInherit}>Blog</a>
                </Link>
              </div>
              <h2 className={utilStyles.headingLg} style={{margin: '0'}}>
                <Link href="/">
                  <a className={utilStyles.colorInherit}>{person.name}</a>
                </Link>
              </h2>
              <SocialLinks socialMediaProfiles={person.socialMediaProfiles}/>
            </div>
          </div>
        )}
      </header>
      <main>{children}</main>
    </div>
  )
}

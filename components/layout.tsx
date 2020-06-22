import Head from 'next/head'
import styles from './layout.module.css'
import utilStyles from 'styles/utils.module.css'
import Link from 'next/link'
import GraphImage from 'graphcms-image'
import SocialLinks from 'components/social-links'

export default function Layout({
  children,
  person,
  home,
}: {
  children: React.ReactNode
  person: { 
    name: string
    profilePicture: { handle: string, width: number, height: number }
    openGraphImage: { url: string }
    socialMediaProfiles: { socialMedia: string, url: string }[]
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
            <div style={{display: 'flex', flexDirection: 'column', paddingLeft: '1rem', alignItems: 'center', justifyContent: 'center'}}>
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

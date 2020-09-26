import Date from 'components/date'
import GraphImage from 'graphcms-image'
import Link from 'next/link'

export default function Contents({
  contents
}: {
  contents: {
    image: {
      handle: string
      width: number
      height: number
    }
    href: string
    as?: string
    text: string
    publishedAt: string
  }[]
}) {
  return (<div
    style={{
      display: 'flex',
      flexWrap: 'wrap',
      margin: '0 auto',
      alignItems: 'center',
      justifyContent: 'center',
    }}
  >
    {contents.map(({image, href, as, text, publishedAt}) => (
      <Link href={href} as={as} >
        <a style={{
              position: 'relative',
              width: '100%',
              height: '14rem',
              marginBottom: '16px',
              alignItems: 'center',
              justifyContent: 'center',
        }}>
          <GraphImage
            image={image}
            maxWidth='36rem'
            style={{
              width: '100%',
              height: '14rem',
            }}
            transforms={['modulate=brightness:85']}
          />
          <h2
            style={{
              color: 'white',
              position: 'absolute',
              bottom: '-1rem',
              left: '1rem',
              fontSize: '2rem',
              paddingRight: '1rem',
            }}
          >
            {text}
          </h2>
          {publishedAt ? (
            <h3
              style={{
                color: 'white',
                position: 'absolute',
                bottom: '-0.8rem',
                left: '1rem',
                fontSize: '0.8rem',
                paddingRight: '1rem',
              }}
            >
              <Date dateString={publishedAt} />
            </h3>
            ) : null
          }
        </a>
      </Link>
    ))}
  </div>)
}

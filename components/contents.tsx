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
    {contents.map(({image, href, as, text}) => (
      <Link href={href} as={as} >
        <a style={{
              position: 'relative',
              width: '100%',
              height: '10rem',
              marginBottom: '16px',
              alignItems: 'center',
              justifyContent: 'center',
        }}>
          <GraphImage
            image={image}
            maxWidth='36rem'
            style={{
              width: '100%',
              height: '10rem',
            }}
            transforms={['modulate=brightness:85']}
          />
          <h2
            style={{
              color: 'white',
              position: 'absolute',
              bottom: '-3.5rem',
              left: '1rem',
              fontSize: '4rem',
            }}
          >
            {text}
          </h2>
        </a>
      </Link>
    ))}
  </div>)
}

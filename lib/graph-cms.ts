import { GraphQLClient } from 'graphql-request'
import 'cross-fetch/polyfill'
import remark from 'remark'
import html from 'remark-html'

const graphcms = new GraphQLClient(process.env.GRAPH_CMS_API, { headers: { authorization: `Bearer ${process.env.GRAPH_CMS_TOKEN}`} })

const allPhotosQuery = `
query ($slug: String) {
  gallery(where: {slug: $slug}) {
    name
    images {
      src1600: url(transformation: {image: {resize: {width: 1600, fit: max}}})
      src1024: url(transformation: {image: {resize: {width: 1024, fit: max}}})
      src800: url(transformation: {image: {resize: {width: 800, fit: max}}})
      src500: url(transformation: {image: {resize: {width: 500, fit: max}}})
      width
      height
    }
  }
}
`

export async function getGallery(slug: string) {
  const { gallery } = await graphcms.request(allPhotosQuery, { slug: slug })

  gallery.images.forEach(image => {
    image.src = image.src1600
    image.srcSet = [
      image.src500 + " " + Math.min(500, image.width)  + "w",
      image.src800 + " " + Math.min(800, image.width)  + "w",
      image.src1024 + " " + Math.min(1024, image.width)  + "w",
      image.src1600 + " " + Math.min(1600, image.width)  + "w",
    ]
    image.sizes = ["(min-width: 480px) 50vw,(min-width: 1024px) 33.3vw,100vw"]
  })
  return gallery
}

const postQuery = `
query ($slug: String) {
  post: blogPost(where: {slug: $slug}) {
    title
    content
    publishedAt
  }
}
`

export async function getPost(slug: string) {
  const { post } = await graphcms.request(postQuery, { slug: slug })

  const processedContent = await remark()
    .use(html)
    .process(post.content)
  const contentHtml = processedContent.toString()

  return ({
    contentHtml,
    title: post.title,
    publishedAt: post.publishedAt,
  })
}

const allGalleriesQuery = `
query ($personId: ID) {
  person(where: {id: $personId}) {
    galleries {
      slug
      name
      image: linkImage {
        handle
        width
        height
      }
    }
  }
}
`

export async function getAllGalleries() {
  const { person: { galleries} } = await graphcms.request(allGalleriesQuery, { personId: process.env.PERSON_ID })

  return galleries
}

const allPostsQuery = `
query ($personId: ID) {
  person(where: {id: $personId}) {
    posts: blogPosts {
      title
      slug
      image: linkImage {
        handle
        width
        height
      }
    }
  }
}
`

export async function getAllPosts() {
  const { person: { posts } } = await graphcms.request(allPostsQuery, { personId: process.env.PERSON_ID })

  return posts
}

const profileQuery = `
query ($id: ID) {
  person(where: {id: $id}) {
    name
    profilePicture {
      handle
      width
      height
    }
    openGraphImage {
      url(transformation: {image: {resize: {width: 1200, height: 1200, fit: crop}}})
    }
    socialMediaProfiles {
      socialMedia
      url
    }
    blogImage {
      handle
      width
      height
    }
    galleryImage {
      handle
      width
      height
    }
  }
}
`

export async function getPerson() {
  const { person } = await graphcms.request(profileQuery, { id: process.env.PERSON_ID })

  return person
}

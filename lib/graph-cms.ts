import { GraphQLClient } from 'graphql-request'
import 'cross-fetch/polyfill'
import { env } from 'process'

const graphcms = new GraphQLClient(process.env.GRAPH_CMS_API)

const allPhotosQuery = `
query ($id: String) {
  gallery(where: {urlPath: $id}) {
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

export async function getAllPhotos(id: string) {
  const { gallery } = await graphcms.request(allPhotosQuery, { id: id })

  return gallery.images.map(image => ({
    src: image.src1600,
    srcSet: [
      image.src500 + " " + Math.min(500, image.width)  + "w",
      image.src800 + " " + Math.min(800, image.width)  + "w",
      image.src1024 + " " + Math.min(1024, image.width)  + "w",
      image.src1600 + " " + Math.min(1600, image.width)  + "w",
    ],
    sizes: ["(min-width: 480px) 50vw,(min-width: 1024px) 33.3vw,100vw"],
    width: image.width,
    height: image.height,
  }))
}

const allGalleryIdsQuery = `
{
  galleries {
    id: urlPath
  }
}
`

export async function getAllGalleryIds() {
  const { galleries } = await graphcms.request(allGalleryIdsQuery)

  return galleries.map(gallery => {
    return {
      params: {
        id: gallery.id
      }
    }
  })
}

const allGalleriesQuery = `
{
  galleries {
    id: urlPath
    name
    image: mainImage {
      handle
      width
      height
    }
  }
}
`

export async function getAllGalleries() {
  const { galleries } = await graphcms.request(allGalleriesQuery)

  return galleries
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
  }
}
`

export async function getPerson() {
  const { person } = await graphcms.request(profileQuery, { id: process.env.PERSON_ID })

  return person
}

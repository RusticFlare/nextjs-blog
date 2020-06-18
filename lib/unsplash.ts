import Unsplash, { toJson } from 'unsplash-js'
import 'cross-fetch/polyfill'

const unsplash = new Unsplash({ 
  accessKey: process.env.UNSPLASH_ACCESS_KEY,
});

export async function getAllPhotos() {
  let json = await unsplash.collections.getCollectionPhotos(10746903).then(toJson)
  return json.map(image => ({ 
    src: image.urls.full,
    width: image.width,
    height: image.height,
  }))
}

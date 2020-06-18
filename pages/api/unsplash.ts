import { NextApiRequest, NextApiResponse } from 'next'
import Unsplash, { toJson } from 'unsplash-js'
import 'cross-fetch/polyfill'

const unsplash = new Unsplash({ 
  accessKey: process.env.UNSPLASH_ACCESS_KEY,
});

export default (_: NextApiRequest, res: NextApiResponse) => {
  unsplash.collections.getCollectionPhotos(10746903)
    .then(toJson)
    .then(json => {
      res.status(200).json(json)
    });
}

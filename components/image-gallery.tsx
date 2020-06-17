import Gallery from "react-photo-gallery"

export default function ImageGallery({ photos }: { photos: {
  src: string;
  width: number;
  height: number;
}[] }) {
  return <Gallery photos={photos} />
}

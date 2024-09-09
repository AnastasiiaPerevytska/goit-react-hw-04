import ImageCard from "../ImageCard/ImageCard";
import s from "./ImageGallery.module.css";

export default function ImageGallery({ images, onImageClick }) {
  return (
    <ul className={s.gallery}>
      {images.map((image) => (
        <li key={image.id}>
          <ImageCard image={image} onImageClick={onImageClick} />
        </li>
      ))}
    </ul>
  );
}
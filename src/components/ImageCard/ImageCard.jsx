import s from "./ImageCard.module.css";

export default function ImageCard({ image, onImageClick }) {
  return (
    <div className={s.item}>
      <img
        src={image.urls.small}
        alt={image.alt_description}
        onClick={() => onImageClick(image.urls.regular, image.alt_description)}
        height="240px"
      />
    </div>
  );
}
import css from "./ImageGallery.module.css";
import ImageCard from "./ImageCard/ImageCard";
import { Image } from "../images-api";

interface ImageGalleryProps {
  items: Image[];
  openModal: (image: Image) => void;
}

export default function ImageGallery({ items, openModal }: ImageGalleryProps) {
    return (
        <ul className={css.gallery}>
            {items.map((item) => {
                return (
                    <li key={item.id} onClick={() => openModal(item)}>
                        <ImageCard data={item} />
                    </li>
                );
            })}
        </ul>        
    )
}
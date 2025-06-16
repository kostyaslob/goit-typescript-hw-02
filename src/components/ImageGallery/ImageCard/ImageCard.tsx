import css from "./ImageCard.module.css";
import { Image } from "../../images-api";

interface ImageCardProps {
    data: Image;
}

export default function ImageCard({ data }: ImageCardProps) {
    return (
        <div>
            <img className={css.image} src={data.urls.small} alt={data.alt_description ?? "Image"} />
        </div>
    );
}




import css from "./ErrorMessage.module.css";

export default function ErrorMessage() {
    return (
        <p className={css.message}>Something went wrong. Please try again later.</p>
    );
}
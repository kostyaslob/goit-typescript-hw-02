import css from "./SearchBar.module.css";
import { Field, Form, Formik } from "formik";
import toast from 'react-hot-toast';

interface SearchBarProps {
  onSearch: (topic: string) => void;
}

interface FormValues {
  topic: string;
}

export default function SearchBar({ onSearch }: SearchBarProps) {
    return (
        <Formik
            initialValues={{ topic: "" }}
            onSubmit={(values: FormValues, actions) => {
                const trimmedTopic = values.topic.trim();
                if (trimmedTopic === "") {
                    toast.error("Please enter the text to search!");
                    return;
                }

                onSearch(trimmedTopic);
                actions.resetForm();
            }}
        >
            <Form className={css.form}>
                <Field className={css.field}
                    type="text"
                    name="topic"
                    placeholder="Search images and photos"                    
                    />
                <button className={css.button} type="submit">Search</button>
            </Form>
        </Formik>
    );
}
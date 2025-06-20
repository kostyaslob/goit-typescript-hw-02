import css from "./App.module.css";
import { useState, useEffect } from 'react';
import { fetchImages, Image, ImageResult } from "../images-api";
import toast, { Toaster } from 'react-hot-toast';

import SearchBar from "../SearchBar/SearchBar";
import ImageGallery from "../ImageGallery/ImageGallery";
import Loader from "../Loader/Loader";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import LoadMoreBtn from "../LoadMoreBtn/LoadMoreBtn";
import ImageModal from "../ImageModal/ImageModal";

export default function App() {
  const [images, setImages] = useState<Image[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);
  const [totalPages, setTotalPages] = useState<number>(0);
  
  const [topic, setTopic] = useState<string>("");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [selectedImage, setSelectedImage] = useState<Image | null>(null);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const handleSearch = async (newTopic: string) => {
    setTopic(newTopic);
    setCurrentPage(1);
    setImages([]);
  };

  const incrementPage = () => {
    setCurrentPage(currentPage + 1)
  }

  const openModal = (image: Image) => {
    setSelectedImage(image);
    setIsModalOpen(true);
  }

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedImage(null)
  }

  useEffect(() => {
    if (topic === "") {
      return
    }

    async function fetchData() {
      try {
        setIsError(false);
        setIsLoading(true);
        const data: ImageResult = await fetchImages(topic, currentPage);

        if (data.results.length === 0 && currentPage === 1) {
          toast.error("No results found for your search query.");
        }

        setImages((prevImages) => {
          return [...prevImages, ...data.results];
        })
        setTotalPages(data.total_pages);

      } catch {
        setIsError(true);
        toast.error("Something went wrong. Please try later.");
      } finally {
        setIsLoading(false);
      }
    }
    fetchData();
  }, [topic, currentPage])

  const isLastPage = currentPage === totalPages;
  const hasImages = images.length > 0;
 
  return (
    <div className={css.container}>
      <Toaster position="top-right"/>
      <SearchBar onSearch={handleSearch} />
      {isError && <ErrorMessage />}
      {hasImages && <ImageGallery items={images} openModal={openModal} />}
      {isLoading && <Loader />}
      {hasImages && !isLoading && !isLastPage && <LoadMoreBtn onClick={incrementPage} />}
      {selectedImage && (<ImageModal
        isOpen={isModalOpen}
        onClose={closeModal}
        image={selectedImage}
      />
      )}    
    </div>
  );
}

import axios from "axios";

const ACCESS_KEY = "dhtOVxmu7cu8PZgWuDAWjUcuIGInl6fXWobQbH4YkWM";
axios.defaults.baseURL = "https://api.unsplash.com";

export interface Image {
  id: string;
  alt_description: string | null;
  urls: {
    small: string;
    regular: string;
  };
}

export interface ImageResult {
  results: Image[];
  total: number;
  total_pages: number;
}

export const fetchImages = async (topic: string, currentPage: number): Promise<ImageResult> => {
    const response = await axios.get<ImageResult>(`/search/photos`, {
          params: {
            page: currentPage,
            query: topic,
            per_page: 8,
            client_id: ACCESS_KEY
          }
    })
  return response.data  
}   
import { useEffect, useState } from "react";
import "./App.css";
import { fetchData } from "./services/api";
import Keys from "./services/ApiKEY.json";
import ImageGallery from "./components/ImageGallery/ImageGallery";
import SearchBar from "./components/SearchBar/SearchBar";
import Loader from "./components/Loader/Loader";
import ErrorMessage from "./components/ErrorMessage/ErrorMessage";
import LoadMoreBtn from "./components/LoadMoreBtn/LoadMoreBtn";
import ImageModal from "./components/ImageModal/ImageModal";
import toast, { Toaster } from "react-hot-toast";


export default function App() {
  const [images, setImages] = useState([]);
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [error, setError] = useState(null);
  const [modalData, setModalData] = useState({ isOpen: false, url: "", alt: "" });
  const [isLoadMoreVisible, setIsLoadMoreVisible] = useState(false);

  const handleSearchSubmit = (searchQuery) => {
    if (!searchQuery) {
      toast.error("Please enter a query");
      return;
    }
    setQuery(searchQuery);
    setImages([]);
    setPage(1);
    setError(null);
    setLoading(true);
  };

  useEffect(() => {
    if (query) {
      const fetchDatas = async () => {
        try {
          const ApiKey = Keys.ApiKey;
          const response = await fetchData(ApiKey, query, page);
          setImages((prevImages) => [...prevImages, ...response.results]);
          setIsLoadMoreVisible(page < response.total_pages);
        } catch {
          toast.error("Error fetching data. Please try again.");
          setError("Error fetching data. Please try again.");
        } finally {
          setLoading(false);
        }
      };
      fetchDatas();
    }
  }, [query, page]);

  const loadMoreImages = () => {
    setPage((prevPage) => prevPage + 1);
  };

  const openModal = (url, alt) => {
    setModalData({ isOpen: true, url, alt });
  };

  const closeModal = () => {
    setModalData({ isOpen: false, url: "", alt: "" });
  };

  return (
    <div>
      <SearchBar onSubmit={handleSearchSubmit} />
      <Toaster />
      {loading && <Loader />}
      {error && <ErrorMessage message={error} />}
      <ImageGallery images={images} onImageClick={openModal} />
      {isLoadMoreVisible && <LoadMoreBtn onLoadMore={loadMoreImages} />}
      {modalData.isOpen && (
        <ImageModal
          isOpen={modalData.isOpen}
          url={modalData.url}
          alt={modalData.alt}
          onClose={closeModal}
        />
      )}
    </div>
  );
}



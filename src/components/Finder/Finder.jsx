import { useState, useEffect } from "react";
import { ToastContainer, toast } from 'react-toastify';
import { searchImages } from '../../shared/api/images';

import { Searchbar } from "./Searchbar/Searchbar";
import { ImageGallery } from "./ImageGallery/ImageGallery";
import { Button } from "./Button/Button";
import { Loader } from "./Loader/Loader";
import { Modal } from "./Modal/Modal";

export const Finder = () => {
    const [items, setItems] = useState([]);
    const [searchInput, setSearchInput] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [page, setPage] = useState(1);
    const [totalQuantity, setTotalQuantity] = useState(0);
    const [total, setTotal] = useState(0);
    const [modal, setModal] = useState(false);
    const [dataModal, setDataModal] = useState({});
    
    const onModalClose = (e) => {
        if (e.currentTarget === e.target || e.code === 'Escape') {
            setModal(false)
            document.removeEventListener('click', onModalClose)
            document.removeEventListener('keydown', onModalClose)
        }
    }

    const onModalOpen = (id) => {
        const imageToOpen = items.find(item => item.id === id);

        setModal(true)
        setDataModal(imageToOpen)

        document.addEventListener('click', onModalClose)
        document.addEventListener('keydown', onModalClose)
    }

    const onLoadMoreClick = () => {
        setPage(prev => prev + 1)
    }

    useEffect(() => {
        if (searchInput === '') {
            return
        }

        const fetchImages = async () => {
        setLoading(true)

        try {
            const data = await searchImages(searchInput, page);
            
            if (data.totalHits === 0) {
                return toast(`Sorry, we hadn't found images for "${searchInput}", please, enter another query :)`)
            }

            setItems(prev => [...prev, ...data.hits])
            setTotalQuantity(prev => prev + 12)
            setTotal(data.totalHits)

        } catch (error) {
            setError(error)
        }
        finally {
            setLoading(false)
        }
    }
        fetchImages();
    }, [searchInput, page])

    const handleFormSubmit = input => {
        if (input !== searchInput) {
            setItems([])
            setSearchInput(input)
            setPage(1)
            setTotalQuantity(0)
            setTotal(0)
        }
    }

    const loadMore = totalQuantity < total && loading === false && items.length > 0;
    const isData = Boolean(items.length);
    
    return <>
        <Searchbar onSubmit={handleFormSubmit} />
        {error && <p>Oops! Something went wrong :( Please, reload page and try again</p>}
        {isData && <ImageGallery modalOpen={onModalOpen} data={items} />}
        {loadMore && <Button onClick={onLoadMoreClick} />}
        {loading && <Loader />}
        {modal && <Modal data={dataModal} onClose={onModalClose} />}
        <ToastContainer autoClose={2000}/>
    </>
}
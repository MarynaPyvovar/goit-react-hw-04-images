import React, { Component } from "react";
import { ToastContainer, toast } from 'react-toastify';
import { searchImages } from '../../shared/api/images';

import Searchbar from "./Searchbar/Searchbar";
import {ImageGallery} from "./ImageGallery/ImageGallery";
import {Button} from "./Button/Button";
import {Loader} from "./Loader/Loader";
import { Modal } from "./Modal/Modal";

export default class Finder extends Component {
    state = {
        items: [],
        searchInput: '',
        loading: false,
        error: null,
        page: 1,
        totalQuantity: 0,
        loadMore: false,
        modal: false,
        dataModal: {},
    }

    onModalOpen = (id) => {
        const imageToOpen = this.state.items.find(item => item.id === id);
        
        this.setState({
            modal: true,
            dataModal: imageToOpen,
        })
        document.addEventListener('click', this.onModalClose)
        document.addEventListener('keydown', this.onModalClose)
    }

    onModalClose = (e) => {
        if (e.currentTarget === e.target || e.code === 'Escape') {
            this.setState({modal: false,})
            document.removeEventListener('click', this.onModalClose)
            document.removeEventListener('keydown', this.onModalClose)
        }
    }

    onLoadMoreClick = () => {
        this.setState(({ page }) => {
            return {
                page: page + 1
            }
        })
    }

    componentDidUpdate(_, prevState) {
        if (prevState.searchInput !== this.state.searchInput || prevState.page !== this.state.page) {
            this.fetchImages();
        }
    }

    handleFormSubmit = input => {
        if (input !== this.state.searchInput) {
            this.setState({
                items: [],
                searchInput: input,
                page: 1,
                totalQuantity: 0,
                loadMore: false
        });
        }
    }

    fetchImages = async () => {
        const { searchInput, page, totalQuantity } = this.state;
        this.setState({loading: true});

        try {
            const data = await searchImages(searchInput, page);
            
            if (data.totalHits === 0) {
                return toast(`Sorry, we hadn't found images for "${searchInput}", please, enter another query :)`)
            }

            const newTotalCount = totalQuantity + 12;
            this.setState(({items}) => {
                return {
                    items: [...items, ...data.hits],
                    totalQuantity: newTotalCount,
                }
            })
            
            if (newTotalCount < data.totalHits) {
                this.setState({loadMore: true})
            } else {
                this.setState({loadMore: false})
            }

        } catch (error) {
            this.setState({error})
        }
        finally {
            this.setState({loading: false})
        }
    }

    render() {
        const { items, modal, loading, loadMore, dataModal, error } = this.state;
        const { handleFormSubmit, onModalOpen, onLoadMoreClick, onModalClose } = this;
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
}
import React, { useState } from "react";
import PropTypes from "prop-types";
import { FaSearch } from 'react-icons/fa';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import css from "../Searchbar/Searchbar.module.css";

export const Searchbar = ({onSubmit}) => {
    const [searchInput, setSearchInput] = useState('')

    const handleChange = (e) => {
        setSearchInput(e.target.value)
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        
        if (searchInput.trim() === '') {
            return toast("Enter your search query :)");
        }
        onSubmit(searchInput.trim())
    }

    return <><header class={css.header}>
        <form className={css.searchForm} onSubmit={handleSubmit}>
            <button type="submit" className={css.searchFormButton}>
                <FaSearch />
            </button>
            <input
                onChange={handleChange}
                className={css.searchFormInput}
                type="text"
                name='searchInput'
                value={searchInput}
                autoComplete="off"
                autoFocus
                placeholder="Search images and photos"
            />
        </form>
    </header>
    </>
}

Searchbar.propTypes = {
    onSubmit: PropTypes.func.isRequired,
}
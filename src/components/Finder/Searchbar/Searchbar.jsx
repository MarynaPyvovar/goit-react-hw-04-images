import React, { Component } from "react";
import PropTypes from "prop-types";
import { FaSearch } from 'react-icons/fa';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import css from "../Searchbar/Searchbar.module.css";

export default class Searchbar extends Component {
    state = {
        searchInput: '',
    }

    handleChange = (e) => {
        this.setState({
            searchInput: e.target.value,
        })
    }

    handleSubmit = (event) => {
        event.preventDefault();
        const { searchInput } = this.state;
        
        if (searchInput.trim() === '') {
            return toast("Enter your search query :)");
        }
        this.props.onSubmit(searchInput.trim())
    }

    render() {
        const { searchInput } = this.state;
        return <><header class={css.header}>
            <form className={css.searchForm} onSubmit={this.handleSubmit}>
                <button type="submit" className={css.searchFormButton}>
                    <FaSearch />
                </button>
                <input
                    onChange={this.handleChange}
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
}

Searchbar.propTypes = {
    onSubmit: PropTypes.func.isRequired,
}
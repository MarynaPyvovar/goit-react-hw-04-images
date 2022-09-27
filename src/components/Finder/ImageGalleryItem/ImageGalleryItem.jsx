import React from "react";
import PropTypes from "prop-types";
import css from "../ImageGalleryItem/ImageGalleryItem.module.css";

export const ImageGalleryItem = ({modalOpen, data}) => {
    return <div className={css.imageGalleryItem} onClick={()=> modalOpen(data.id)}>
        <img className={css.imageGalleryItemImage} src={data.webformatURL} alt={data.tags} />
    </div>
}

ImageGalleryItem.propTypes = {
    modalOpen: PropTypes.func.isRequired,
    data: PropTypes.shape({
        id: PropTypes.number.isRequired,
        webformatURL: PropTypes.string.isRequired,
        tags: PropTypes.string.isRequired,
    }),
}
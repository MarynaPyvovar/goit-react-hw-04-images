import React from "react";
import PropTypes from "prop-types";
import { ImageGalleryItem } from "../ImageGalleryItem/ImageGalleryItem";
import css from "../ImageGallery/ImageGallery.module.css";

export const ImageGallery = ({ modalOpen, data }) =>
    <ul className={css.imageGallery}>
        {data.map(item => <li key={item.id}>
                <ImageGalleryItem modalOpen={modalOpen} data={item} />
            </li>
        )}
    </ul>

ImageGallery.propTypes = {
    data: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.number.isRequired,
    })),
}
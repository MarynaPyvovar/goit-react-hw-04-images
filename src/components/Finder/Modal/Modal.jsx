import React from "react";
import PropTypes from "prop-types";
import css from "../Modal/Modal.module.css"

export const Modal = ({ data, onClose }) =>
    <div className={css.overlay} onClick={(e) => onClose(e)}>
        <div className={css.modal}>
            <img src={data.largeImageURL} alt={data.tags} />
        </div>
    </div>

Modal.propTypes = {
    data: PropTypes.shape({
        largeImageURL: PropTypes.string.isRequired,
        tags: PropTypes.string.isRequired,
    }),
    onClose: PropTypes.func.isRequired,
}
import React from 'react';
import './Botao.css';

const Botao = ({ onClick, children, className }) => {
    return (
        <button onClick={onClick} className={`btn ${className}`}>
            {children}
        </button>
    );
};

export default Botao;

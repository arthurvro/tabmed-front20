import React, { useEffect } from 'react';
import Modal from 'react-modal';
import './ModalComponent.css';

Modal.setAppElement('#root');

const ModalComponent = ({ isOpen, onRequestClose, contentLabel, children }) => {
    useEffect(() => {
        if (isOpen) {
            document.body.classList.add('modal-open');
        } else {
            document.body.classList.remove('modal-open');
        }
        return () => {
            document.body.classList.remove('modal-open');
        };
    }, [isOpen]);

    return (
        <Modal
            isOpen={isOpen}
            onRequestClose={onRequestClose}
            contentLabel={contentLabel}
            className="custom-modal"
            overlayClassName="custom-modal-overlay"
        >
            <button className="close-button" onClick={onRequestClose}>X</button>
            {children}
        </Modal>
    );
};

export default ModalComponent;


// import React from 'react';
// import Modal from 'react-modal';
// import './ModalComponent.css';

// Modal.setAppElement('#root');

// const ModalComponent = ({ isOpen, onRequestClose, contentLabel, children }) => {
//     return (
//         <Modal
//             isOpen={isOpen}
//             onRequestClose={onRequestClose}
//             contentLabel={contentLabel}
//             className="custom-modal"
//             overlayClassName="custom-modal-overlay"
//         >
//             <button className="close-button" onClick={onRequestClose}>X</button>
//             {children}
//         </Modal>
//     );
// };

// export default ModalComponent;

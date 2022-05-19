import React from 'react';
import ReactDOM from 'react-dom';
import './modalBackgraund.css';


function Modal({children}){
    return ReactDOM.createPortal(
        <div className="modalBackgraund">
            {children}
        </div>,
        document.getElementById('modal')
    );
}
export {Modal};
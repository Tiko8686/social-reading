import React, { useState } from 'react'
import "./Unauthorized.css"
export function Unauthorized() {
    const [modalUnauthorized, setModalUnauthorized] = useState(false);
    const toggleModalUnauthorized = () => {
        setModalUnauthorized(!modalUnauthorized);
    };
    return (
        <div>
            <button onClick={toggleModalUnauthorized} className="btn-modal btn-modal-unauthorized bi bi-cloud-upload">
                &nbsp;&nbsp;Upload
            </button>
            {modalUnauthorized &&
                <div>
                    <div className='overlayUnauthorized' onClick={toggleModalUnauthorized}></div>
                    <div className='modalUnauthorized'  onClick={toggleModalUnauthorized}><p className='err'>Sign Up before uploading something!</p></div>
                </div>
            }
        </div>
    )
}
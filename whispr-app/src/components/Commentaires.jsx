import React from 'react';

const Commentaires = (props) => {
    return (
        <div className="img-bloc">
            <button className="btn-com"></button>
            <p>{props.nbCommentaires}</p>
        </div>
    );
};

export default Commentaires;
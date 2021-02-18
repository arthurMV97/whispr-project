import React from 'react';

const Favoris = (props) => {
    return (
        <div className="img-bloc">
            <button className="btn-fav"></button>
            <p>{props.nbFavoris}</p>
        </div>
    );
};

export default Favoris;
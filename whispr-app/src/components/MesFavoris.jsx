import React from 'react';
import SinglePost from './SinglePoste'

const MesFavoris = (props) => {
    return (
        <div>
            {props.favoris.map((element, index) => {
                element.index = index
                return <SinglePost dataFromParent = {element} key={index}/>
                                })}
        </div>
    );
};

export default MesFavoris;
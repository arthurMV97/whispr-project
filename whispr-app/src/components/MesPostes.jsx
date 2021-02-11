import React from 'react';
import SinglePost from './SinglePoste'

const MesPostes = (props) => {

    return (
        <div>
            {props.postes.map((element, index) => {
                element.index = index
                return <SinglePost dataFromParent = {element} key={index}/>
                                })}
        </div>
    );
};

export default MesPostes;
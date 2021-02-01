import React from 'react';
import ProfileResume from './ProfileResume';

const Decouvrir = (props) => {
    return (
        <div>
            <ProfileResume displayUserData = {props.displayUserData}/>
        </div>
    );
};

export default Decouvrir;
import React, {useState, useEffect, useCallback} from 'react';
import SinglePost from './SinglePoste'

const MesPostes = (props) => {

    const [postesState, setPostes] = useState([])
    const [, updateState] = useState();
    const forceUpdate = useCallback(() => updateState({}), []); //Permet de forcer l'update

    const deletePost = (i) => {
        console.log(i)
        let newState = postesState
        newState.splice(i, 1)
        console.log(newState);
        setPostes(newState)
        forceUpdate()
        console.log(postesState)
    }

    useEffect(() => {
        setPostes(props.postes)

    })

    return (
        <div>
            {postesState.map((element, index) => {
                element.index = index
                return <SinglePost deleteThePost= {deletePost} dataFromParent= {element} key={`${element.nom}-${index}-${Math.random()}`}/>
                                })}
        </div>
    );
};

export default MesPostes;
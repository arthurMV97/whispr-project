import React, {useState, useEffect} from 'react';
import SinglePost from './SinglePoste'

const MesPostes = (props) => {

    const [postesState, setPostes] = useState([])
    const [, updateState] = useState();

    const deletePost = (i) => {
        console.log(i)
        let newState = postesState
        newState.splice(i, 1)
        console.log(newState);
        setPostes(newState)
        console.log(postesState)
    }

    useEffect(() => {
        setPostes(props.postes)

    }, [props.postes])

    return (
        <div>
            {props.postes.map((element, index) => {
                if (props.user) {
                    element.nom = props.user.nom
                    element.prenom = props.user.prenom

                }
                element.postIndex = index
                return <SinglePost key={`${element.nom}-${index}-${Math.random()}`} deleteThePost= {deletePost} dataFromParent= {element} />
                                })}
        </div>
    );
};

export default MesPostes;
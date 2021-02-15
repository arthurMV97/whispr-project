import axios from 'axios';
import React, {useState, useEffect} from 'react';
import { useParams } from 'react-router-dom';

import SingleUser from './SingleUser'


const PopUpAbonnements = ({bool, closePopUp}) => {
    const [boolState, setBool] = useState(bool)
    const [abonnementsState, setAbonnements] = useState([])
    const [abonnesState, setAbonnes] = useState([])

    const { id } = useParams()

    useEffect(() => {
        axios.get(`http://localhost:8080/abonnements/${id}`)
        .then(res => {
            setAbonnements(res.data);
        })
        
        axios.get(`http://localhost:8080/abonnes/${id}`)
        .then(res => {
            setAbonnes(res.data);


        })
    }, [id])

    const closeFct = () => {
        closePopUp(false, bool)
    }

    const toggleData = (boo) => {
        setBool(boo)
    }
    return (
        <div className="pop-up">
            <div className="nav-btn">
            <button onClick={() => toggleData(true)} className={boolState ? "clicked" : null} >Mes abonnements</button> 
            <button onClick={() => toggleData(false)} className={!boolState ? "clicked" : null}>Mes abonnés</button>
            </div>
            <div className="user-list">
                {boolState ?
                abonnementsState.map(e => {
                        return (<SingleUser data={e} key={e.id} autoClose={closeFct} />)
                    }):
                abonnesState.map(e => {
                        return (<SingleUser data={e} key={e.id} autoClose={closeFct}/>)
                })
                }
            </div>
        <div className="close-part">
            <button onClick={() => closeFct()} className="empty-btn close-btn">Close</button>

        </div>
        </div>
    );
};

export default PopUpAbonnements;
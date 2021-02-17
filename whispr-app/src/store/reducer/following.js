const initialState = {
    nbAbonnements: 0,
    nbAbonnes: 0,
    abonnements: [],
    abonnes: []
}

const abonnementStore = (state = initialState, action) => {
    switch(action.type) {
        case 'CONNECT':
            return {
                ...state,
                abonnements: action.abonnements,
                abonnes: action.abonnes,
                nbAbonnements: action.nbAbonnements,
                nbAbonnes: action.nbAbonnes
            }
        case 'FOLLOW': 
            console.log(action);
            let abon = state.abonnements
            abon.push(action.id)
            let nbAbon = abon.length
            return {
                    ...state,
                    abonnements: abon,
                    nbAbonnements: nbAbon,
                     };
        case 'UNFOLLOW': 
                 console.log(action);
                let abonn = state.abonnements
                abonn.splice(abonn.findIndex(e => e === action.id), 1)
                let nbAbonn = abonn.length

            return {...state, 
                abonnements: abonn,
                nbAbonnements: nbAbonn};

        default:
            return state
    }
}

export default abonnementStore
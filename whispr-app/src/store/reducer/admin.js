const initialState = {
    isLogged: false,
    identifiant: '',
    id: null,
    statut: '',
    nom: '',
    prenom: '',
    token: ''
}

const adminStore = (state = initialState, action) => {
    switch(action.type) {
        case 'ADMIN_LOGIN':
            return {
                ...state,
                isLogged: true,
                identifiant: action.identifiant,
                id: action.id,
                statut: action.statut,
                token: action.token
            }
        case 'ADMIN_SIGNOUT': 
            return initialState;

        default:
            return state
    }
}

export default adminStore
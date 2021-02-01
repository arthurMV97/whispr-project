const initialState = {
    isLogged: false,
    email: '',
    id: null,
    image: '',
    nom: '',
    prenom: '',
    token: ''
}

const userStore = (state = initialState, action) => {
    switch(action.type) {
        case 'USER_LOGIN':
            return {
                ...state,
                isLogged: true,
                email: action.email,
                id: action.id,
                image: action.image,
                token: action.token,
                nom: action.nom,
                prenom: action.prenom
            }
        case 'USER_SIGNOUT': 
            return initialState;

        default:
            return state
    }
}

export default userStore
const initialState = {
    isLogged: false,
    isAdmin: false,
    email: '',
    id: null,
    image: '',
    token: ''
}

const userStore = (state = initialState, action) => {
    switch(action.type) {
        case 'USER_LOGIN':
            return {
                isLogged: true,
                isAdmin: action.isAdmin,
                email: action.email,
                id: action.id,
                image: action.image,
                token: action.token
            }
        case 'USER_SIGNOUT': 
            return initialState;

        default:
            return state
    }
}

export default userStore
const initialState = {
    email: '',
    id: null,
    image: '',
    token: ''
}

const userStore = (state = initialState, action) => {
    switch(action.type) {
        case 'USER_LOGIN':
            return {
                email: action.email,
                id: action.id,
                image: action.image,
                token: action.token
            }
        case 'USER_SIGNOUT': 
            return initialState;
    }
}

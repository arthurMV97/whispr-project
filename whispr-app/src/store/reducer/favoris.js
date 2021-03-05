const initialState = {
    favorisIds: []
}

const favorisStore = (state = initialState, action) => {
    switch(action.type) {
        case 'CONNECTION':
            return {
                ...state,
                favorisIds: action.favorisIds
            }
        case 'ADD_FAV': 
            console.log(action);
            let favoris = state.favorisIds
            favoris.push(action.postId)
            return {
                    ...state,
                    favorisIds: favoris
                     };
        case 'DELETE_FAV': 
                 console.log(action);
                let otherFavoris = state.favorisIds
                otherFavoris.splice(otherFavoris.findIndex(e => e === action.postId), 1)

            return {...state, 
                favorisIds: otherFavoris};

        default:
            return state
    }
}

export default favorisStore
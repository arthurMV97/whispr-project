export const sendFav = (data) => {
    console.log('ation', data);

    return {
        type: 'CONNECTION',
        favorisId: data.favorisIds
    }
}

export const likePost = (id) => {
    console.log(id);

    return {type: 'ADD_FAV',
            postId: id
            }
}

export const unlikePost = (id) => {
    console.log(id);
    return {type: 'DELETE_FAV',
            postId: id
            }
}
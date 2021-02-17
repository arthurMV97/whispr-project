export const sendFollowers = (data) => {
    return {
        type: 'CONNECT',
        nbAbonnements: data.nbAbonnements,
        nbAbonnes: data.nbAbonnes,
        abonnements: data.abonnements,
        abonnes: data.abonnes
    }
}

export const followingUser = (id) => {
    console.log(id);

    return {type: 'FOLLOW',
            id: id
            }
}

export const unfollowingUser = (id) => {
    console.log(id);
    return {type: 'UNFOLLOW',
            id: id
            }
}
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
    return {type: 'FOLLOW',
            idToPush: id
            }
}

export const unfollowingUser = (id) => {
    return {type: 'UNFOLLOW',
            idToDelete: id
            }
}
export const adminData = (data) => {
    return {
        type: 'ADMIN_LOGIN',
        identifiant: data.identifiant,
        id: data.id,
        statut: data.statut,
        nom: data.nom,
        prenom: data.prenom,
        token: data.token,
    }
}

export const adminSignOut = () => {
    return {type: 'ADMIN_SIGNOUT'}
}
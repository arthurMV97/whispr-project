export const userData = (data) => {
    return {
        type: 'USER_LOGIN',
        email: data.email,
        id: data.id,
        image: data.image,
        token: data.token,
    }
}

export const userSignOut = () => {
    return {type: 'USER_SIGNOUT'}
}
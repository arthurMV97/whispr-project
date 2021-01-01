import React from 'react';

const Connexion = () => {
    return (
        <div>
            <h1>Connexion</h1>
            <form action="">
                <label for="email">Entrez votre email: </label>
                <input type="email" name="email" id="email" required />
                <label for="password">Entrez votre mot de passe: </label>
                <input type="password" name="password" id="password" required />
            </form>
        </div>
    );
};

export default Connexion;
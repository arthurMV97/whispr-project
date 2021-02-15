import React from 'react';

const ModifyProfile = (props) => {

    const close = () =>  {
        props.closeModif(false)
    }

    const handleSubmit = () => {
        console.log('foo');
    }
    const handleChange = () => {
        console.log('foo');

    }
    return (
        <div className="pop-up">
            <button className="empty-btn" onClick={() => close()}>X</button>
            <h3>Modifier le profil</h3>

            <div>
            <form onSubmit={handleSubmit} >
                <input type="text" name="image" id="image" placeholder="Photo de profil" onChange={handleChange} required />

                <input type="text" name="nom" id="nom" placeholder="Nom" onChange={handleChange} required />
                {/* <p className={state.nom.valid ? 'valid-input' : 'not-valid-input'}>{state.nom.msg}</p> */}
                <input type="text" name="prenom" id="prenom" placeholder="Prénom" onChange={handleChange} required />
                {/* <p className={state.prenom.valid ? 'valid-input' : 'not-valid-input'}>{state.prenom.msg}</p> */}
                <input type="text" name="description" id="description" placeholder="description" onChange={handleChange} required />

                <input type="date" name="date" id="date" className="date" onChange={handleChange} required />
                {/* <p className={state.date.valid ? 'valid-input' : 'not-valid-input'}>{state.date.msg}</p> */}
                <input type="email" name="email" id="email" placeholder="Email*" onChange={handleChange} required />
                {/* <p className={state.email.valid ? 'valid-input' : 'not-valid-input'}>{state.email.msg}</p> */}
                <input type="password" name="password" id="password" placeholder="Mot de passe" onChange={handleChange} required />
                {/* <p className={state.password.valid ? 'valid-input' : 'not-valid-input'}>{state.password.msg}</p> */}
                <input type="password" name="confirmation" id="confirm" placeholder="Confirmez votre mot de passe" onChange={handleChange} required />
                {/* <p className={state.confirmation.valid ? 'valid-input' : 'not-valid-input'}>{state.confirmation.msg}</p> */}

                <button type="submit" className="full-btn">Modifier</button>
            </form>
            </div>
            
        </div>
    );
};

export default ModifyProfile;
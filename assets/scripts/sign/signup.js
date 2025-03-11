import "../../styles/sign/signup.css"
import "../../lib/mbootstrap/text-input/text-input"
import * as Yup from 'yup'

const form = document.querySelector('#form')

form.addEventListener('submit', e => {
    e.preventDefault()
    validate();
})

function validate() {
    const schema = Yup.object().shape({
        username: Yup.string().required('Ce champs est obligatoire').matches(/^(?=.*[A-Z])(?=.*\d).+$/,"Le nom d'utilisateur doit contenir au moins une lettre majuscule, un nombre"),
        email: Yup.string().email('Email invalide').required('Ce champs est obligatoire'),
        password: Yup.string().min(8, 'Mot de passe trop court').required('Ce champs est obligatoire'),
    });
    let email = form.querySelector('#email')
    let username = form.querySelector('#username')
    let password = form.querySelector('#password')
    schema.validate({
        email: email.getText(),
        username: username.getText(),
        password: password.getText()
    }, { abortEarly: false }).then(() => {
        username.setError(null)
        email.setError(null)
        password.setError(null)
    }).catch(e => {
        const formattedErrors = e.inner.reduce((acc, error) => {
            acc[error.path] = error.message; // Associe chaque champ à son message d'erreur
            return acc;
          }, {});
          for (let key in formattedErrors) {
            if (key == 'username') username.setError(formattedErrors[key])
            if (key == "email") email.setError(formattedErrors[key])
            if (key == "password") password.setError(formattedErrors[key])
          }
    })
}
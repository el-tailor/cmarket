import "../../styles/sign/signup.css"
import "../../lib/mbootstrap/text-input/text-input"
import * as Yup from 'yup'
import Validator from "../../lib/forms/validator"

const form = document.querySelector('#form')
const validation = new Validator({
    username: Yup.string().required('Ce champs est obligatoire').matches(/^(?=.*[A-Z])(?=.*\d).+$/, "Le nom d'utilisateur doit contenir au moins une lettre majuscule, un nombre"),
    email: Yup.string().email('Email invalide').required('Ce champs est obligatoire'),
    password: Yup.string().required('Ce champs est obligatoire').matches(/^(?=.*[A-Z])(?=.*\d).+$/, "Le nom d'utilisateur doit contenir au moins une lettre majuscule, un nombre")
})

form.addEventListener('submit', async (e) => {
    e.preventDefault()
    let isValid = await validation.validate(form.querySelectorAll("text-input"))
    if (isValid) {
        console.log("Tout est validé")
    }else {
        console.log("Oups il y a un souci")
    }
})

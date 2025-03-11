import * as Yup from "yup";

/**
 * Ici on créer un objet Validator qui se chargement 
 * de valider l'ensemble de nos formulaires du moins
 * enfin les formulaires de type Text-Input
 */
export default class Validator {
    /**
     * Dans le construction on fait passez un object
     * qui correspond ici au shema de validation exemple
     * {
     *   username: Yup.string().required('Ce champs est obligatoire').matches(/^(?=.*[A-Z])(?=.*\d).+$/, "Le nom d'utilisateur doit contenir au moins une lettre majuscule, un nombre"),
     *   email: Yup.string().email('Email invalide').required('Ce champs est obligatoire'),
     *   password: Yup.string().min(8, 'Mot de passe trop court').required('Ce champs est obligatoire'),
     * }
     * @param {*} shape 
     */
    constructor(shape) {
        this.schema = Yup.object().shape(shape);
    }

    /**
     * Notre fonction de validation ici on passe un tableau correspondant
     * au élément du formulaire ici <text-input> que l'on souhaite véfifier
     * ici le input peut être document.querySelector('text-input')
     * @param {NodeListOf} inputs 
     */
    async validate(inputs) {
        /**
         * Ceci s'appelle une destrucration, c'est une manière de récupérer
         * chaque élément d'un tableau de manière individuelle en les stockant dans
         * une variable. exemple soit le tableau suivant : age = [18, 22, 34]
         * si je fais let [a, b, c] = age dans ce cas a = 18, b = 22 et c=34
         * NB cela fonctionne aussi avec des objets seulement pour les objets, les
         * nom des valirables doivent correspondre au clé des objets ex. et les crochets 
         * sont remplacés par des acolades
         * user = { name: "Tailor", email = "tailor@xyz.com" }
         * const { name, email } = user, ici name = Tailor, email = tailor@xyz.com
         * 
         */
        let [data, validation] = this.retrieveData(inputs)
        try {
            await this.schema.validate(validation, { abortEarly: false })
            inputs.forEach(element => { element.setError(null) })
            return true;
        } catch (e) {
            const formattedErrors = e.inner.reduce((acc, error) => {
                acc[error.path] = error.message; // Associe chaque champ à son message d'erreur
                return acc;
            }, {});
            for (let key in formattedErrors) {
                data[key].setError(formattedErrors[key]);
                data[key].setError(formattedErrors[key]);
                data[key].setError(formattedErrors[key]);
            }
            return false
        }
    }

    /**
     * Sans doute l'une des fonctions les plus compliquées.
     * Alors ici on prend le tableau des inputs puis on le transforme pour renvoyer
     * un tableau contenant des objets le premier object est une représentation de 
     * chaque élément contenu dans la note liste sous forme clé valeur.
     * L'intérêt est d'automatiser la validation des erreurs en fonction des noms règles
     * validation. exemple le premier tableau peut avoir ceci : { username: textinput }
     * 
     * Le deuxième tableau fait la même chose sauf qu'ici il retourne une clé-valeur 
     * contenant encore une fois l'identifiant par exemple username et le contenu du champ
     * concerné par exemple : { username : "Tailor Mavoungou" }. c'est cet objet que 
     * l'on va passer à la fonction validate.
     *  
     * @param {NodeListOf} inputs 
     * @returns []
     */
    retrieveData(inputs) {
        return [Object.fromEntries(Object.values(inputs).map((input) => {
            return [input.name, input]
        })),
        Object.fromEntries(Object.values(inputs).map((input) => {
            return [input.name, input.getText()]
        }))]
        //return [data, validation]
    }
}

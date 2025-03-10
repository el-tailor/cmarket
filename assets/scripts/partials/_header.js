import "../../styles/partials/_header.css"

const header = document.querySelector('header')
const sign_panel = header.querySelector('header .sign-panel')
const menu_button = header.querySelector('button')

menu_button.addEventListener('click', e => {
    e.preventDefault()
    let sign_class_list = sign_panel.classList.contains('show')
    menu_button.querySelector('span').textContent = !sign_class_list ? "close" : "menu"
    sign_panel.classList.toggle('show')
})
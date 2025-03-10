import "./text-input.css"

export class TextInput extends HTMLElement {

    label = ""
    placeholder = ""
    type = "text"
    helper = ""
    name = ""
    error = ""

    connectedCallback() {
        this.initAttribute()
        this.innerHTML = this.render()
        this.initListener()
    }

    initAttribute() {
        this.label = this.getAttribute('label') ?? ""
        this.placeholder = this.getAttribute('placeholder') ?? ""
        this.type = this.getAttribute('type') ?? "text"
        this.helper = this.getAttribute('helper-text') ?? ""
        this.name = this.getAttribute('name') ?? ""
    }

    render() {
        let lab = this.label.length > 0 ? `<label for="${this.name}">${this.label}</label>` : ''
        let option = ` class='input-field' placeholder="${this.placeholder}" required name="${this.name}" id="${this.name}"`
        let input = this.type != 'textarea' ? `<input type="${this.type}" ${option} />` : `<textarea ${option}></textarea>`
        let help = this.helper != "" ? `<span class="helper-text">${this.helper}</span>` : ''
        return `
            <div class="container">
                <div>
                ${lab}
                ${input}
                </div>
                ${help}
                <span class="error-text">${this.error}</span>
            </div>
        `
    }

    setError(errorText = null) {
        this.querySelector('.error-text').textContent = errorText
        if (errorText == null) this.classList.remove('error')
        else this.classList.add('error')
    }

    initListener() {
        this.querySelector('.input-field').addEventListener('focus', e => {
            this.classList.add('focus')
        })
        this.querySelector('.input-field').addEventListener('blur', e => {
            this.classList.remove('focus')
        })
        this.querySelector('.input-field').addEventListener('input', e => {
            if (e.target.value != "") this.classList.remove('error')
        })
    }

}

customElements.define("text-input", TextInput)
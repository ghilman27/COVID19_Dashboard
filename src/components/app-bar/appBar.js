import style from "./appBar.module.css";;
import template from "./appBar.module.hbs";

const logo = "res/images/logo.svg";

class AppBar extends HTMLElement {
    constructor() {
        super();
        this.shadowDOM = this.attachShadow({mode: "open"});
    }

    connectedCallback() {
        this.render();
    }

    render() {
        const stylesheet = document.createElement("style");;
        stylesheet.innerHTML = style.toString();;

        this.shadowDOM.appendChild(stylesheet);
        this.shadowDOM.innerHTML += template(logo);
    }
}

customElements.define("app-bar", AppBar);
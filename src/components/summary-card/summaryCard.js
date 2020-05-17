import style from "./summaryCard.module.css";
import template from "./summaryCard.module.html";

class summaryCard extends HTMLElement {
    constructor() {
        super();
        this.shadowDOM = this.attachShadow({mode: "open"});
    }

    connectedCallback() {
        this.render();
    }

    render() {
        const stylesheet = document.createElement("style");;
        stylesheet.innerHTML = style();;

        this.shadowDOM.appendChild(stylesheet);
        this.shadowDOM.innerHTML += template();
    }
}

customElements.define("summary-card", summaryCard);
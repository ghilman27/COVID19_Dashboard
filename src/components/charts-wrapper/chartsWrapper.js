import style from "./chartsWrapper.module.css";
import template from "./chartsWrapper.module.html";

class chartsWrapper extends HTMLElement {
    constructor() {
        super();
        this.shadowDOM = this.attachShadow({mode: "open"});
    }

    render(data) {
        /* append bootstrap 4 CSS */
        this.shadowDOM.innerHTML = `
        <link 
            rel="stylesheet" 
            href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.0/css/bootstrap.min.css" 
            integrity="sha384-9aIt2nRpC12Uk9gS9baDl411NQApFmC26EwAOH8WgZl5MYYxFfc+NcPb1dKGj7Sk" 
            crossorigin="anonymous">
        `;

        /* append CSS stylesheet */
        const stylesheet = document.createElement("style");;
        stylesheet.innerHTML = style();;
        this.shadowDOM.appendChild(stylesheet);

        /* append HTML template */
        this.shadowDOM.innerHTML += template(data);
    }
}

customElements.define("charts-wrapper", chartsWrapper);
import style from "./summaryCard.module.css";
import template from "./summaryCard.module.html";

class summaryCard extends HTMLElement {
    constructor() {
        super();
        this.shadowDOM = this.attachShadow({mode: "open"});
    }

    render(data) {
        /* append bootstrap 4 CSS */
        this.shadowDOM.innerHTML = `
            <link rel="stylesheet" 
            href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.0/css/bootstrap.min.css" 
            integrity="sha384-9aIt2nRpC12Uk9gS9baDl411NQApFmC26EwAOH8WgZl5MYYxFfc+NcPb1dKGj7Sk" 
            crossorigin="anonymous">
        `;
        
        /* append CSS stylesheet */
        const stylesheet = document.createElement("style");;
        stylesheet.innerHTML = style();;
        this.shadowDOM.appendChild(stylesheet);

        /* append HTML template */
        data.Date = new Date(data.Date).toUTCString();
        for (const key in data) {
            if (key !== "Date") {
                data[key] = new Number(data[key]).toLocaleString();
            }
        }
        this.shadowDOM.innerHTML += template(data);
    }

    renderError(message) {
        this.shadowDOM.innerHTML = "";
        this.shadowDOM.innerHTML += `
            <style>             
                .placeholder {
                    font-weight: lighter;
                    color: rgba(0,0,0,0.5);
                    -webkit-user-select: none;
                    -moz-user-select: none;
                    -ms-user-select: none;
                    user-select: none;
                    text-align: center;
                }
            </style>
            <h2 class="placeholder">${message}</h2>
        `
    }
}

customElements.define("summary-card", summaryCard);
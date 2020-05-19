import style from "./countryPicker.module.css";;
import template from "./countryPicker.module.html";
import FetchData from "../../api/FetchData";

class countryPicker extends HTMLElement {
    constructor() {
        super();
        this.shadowDOM = this.attachShadow({mode: "open"});
    }

    connectedCallback() {
        this.getData();
    }

    getData() {
        FetchData.getCountryNames()
            .then(data => this.render(data));
    }

    render(data) {
        /* append bootstrap 4 CSS */
        this.shadowDOM.innerHTML = `<link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.0/css/bootstrap.min.css" integrity="sha384-9aIt2nRpC12Uk9gS9baDl411NQApFmC26EwAOH8WgZl5MYYxFfc+NcPb1dKGj7Sk" crossorigin="anonymous">`;

        const stylesheet = document.createElement("style");;
        stylesheet.innerHTML = style();;

        this.shadowDOM.appendChild(stylesheet);
        this.shadowDOM.innerHTML += template(data);
        console.log(data)
    }
}

customElements.define("country-picker", countryPicker);
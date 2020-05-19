import style from "./countryPicker.module.css";;
import template from "./countryPicker.module.html";

class countryPicker extends HTMLElement {
    constructor() {
        super();
        this.shadowDOM = this.attachShadow({mode: "open"});
        this.listCountries = null;
        this._selectedEvent = null;
    }

    set selectedEvent(event) {
        this._selectedEvent = event;
        const test = this.shadowDOM.querySelector(`#countryPicker`);
        test.addEventListener('change', this._selectedEvent);
    }

    render(selectedCountry) {
        /* append bootstrap 4 CSS */
        this.shadowDOM.innerHTML = `
        <link 
            rel="stylesheet" 
            href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.0/css/bootstrap.min.css" 
            integrity="sha384-9aIt2nRpC12Uk9gS9baDl411NQApFmC26EwAOH8WgZl5MYYxFfc+NcPb1dKGj7Sk" 
            crossorigin="anonymous">
        `;

        /* append stylesheet */
        const stylesheet = document.createElement("style");;
        stylesheet.innerHTML = style();;
        this.shadowDOM.appendChild(stylesheet);

        /* generate template HTML */
        this.shadowDOM.innerHTML += template(this.listCountries);

        /* choose first default country */
        this.shadowDOM.querySelector(`#countryPicker [value="${selectedCountry}"]`).selected = true;
    }
}

customElements.define("country-picker", countryPicker);
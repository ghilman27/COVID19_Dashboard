import style from "./summaryCard.module.css";
import template from "./summaryCard.module.html";
import FetchData from "../../api/FetchData";

class summaryCard extends HTMLElement {
    constructor() {
        super();
        this.shadowDOM = this.attachShadow({mode: "open"});
        this._country = 'Indonesia';
    }

    set country(newCountry) {
        this._country = newCountry;
        this.getData();
    }

    connectedCallback() {
        this.getData();
    }

    getData() {
        FetchData.getSummaryData(this._country)
            .then(data => this.render(data));
    }

    render(data) {
        /* append bootstrap 4 CSS */
        this.shadowDOM.innerHTML = `<link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.0/css/bootstrap.min.css" integrity="sha384-9aIt2nRpC12Uk9gS9baDl411NQApFmC26EwAOH8WgZl5MYYxFfc+NcPb1dKGj7Sk" crossorigin="anonymous">`
        
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
}

customElements.define("summary-card", summaryCard);
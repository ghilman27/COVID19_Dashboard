import style from "./tableCases.module.css";
import template from "./tableCases.module.html";

class tableCases extends HTMLElement {
    constructor() {
        super();
        this.shadowDOM = this.attachShadow({mode: "open"});
    }

    set data(newData) {
        this._data = newData;
        this.render(this._data);
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

        /* data processing */
        data = data.sort(function(a,b) {return b.TotalConfirmed - a.TotalConfirmed})
        data.forEach((data, index) => {
            data.Index = index + 1;
            data.MortalityRate = `${(data.TotalDeaths / data.TotalConfirmed * 100.0).toFixed(2)}%`;
            data.RecoveryRate = `${(data.TotalRecovered / data.TotalConfirmed * 100.0).toFixed(2)}%`;
            data.TotalConfirmed = data.TotalConfirmed.toLocaleString();
            data.NewConfirmed = data.NewConfirmed.toLocaleString();
            data.TotalDeaths = data.TotalDeaths.toLocaleString();
            data.NewDeaths = data.NewDeaths.toLocaleString();
            data.TotalRecovered = data.TotalRecovered.toLocaleString();
            data.NewRecovered = data.NewRecovered.toLocaleString();
        });
        data = {allData: data};

        /* append HTML template */
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

customElements.define("table-cases", tableCases);
import style from "./chartsWrapper.module.css";
import template from "./chartsWrapper.module.html";
import Chart from 'chart.js';

class chartsWrapper extends HTMLElement {
    constructor() {
        super();
        this.shadowDOM = this.attachShadow({mode: "open"});
    }

    render(data, country) {
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
        this.shadowDOM.innerHTML += template();

        /* create chart */
        let myChart = this.shadowDOM.querySelector('#myChart').getContext('2d');
        
        /* time series for all countries */
        if (country !== "Global") {
            data.map((element) => {
                element["Date"] = new Date(element["Date"]).toDateString();
            })

            let lineChart = new Chart(myChart, {
                type: 'line',
                data: {
                    labels: data.map(({Date}) => (Date)),
                    datasets: [{
                        label: 'Deaths',
                        data: data.map(({Deaths}) => (Deaths)),
                        backgroundColor: 'rgba(255, 0, 0, 0.5)',
                        fill: true,
                    }, {
                        label: 'Recovered',
                        data: data.map(({Recovered}) => (Recovered)),
                        backgroundColor: 'rgba(40, 167, 69, 0.5)',
                        fill: true,
                    }, {
                        label: 'Infected',
                        data: data.map(({Confirmed}) => (Confirmed)),
                        backgroundColor: 'rgba(255, 193, 7, 0.5)',
                        fill: true,
                    }]
                },
            })
        }

        /* bar chart for global */
        if (country === "Global") {
            let barChart = new Chart(myChart, {
                type: 'bar',
                data: {
                    labels: ['Infected', 'Deaths', 'Recovered'],
                    datasets: [{
                        label: "People",
                        data: [data.TotalConfirmed, data.TotalDeaths, data.TotalRecovered],
                        backgroundColor: [
                            'yellow',
                            'red',
                            'green'
                        ],
                        fill: true,
                    }]
                },
            })
        }
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

customElements.define("charts-wrapper", chartsWrapper);
class AppBar extends HTMLElement {
    constructor() {
        super();
        this.shadowDOM = this.attachShadow({mode: "open"});
    }

    connectedCallback() {
        this.render();
    }

    render() {
        this.shadowDOM.innerHTML = `
        <style>
        /* to all element */
        * {
            margin: 0;
            box-sizing: border-box;
        }

        /* to host (app-bar element) */
        :host {
            display: block;
            padding: 1rem;
            width: 60%;
            height: 5rem;
            color: white;
            text-align: center;
        }

        img {
            height: 100%;
        }
        </style>

        <img src="https://vectr.com/tmp/a2RQWIC726/a2Hv0AnR0x.svg?width=520&height=160&select=a2Hv0AnR0xpage0" alt="covid-logo">
        `
    }
}

customElements.define("app-bar", AppBar);
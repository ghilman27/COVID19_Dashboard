import FetchData from "../api/FetchData";

const defaultCountry = 'Indonesia';
const summaryCardElement = document.querySelector("summary-card");
const countryPickerElement = document.querySelector("country-picker");
const chartsWrapperElement = document.querySelector("charts-wrapper");
const tableCasesElement = document.querySelector("table-cases");

/* main navigator JS */
const main = async () => {
    try {
        await initialRender();
        countryPickerElement.selectedEvent = onCountrySelected;
    } catch (error) {

    }
}

const initialRender = async () => {
    try {
        /* render country picker */
        countryPickerElement.listCountries = await FetchData.getCountryNames();
        countryPickerElement.render(defaultCountry);

        tableCasesElement.data = await FetchData.getSummaryData("All");

        /* render summary card and charts wrapper */
        renderPage(defaultCountry);

    } catch (error) {

    }
}

const renderPage = async (selectedCountry) => {
    try {
        const summaryData = await FetchData.getSummaryData(selectedCountry);
    
        if (selectedCountry !== "Global") {
            const dailyData = await FetchData.getDailyData(selectedCountry);
            chartsWrapperElement.render(dailyData, selectedCountry);
        } else {
            chartsWrapperElement.render(summaryData, selectedCountry);
        }
        summaryCardElement.render(summaryData);

    } catch (errorMessage) {
        summaryCardElement.renderError(`Please restart or try different country or check your connection`);
        chartsWrapperElement.renderError(`Please restart or try different country or check your connection`);
    }
}

const onCountrySelected = (event) => {
    let selectedCountry = event.target.options[event.target.selectedIndex].value;

    /* rerender with new country name */
    renderPage(selectedCountry);
}

export default main;
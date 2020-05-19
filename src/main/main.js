import FetchData from "../api/FetchData";

const renderPage = async (selectedCountry) => {
    const summaryData = await FetchData.getSummaryData(selectedCountry);
    summaryCardElement.render(summaryData);
}

const initialRender = async () => {
    countryPickerElement.listCountries = await FetchData.getCountryNames();
    await countryPickerElement.render(defaultCountry);
    renderPage(defaultCountry)
}

const onCountrySelected = (event) => {
    renderPage(event.target.options[event.target.selectedIndex].value);
}

const defaultCountry = 'Indonesia';
const summaryCardElement = document.querySelector("summary-card");
const countryPickerElement = document.querySelector("country-picker");

/* main navigator JS */
const main = async () => {
    await initialRender();
    countryPickerElement.selectedEvent = onCountrySelected;
}

export default main;
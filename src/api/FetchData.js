const url = "https://api.covid19api.com";

class FetchData {

    /* get summary data for:
        - all countries: countryName = "All"
        - global (worldwide): countryName = "Global"
        - individual country
    */
    static async getSummaryData(countryName) {
        try {
            const response = await fetch(`${url}/summary`);
            let {Global : globalData, Countries: allCountriesData , Date} = await response.json();

            /* return global summary */
            if (countryName === "Global") {
                return {...globalData, Date: Date};

            } else {
                allCountriesData = allCountriesData.map( ({CountryCode, Slug, ...selectedAttribute}) => ({...selectedAttribute}) );
                
                /* return all countries summary */
                if (countryName === "All") {
                    return allCountriesData;
                }
                
                /* return individual country summary */
                return allCountriesData.filter(data => data.Country === countryName);
            }
                
        } catch (error) {
            return error;

        }
    }

    /* get daily time series data for an individual country from the first case until now */
    static async getDailyData(countryName) {
        try {
            const response = await fetch(`${url}/dayone/country/${countryName}`);
            const dailyData = await response.json();

            return dailyData.map( ({Confirmed, Deaths, Recovered, Date}) => ({Confirmed, Deaths, Recovered, Date}) );

        } catch (error) {
            return error;
        }
    }

    /* get array of registered country names */
    static async getCountryNames() {
        try {
            const response = await fetch(`${url}/countries`);
            const countryNames = await response.json();

            return countryNames.map( ({Country}) => ({Country}) )

        } catch (error) {
            return error;
        }
    }
}

export default FetchData;
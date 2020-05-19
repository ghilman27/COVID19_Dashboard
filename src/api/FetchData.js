const url = "https://api.covid19api.com";

class FetchData {

    static async fetchLink(link) {
        try {
            const response = await fetch(link);

            /* alert too many request */
            if (response.status == "429") {
                alert(`GET: ${url}/summary Error 429 (Too Many Requests)
                
                      Please try again or refresh the page`
                );
            } else {
                return response;
            }
            
        } catch (error) {
            return error;
        }
    }

    /* get summary data for:
        - all countries + global: countryName = "All"
        - global (worldwide): countryName = "Global"
        - individual country
    */
    static async getSummaryData(countryName) {
        try {
            const response = await FetchData.fetchLink(`${url}/summary`);
            let {Global : globalData, Countries: allCountriesData , Date} = await response.json();

            /* return global summary */
            if (countryName === "Global") {
                return {Country: "Global", ...globalData, Date: Date};

            } else {
                /* return individual country summary */
                if (countryName !== "All") {
                    const filtered = allCountriesData.filter(data => data.Country === countryName)[0];
                    if (filtered) {
                        const {CountryCode, Slug, ...countryData} = filtered;
                        return {...countryData};
                    }

                    alert("No data found in the API, please try different country");
                    return
                }

                /* return all countries summary */
                allCountriesData = allCountriesData.map( ({CountryCode, Slug, ...selectedAttribute}) => ({...selectedAttribute}) );
                return [globalData, ...allCountriesData];
            }
                
        } catch (error) {
            return error;
        }
    }

    /* get daily time series data for an individual country from the first case until now */
    static async getDailyData(countryName) {
        try {
            const response = await FetchData.fetchLink(`${url}/dayone/country/${countryName}`);
            const dailyData = await response.json();
            return dailyData.map( ({Confirmed, Deaths, Recovered, Date}) => ({Confirmed, Deaths, Recovered, Date}) );

        } catch (error) {
            return error;
        }
    }

    /* get array of registered country names */
    static async getCountryNames() {
        try {
            const response = await FetchData.fetchLink(`${url}/countries`);
            let countryNames = await response.json();
            countryNames = ['Global', ...countryNames.map( ({Country}) => (Country) )];

            return {"Country": countryNames.sort()};

        } catch (error) {
            return error;
        }
    }
}

export default FetchData;
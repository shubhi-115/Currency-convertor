const axios = require ('axios');

// API's
// Exhange rate - 'http://data.fixer.io/api/latest?access_key=0f97e157f86d8b876dd5142330e2b165&format=1'
// Countries - `https://restcountries.eu/rest/v2/currency/${Currencycode}`
// functins we need to implement
// 1=> getExchangeRate
const getExchangeRate = async (fromCurrency,toCurrency)=>{
    const response = await axios.get('http://data.fixer.io/api/latest?access_key=0f97e157f86d8b876dd5142330e2b165&format=1');
        const rate = response.data.rates;
        // console.log(rate);
        const euro = 1 / rate[fromCurrency];
        const exchangeRate = euro * rate[toCurrency];
        // console.log(exchangeRate);

        if(isNaN(exchangeRate)){
            throw new Error (`Unable to convert ${fromCurrency} to ${toCurrency}`);
        }
        return exchangeRate;
        
};

getExchangeRate('USD','EUR');

// 2=> getCountries
const getCountries = async (toCurrency)=>{
try {
    const response = await axios.get(`https://restcountries.eu/rest/v2/currency/${toCurrency}`);
const allCountryNames = response.data.map(country=>(country.name));
return (allCountryNames);
} catch (error) {
    throw new Error (`Unable to get countries that uses ${toCurrency}`)
}
}
getCountries('EUR');

// 3=> convertcurrency
const convertCurrency = async (fromCurrency,toCurrency,amount)=>{
    const countries = await getCountries(toCurrency);
    const exchangeRate = await getExchangeRate(fromCurrency,toCurrency);
    const convertedAmt = (amount * exchangeRate).toFixed(2);
    return `${amount} ${fromCurrency} is worth ${convertedAmt} ${toCurrency} . You can spend in the following Countries ${countries}`;
};
// // 4=> getCountryCurrencyCode
// const getCountry = async ()=>{
//     const response = await axios.get('https://restcountries.eu/rest/v2/all');
//     const data = response.data.map(country=>([country.name,country.currencies]));
//     // const code = response.data.map(country=>(country.currencies));
//     // const name = response.data.currencies.name;
//     // const symbol = response.data.currencies.symbol;
//     console.log(data);
// }
// getCountry();

//call convert currency
convertCurrency('INR','USD',3730.53).then((message)=>{
    console.log(message);
}).catch((err)=>{
    console.log(err.message);
})



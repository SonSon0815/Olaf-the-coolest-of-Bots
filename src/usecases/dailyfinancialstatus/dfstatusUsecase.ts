import UseCase from '../../interfaces/useCase';
import UseCaseResponse from '../../classes/UseCaseResponse';
import TextResponse from '../../classes/TextResponse';
// import Preferneces from '../../core/preferences';
import EndUseCaseResponse from '../../classes/EndUseCaseResponse';
import ProcessedTelegramMessage from '../../classes/ProcessedTelegramMessage';
import GoogleCalendarConnector from '../../connectors/googleCalendar/googleCalendarConnector';
import ExchangeRatesConnector from '../../connectors/exchangerates/exchangeratesConnector';
import CoinGeckoConnector from '../../connectors/coingecko/coingeckoConnector';

// const fs = require('fs');

class DailyFinancialStatus implements UseCase {
  name = 'Daily financial status';
  triggers = ['financial', 'finance', 'finances'];

  private googleCalendar = new GoogleCalendarConnector();
  private exchangeRates = new ExchangeRatesConnector();
  private coinGecko = new CoinGeckoConnector();

  // constructor() {
  // }

  // eslint-disable-next-line class-methods-use-this
  async* receiveMessage(message: ProcessedTelegramMessage): AsyncGenerator<UseCaseResponse> {
    if (message) {
      yield new TextResponse('Here\'s a response');
      console.log('Done.');
    }

    yield new EndUseCaseResponse();
  }

  // eslint-disable-next-line class-methods-use-this
  reset(): void { }
}

export default DailyFinancialStatus;

// const axios = require('axios');

// const urlInitER = 'https://api.exchangeratesapi.io';
// const urlInitCG = 'https://api.coingecko.com/api/v3';

// const favCurrenciesER = ['USD', 'JPY', 'GBP', 'CHF'];
// const favCurrenciesCG = ['eur'];

// function fetchDataFrom(apiUrl) {
//   const newRequest = axios.get(apiUrl);
//   return newRequest;
// }

// function checkStatusCode(rawResponse) {
//   if (rawResponse.status === 200) {
//     // console.log('Status is OK.');
//     return Promise.resolve(rawResponse);
//   } if (rawResponse.status === 404) {
//     throw new Error('Content was not found.');
//   } else {
//     throw new Error(`Error occured - status: ${rawResponse.status}`);
//   }
// }

// function arrayContainsKey(array, key) {
//   for (let i = 0; i < array.length; i += 1) {
//     if (array[i] === key) {
//       return true;
//     }
//   }
//   return false;
// }

// function getCurrenciesER(responseAllCurrencies, requiredCurrencies) {
//   const result = {};
//   Object.keys(responseAllCurrencies.rates).forEach((key) => {
//     if (arrayContainsKey(requiredCurrencies, key)) {
//       result[key] = responseAllCurrencies.rates[key];
//     }
//   });
//   return result;
// }

// function getCurrenciesCG(responseAllCurrencies, requiredCurrencies) {
//   const result = {};
//   Object.keys(responseAllCurrencies.bitcoin).forEach((key) => {
//     if (arrayContainsKey(requiredCurrencies, key)) {
//       result[key] = responseAllCurrencies.bitcoin[key];
//     }
//   });
//   return result;
// }

// exports.urlInitER = urlInitER;
// exports.urlInitCG = urlInitCG;
// exports.fetchDataFrom = fetchDataFrom;
// exports.checkStatusCode = checkStatusCode;
// exports.arrayContainsKey = arrayContainsKey;
// exports.getCurrenciesER = getCurrenciesER;
// exports.getCurrenciesCG = getCurrenciesCG;

// // most recent data (exchange rate for 1 euro to all other currencies) from exchangerates API
// fetchDataFrom(`${urlInitER}/latest`)
//   .then((receivedResponse) => checkStatusCode(receivedResponse))
//   .then((allcurrencies) => getCurrenciesER(allcurrencies.data, favCurrenciesER))
//   .then((data) => console.log(data))
//   .catch((error) => console.log(error));

// // most recent data (value of 1 bitcoin in euro) from Coin Gecko API
// fetchDataFrom(`${urlInitCG}/simple/price?ids=bitcoin&vs_currencies=eur`)
//   .then((receivedResponse) => checkStatusCode(receivedResponse))
//   .then((allcurrencies) => getCurrenciesCG(allcurrencies.data, favCurrenciesCG))
//   .then((data) => console.log(data))
//   .catch((error) => console.log(error));

import React, { useState, useEffect } from "react";
import Results from "./Results";
import { exchange } from "../api/exchange.js";
import { countries, countries2 } from "../api/countries.js";
import "../index.css";

const App = () => {
  const [toAmount, setToAmount] = useState("");
  const [fromAmount, setFromAmount] = useState("");
  const [fromCurrency, setFromCurrency] = useState(null);
  const [toCurrency, setToCurrency] = useState(null);
  const [allRates, storeAllRates] = useState(null);
  // const [newBase, setNewBase] = useState(1);
  const [countryList, setCountryList] = useState(null);
  const [errorToggle, setErrorToggle] = useState(false);

  // fix this logic here
  const handleChange = (value, id) => {
    //console.log(value, id);/////
    if (id === "fromAmount") {
      setFromAmount(value);
      if (toCurrency) setToAmount((value * allRates[toCurrency]).toFixed(2));
    }
    if (id === "toAmount") {
      setToAmount(value);
      setFromAmount((value / allRates[toCurrency]).toFixed(2));
    }

    if (id === "fromCurrency") {
      setFromCurrency(value);
    }
    if (id === "toCurrency") {
      setToCurrency(value);

      if (toCurrency) setToAmount((fromAmount * allRates[value]).toFixed(2));
    }
  };

  useEffect(() => {
    setErrorToggle(false);
    const queryExchange = async () => {
      try {
        const { data } = await exchange.get(`latest/${fromCurrency}`);
        const reqRates = await data.conversion_rates;

        storeAllRates(reqRates);

        // if (fromCurrency) setNewBase(reqRates[toCurrency]);
      } catch (error) {
        console.error(`SOMETHING WENT WRONG!: ${error}`);
        setErrorToggle(true);
      }
    };
    fromCurrency && toCurrency && queryExchange();
  }, [fromCurrency, toCurrency]);

  useEffect(() => {
    const getCountryCurrencies = async () => {
      const { data } = await countries.get("");

      const results = data.map((country) => country.currencies[0]);

      function cleanObjectsFromArray(array, key) {
        const dupsRemove = array.filter((obj, index, self) => {
          if (index === self.findIndex((el) => el[key] === obj[key])) {
            return index;
          }
          return null;
        });

        return dupsRemove.filter((obj) => obj.code && obj.code !== "(none)");
      }

      // setCountryList(cleanObjectsFromArray(results, "code"));
    };
    // test
    const currList = [];
    const testCountryCurr = async () => {
      const { data } = await countries2.get("");
      // console.log(data);
      const results = data.map((country) => country.currencies);
      for (const c in results) {
        if (results[c]) {
          for (const [key, value] of Object.entries(results[c])) {
            currList.push({ code: key, name: value.name });
          }
        }
      }

      // function cleanObjectsFromArray(array, key) {
      //   const dupsRemove = array.filter((obj, index, self) => {
      //     if (index === self.findIndex((el) => el[key] === obj[key])) {
      //       return index;
      //     }
      //     console.log("index", index, array[index]);
      //     return null;
      //   });
      //   console.log(dupsRemove);
      //   return dupsRemove.filter((obj) => obj.code && obj.code !== "(none)");
      // }
      let known = new Set();
      // let filtered = currList.map((subarray) =>
      let filtered = currList.filter(
        (item) => !known.has(item.code) && known.add(item.code)
      );
      //
      console.log(filtered);
      setCountryList(filtered);
    };

    getCountryCurrencies();
    testCountryCurr();
  }, []);

  // useEffect(() => {
  //   setToAmount((fromAmount * newBase).toFixed(2));
  // }, [newBase, fromAmount]);

  const optionDisplay = (otherDropdownValue) =>
    countryList.map((currency) =>
      currency.code !== otherDropdownValue ? (
        <option key={currency.code} value={currency.code}>
          {currency.name}
        </option>
      ) : null
    );

  return (
    <div className="card has-background-light has-text-centered">
      <header className="card-header has-background-dark">
        <p className="is-size-5 card-header-title has-text-light">
          <span className="icon">
            <i className="fas fa-money-bill-wave has-text-success-dark"></i>
          </span>
          Currency Converter{" "}
        </p>
      </header>
      <div className="card-content">
        <div className="block select-flex-wrapper">
          <div className="field has-text-centered currency-select">
            <label className="label">FROM:</label>
            <div className="control">
              <div className="select is-info">
                <select
                  id="fromCurrency"
                  onChange={(e) => handleChange(e.target.value, e.target.id)}
                >
                  <option value="">--Select--</option>

                  {countryList ? optionDisplay(toCurrency) : null}
                </select>
              </div>
            </div>
          </div>
          <div className="field has-text-centered currency-select">
            <label className="label">TO:</label>
            <div className="control">
              <div className="select is-info">
                <select
                  id="toCurrency"
                  onChange={(e) => handleChange(e.target.value, e.target.id)}
                >
                  <option value="">--Select--</option>
                  {countryList ? optionDisplay(fromCurrency) : null}
                </select>
              </div>
            </div>
          </div>
        </div>
        {errorToggle ? (
          <p className="has-text-danger">
            {" "}
            <span role="img" aria-label="rolling eyes face">
              🙄
            </span>{" "}
            Oops! Something went wrong!
          </p>
        ) : null}
        {allRates && fromCurrency && toCurrency && (
          <Results
            fromCurrency={fromCurrency}
            toCurrency={toCurrency}
            conversionRate={allRates[toCurrency]}
            fromAmount={fromAmount}
            toAmount={toAmount}
            onChange={handleChange}
          />
        )}
      </div>
    </div>
  );
};

export default App;

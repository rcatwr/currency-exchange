import React from "react";

const Results = ({
  fromCurrency,
  toCurrency,
  conversionRate,
  fromAmount,
  toAmount,
  onChange,
}) => {
  const handleChange = (e) => onChange(e.target.value, e.target.id);

  return (
    <>
      <div className="block">
        <h2 className="conversion-text is-size-4 has-text-centered has-text-grey">
          1 {fromCurrency}
          <span className="is-size-2 pointer has-text-info"> ⇒ </span>
          {conversionRate ? conversionRate.toFixed(4) : 1} {toCurrency}
        </h2>
      </div>

      <div className="field">
        <label className="label">{fromCurrency}</label>
        <div className="control">
          <input
            className="input is-medium is-info"
            id="fromAmount"
            value={isNaN(fromAmount) ? 0 : fromAmount}
            onChange={handleChange}
            autoComplete="off"
          />
        </div>
      </div>

      <div className="field">
        <label className="label">{toCurrency}</label>
        <div className="control">
          <input
            className="input is-medium is-info"
            id="toAmount"
            value={isNaN(toAmount) ? 0 : toAmount}
            onChange={handleChange}
            autoComplete="off"
          />
        </div>
      </div>
    </>
  );
};

export default Results;

import React, { useState, useContext } from 'react';
import { Context } from '../store/appContext.js';
import { FlagIcon } from 'react-flag-kit';
import "../../styles/Converter.css";

const Converter = () => {
    const { store, actions } = useContext(Context);
    const [fromCurrency, setFromCurrency] = useState('USD');
    const [toCurrency, setToCurrency] = useState('EUR');
    const [amount, setAmount] = useState(0);

    const currencyOptions = [
        { code: 'USD', country: 'US' },
        { code: 'EUR', country: 'EU' },
        { code: 'JPY', country: 'JP' },
        { code: 'GBP', country: 'GB' },
        { code: 'CHF', country: 'CH' },
        { code: 'ARS', country: 'AR' },
        { code: 'AUD', country: 'AU' },
        { code: 'CAD', country: 'CA' }
    ];

    const filteredToCurrencyOptions = currencyOptions.filter(currency => currency.code !== fromCurrency);

    const handleConvert = () => {
        actions.getConvert(fromCurrency, toCurrency, amount);
    };

    const swapCurrencies = () => {
        setFromCurrency(toCurrency);
        setToCurrency(fromCurrency);
    };

    return (
        <div className="converter-container" id="container">
            <h2>Currency converter</h2>
            <p className="subtitle">Easily convert currencies from one country to another</p>

            <div className="conversion-box">
                <div className="amount-input">
                    <label htmlFor="amount">Amount:</label>
                    <input type="number" id="amount" value={amount} onChange={(e) => setAmount(e.target.value)} placeholder="1.00" required />
                </div>

                <div className="currency-selector">
                    <div className="currency-option">
                        <FlagIcon code={currencyOptions.find(c => c.code === fromCurrency).country} size={24} style={{ marginRight: '8px' }} id="flag" />
                        <select id="fromCurrency" value={fromCurrency} onChange={(e) => setFromCurrency(e.target.value)}>
                            {currencyOptions.map((currency, index) => (
                                <option key={index} value={currency.code}>
                                    {currency.code}
                                </option>
                            ))}
                        </select>
                    </div>

                    <span onClick={swapCurrencies} style={{ cursor: 'pointer', fontSize: '1.5rem', color: '#007bff', fontWeight: 'bold' }}>⇄</span>

                    <div className="currency-option">
                        <FlagIcon code={currencyOptions.find(c => c.code === toCurrency).country} size={24} style={{ marginRight: '8px' }} id="flag" />
                        <select id="toCurrency" value={toCurrency} onChange={(e) => setToCurrency(e.target.value)}>
                            {filteredToCurrencyOptions.map((currency, index) => (
                                <option key={index} value={currency.code}>
                                    {currency.code}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>

                <button className="button-modern" onClick={handleConvert}>Convert</button>
            </div>

            {/* Mostrar Resultado de Conversión */}
            {store.convertedAmount !== 0 && (
                <div className="conversion-result">
                    <p>Conversion rate: {store.conversionRate}</p>
                    <p>Converted amount: <strong> {store.convertedAmount} {toCurrency}</strong></p>
                </div>
            )}
        </div>
    );
}

export default Converter;

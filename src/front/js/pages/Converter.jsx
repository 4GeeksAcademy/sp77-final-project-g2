import React, { useState, useContext } from 'react';
import { Context } from '../store/appContext.js';
import Flag from 'react-world-flags';

const Converter = () => {
    const { store, actions } = useContext(Context);

    const [fromCurrency, setFromCurrency] = useState('USD');
    const [toCurrency, setToCurrency] = useState('EUR');
    const [amount, setAmount] = useState(0);

    const currencyOptions = [
        { code: 'USD', country: 'US' }, 
        { code: 'EUR', country: 'EU' }, 
        { code: 'RUB', country: 'RU' }, 
        { code: 'JPY', country: 'JP' }, 
        { code: 'GBP', country: 'GB' }, 
        { code: 'CHF', country: 'CH' }, 
        { code: 'INR', country: 'IN' }, 
        { code: 'MXN', country: 'MX' }
    ];
    const filteredToCurrencyOptions = currencyOptions.filter(currency => currency.code !== fromCurrency);
    
    const handleConvert = () => {
        actions.getConvert(fromCurrency, toCurrency, amount);
    };

    return (
        <div className="converter-container container">
            <h1>Convertir Moneda</h1>
            <div className="input-container">
                <label htmlFor="amount">Importe:</label>
                <input type="number" id="amount" value={amount} onChange={(e) => setAmount(e.target.value)} placeholder="Cantidad" required/>
            </div>

            <div className="currency-selector">
                <label htmlFor="fromCurrency">De:</label>
                <div className="currency-option">
                    <Flag code={currencyOptions.find(c => c.code === fromCurrency).country} height="24" />  
                    <select id="fromCurrency" value={fromCurrency} onChange={(e) => setFromCurrency(e.target.value)}>
                        {currencyOptions.map((currency, index) => (
                            <option key={index} value={currency.code}>
                                {currency.code}
                            </option>
                        ))}
                    </select>
                </div>

                <label htmlFor="toCurrency">A:</label>
                <div className="currency-option">
                    <Flag code={currencyOptions.find(c => c.code === toCurrency).country} height="24" />
                    <select id="toCurrency" value={toCurrency} onChange={(e) => setToCurrency(e.target.value)}>
                        {filteredToCurrencyOptions.map((currency, index) => (
                            <option key={index} value={currency.code}>
                                {currency.code}
                            </option>
                        ))}
                    </select>
                </div>
            </div>
            <button onClick={handleConvert}>Convertir</button>

            {/* Mostrar Resultado de Conversión */}
            {store.convertedAmount !== 0 && (
                <div>
                    <p>Tasa de conversión: {store.conversionRate}</p>
                    <p>Monto convertido: {store.convertedAmount} {toCurrency}</p>
                </div>
            )}
        </div>
    );
}

export default Converter;

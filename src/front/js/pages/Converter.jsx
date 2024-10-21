import React, { useContext, useState } from 'react';
import { Context } from '../store/appContext';

const CurrencyConverter = () => {
    const { store, actions } = useContext(Context);
    const [fromCurrency, setFromCurrency] = useState('');
    const [toCurrency, setToCurrency] = useState('');
    const [amount, setAmount] = useState(0);

    const handleConvert = () => {
        actions.convertCurrency(fromCurrency, toCurrency, amount);
    };

    return (
        <div>
            <h1>Currency Converter</h1>
            <input 
                type="text" 
                placeholder="From currency (e.g. USD)" 
                value={fromCurrency} 
                onChange={(e) => setFromCurrency(e.target.value)} 
            />
            <input 
                type="text" 
                placeholder="To currency (e.g. EUR)" 
                value={toCurrency} 
                onChange={(e) => setToCurrency(e.target.value)} 
            />
            <input 
                type="number" 
                placeholder="Amount" 
                value={amount} 
                onChange={(e) => setAmount(e.target.value)} 
            />
            <button onClick={handleConvert}>Convert</button>

            {store.convertedAmount && (
                <div>
                    <p>Conversion Rate: {store.conversionRate}</p>
                    <p>Converted Amount: {store.convertedAmount}</p>
                </div>
            )}

            {store.error && (
                <p>Error: {store.error}</p>
            )}
        </div>
    );
};

export default CurrencyConverter;
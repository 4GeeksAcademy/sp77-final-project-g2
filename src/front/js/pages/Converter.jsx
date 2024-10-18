import React, { useState } from 'react';

const CurrencyConverter = () => {
    const [amount, setAmount] = useState('');
    const [fromCurrency, setFromCurrency] = useState('USD');
    const [toCurrency, setToCurrency] = useState('EUR');
    const [result, setResult] = useState(null);
    const [error, setError] = useState(null);

    const handleConvert = async (e) => {
        e.preventDefault();
        setError(null); // Reset error message
        setResult(null); // Reset result

        try {
            const response = await fetch(`/convert?amount=${amount}&from=${fromCurrency}&to=${toCurrency}`);
            if (!response.ok) {
                throw new Error('Error en la solicitud');
            }
            const data = await response.json();
            setResult(data.conversion); // Suponiendo que la API devuelve la conversión en este campo
        } catch (err) {
            setError('Error al obtener la conversión');
        }
    };

    return (
        <div>
            <h1>Conversor de Monedas</h1>
            <form onSubmit={handleConvert}>
                <div>
                    <label htmlFor="amount">Cantidad:</label>
                    <input
                        type="number"
                        id="amount"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="from">De:</label>
                    <select
                        id="from"
                        value={fromCurrency}
                        onChange={(e) => setFromCurrency(e.target.value)}
                    >
                        <option value="USD">USD</option>
                        <option value="EUR">EUR</option>
                        {/* Agrega más opciones según sea necesario */}
                    </select>
                </div>
                <div>
                    <label htmlFor="to">A:</label>
                    <select
                        id="to"
                        value={toCurrency}
                        onChange={(e) => setToCurrency(e.target.value)}
                    >
                        <option value="EUR">EUR</option>
                        <option value="USD">USD</option>
                        {/* Agrega más opciones según sea necesario */}
                    </select>
                </div>
                <button type="submit">Convertir</button>
            </form>

            {result && (
                <div>
                    <h2>Resultado:</h2>
                    <pre>{JSON.stringify(result, null, 2)}</pre>
                </div>
            )}
            {error && <p style={{ color: 'red' }}>{error}</p>}
        </div>
    );
};

export default CurrencyConverter;
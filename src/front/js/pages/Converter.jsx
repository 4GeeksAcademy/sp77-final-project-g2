import React, { useContext, useState } from 'react';
import { Context } from '../store/appContext';  // Importar el contexto de Flux

const Converter = () => {
    const { store, actions } = useContext(Context);
    const [amount, setAmount] = useState(0);  // Estado local para la cantidad a convertir

    const handleConvert = () => {
        actions.getConvert("USD", "EUR", amount);  // Llama a la acción con USD y EUR
    };

    return (
        <div>
            <h1>Convertir de USD a EUR</h1>
            <input 
                type="number" 
                value={amount} 
                onChange={(e) => setAmount(e.target.value)} 
                placeholder="Cantidad en USD"
            />
            <button onClick={handleConvert}>Convertir</button>

            {store.convertedAmount && (
                <div>
                    <p>Tasa de conversión: {store.conversionRate}</p>
                    <p>Monto convertido: {store.convertedAmount} EUR</p>
                </div>
            )}

            {store.error && (
                <p>Error: {store.error}</p>
            )}
        </div>
    );
};

export default Converter;

import React, { useContext, useState } from 'react';
import { Context } from '../store/appContext.js';

const Converter = () => {
    const { store, actions } = useContext(Context); // Accedemos al store y las actions
    const [amount, setAmount] = useState(0); // Estado local para la cantidad

    const handleConvert = () => {
        actions.getConvert("USD", "EUR", amount); // Llamamos a la acción para convertir de USD a EUR
    };

    return (
        <div>
            <h1>Convertir de USD a EUR</h1>
            <input 
                type="number" 
                value={amount} 
                onChange={(e) => setAmount(e.target.value)} 
                placeholder="Cantidad en USD"
                id='amount'
            />
            <button onClick={handleConvert}>Convertir</button>

            {/* Mostrar el resultado de la conversión si está disponible */}
            {store.convertedAmount && (
                <div>
                    <p>Tasa de conversión: {store.conversionRate}</p>
                    <p>Monto convertido: {store.convertedAmount} EUR</p>  {/* Asegúrate de que 'store.convertedAmount' esté mostrando el número */}
                </div>
            )}

            {/* Mostrar errores si hay */}
            {store.error && (
                <p>Error: {store.error}</p>
            )}
        </div>
    );
};

export default Converter;

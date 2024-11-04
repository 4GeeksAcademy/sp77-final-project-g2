import React from "react";
import '../../styles/checkout.css';

const Checkout = () => {
    return (
        <div className="checkout-page">
            <div className="checkout-container">
                <section className="checkout-left">
                    <div className="checkout-price">
                        <h2>Only 9.99€</h2>
                    </div>
                </section>
                <section className="checkout-right">
                    <h1>Purchase</h1>
                    <form>
                        <div className="input-group">
                            <label htmlFor="cc-number">Card number:</label>
                            <input id="cc-number" maxLength="19" placeholder="1111 2222 3333 4444" required />
                        </div>

                        <div className="input-group">
                            <label htmlFor="expiry-date">Expire date:</label>
                            <div className="date-inputs">
                                <select id="expiry-month" required>
                                    <option value="" defaultValue>Month</option>
                                    {[...Array(12)].map((_, i) => (
                                        <option key={i} value={i + 1}>{String(i + 1).padStart(2, '0')}</option>
                                    ))}
                                </select>
                                <select id="expiry-year" required>
                                    <option value="" defaultValue>Year</option>
                                    {[...Array(20)].map((_, i) => (
                                        <option key={i} value={2024 + i}>{2024 + i}</option>
                                    ))}
                                </select>
                            </div>
                        </div>

                        <div className="input-group">
                            <label htmlFor="sec-code">Security code:</label>
                            <input type="password" id="sec-code" maxLength="3" placeholder="123" required />
                        </div>

                        <button type="submit" className="button-modern">Purchase Premium</button>
                    </form>
                </section>
            </div>
        </div>
    );
};

export default Checkout;
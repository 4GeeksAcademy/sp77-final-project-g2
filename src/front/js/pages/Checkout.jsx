import React, { useContext } from "react";
import { Context } from "../store/appContext.js";
import '../../styles/Checkout.css';

const Checkout = () => {
    const { actions } = useContext(Context);

    const handlePayment = async (e) => {
        e.preventDefault();
        // Llamar a la acción checkoutPayment para iniciar el pago
        await actions.checkoutPayment();
    };

    return (
        <div className="container my-3">
            <div className="row justify-content-center container-payments">
                <div className="subscription-details col-md-6">
                    <div className="p-4">
                        <h2>Subscribe to Starter</h2>
                        <h1>12.00 € <span>per month</span></h1>
                        <ul>
                            <li>Starter Plan Subscription</li>
                            <li>Billed Monthly</li>
                        </ul>
                        <div className="summary">
                            <p><strong>Subtotal </strong><span>12.00 €</span></p>
                            <p><strong>Tax </strong><span>21%</span></p>
                            <p className="total"><strong>Total due today </strong><span>15.00 €</span></p>
                        </div>
                    </div>
                </div>
                <div className="checkout-container col-md-6">
                    <div className="p-4">
                        <form onSubmit={handlePayment} className="checkout-form">
                            <button type="submit" className="btn btn-primary w-100">
                                Subscribe
                            </button>
                            <p className="text-muted mt-3">
                                By confirming your subscription, you allow us to charge your card for this payment and future payments in accordance with the terms.
                            </p>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Checkout;

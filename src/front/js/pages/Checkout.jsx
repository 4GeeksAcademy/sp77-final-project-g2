import React, { useEffect, useContext, useState } from "react";
import { Context } from "../store/appContext.js";
import { loadStripe } from "@stripe/stripe-js";
import { Elements, useStripe, useElements } from "@stripe/react-stripe-js";
import { CardNumberElement, CardExpiryElement, CardCvcElement } from "@stripe/react-stripe-js";
import { useNavigate } from "react-router-dom";
import '../../styles/Checkout.css';

const stripePromise = loadStripe("pk_test_51QIu6EFqOpeg6LLmE93py6jTJZmjVYRNxk8xTL8dgCw0ANpVMxlRQHDWDWAiNt9dT5Ed6uur2ny0n2Vv7R8tUtZS00ybM1kfdN");

const Payments = () => {
    const {store, actions} = useContext(Context);
    const stripe = useStripe();
    const elements = useElements();
    const navigate = useNavigate();

    const [email, setEmail] = useState('');
    const [cardName, setCardName] = useState('');
    const [country, setCountry] = useState('ES');
    const [postal, setPostal] = useState('');

    useEffect(() => {
        actions.checkoutPayment(10, "usd");
    }, []);

    const handlePayment = async (e) => {
        e.preventDefault();
        const cardElement = elements.getElement(CardNumberElement);
        const { error, paymentIntent } = await stripe.confirmCardPayment(store.clientSecret, {
            payment_method: { card: cardElement, billing_details: { email, name: cardName, address: { country, postal_code: postal } } }
        });
    
        if (error) {
            console.log("Error en el pago:", error);
        } else if (paymentIntent && paymentIntent.status === "succeeded") {
            actions.showAlert("Payment successful!", "success");
            navigate('/dashboard');
        }
    }

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
                            <h4>Pay with Card</h4>
                            <div className="floating-label1 my-3">
                                <label>Email</label>
                                <input type="email" className="form-control" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" required />
                            </div>
                            <div className="floating-label1 mb-3">
                                <label>Card Information</label>
                                <CardNumberElement className="form-control mb-2" style={{ fontSize: "1.2rem" }} />
                                <div className="row">
                                    <div className="col-6">
                                        <CardExpiryElement className="form-control" placeholder="MM / YY" />
                                    </div>
                                    <div className="col-6">
                                        <CardCvcElement className="form-control" placeholder="CVC" />
                                    </div>
                                </div>
                            </div>
                            <div className="floating-label1 mb-3">
                                <label>Name on Card</label>
                                <input type="text" className="form-control" value={cardName} onChange={(e) => setCardName(e.target.value)} placeholder="Name on Card" required />
                            </div>
                            <div className="floating-label1 mb-3">
                                <label>Country / ZIP</label>
                                <select className="form-control" value={country} onChange={(e) => setCountry(e.target.value)} required>
                                    <option value="US">United States</option>
                                    <option value="ES">Spain</option>
                                </select>
                                <input type="text" className="form-control" value={postal} onChange={(e) => setPostal(e.target.value)} placeholder="ZIP" required />
                            </div>
                            <button type="submit" className="btn btn-primary w-100" disabled={!stripe}>Subscribe</button>
                            <p className="text-muted mt-3">
                                By confirming your subscription, you allow us to charge your card for this payment and future payments in accordance with the terms.
                            </p>
                        </form>
                    </div>
                </div>
            </div>
        </div>

    );
}

const Checkout = () => (
    <Elements stripe={stripePromise}>
        <Payments />
    </Elements>
);

export default Checkout;
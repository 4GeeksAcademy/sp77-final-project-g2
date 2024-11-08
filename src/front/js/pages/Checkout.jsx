import React, { useEffect, useContext } from "react";
import { Context } from "../store/appContext.js";
import { loadStripe } from "@stripe/stripe-js";
import { Elements, CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { useNavigate } from "react-router-dom";

const stripePromise = loadStripe("pk_test_51QIu6EFqOpeg6LLmE93py6jTJZmjVYRNxk8xTL8dgCw0ANpVMxlRQHDWDWAiNt9dT5Ed6uur2ny0n2Vv7R8tUtZS00ybM1kfdN");

const Payments = () => {
    const {store, actions} = useContext(Context);
    const stripe = useStripe();
    const elements = useElements();
    const navigate = useNavigate();

    useEffect(() => {
        actions.checkoutPayment(10, "usd");
    }, []);

    const handlePayment = async (e) => {
        e.preventDefault();
        const cardElement = elements.getElement(CardElement);
        const { error, paymentIntent } = await stripe.confirmCardPayment(store.clientSecret, {
            payment_method: { card: cardElement }
        });

        if (error) {
            console.log("Error en el pago:", error);
        } else if (paymentIntent && paymentIntent.status === "succeeded") {
            console.log("¡Pago realizado con éxito!");
        }
    }

    return (
        <div className="container">
            <div className="checkout-container">
                <form onSubmit={handlePayment} className="checkout-form">
                    <h4>Complete el Pago</h4>
                    <div className="floating-label">
                        <CardElement className="form-control" />
                    </div>
                    <button type="submit" className="btn button-modern" disabled={!stripe}>
                        Pagar
                    </button>
                </form>
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
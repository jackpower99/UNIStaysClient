import React from "react";
import { useNavigate } from "react-router-dom";
import SplitForm from "../components/stripeForm";
import { useLocation } from "react-router-dom";
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';

const PUB_KEY ="pk_test_51KnnugFPMVPrZChFRt4MBRgKd2sdUanPouCcpgnFuoubnb1IkZ1gW3SLsaVs1RD3LSCF4QgQwxZwr9QT59nRAXCj002CMihIC0";
const stripeTestPromise = loadStripe(PUB_KEY)

const PaymentPage = () => {

    const navigate = useNavigate()

    const location = useLocation()
    const nights   = location.state.nights;
    const price = location.state.price;

    return (

        <div style={{display: "flex", flexDirection: "column", alignItems: "center"}}>
        <Elements stripe ={stripeTestPromise}>
       <SplitForm nights={nights} price={price} />
       </Elements>
 
        </div>
    )
}

export default PaymentPage;
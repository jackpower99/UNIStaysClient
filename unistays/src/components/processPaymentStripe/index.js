import React from 'react'
import { useNavigate } from "react-router-dom";
import SplitForm from '../../components/stripeForm'
import { useLocation } from "react-router-dom";
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';

export default function ProcessPaymentStripe({cb, nights, price}) {

const PUB_KEY ="pk_test_51KnnugFPMVPrZChFRt4MBRgKd2sdUanPouCcpgnFuoubnb1IkZ1gW3SLsaVs1RD3LSCF4QgQwxZwr9QT59nRAXCj002CMihIC0";
const stripeTestPromise = loadStripe(PUB_KEY)

  return (
    // <div  style={{height: "40vh", width:"50vw"}}>
    <Elements stripe ={stripeTestPromise}>
   <SplitForm cb={cb} nights={nights} price={price} />
   </Elements>

    // </div>
  )
}

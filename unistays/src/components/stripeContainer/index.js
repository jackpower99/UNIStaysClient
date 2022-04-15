import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import React from 'react'
import SplitForm from '../stripeForm';

const PUB_KEY ="pk_test_51KnnugFPMVPrZChFRt4MBRgKd2sdUanPouCcpgnFuoubnb1IkZ1gW3SLsaVs1RD3LSCF4QgQwxZwr9QT59nRAXCj002CMihIC0";
const stripeTestPromise = loadStripe(PUB_KEY)

export default function StripeContainer() {
  return (
    <Elements stripe ={stripeTestPromise}>
        <SplitForm></SplitForm>
    </Elements>
  )
}


import { useState, useEffect } from 'react';
import { useStripe } from '@stripe/react-stripe-js';

const PaymentStatus = () => {
  const stripe = useStripe();
  const [message, setMessage] = useState(null);

  useEffect(() => {
    if (!stripe) {
      return;
    }
    const clientSecret = new URLSearchParams(window.location.search).get(
      'setup_intent_client_secret',
    );

    stripe.retrieveSetupIntent(clientSecret).then(({ setupIntent }) => {
      switch (setupIntent.status) {
        case 'succeeded':
          setMessage('Success! Your payment method has been saved.');
          break;

        case 'processing':
          setMessage(
            "Processing payment details. We'll update you when processing is complete.",
          );
          break;

        case 'requires_payment_method':
          setMessage(
            'Failed to process payment details. Please try another payment method.',
          );
          break;
        default:
          return 'hello';
      }
    });
  }, [stripe]);

  return message;
};

export default PaymentStatus;

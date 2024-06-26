import React, { useEffect} from 'react'
import { Button } from '../ui/button'
import { checkoutOrder } from '@/lib/actions/order.actions'
import { loadStripe } from '@stripe/stripe-js';

loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!)



const Checkout = ({event, userId}:{ event: any, userId: string }) => {

  useEffect(() => {
    // Check to see if this is a redirect back from Checkout
    const query = new URLSearchParams(window.location.search);
    if (query.get('success')) {
      console.log('Order placed! You will receive an email confirmation.');
    }

    if (query.get('canceled')) {
      console.log('Order canceled -- continue to shop around and checkout when you’re ready.');
    }
  }, []);
 
  const onCheckout = async() =>{
    const order = {
       eventTitle: event.event.title,
       eventId: event.event.id,
       price: event.event.price,
       isFree: event.event.isFree,
       buyerId: userId
    }

    console.log(order);
    await checkoutOrder(order)
    
  }

  return (
    <form action={onCheckout} method='post'>
      <Button type='submit' role='link' size={"lg"} className='button sm:w-full'>
        {event.event.isFree ? "Get Tickets" : "But Tickets"}
      </Button>
    </form>
  )
}

export default Checkout
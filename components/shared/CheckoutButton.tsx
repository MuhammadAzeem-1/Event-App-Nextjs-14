"use client"

import { SignedOut } from '@clerk/clerk-react'
import { SignedIn, useUser } from '@clerk/nextjs'
import Checkout from './Checkout'
import { Button } from '../ui/button'
import Link from 'next/link'

const CheckoutButton = ({event}: any) => {

    const { user } = useUser()
    const userId = user?.publicMetadata.userId as string;
    const hasEventFinished = new Date(event.event.endDateTime) < new Date();
    

  return (
    <div className="flex items-center gap-3">
        {hasEventFinished ? (
            <p className='p-2 text-red-400'>Sorry, tickets are no longer available.</p>
        ) : (
            <>
              <SignedOut>
                <Button asChild className='button rounded-full' size="lg">
                    <Link href={"/sign-in"}>
                        Get Tickets
                    </Link>
                </Button>
              </SignedOut>

              <SignedIn>
                 <Checkout event={event} userId={userId}/>
               </SignedIn>
            </>

            
        )}
    </div>
  )
}

export default CheckoutButton
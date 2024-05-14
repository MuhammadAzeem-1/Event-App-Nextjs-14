import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { Button } from '../ui/button'
import { SignedIn, SignedOut, UserButton } from '@clerk/nextjs'
import NavItems from './NavItems'
import MobileNav from './MobileNav'

const Header = () => {
  return (
    <header className='w-full border-b'>
        <div className='wrapper flex items-center justify-between'>
            <Link href="/" className="w-36">
                <Image src="/assets/images/logo.svg" priority width={128} height={38} alt='Eventlt Logo' />  
            </Link>

            <SignedIn>
                <nav className='md:flex-between hidden w-full max-w-xs'>
                    <NavItems />
                </nav>
            </SignedIn>

            <div className='flex w-32 justify-end gap-3'>

                {/* After Login - Signup By User */}
                <SignedIn>
                    <UserButton afterSignOutUrl='/'/>
                    <MobileNav />
                </SignedIn>
                
                {/* Before Login - Signup By User */}
                <SignedOut>
                    <Button asChild className='rounded-full' size="lg" >
                        <Link href={"/sign-in"}>
                            Login
                        </Link>
                    </Button>
                </SignedOut>   
            </div>
        </div>



    </header>
  )
}

export default Header
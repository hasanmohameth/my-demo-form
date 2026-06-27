'use client'
import { useFormContext } from '@/_context/provider';
import Link from 'next/link';



function Navigation() {
      const { state, dispatch } = useFormContext();

    return (
        <div className='flex justify-between   m-2 h-15 w-2/5 mx-auto rounded-2xl   bg-background text-foreground text-2xl ' >
            <Link href='/form' 

                className='p-4 hover:text-myblue-300  transition-all  duration-300 hover:text-3xl'

            > Form
            </Link>

            <Link href='/' className='p-4 hover:text-myblue-300  transition-all  duration-300 hover:text-3xl'
>Home</Link>

        <span className='flex  '>
            <Link href='/products'
          className='p-4 hover:text-myblue-300 transition-all duration-300 hover:text-3xl'

            >Products </Link>

<span className="ml-2 flex items-center justify-center rounded-full bg-red-500 min-w-6 h-6 text-xs text-myblue-300 px-2">
    {state.products.length}
  </span>          </span>
        </div>
    )
}

export default Navigation

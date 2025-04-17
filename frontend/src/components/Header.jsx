import React, { useContext } from 'react'
import { assets } from '../assets/assets'
import { AppContext } from '../context/AppContext'

const Header = () => {

    const {userData} = useContext(AppContext)
  return (
    <div class="flex flex-col items-center mt-20 px-4 text-center text-gray-800">
        <img src={assets.header_img} alt='' class="w-36 h-36 rounded-full mb-6"/>
        <h1 class="flex items-center gap-2 text-xl sm:text-3xl font-medium mb-2">Hey {userData ? userData.name : 'Developer'}!  
            <img src={assets.hand_wave} alt='' class="w-8 aspect-square"></img></h1>
        <h2 class="text-3xl sm:text-5l font-semibold mb-4">Welcome to our app</h2>
        <p class="mb-8 max-w-md">lets start with a quick product tour and we will have you up and running in no time</p>
        <button class="border border-gray-500 rounded-full px-8 py-2.5 hover:bg-gray-100 transition-all">Get started</button>
    </div>
  )
}

export default Header
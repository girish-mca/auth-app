import React , {useContext, useState} from 'react'
import { assets } from '../assets/assets';
import { useNavigate } from 'react-router-dom';
import { AppContext } from '../context/AppContext';
import { toast } from 'react-toastify';
import axios from 'axios';

const Login = () => {

    const navigate = useNavigate();

    const{backendUrl , setIsLoggedin , getUserData} = useContext(AppContext)



    const[state , setState] = useState('Sign Up');
    const[name , setName] = useState('');
    const[email , setEmail] = useState('');
    const[password , setPassword] = useState('');

    const onSubmitHandler = async(e)=>{
        try {
            e.preventDefault(); 

            axios.defaults.withCredentials = true;

            if(state === 'Sign Up' ){
              const {data} =   await axios.post(backendUrl + '/api/auth/register' , {name,email,password})

              if(data.success){
                setIsLoggedin(true)
                getUserData()
                navigate('/')
              }else{
                toast.error(data.message)

              }


            }else{
                const {data} =   await axios.post(backendUrl + '/api/auth/login' , {email,password})

                if(data.success){
                  setIsLoggedin(true)
                  getUserData()
                  navigate('/')
                }else{
                  toast.error(data.message)
  
                }

            }
        } catch (error) {
            toast.error(error.message)
        }
    }




  return (
    <div class='flex items-center justify-center min-h-screen px-6 sm:px-0 bg-gradient-to-br from-blue-200 to-purple-400'>
        <img onClick={()=>navigate('/')} src={assets.logo} alt='' class="absolute left-5 sm:left-20 top-5 w-28 sm:w-32 cursor-pointer"></img>
        <div class="bg-slate-900 p-10 rounded-large shadow-large w-full sm:w-96 text-indigo-300 text-sm ">
            <h2 class="text-3xl font-semibold text-white text-center mb-3">{state === 'Sign Up' ? 'Create account' : 'Login'}</h2>
            <p class="text-center text-sm mb-6">{state === 'Sign Up' ? 'Create your account' : 'Login to your account'}</p>

            <form onSubmit={onSubmitHandler}>
                {state === 'Sign Up' && ( <div class="mb-4 text-white flex items-center gap-3 w-full px-5 py-2.5 rounded-full bg-[#333A5C]">
                    <img src={assets.person_icon} alt=''></img>
                    <input onChange={e=>setName(e.target.value)} value={name} class="bg-transparent  p-3 outline-none " type='text' placeholder='Full name' required></input>
                </div>)}
               
                <div class="mb-4 text-white flex items-center gap-3 w-full px-5 py-2.5 rounded-full bg-[#333A5C]">
                    <img src={assets.mail_icon} alt=''></img>
                    <input onChange={e=>setEmail(e.target.value)} value={email} class="bg-transparent  p-3 outline-none " type='email' placeholder='Email' required></input>
                </div>
                <div class="mb-4  text-white flex items-center gap-3 w-full px-5 py-2.5 rounded-full bg-[#333A5C]">
                    <img src={assets.lock_icon} alt=''></img>
                    <input onChange={e=>setPassword(e.target.value)} value={password} class="bg-transparent  p-3 outline-none " type='password' placeholder='Password' required></input>
                </div>

                <p onClick={()=>navigate('/reset-password')}class="mb-5 text-indigo-500 cursor-pointer">Forgot Password</p>

                <button class="w-full py-2.5 rounded-full bg-gradient-to-r from-indigo-500 to-indigo-900 text-white font-medium">{state}</button>
                
                
            </form>

            {state === 'Sign Up' ? ( <p class="text-gray-400 text-center text-xs mt-4">Already have an account?{' '} <span onClick={()=>setState('Login')} class="text-blue-400 cursor-pointer underline">Login here</span></p>) : 
            ( <p class="text-gray-400 text-center text-xs mt-4">Dont have an account?{' '} <span onClick={()=>setState('Sign Up')} class="text-blue-400 cursor-pointer underline">Sign Up</span></p>)}

           
           
        </div>
    </div>
  )
}

export default Login
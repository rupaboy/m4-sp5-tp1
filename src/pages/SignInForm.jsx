import { useEffect } from "react";
import { useForm } from "react-hook-form"
import { UseUser } from '../hook/UseUser'
import { UseWorld } from "../hook/UseWorld";
import { UseFetchStatus } from "../hook/UseFetchStatus";
import { UseNotification } from "../hook/UseNotification";
import Logo from "../component/particle/Logo"
import Loading from '../component/particle/molecule/Loading'
import Button from '../component/particle/molecule/Button'
import { getUsers } from '../service/user/usersGet'
import { createUser } from "../service/user/userPost";
import { useNavigate } from "react-router";

const SignInForm = () => {

  const { getStatus } = UseFetchStatus()
  const { notify } = UseNotification()

  const navigate = useNavigate()

  const { logInUser } = UseUser()

  const {
    register,
    handleSubmit,
    reset,
    setError,
    formState: { errors }
  } = useForm({
    defaultValues: {
      userName: '',
    }
  });

  const onSubmit = async (data) => {

    const users = await getUsers();
    
    const foundUser = users.find(
      user => user.userName.toLowerCase() === data.userName.toLowerCase()
    );

    if (!foundUser) {
      setError('userName', { type: 'manual', message: 'Username not found' })
      return;
    }

    try {
      logInUser(foundUser)

      notify({
        id: 'login',
        notificationTag: `'${data.userName}' has logged in`,
        withProgress: false
      });
      navigate('/') //To DashBoard
      reset();
    } catch (error) {
      notify({
        id: 'login',
        notificationTag: `Registration error: ${error}`,
        withProgress: false,
        duration: 5000
      });
    }
  };

  return (
    <div className="w-screen flex justify-center">

      <div className='top-7 fixed mx-auto'>
        <Logo />
      </div>
      
        <form className='flex flex-col items-center justify-center gap-2'
          onSubmit={handleSubmit(onSubmit)}
        >
          <label
            htmlFor='userName'
            className={`
              text-sm select-none
              ${!errors.userName ? 'text-amber-950 dark:text-amber-500' : 'dark:text-red-400 text-red-700'}
              `}
          > {!errors.userName ? 'Username' : `${errors.userName.message}`} </label>

          <input
            id='userName'
            className='
             p-1 w-70 rounded
            dark:bg-slate-950 dark:border-slate-800
             bg-slate-300 border border-slate-400'
            {...register('userName', {
              required: 'Username is required',
              minLength: { value: 6, message: '6 characters minimum' }
            })}
            placeholder="customusername"
          />

          <div className='flex gap-3 mt-8'>

            <Button
              buttonColor={`
                dark:hover:bg-emerald-500/80 dark:bg-emerald-700/80
                hover:bg-emerald-600 bg-emerald-700 text-slate-100`}
              buttonText={<i className="bi bi-box-arrow-in-up" />}
              buttonName={'Login'}
              ratio={'flex px-2 items-center gap-1'}
              type={'submit'}
            />
          </div>

            <Button
                ratio="flex items-center gap-2 px-2 mt-4 mb-2 bg-slate-800/0 dark:bg-slate-800/0
            dark:hover:bg-slate-800/0 hover:bg-slate-800/0 hover:text-amber-800 dark:hover:text-amber-400 underline"
                buttonText={<i className={'bi-box-arrow-in-right'} />}
                buttonName={`No account? Make a new one!`}
                title={'Login'}
                action={() => {
                    navigate('/user/register')
                }}
            />

        </form>
      

    </div>
  )
}

export default SignInForm;

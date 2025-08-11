import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router";
import { getUserById } from "../service/user/userGet";
import { getUsers } from "../service/user/usersGet";
import { updateUser } from "../service/user/userPut";
import { UseNotification } from "../hook/UseNotification";
import { UseFetchStatus } from "../hook/UseFetchStatus";
import { UseWorld } from "../hook/UseWorld";
import { UseUser } from "../hook/UseUser";
import Loading from "../component/particle/molecule/Loading";
import Logo from "../component/particle/Logo";
import Button from '../component/particle/molecule/Button';

const UserEditPanel = () => {
  const { id } = useParams();
  const { notify } = UseNotification();
  const navigate = useNavigate();

  const {
    runFetch,
    getStatus,
    resetStatus
  } = UseFetchStatus()

  const {
    retryFetchCountries,
    countries
  } = UseWorld()

  const { logInUser } = UseUser()

  const {
    register,
    handleSubmit,
    reset,
    setError,
    formState: { errors }
  } = useForm();

  useEffect(() => {

    if (getStatus(`user-${id}`)?.didFetch ) return; //Avoids fetching if done before

    runFetch(`user-${id}`, () => getUserById(id))
      .then(user => {
        reset({
          userName: user.userName,
          email: user.email,
          userCountry: user.userCountry
        });
      })
      .catch(() => {
        notify({
          id: "loadUser",
          notificationTag: "Error loading user data",
          duration: 5000,
          withProgress: false
        });
      });
  }, [id]);

  useEffect(() => {
    resetStatus(`user-${id}`)
  }, [])

  const onSubmit = async (data) => {

    const users = await getUsers();
    const exists = users.some(user =>
      user.userName.toLowerCase() === data.userName.toLowerCase() &&
      user.userName !== data.userName); //username changed but the new name exists already

    if (exists) {
      setError('userName', { type: 'manual', message: 'Username already exists' })
      return;
    }

    try {
      const updated = await updateUser(id, data);

      notify({
        id: "updateUser",
        notificationTag: `User '${updated.userName}' updated successfully`,
        duration: 5000,
        withProgress: false
      });

      logInUser(updated)

      navigate('/'); //To DashBoard
    } catch (error) {
      notify({
        id: "updateUser",
        notificationTag: `Update error: ${error.message}`,
        duration: 5000,
        withProgress: false
      });
    }
  };

  useEffect(() => {
    if (getStatus('countries')?.dataLoaded) return;

    if (countries.length) {
      notify({
        id: 'countries',
        notificationTag: 'Found countries in cache',
        withProgress: false
      })
    } else {
      notify({
        id: 'countries',
        notificationTag: 'Fetching countries'
      })
      runFetch('countries', retryFetchCountries);
    }
  }, [id])

  return (
    <div className="w-screen flex justify-center">

      <div className='top-7 fixed mx-auto'>
        <Logo />
      </div>

      {getStatus('countries')?.dataLoaded && getStatus(`user-${id}`)?.dataLoaded ?
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

          <label
            htmlFor='email'
            className={`
              text-sm select-none
              ${!errors.email ? 'text-amber-950 dark:text-amber-500' : 'dark:text-red-400 text-red-700'}
              `}
          > {!errors.email ? 'Email' : `${errors.email.message}`} </label>
          <input
            id='email'
            className='
             p-1 w-70 rounded
            dark:bg-slate-950 dark:border-slate-800
             bg-slate-300 border border-slate-400'
            {...register('email', {
              required: 'Email is required',
              pattern: { value: /^[^@ ]+@[^@ ]+\.[^@ ]+$/, message: 'Invalid Email' }
            })}
            placeholder='pauldummy84@mail.com' />

          <label
            htmlFor='userCountry'
            className={`
              text-sm select-none
              ${!errors.userCountry ? 'text-amber-950 dark:text-amber-500' : 'dark:text-red-400 text-red-700'}
              `}
          > {!errors.userCountry ? 'Location' : `${errors.userCountry.message}`} </label>
          <select
            id='userCountry'
            className='
             p-1 w-70 rounded
            dark:bg-slate-950 dark:border-slate-800
             bg-slate-300 border border-slate-400'
            {...register('userCountry', {
              required: 'Country selection is required'
            })}
            defaultValue=""
          >
            <option value="" disabled>
              Country Selection
            </option>
            {countries.map(c => (
              <option key={c.id} value={c.id}>
                {c.name}
              </option>
            ))}
          </select>

          <div className='flex gap-3 mt-8'>
            <Button
              buttonColor={`
                dark:hover:bg-red-500/80 dark:bg-red-700/80
                hover:bg-red-600 bg-red-700 text-slate-100`}
              buttonText={<i className="bi bi-arrow-counterclockwise" />}
              buttonName={'Restore data'}
              ratio={'flex px-2 items-center gap-1'}
              action={() => reset()}
            />

            <Button
              buttonColor={`
                dark:hover:bg-emerald-500/80 dark:bg-emerald-700/80
                hover:bg-emerald-600 bg-emerald-700 text-slate-100`}
              buttonText={<i className="bi bi-box-arrow-in-up" />}
              buttonName={'Update data'}
              ratio={'flex px-2 items-center gap-1'}
              type={'submit'}
            />
          </div>

        </form>
        : <Loading />
      }

    </div>
  )
};

export default UserEditPanel;

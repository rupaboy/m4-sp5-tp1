import Button from "./particle/molecule/Button"
import Loading from "./particle/molecule/Loading"
import { useNavigate } from "react-router"
import { UseUser } from "../hook/UseUser"

const Unregistered = () => {

    const { hasStoragedUser, storedUsers, logInUser } = UseUser()
    const navigate = useNavigate()

    return (
        <div className="w-full flex flex-col items-center justify-center">

            <h2 className="my-2 border-b border-b-amber-800 dark:border-b-amber-400">
                {hasStoragedUser ? "Welcome back!" : "You are not registered!"}
            </h2>
            <h2 className="text-xs mb-5">
                {hasStoragedUser
                    ? "We found previous accounts on this device."
                    : "Get to know your inner world."}
            </h2>

            {hasStoragedUser && !storedUsers &&
                <Loading />}

            {hasStoragedUser ? (
                <div className="flex flex-col flex-wrap justify-center" >

                    {hasStoragedUser && storedUsers.length > 0 &&
                        <div className="flex flex-wrap items-center justify-center gap-2">
                            {storedUsers.map((user) => (

                                <Button
                                    key={user.userName}
                                    ratio="flex items-center gap-2 px-2"
                                    buttonText={<i className={'bi-box-arrow-in-right'} />}
                                    buttonName={`${user.userName}`}
                                    title={'Login'}
                                    action={() => {
                                        logInUser(user)
                                        navigate('/') //To DashBoard
                                    }}
                                />
                            ))}
                        </div>
                    }

                    <div className="flex flex-wrap items-center justify-center gap-2">
                        <Button
                            ratio="
                                flex items-center gap-2 px-2 mt-4 hover:underline
                                bg-slate-950/0 dark:bg-slate-950/0 hover:bg-slate-950/0 dark:hover:bg-slate-950/0"
                            buttonText={<i className={'bi-box-arrow-in-right'} />}
                            buttonName={'Log in with another account'}
                            title={'Login'}
                            action={() => {
                                navigate('/user/login')
                            }}
                        />
                        <Button
                            ratio="
                                flex items-center gap-2 px-2 mt-4 hover:underline
                                bg-slate-950/0 dark:bg-slate-950/0 hover:bg-slate-950/0 dark:hover:bg-slate-950/0"
                            buttonText={<i className={'bi-person-plus'} />}
                            buttonName={'Create a new account'}
                            title={'Register'}
                            action={() => {
                                navigate('/user/register')
                            }}
                        />
                    </div>
                </div>
            ) : (
                <>
                    <Button
                        ratio="flex items-center gap-2 px-2"
                        buttonText={<i className={'bi-person-plus'} />}
                        buttonName={'Sign Up'}
                        title={'Register'}
                        action={() => {
                            navigate('/user/register')
                        }}
                    />
                    <Button
                        ratio="flex items-center gap-2 px-2 mt-4 mb-2 bg-slate-800/0 dark:bg-slate-800/0
              dark:hover:bg-slate-800/0 hover:bg-slate-800/0 hover:text-amber-800 dark:hover:text-amber-400 underline"
                        buttonText={<i className={'bi-box-arrow-in-right'} />}
                        buttonName={'Already have an account?'}
                        title={'Login'}
                        action={() => {
                            navigate('/user/login')
                        }}
                    />
                </>
            )}
        </div>
    )
}

export default Unregistered

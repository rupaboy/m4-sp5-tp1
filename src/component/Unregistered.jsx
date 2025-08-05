import Button from "./particle/molecule/Button"

Button

const Unregistered = () => {
    return (
        <div className="w-full flex flex-col items-center justify-center">

            <h2 className="my-2 border-b border-b-amber-800 dark:border-b-amber-400">You are not registered!</h2>
            <h2 className="text-xs">Get to know your inner world.</h2>
            <Button
                ratio="flex items-center gap-2 px-2 mt-7"
                buttonText={<i className={'bi-person-plus'} />}
                buttonName={'Sign Up'}
                title={'Register'}
            />

            <Button
                ratio="flex items-center gap-2 px-2 mt-4 mb-2 bg-slate-800/0 dark:bg-slate-800/0
            dark:hover:bg-slate-800/0 hover:bg-slate-800/0 hover:text-amber-800 dark:hover:text-amber-400 underline"
                buttonText={<i className={'bi-box-arrow-in-right'} />}
                buttonName={'Already have an acoount?'}
                title={'Login'}
            />
        </div>
    )
}

export default Unregistered
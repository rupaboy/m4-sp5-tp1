import React from 'react'

const Button = ( {
    action,
    buttonText = 'buttonText',
    buttonName,
    ratio = 'w-8',
    title = 'buttonTitle' } ) => {

    return (
        <button
        title={title}
        onClick={action}
        className={`${ratio}
        mt-2 h-8 leading-7 rounded cursor-pointer
        hover:bg-slate-500/30 bg-slate-700/30
        font-black`}>
            {buttonText}
            {buttonName && <p className='text-slate-300 font-light text-xs grid justify-center mt-1'>{buttonName}</p>}
        </button>
    )
}

export default Button
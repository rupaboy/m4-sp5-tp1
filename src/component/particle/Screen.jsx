
const Screen = ({ name, id, action }) => {
    return (
        <main className="
        grid grid-cols-[15px_40px] sm:grid-cols-[100px] justify-center items-center
         pb-1 sm:w-auto sm:px-1">

            {/* Screen Arms */}
            <hr className="
            mx-auto h-1 w-full sm:w-1 sm:h-10 bg-gradient-to-l sm:bg-gradient-to-t
            from-slate-800 to-slate-950/0 sm:items-center border-0" />

            {/* Screen Borders */}
            <div
                className="
                relative w-25 h-15 border p-1 border-slate-900 bg-slate-950
                rounded-md sm:flex">

                {/* Fondo difuso global */}
                <div
                    className="
                    absolute inset-1 z-0 bg-slate-400/20 blur-xs rounded-md" />

                {/* Screens */}
                <div className="
                relative w-full">
                    {/* Fondo difuso del botón */}
                    <div
                        className="
                        absolute z-0 bg-slate-100/70 blur-md inset-1 rounded-xs" />

                    <button
                        onClick={ () => action(id)}
                        className="
                        relative z-10 flex items-center justify-center w-full h-13 sm:px-2
                        text-center leading-5 rounded-xs cursor-pointer border border-slate-950/60">

                        <p className="
                        relative z-20 text-slate-950/85">{name}</p>

                    </button>
                </div>
            </div>
        </main>
    )
}

export default Screen
























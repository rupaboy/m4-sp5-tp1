const Marker = ({ name, action, flag = null }) => {
    return (
        <main
            onClick={action}

            className={`
                items-center my-auto hover:bg-slate-500/30 gap-1
                py-1 min-h-9 bg-slate-800/70 text-slate-300 select-none cursor-pointer
                min-w-0 w-[11em] h-[3em] rounded-sm px-2 text-xs flex
            `}
        >

            <div className="h-4 w-4 rounded-full overflow-hidden border border-slate-900/30 shrink-0">
                <img
                    src={flag}
                    className="h-4 w-full object-cover"
                />
            </div>
            <span
                className="flex-1 overflow-hidden text-ellipsis whitespace-nowrap w-full"
            >
                {name}
            </span>

        </main>
    );
};

export default Marker;

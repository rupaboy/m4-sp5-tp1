import Screen from "./particle/Screen"
const Menu = ({ category }) => {
    
const selection = ( category ) => {
    console.log(category)
}

    return (
        <main>
            <div
                className="grid sm:flex justify-center h-full translate-x-0 text-slate-700 font-black ">
                    
                {category.map((item) => (
                    <Screen key={item.id} item={item} action={() => selection(item.name)} />
                ))}
            </div>
        </main>
    )
}

export default Menu

import MenuFinder from "./molecule/MenuFinder"

const Menu = ({ setIsFinderOpen, setIsMenuOpen }) => {
  return (
    <main className="w-full absolute">
    <MenuFinder
        setIsFinderOpen={setIsFinderOpen}
        setIsMenuOpen={setIsMenuOpen}
      />
    </main>
  )
}

export default Menu
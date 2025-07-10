import WorldMap from "./particle/WorldMap";
import { motion } from "framer-motion";


const PlanetEarth = () => {
  return (
    <div className="
    relative h-65 w-65 overflow-hidden rounded-full flex items-start justify-center bg-slate-700">
      <motion.main
      initial={{ x: -120 }}
      animate={{ x: -496 }}
      transition={{
        duration: 50, ease: 'linear', repeat: Infinity, repeatType: "loop"
      }}
      >
        <aside className="absolute left-0 w-100 h-50">
          <WorldMap />
        </aside>
        <aside className="absolute left-94 w-100 h-50">
          <WorldMap />
        </aside>
      </motion.main>

    </div>
  );
}

export default PlanetEarth
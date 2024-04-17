import MenuCard from "./components/MenuCard";
import { motion, AnimatePresence } from "framer-motion"

export default function Home() {
  return (
    <>
      <main className="body_full">
        <AnimatePresence>
          <motion.div
            initial={{ y: -500 }}
            animate={{ y: 0 }}>
            <MenuCard />
          </motion.div>
        </AnimatePresence>
      </main>
    </>
  );
}

import "bootstrap/dist/css/bootstrap.min.css";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

function MenuCard() {
    return (
        <div class="card" style={{ width: "18rem", borderRadius: "5%" }}>
            <div class="card-body">
                <h5 class="card-title">Welcome to Adopt me!</h5>
                <p class="card-text">Would you like to see cats or dogs?</p>
                <div class="btn-group">
                    <AnimatePresence>
                        <motion.div
                            whileHover={{ scale: 1.2 }}
                            exit={{ opacity: 0, y: 100 }}>
                            <Link href="/pets/Cat"><img src="/image/kittypet.png" alt="Link to cats" style={{ width: "125px", height: "125px" }} /></Link>
                        </motion.div>
                    </AnimatePresence>

                    <AnimatePresence>
                        <motion.div
                            whileHover={{ scale: 1.2 }}
                            exit={{ opacity: 0, y: 100 }}>
                            <Link href="/pets/Dog"><img src="/image/dogpet.png" alt="Link to dogs" style={{ width: "125px", height: "125px" }} /></Link>
                        </motion.div>
                    </AnimatePresence>
                </div>
            </div>
        </div>
    );
}
export default MenuCard;
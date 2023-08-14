import styles from "./Cursor.module.scss";
import { useRef } from "react";
import { motion } from "framer-motion";
import { useFollowPointer } from '../../hooks/useFollowPointer';

const Cursor = () => {
    const ref = useRef(null);
    const { x, y } = useFollowPointer(ref);
    return (
        <motion.div
            ref={ref}
            className={styles.cursor}
            animate={{ x, y }}
            // transition={{
            //     type: "spring",
            //     damping: 1,
            //     stiffness: 20,
            //     restDelta: 0.01
            // }}
        />
    );
}

export default Cursor
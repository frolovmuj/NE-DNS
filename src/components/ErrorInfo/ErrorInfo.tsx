import {  FC } from 'react';
import { motion } from 'framer-motion';

interface iErrorInfoProps {
    title: string
}

const ErrorInfo: FC<iErrorInfoProps> = ({ title }) => {
    return (
        <div className="content__error-info">
            <motion.h1
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{
                    type: 'spring',
                    stiffness: 360,
                    damping: 20,
                }}>
                {title}
            </motion.h1>
        </div>
    )
}

export default ErrorInfo
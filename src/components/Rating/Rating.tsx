import { FC } from 'react';
import {
  MdOutlineStar,
  MdOutlineStarBorder,
} from 'react-icons/md';

import { motion } from 'framer-motion';

const Rating: FC<{ rating: number }> = ({ rating }) => {
  const activeRating = Math.floor(rating / 1.5);
  const totalStars = 5;

  return (
    <div style={{ display: 'flex', alignItems: 'center' }}>
      {Array.from({ length: activeRating }).map(
        (_, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{
              duration: 0.5,
              delay: index * 0.1,
            }}>
            <MdOutlineStar fontSize={80} color="black" />
          </motion.div>
        )
      )}

      {Array.from({
        length: totalStars - activeRating,
      }).map((_, index) => (
        <motion.div
          key={index + rating}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{
            duration: 0.5,
            delay: (activeRating + index) * 0.1,
          }}>
          <MdOutlineStarBorder fontSize={80} />
        </motion.div>
      ))}
    </div>
  );
};

export default Rating;

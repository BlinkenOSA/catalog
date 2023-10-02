import React, {useEffect, useState} from "react";
import {motion, AnimatePresence} from "framer-motion";

const RotatingText = ({texts}) => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    setTimeout(() => {
      let next = index + 1;
      setIndex(next % texts.length);
    }, 3 * 1000);
  }, [index, setIndex, texts]);

  return (
    <div style={{display: 'inline', overflow: 'hidden', position: 'relative', width: '100%', textAlign: 'right'}}>
      <AnimatePresence initial={false}>
        <motion.span
          style={{position: "absolute", right: 10, color: '#BFBFBF'}}
          key={index}
          layout
          variants={{
            enter: {
              translateY: 20,
              opacity: 0,
              height: 0
            },
            center: {
              zIndex: 1,
              translateY: 0,
              opacity: 1,
              height: "auto"
            },
            exit: {
              zIndex: 0,
              translateY: -20,
              opacity: 0,
              height: 0
            }
          }}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{
            translateY: { type: "spring", stiffness: 1000, damping: 200 },
            opacity: { duration: 0.5 }
          }}
        >
          {texts[index]}
        </motion.span>
      </AnimatePresence>
    </div>
  )
}

export default RotatingText;

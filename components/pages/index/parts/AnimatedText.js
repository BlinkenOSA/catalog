import {useEffect, useRef} from "react";
import {motion, useAnimation, useInView} from "framer-motion";

export default function AnimatedText({text}) {
  const ctrls = useAnimation();
  const ref = useRef(null)

  const inView = useInView(ref);

  useEffect(() => {
    if (inView) {
      ctrls.start("visible");
    }
    if (!inView) {
      ctrls.start("hidden");
    }
  }, [ctrls, inView]);

  const wordAnimation = {
    hidden: {},
    visible: {},
  };

  const characterAnimation = {
    hidden: {
      opacity: 0,
      y: `0.25em`,
    },
    visible: {
      opacity: 1,
      y: `0em`,
      transition: {
        duration: 1,
        ease: [0.2, 0.65, 0.3, 0.9],
      },
    },
  };

  return (
    <p aria-label={text} role="heading">
      {text.split(" ").map((word, index) => {
        return (
          <motion.span
            ref={ref}
            style={{display: 'inline-block', marginRight: '0.25em', whiteSpace: 'nowrap'}}
            aria-hidden="true"
            key={index}
            initial="hidden"
            animate={ctrls}
            variants={wordAnimation}
            transition={{
              delayChildren: index * 0.25,
              staggerChildren: 0.05,
            }}
          >
            {word.split("").map((character, index) => {
              return (
                <motion.span
                  aria-hidden="true"
                  style={{display: 'inline-block', marginRight: '-0.05em'}}
                  key={index}
                  variants={characterAnimation}
                >
                  {character}
                </motion.span>
              );
            })}
          </motion.span>
        );
      })}
    </p>
  );
}
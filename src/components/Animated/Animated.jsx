import { animated, useSpring } from "@react-spring/web";
import { useState } from "react";

export const FadeIn = ({ isVisible, children }) => {
  const styles = useSpring({
    opacity: isVisible ? 1 : 0,
    y: isVisible ? 0 : 24,
  });

  return <animated.div style={styles}>{children}</animated.div>;
};

export const SpinningComponent = ({ children }) => {
  const [isSpinning, setIsSpinning] = useState(false);

  const spin = useSpring({
    transform: isSpinning ? 'rotate(360deg)' : 'rotate(0deg)'
  });

  return (
    <animated.div style={spin} onClick={() => setIsSpinning(!isSpinning)}>
      {children}
    </animated.div>
  );
}
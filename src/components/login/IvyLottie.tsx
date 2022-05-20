import React, { useEffect, useRef } from "react";
import lottie from "lottie-web";

const IvyLottie: React.FC = (): JSX.Element => {
  // shitty
  const container: any = useRef(null);
  // load the lottie function
  useEffect(() => {
    lottie.loadAnimation({
      container: container.current,
      renderer: "svg",
      loop: false,
      autoplay: true,
      animationData: require("./ivy-logo-alternate.json"),
    });
  }, []);
  return <div ref={container} className="mx-auto w-40 container"></div>;
};

export default IvyLottie;

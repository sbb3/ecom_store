import { ArrowUpIcon } from "@chakra-ui/icons";
import { IconButton } from "@chakra-ui/react";
import { gsap } from "gsap";
import { useEffect, useRef, useState } from "react";

export default function ScrollToTop() {
  const [isVisible, setIsVisible] = useState(false);
  const scrollButton = useRef();

  useEffect(() => {
	// console.log("scrollToTop.jsx: useEffect: isVisible: ", isVisible);
    const toggleVisibility = () => {
      window.scrollY > 100 ? setIsVisible(true) : setIsVisible(false);
    };
    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  useEffect(() => {
    if (isVisible) {
      gsap.to(scrollButton.current, {
        duration: 0.5,
        opacity: 1,
        zIndex: 100,
      });
    } else {
      gsap.to(scrollButton.current, {
        duration: 0.5,
        opacity: 0,
        zIndex: -1,
      });
    }
  }, [isVisible]);

  const handleClick = () => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
    scrollButton.current.blur();
  };

  return (
    <IconButton
      aria-label="scroll to top"
      icon={<ArrowUpIcon />}
      size="md"
      colorScheme="purple"
      variant="solid"
      border="2px solid"
      ref={scrollButton}
      onClick={handleClick}
      position="fixed"
      bottom="5"
      right="5"
      zIndex="-1"
      opacity="0"
    />
  );
}

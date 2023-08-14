import { useState, RefObject, useEffect } from "react";

export function useFollowPointer(ref: RefObject<HTMLElement>) {
  const [point, setPoint] = useState({ x: 0, y: 0 });

  
  useEffect(() => {
      if (!ref.current) return;
      
      
    const handlePointerMove = ({ clientX, clientY }: MouseEvent) => {
        const element = ref.current!;
  
        const x = clientX - element.offsetLeft - element.offsetWidth;
        const y = clientY - element.offsetTop - element.offsetHeight ;
        setPoint({ x, y });
      };
  

    window.addEventListener("mousemove", handlePointerMove);

    return () => window.removeEventListener("mousemove", handlePointerMove);
  }, []);

  return point;
}

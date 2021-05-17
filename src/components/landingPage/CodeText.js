import * as THREE from "three";
import { Text } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { Suspense, useEffect, useState } from "react";
import code from "../../assets/code";

const CodeText = () => {
  const [text, setText] = useState("");
  const [deltaT, setDeltaT] = useState(0);
  const [index, setIndex] = useState(0);
  const [textSize, setTextSize] = useState(0.25);
  const [textWidth, setTextWidth] = useState(10);

  useFrame((state, delta) => {
    setDeltaT(deltaT + delta);
    if (deltaT > Math.random() / (Math.random() * 5)) {
      setDeltaT(0);
      setText(text + code[index]);
      setIndex(index + 1);
    }
    if (index >= code.length) setIndex(0);
  });

  const setSize = () => {
    const currentWidth = window.innerWidth;
    const tSize = currentWidth / 3000;
    const tWidth = currentWidth / 100;
    if (tSize >= 0.25) {
      setTextSize(0.25);
    } else {
      setTextSize(tSize);
    }
    if (tWidth >= 7.5) {
      setTextWidth(7.5);
    } else {
      setTextWidth(tWidth);
    }
  };

  useEffect(() => {
    setSize();
    window.addEventListener("resize", setSize);
    return () => {
      window.removeEventListener("resize", setSize);
    };
  }, []);

  return (
    <Suspense fallback={null}>
      <Text
        color="rgb(10, 10, 10)" // default
        anchorX="center" // default
        anchorY="bottom" // default
        fontSize={textSize}
        maxWidth={textWidth}
        fillOpacity={1}
        position={[0.1, -3.75, 0]}
        rotation={new THREE.Euler(-45, 0, 0)}
        textAlign="left"
      >
        {text}
      </Text>
    </Suspense>
  );
};

export default CodeText;

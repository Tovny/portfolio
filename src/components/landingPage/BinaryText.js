import { Text } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { Suspense, useState } from "react";

const BinaryText = ({ x }) => {
  const binaryText = `00001111 `;

  const [text, setText] = useState("");
  const [deltaT, setDeltaT] = useState(0);
  const [index, setIndex] = useState(0);

  useFrame((state, delta) => {
    setDeltaT(deltaT + delta);
    if (deltaT > Math.random() / (Math.random() * 15)) {
      setDeltaT(0);
      setText(text + `\n${binaryText[Math.floor(Math.random() * 9)]}`);
      setIndex(index + 1);
    }
    if (index >= 25 + Math.floor(Math.random() * 15)) {
      setIndex(0);
      setText("");
    }
  });

  const createOpacity = () => {
    let opacity = Math.abs(x) / 30;

    return 0.5 - opacity;
  };

  return (
    <Suspense fallback={null}>
      <Text
        color="green"
        anchorX="left"
        anchorY="top"
        fontSize={0.65}
        fillOpacity={createOpacity()}
        position={[x, 32.2, -35]}
        textAlign={"left"}
      >
        {text}
      </Text>
    </Suspense>
  );
};

export default BinaryText;

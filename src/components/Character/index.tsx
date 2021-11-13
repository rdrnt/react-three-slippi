import { useLoader } from '@react-three/fiber';
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader';
import * as React from 'react';

const Character: React.FunctionComponent = () => {
  const obj = useLoader(OBJLoader, '/newfox.obj');

  return (
    <mesh visible position={[0, 1.4, 0]} rotation={[0, 0, 0]} scale={1.2}>
      <primitive object={obj} />
    </mesh>
  );
};

export default Character;

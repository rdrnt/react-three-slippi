import * as React from 'react';

interface StageProps {
  lol?: any;
}

const MAX_WIDTH = 30;

const Stage: React.FunctionComponent<StageProps> = () => {
  return (
    <>
      <mesh visible position={[0, -0.2, 0]} rotation={[0, 0, Math.PI / 2]}>
        <boxGeometry args={[0.5, 3, MAX_WIDTH]} />

        <meshStandardMaterial color="black" transparent />
      </mesh>
    </>
  );
};

export default Stage;

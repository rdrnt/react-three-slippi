import React from 'react';
import * as THREE from 'three';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import {
  Environment,
  Html,
  OrbitControls,
  Stats,
  useGLTF,
  useProgress,
} from '@react-three/drei';

import Character from './components/Character';
import Stage from './components/Stage';

function App(): JSX.Element {
  return (
    <div className="App">
      <Canvas camera={{ position: [-120, 10, 0], fov: 20 }}>
        <OrbitControls />
        <Stats />
        <React.Suspense fallback={<Loader />}>
          <Scene>
            <Character />

            <Stage />
          </Scene>
        </React.Suspense>
      </Canvas>
    </div>
  );
}

const MAX_WIDTH = 30;

const Scene: React.FunctionComponent = ({ children }) => {
  return (
    <>
      <Environment preset="sunset" background />
      <ambientLight intensity={0.3} />
      <directionalLight color="red" position={[1, 2, 5]} />
      <gridHelper scale={MAX_WIDTH / 10} />

      {children}
    </>
  );
};

function Box(props) {
  // This reference will give us direct access to the mesh
  const mesh = React.useRef<THREE.Mesh>();

  // Set up state for the hovered and active state
  const [hovered, setHover] = React.useState(false);
  const [active, setActive] = React.useState(false);

  // Rotate mesh every frame, this is outside of React without overhead
  useFrame(() => (mesh.current.rotation.x = mesh.current.rotation.y += 0.01));

  return (
    <mesh
      {...props}
      ref={mesh}
      scale={active ? [1.5, 1.5, 1.5] : [1, 1, 1]}
      onClick={() => setActive(!active)}
      onPointerOver={() => setHover(true)}
      onPointerOut={() => setHover(false)}>
      <boxBufferGeometry attach="geometry" args={[1, 1, 1]} />
      <meshStandardMaterial
        attach="material"
        color={hovered ? 'hotpink' : 'orange'}
      />
    </mesh>
  );
}

function Loader() {
  const { active, progress, errors, item, loaded, total } = useProgress();
  return <Html center>{progress} % loaded</Html>;
}

export default App;

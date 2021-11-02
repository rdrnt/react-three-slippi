import React from 'react';
import * as THREE from 'three';
import { Canvas, useFrame } from '@react-three/fiber';
import { Environment, OrbitControls, FlyControls } from '@react-three/drei';

function App(): JSX.Element {
  return (
    <div className="App">
      <Canvas>
        <OrbitControls />
        <React.Suspense fallback={null}>
          <Environment preset="sunset" background />
          <ambientLight intensity={0.3} />
          <directionalLight color="red" position={[1, 2, 5]} />
          <Box />
        </React.Suspense>
      </Canvas>
    </div>
  );
}

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
      onClick={e => setActive(!active)}
      onPointerOver={e => setHover(true)}
      onPointerOut={e => setHover(false)}>
      <boxBufferGeometry attach="geometry" args={[1, 1, 1]} />
      <meshStandardMaterial
        attach="material"
        color={hovered ? 'hotpink' : 'orange'}
      />
    </mesh>
  );
}

export default App;

import { useFrame, useThree } from '@react-three/fiber';
import { useKeyboardControls } from '@react-three/drei';
import * as THREE from 'three';

interface CameraManagerProps {
  voyagerRef: React.RefObject<THREE.Group>;
  isFollowing: boolean;
}

export function CameraManager({ voyagerRef, isFollowing }: CameraManagerProps) {
  const { camera } = useThree();
  const [, get] = useKeyboardControls<string>();

  useFrame((_, delta) => {
    if (isFollowing && voyagerRef.current) {
      const voyagerPosition = voyagerRef.current.position;
      camera.position.lerp(voyagerPosition.clone().add(new THREE.Vector3(5, 5, 5)), 0.05);
      camera.lookAt(voyagerPosition);
    } else {
      const { forward, backward, left, right } = get();
      const speed = 10 * delta;

      if (forward) {
        camera.position.z -= speed;
      }
      if (backward) {
        camera.position.z += speed;
      }
      if (left) {
        camera.position.x -= speed;
      }
      if (right) {
        camera.position.x += speed;
      }
    }
  });

  return null;
}
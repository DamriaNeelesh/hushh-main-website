"use client";

import Image from "next/image";
import { Suspense, useEffect, useRef, useState } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { ContactShadows, PerspectiveCamera } from "@react-three/drei";
import { MathUtils } from "three";
import KaiIPhoneModel from "./KaiIPhoneModel";
import KaiReferenceLights from "./KaiReferenceLights";
import styles from "./KaiPage.module.css";

function supportsWebGL() {
  if (typeof window === "undefined") {
    return false;
  }

  const canvas = document.createElement("canvas");
  return Boolean(canvas.getContext("webgl") || canvas.getContext("experimental-webgl"));
}

function resolveTargets(progress, viewportWidth) {
  if (viewportWidth < 640) {
    return {
      rotationX: MathUtils.lerp(0.12, 0, progress),
      rotationY: MathUtils.lerp(Math.PI - 1.5, Math.PI, progress),
      rotationZ: MathUtils.lerp(-0.06, 0, progress),
      positionX: MathUtils.lerp(0.08, 0, progress),
      positionY: MathUtils.lerp(-0.08, 0, progress),
      positionZ: MathUtils.lerp(0.04, 0.18, progress),
      scale: MathUtils.lerp(20.8, 23.2, progress),
    };
  }

  if (viewportWidth < 1024) {
    return {
      rotationX: MathUtils.lerp(0.28, 0.07, progress),
      rotationY: MathUtils.lerp(Math.PI - 1.48, Math.PI + 0.05, progress),
      rotationZ: MathUtils.lerp(-0.18, 0.03, progress),
      positionX: MathUtils.lerp(0.2, -0.04, progress),
      positionY: MathUtils.lerp(-0.16, 0.02, progress),
      positionZ: MathUtils.lerp(0.04, 0.18, progress),
      scale: MathUtils.lerp(22.3, 25.6, progress),
    };
  }

  return {
    rotationX: MathUtils.lerp(0.28, 0.05, progress),
    rotationY: MathUtils.lerp(Math.PI - 1.54, Math.PI + 0.05, progress),
    rotationZ: MathUtils.lerp(-0.18, 0.04, progress),
    positionX: MathUtils.lerp(0.22, -0.05, progress),
    positionY: MathUtils.lerp(-0.18, 0.03, progress),
    positionZ: MathUtils.lerp(0.05, 0.22, progress),
    scale: MathUtils.lerp(26.6, 30.5, progress),
  };
}

function resolveCameraZ(viewportWidth) {
  if (viewportWidth < 640) {
    return 4.75;
  }

  if (viewportWidth < 1024) {
    return 4.45;
  }

  return 4.2;
}

function resolveDamping(viewportWidth) {
  if (viewportWidth < 640) {
    return 6.2;
  }

  if (viewportWidth < 1024) {
    return 4.0;
  }

  return 3.0;
}

function KaiSceneRig({ progress, reduceMotion, posterSrc }) {
  const groupRef = useRef(null);

  useFrame((state, delta) => {
    if (!groupRef.current) {
      return;
    }

    const viewportWidth = state.size.width;
    const raw = reduceMotion ? 1 : MathUtils.clamp(progress?.get?.() ?? 1, 0, 1);
    const eased = MathUtils.smootherstep(raw, 0.02, 0.98);
    const targets = resolveTargets(eased, viewportWidth);
    const damping = resolveDamping(viewportWidth);

    groupRef.current.rotation.x = MathUtils.damp(
      groupRef.current.rotation.x,
      targets.rotationX,
      damping,
      delta
    );
    groupRef.current.rotation.y = MathUtils.damp(
      groupRef.current.rotation.y,
      targets.rotationY,
      damping,
      delta
    );
    groupRef.current.rotation.z = MathUtils.damp(
      groupRef.current.rotation.z,
      targets.rotationZ,
      damping,
      delta
    );
    groupRef.current.position.x = MathUtils.damp(
      groupRef.current.position.x,
      targets.positionX,
      damping,
      delta
    );
    groupRef.current.position.y = MathUtils.damp(
      groupRef.current.position.y,
      targets.positionY,
      damping,
      delta
    );
    groupRef.current.position.z = MathUtils.damp(
      groupRef.current.position.z,
      targets.positionZ,
      damping,
      delta
    );
    groupRef.current.scale.x = MathUtils.damp(groupRef.current.scale.x, targets.scale, damping, delta);
    groupRef.current.scale.y = MathUtils.damp(groupRef.current.scale.y, targets.scale, damping, delta);
    groupRef.current.scale.z = MathUtils.damp(groupRef.current.scale.z, targets.scale, damping, delta);
  });

  return (
    <group ref={groupRef} position={[0, 0, 0]}>
      <Suspense fallback={null}>
        <KaiIPhoneModel screenSrc={posterSrc} />
      </Suspense>
    </group>
  );
}

function ResponsivePerspectiveCamera() {
  const cameraRef = useRef(null);
  const viewportWidth = useThree((state) => state.size.width);

  useEffect(() => {
    if (!cameraRef.current) {
      return;
    }

    cameraRef.current.position.set(0, 0, resolveCameraZ(viewportWidth));
    cameraRef.current.updateProjectionMatrix();
  }, [viewportWidth]);

  return <PerspectiveCamera ref={cameraRef} makeDefault position={[0, 0, 4.2]} />;
}

export default function KaiDeviceStage({ className, progress, reduceMotion, posterSrc }) {
  const [canRender, setCanRender] = useState(false);

  useEffect(() => {
    setCanRender(supportsWebGL());
  }, []);

  return (
    <div className={className}>
      <div className={styles.discoveryDeviceCanvasShell}>
        {canRender && !reduceMotion ? (
          <Canvas
            dpr={[1.75, 2.4]}
            shadows
            gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
            className={styles.discoveryDeviceCanvas}
          >
            <ambientLight intensity={0.3} />
            <ResponsivePerspectiveCamera />
            <KaiReferenceLights />
            <KaiSceneRig progress={progress} reduceMotion={reduceMotion} posterSrc={posterSrc} />
            <ContactShadows
              position={[0, -1.55, 0]}
              opacity={0.28}
              width={5.8}
              height={5.8}
              blur={2.8}
              far={3.8}
              resolution={256}
            />
          </Canvas>
        ) : (
          <div className={styles.discoveryDeviceFallback}>
            <Image
              src={posterSrc}
              alt="Kai investment analysis on iPhone"
              fill
              sizes="(max-width: 767px) 88vw, (max-width: 1023px) 28rem, 36rem"
              className={styles.discoveryDeviceFallbackImage}
              priority
            />
          </div>
        )}
      </div>
    </div>
  );
}

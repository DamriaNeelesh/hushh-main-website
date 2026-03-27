"use client";

import Image from "next/image";
import { Suspense, useEffect, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
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
      rotationX: MathUtils.lerp(0.32, 0.08, progress),
      rotationY: MathUtils.lerp(Math.PI - 1.52, Math.PI + 0.04, progress),
      rotationZ: MathUtils.lerp(-0.22, 0.02, progress),
      positionX: MathUtils.lerp(0.26, -0.02, progress),
      positionY: MathUtils.lerp(-0.2, 0.015, progress),
      positionZ: MathUtils.lerp(0.05, 0.18, progress),
      scale: MathUtils.lerp(15.2, 17.1, progress),
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
      scale: MathUtils.lerp(15.9, 17.9, progress),
    };
  }

  return {
    rotationX: MathUtils.lerp(0.28, 0.05, progress),
    rotationY: MathUtils.lerp(Math.PI - 1.54, Math.PI + 0.05, progress),
    rotationZ: MathUtils.lerp(-0.18, 0.04, progress),
    positionX: MathUtils.lerp(0.22, -0.05, progress),
    positionY: MathUtils.lerp(-0.18, 0.03, progress),
    positionZ: MathUtils.lerp(0.05, 0.22, progress),
    scale: MathUtils.lerp(17.2, 19.4, progress),
  };
}

function resolveProgressWindow(viewportWidth) {
  if (viewportWidth < 640) {
    return { start: 0.9, end: 0.18 };
  }

  if (viewportWidth < 1024) {
    return { start: 0.96, end: 0.12 };
  }

  return { start: 0.98, end: 0.04 };
}

function resolveDamping(viewportWidth) {
  if (viewportWidth < 640) {
    return 4.6;
  }

  if (viewportWidth < 1024) {
    return 4.0;
  }

  return 3.0;
}

function resolveSectionProgress(sectionElement, viewportWidth) {
  if (!sectionElement || typeof window === "undefined") {
    return 1;
  }

  const rect = sectionElement.getBoundingClientRect();
  const viewportHeight = window.innerHeight;
  const { start, end } = resolveProgressWindow(viewportWidth);
  const startPx = viewportHeight * start;
  const endPx = viewportHeight * end;

  return MathUtils.clamp((startPx - rect.top) / (startPx - endPx), 0, 1);
}

function KaiSceneRig({ progress, reduceMotion, posterSrc, sectionRef }) {
  const groupRef = useRef(null);

  useFrame((state, delta) => {
    if (!groupRef.current) {
      return;
    }

    const viewportWidth = state.size.width;
    const sectionProgress = sectionRef?.current
      ? resolveSectionProgress(sectionRef.current, viewportWidth)
      : MathUtils.clamp(progress?.get?.() ?? 1, 0, 1);
    const raw = reduceMotion ? 1 : sectionProgress;
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

export default function KaiDeviceStage({ className, progress, reduceMotion, posterSrc, sectionRef }) {
  const [canRender, setCanRender] = useState(false);

  useEffect(() => {
    setCanRender(supportsWebGL());
  }, []);

  return (
    <div className={className}>
      <div className={styles.discoveryDeviceCanvasShell}>
        <div className={styles.discoveryDeviceCanvasGlow} aria-hidden="true" />

        {canRender && !reduceMotion ? (
          <Canvas
            dpr={[3, 5]}
            shadows
            gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
            className={styles.discoveryDeviceCanvas}
          >
            <ambientLight intensity={0.3} />
            <PerspectiveCamera makeDefault position={[0, 0, 3.8]} />
            <KaiReferenceLights />
            <KaiSceneRig
              progress={progress}
              reduceMotion={reduceMotion}
              posterSrc={posterSrc}
              sectionRef={sectionRef}
            />
            <ContactShadows
              position={[0, -1.55, 0]}
              opacity={0.28}
              width={5.8}
              height={5.8}
              blur={2.8}
              far={3.8}
              resolution={512}
            />
          </Canvas>
        ) : (
          <div className={styles.discoveryDeviceFallback}>
            <Image
              src={posterSrc}
              alt="Kai investment analysis on iPhone"
              fill
              sizes="(max-width: 767px) 50vw, (max-width: 1023px) 22rem, 18rem"
              className={styles.discoveryDeviceFallbackImage}
              priority
            />
          </div>
        )}
      </div>
    </div>
  );
}

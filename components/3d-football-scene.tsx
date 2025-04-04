"use client"

import { useRef, useState } from "react"
import { Canvas, useFrame, useLoader } from "@react-three/fiber"
import { OrbitControls, Environment, Text, Html, PerspectiveCamera } from "@react-three/drei"
import { Suspense } from "react"
import { TextureLoader } from "three/src/loaders/TextureLoader"
import type { Group, Mesh } from "three"
import { Button } from "@/components/ui/button"
import { useSystemFont } from "./3d/use-system-font"

function FootballStadium() {
  const group = useRef<Group>(null)
  const systemFont = useSystemFont()

  useFrame((state) => {
    if (group.current) {
      group.current.rotation.y = state.clock.getElapsedTime() * 0.05
    }
  })

  return (
    <group ref={group} position={[0, 0, 0]} scale={0.5}>
      <mesh position={[0, -1, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[20, 20]} />
        <meshStandardMaterial color="#4ade80" />
      </mesh>

      {/* Stadium seats */}
      <group position={[0, -0.5, 0]}>
        {/* North stand */}
        <mesh position={[0, 0, -8]} rotation={[0.3, 0, 0]}>
          <boxGeometry args={[16, 4, 2]} />
          <meshStandardMaterial color="#1e40af" />
        </mesh>

        {/* South stand */}
        <mesh position={[0, 0, 8]} rotation={[-0.3, 0, 0]}>
          <boxGeometry args={[16, 4, 2]} />
          <meshStandardMaterial color="#1e40af" />
        </mesh>

        {/* East stand */}
        <mesh position={[8, 0, 0]} rotation={[0, 0, -0.3]}>
          <boxGeometry args={[2, 4, 14]} />
          <meshStandardMaterial color="#1e40af" />
        </mesh>

        {/* West stand */}
        <mesh position={[-8, 0, 0]} rotation={[0, 0, 0.3]}>
          <boxGeometry args={[2, 4, 14]} />
          <meshStandardMaterial color="#1e40af" />
        </mesh>
      </group>

      {/* Field markings */}
      <group position={[0, -0.99, 0]}>
        {/* Outer boundary */}
        <mesh rotation={[-Math.PI / 2, 0, 0]}>
          <ringGeometry args={[9.5, 9.6, 32]} />
          <meshStandardMaterial color="white" />
        </mesh>

        {/* Center circle */}
        <mesh rotation={[-Math.PI / 2, 0, 0]}>
          <ringGeometry args={[1.9, 2, 32]} />
          <meshStandardMaterial color="white" />
        </mesh>

        {/* Center spot */}
        <mesh position={[0, 0.01, 0]} rotation={[-Math.PI / 2, 0, 0]}>
          <circleGeometry args={[0.2, 32]} />
          <meshStandardMaterial color="white" />
        </mesh>
      </group>

      <Text position={[0, 3, 0]} fontSize={1} color="white" font={systemFont} anchorX="center" anchorY="middle">
        FOOTBALL STANDINGS
      </Text>

      <Html position={[0, 1, 0]} transform distanceFactor={10} className="pointer-events-auto">
        <div className="bg-white/10 backdrop-blur-md p-4 rounded-lg shadow-lg text-center w-64">
          <h3 className="text-white font-bold mb-2">Interactive 3D Stadium</h3>
          <p className="text-white/80 text-sm mb-4">Explore our virtual football stadium</p>
          <Button size="sm" className="w-full">
            View Competitions
          </Button>
        </div>
      </Html>
    </group>
  )
}

function RotatingBall() {
  const meshRef = useRef<Mesh>(null)
  const texture = useLoader(TextureLoader, "/assets/3d/texture_earth.jpg")

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = state.clock.getElapsedTime()
      meshRef.current.rotation.x = Math.sin(state.clock.getElapsedTime() * 0.5) * 0.2
    }
  })

  return (
    <mesh ref={meshRef} position={[0, 0, 0]}>
      <sphereGeometry args={[1, 32, 32]} />
      <meshStandardMaterial map={texture} />
    </mesh>
  )
}

export function FootballScene() {
  const [showStadium, setShowStadium] = useState(true)

  return (
    <div className="w-full h-[500px]">
      <Canvas shadows>
        <PerspectiveCamera makeDefault position={[0, 5, 15]} />
        <ambientLight intensity={0.5} />
        <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={1} castShadow />
        <Suspense fallback={null}>
          <Environment preset="sunset" />
          {showStadium ? <FootballStadium /> : <RotatingBall />}
        </Suspense>
        <OrbitControls enableZoom={true} maxPolarAngle={Math.PI / 2} minPolarAngle={Math.PI / 6} />
      </Canvas>
      <div className="absolute bottom-4 right-4">
        <Button
          variant="outline"
          onClick={() => setShowStadium(!showStadium)}
          className="bg-white/10 backdrop-blur-md text-white border-white/20"
        >
          Toggle {showStadium ? "Ball" : "Stadium"}
        </Button>
      </div>
    </div>
  )
}


'use client'

import { useRef, useState, useEffect, Suspense } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { MeshTransmissionMaterial, Environment, Float } from '@react-three/drei'
import { EffectComposer, Bloom, Noise, Vignette } from '@react-three/postprocessing'
import { useTheme } from 'next-themes'
import * as THREE from 'three'
import { usePathname } from '@/navigation'

function AbstractShape() {
    const groupRef = useRef<THREE.Group>(null)
    const meshRef = useRef<THREE.Mesh>(null)
    const { theme } = useTheme()
    const { viewport } = useThree()
    const pathname = usePathname()
    const isDark = theme === 'dark'

    // Route-based animation targets
    // Home: Large, Center-Right
    // Others: Small, Bottom-Left (to avoid collision with floating button on Bottom-Right)
    const isHome = pathname === '/' || pathname === '/ja' || pathname === '/en'
    
    const targetScale = isHome ? (viewport.width < 7 ? 0.7 : 0.95) : 0.5
    
    // Home: Right side
    // Others: Left side (negative X)
    const targetX = isHome 
        ? (viewport.width < 7 ? 0 : viewport.width / 3.5) 
        : (-viewport.width / 2.5) // Move to Left corner

    // Home: Center (0)
    // Others: Bottom (negative Y)
    const targetY = isHome 
        ? 0 
        : (-viewport.height / 2.5) // Move to Bottom corner

    useFrame((state) => {
        if (!groupRef.current || !meshRef.current) return

        // Rotation
        meshRef.current.rotation.x = THREE.MathUtils.lerp(meshRef.current.rotation.x, state.clock.elapsedTime * 0.2, 0.05)
        meshRef.current.rotation.y = THREE.MathUtils.lerp(meshRef.current.rotation.y, state.clock.elapsedTime * 0.15, 0.05)

        // Mouse Parallax (subtle)
        const { x, y } = state.pointer
        
        // Smooth Position Transition based on Route + Mouse
        const currentX = groupRef.current.position.x
        const currentY = groupRef.current.position.y
        
        // Calculate desired position
        // Home: Follow mouse more
        // Others: Stay in corner, less mouse influence
        const mouseInfluence = isHome ? 0.2 : 0.05
        const desiredX = targetX + x * mouseInfluence
        const desiredY = targetY + y * mouseInfluence

        if (!isNaN(desiredX) && !isNaN(desiredY)) {
            groupRef.current.position.x = THREE.MathUtils.lerp(currentX, desiredX, 0.05)
            groupRef.current.position.y = THREE.MathUtils.lerp(currentY, desiredY, 0.05)
        }

        // Smooth Scale Transition
        const currentScale = meshRef.current.scale.x
        const nextScale = THREE.MathUtils.lerp(currentScale, targetScale, 0.05)
        meshRef.current.scale.setScalar(nextScale)
    })

    // Material Colors
    const attenuationColor = isDark ? '#3b82f6' : '#bae6fd'
    const color = '#ffffff'

    return (
        <group ref={groupRef}>
            <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
                <mesh ref={meshRef}>
                    <torusKnotGeometry args={[1, 0.35, 128, 64]} />
                    <MeshTransmissionMaterial
                        backside
                        backsideThickness={0.5}
                        samples={16}
                        resolution={512}
                        thickness={1.5}
                        roughness={0.15}
                        transmission={0.9}
                        ior={1.5}
                        chromaticAberration={0.4}
                        anisotropy={0.3}
                        distortion={0.4}
                        distortionScale={0.5}
                        temporalDistortion={0.1}
                        attenuationDistance={0.6}
                        attenuationColor={attenuationColor}
                        color={color}
                    />
                </mesh>
            </Float>
        </group>
    )
}

export default function Scene3D() {
    return (
        <div className="fixed inset-0 w-full h-full pointer-events-none z-0">
            <Canvas camera={{ position: [0, 0, 6], fov: 45 }} gl={{ alpha: true, antialias: true, powerPreference: "high-performance" }}>
                <Suspense fallback={null}>
                    <ambientLight intensity={0.5} />
                    <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={2} castShadow />
                    <pointLight position={[-10, -5, -10]} intensity={1.5} color="#e0f2fe" />

                    <AbstractShape />
                    <Environment preset="city" blur={0.8} />

                    <EffectComposer disableNormalPass>
                        <Bloom luminanceThreshold={1} mipmapBlur intensity={0.5} radius={0.4} />
                        <Noise opacity={0.02} />
                        <Vignette eskil={false} offset={0.1} darkness={0.5} />
                    </EffectComposer>
                </Suspense>
            </Canvas>
        </div>
    )
}
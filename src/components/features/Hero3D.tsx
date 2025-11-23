'use client'

import { useRef, useState, useEffect, Suspense } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { MeshTransmissionMaterial, Environment, Float } from '@react-three/drei'
import { useTheme } from 'next-themes'
import * as THREE from 'three'

function AbstractShape() {
    const groupRef = useRef<THREE.Group>(null)
    const meshRef = useRef<THREE.Mesh>(null)
    const { theme } = useTheme()
    const { viewport } = useThree()
    const isDark = theme === 'dark'

    // クライアントサイドでのマウント確認
    const [mounted, setMounted] = useState(false)
    useEffect(() => {
        setMounted(true)
    }, [])

    const isMobile = viewport.width < 7
    const initialX = isMobile ? 0 : viewport.width / 3.5

    useFrame((state) => {
        if (!groupRef.current) return
        if (!meshRef.current) return

        // メッシュ自体の回転（時間経過）
        meshRef.current.rotation.x = state.clock.elapsedTime * 0.2
        meshRef.current.rotation.y = state.clock.elapsedTime * 0.15

        // グループ全体の位置制御（マウス追従）
        const { x, y } = state.pointer

        // 安全策: viewport.widthが取得できていない場合は処理をスキップ
        if (!viewport.width) return

        // Dynamic position
        const baseX = isMobile ? 0 : viewport.width / 3.5
        const baseY = 0

        const targetX = baseX + x * 0.2
        const targetY = baseY + y * 0.2

        // NaNチェックを行ってから更新
        if (!isNaN(targetX) && !isNaN(targetY)) {
            groupRef.current.position.x = THREE.MathUtils.lerp(groupRef.current.position.x, targetX, 0.1)
            groupRef.current.position.y = THREE.MathUtils.lerp(groupRef.current.position.y, targetY, 0.1)
        }
    })

    // 氷のような表現のための色設定
    const attenuationColor = isDark ? '#3b82f6' : '#bae6fd'
    const color = '#ffffff' // ベースはクリア

    if (!mounted) return null

    return (
        <group ref={groupRef} position={[initialX, 0, 0]}>
            <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
                <mesh ref={meshRef} scale={isMobile ? 0.7 : 0.95}>
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

export default function Hero3D() {
    return (
        <div className="absolute inset-0 w-full h-full pointer-events-none">
            <Canvas camera={{ position: [0, 0, 6], fov: 45 }} gl={{ alpha: true, antialias: true }}>
                <Suspense fallback={null}>
                    <ambientLight intensity={0.5} />
                    <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={2} castShadow />
                    <pointLight position={[-10, -5, -10]} intensity={1.5} color="#e0f2fe" />

                    <AbstractShape />

                    <Environment preset="city" blur={0.8} />
                </Suspense>
            </Canvas>
        </div>
    )
}
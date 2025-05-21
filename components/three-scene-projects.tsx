"use client"

import { useEffect, useRef } from "react"
import * as THREE from "three"

export function ThreeSceneProjects() {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!containerRef.current) return

    // Scene setup
    const scene = new THREE.Scene()

    // Camera setup
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
    camera.position.z = 5

    // Renderer setup
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
    renderer.setSize(window.innerWidth, window.innerHeight)
    renderer.setClearColor(0x000000, 0)
    containerRef.current.appendChild(renderer.domElement)

    // Create hexagonal grid
    const hexagons: THREE.Mesh[] = []
    const hexCount = 30

    for (let i = 0; i < hexCount; i++) {
      const geometry = new THREE.CircleGeometry(0.3, 6)
      const material = new THREE.MeshPhongMaterial({
        color: 0x8b5cf6,
        transparent: true,
        opacity: 0.5 + Math.random() * 0.3,
        side: THREE.DoubleSide,
      })

      const hex = new THREE.Mesh(geometry, material)

      // Position hexagons in a grid-like pattern
      const row = Math.floor(i / 5)
      const col = i % 5

      hex.position.x = col * 1.1 - 2.2
      hex.position.y = row * 1.1 - 2.2
      hex.position.z = Math.random() * 2 - 1

      // Rotate to face camera
      hex.rotation.x = Math.PI / 2

      scene.add(hex)
      hexagons.push(hex)
    }

    // Add lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5)
    scene.add(ambientLight)

    const pointLight = new THREE.PointLight(0x8b5cf6, 1)
    pointLight.position.set(2, 3, 4)
    scene.add(pointLight)

    // Animation
    const animate = () => {
      requestAnimationFrame(animate)

      hexagons.forEach((hex, i) => {
        // Pulse effect
        const scale = 1 + 0.1 * Math.sin(Date.now() * 0.001 + i)
        hex.scale.set(scale, scale, scale)

        // Subtle rotation
        hex.rotation.z += 0.002
      })

      renderer.render(scene, camera)
    }

    animate()

    // Handle window resize
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight
      camera.updateProjectionMatrix()
      renderer.setSize(window.innerWidth, window.innerHeight)
    }

    window.addEventListener("resize", handleResize)

    // Cleanup
    return () => {
      window.removeEventListener("resize", handleResize)
      if (containerRef.current) {
        containerRef.current.removeChild(renderer.domElement)
      }
      hexagons.forEach((hex) => {
        scene.remove(hex)
        hex.geometry.dispose()
        if (hex.material instanceof THREE.Material) {
          hex.material.dispose()
        } else if (Array.isArray(hex.material)) {
          hex.material.forEach((material) => material.dispose())
        }
      })
    }
  }, [])

  return <div ref={containerRef} className="absolute inset-0 opacity-30" />
}

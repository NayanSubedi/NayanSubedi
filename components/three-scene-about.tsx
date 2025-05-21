"use client"

import { useEffect, useRef } from "react"
import * as THREE from "three"

export function ThreeSceneAbout() {
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

    // Create floating cubes
    const cubes: THREE.Mesh[] = []
    const cubeCount = 20
    const colors = [0x8b5cf6, 0x6d28d9, 0x4c1d95, 0x7c3aed]

    for (let i = 0; i < cubeCount; i++) {
      const geometry = new THREE.BoxGeometry(0.3, 0.3, 0.3)
      const material = new THREE.MeshPhongMaterial({
        color: colors[Math.floor(Math.random() * colors.length)],
        transparent: true,
        opacity: 0.7,
        shininess: 100,
      })
      const cube = new THREE.Mesh(geometry, material)

      // Position cubes randomly in a sphere
      const radius = 4
      const theta = Math.random() * Math.PI * 2
      const phi = Math.random() * Math.PI

      cube.position.x = radius * Math.sin(phi) * Math.cos(theta)
      cube.position.y = radius * Math.sin(phi) * Math.sin(theta)
      cube.position.z = radius * Math.cos(phi)

      cube.rotation.x = Math.random() * Math.PI
      cube.rotation.y = Math.random() * Math.PI

      scene.add(cube)
      cubes.push(cube)
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

      cubes.forEach((cube, i) => {
        cube.rotation.x += 0.003 + i * 0.0001
        cube.rotation.y += 0.004 + i * 0.0001

        // Make cubes float up and down
        cube.position.y += Math.sin(Date.now() * 0.001 + i) * 0.002
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
      cubes.forEach((cube) => {
        scene.remove(cube)
        cube.geometry.dispose()
        if (cube.material instanceof THREE.Material) {
          cube.material.dispose()
        } else if (Array.isArray(cube.material)) {
          cube.material.forEach((material) => material.dispose())
        }
      })
    }
  }, [])

  return <div ref={containerRef} className="absolute inset-0 opacity-40" />
}

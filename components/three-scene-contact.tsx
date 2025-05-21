"use client"

import { useEffect, useRef } from "react"
import * as THREE from "three"

export function ThreeSceneContact() {
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

    // Create a globe
    const globeGeometry = new THREE.SphereGeometry(2, 32, 32)
    const globeMaterial = new THREE.MeshPhongMaterial({
      color: 0x6d28d9,
      wireframe: true,
      transparent: true,
      opacity: 0.3,
    })
    const globe = new THREE.Mesh(globeGeometry, globeMaterial)
    scene.add(globe)

    // Add points on the globe
    const pointsGeometry = new THREE.BufferGeometry()
    const pointsCount = 200

    const posArray = new Float32Array(pointsCount * 3)

    for (let i = 0; i < pointsCount; i++) {
      const phi = Math.acos(-1 + (2 * i) / pointsCount)
      const theta = Math.sqrt(pointsCount * Math.PI) * phi

      const x = 2 * Math.cos(theta) * Math.sin(phi)
      const y = 2 * Math.sin(theta) * Math.sin(phi)
      const z = 2 * Math.cos(phi)

      posArray[i * 3] = x
      posArray[i * 3 + 1] = y
      posArray[i * 3 + 2] = z
    }

    pointsGeometry.setAttribute("position", new THREE.BufferAttribute(posArray, 3))

    const pointsMaterial = new THREE.PointsMaterial({
      size: 0.05,
      color: 0x8b5cf6,
      transparent: true,
      blending: THREE.AdditiveBlending,
    })

    const points = new THREE.Points(pointsGeometry, pointsMaterial)
    scene.add(points)

    // Add connecting lines between random points
    const linesGeometry = new THREE.BufferGeometry()
    const linesPositions: number[] = []

    for (let i = 0; i < 30; i++) {
      const index1 = Math.floor(Math.random() * pointsCount)
      const index2 = Math.floor(Math.random() * pointsCount)

      linesPositions.push(
        posArray[index1 * 3],
        posArray[index1 * 3 + 1],
        posArray[index1 * 3 + 2],
        posArray[index2 * 3],
        posArray[index2 * 3 + 1],
        posArray[index2 * 3 + 2],
      )
    }

    linesGeometry.setAttribute("position", new THREE.Float32BufferAttribute(linesPositions, 3))

    const linesMaterial = new THREE.LineBasicMaterial({
      color: 0x8b5cf6,
      transparent: true,
      opacity: 0.3,
    })

    const lines = new THREE.LineSegments(linesGeometry, linesMaterial)
    scene.add(lines)

    // Add lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5)
    scene.add(ambientLight)

    const pointLight = new THREE.PointLight(0x8b5cf6, 1)
    pointLight.position.set(2, 3, 4)
    scene.add(pointLight)

    // Animation
    const animate = () => {
      requestAnimationFrame(animate)

      globe.rotation.y += 0.002
      points.rotation.y += 0.002
      lines.rotation.y += 0.002

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
      scene.remove(globe)
      scene.remove(points)
      scene.remove(lines)
      globeGeometry.dispose()
      globeMaterial.dispose()
      pointsGeometry.dispose()
      pointsMaterial.dispose()
      linesGeometry.dispose()
      linesMaterial.dispose()
    }
  }, [])

  return <div ref={containerRef} className="absolute inset-0 opacity-30" />
}

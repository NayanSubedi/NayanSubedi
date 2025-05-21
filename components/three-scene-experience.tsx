"use client"

import { useEffect, useRef } from "react"
import * as THREE from "three"

export function ThreeSceneExperience() {
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

    // Create a timeline visualization with connected dots
    const timelinePoints: THREE.Mesh[] = []
    const timelineCount = 5

    // Create the timeline line
    const lineGeometry = new THREE.BufferGeometry()
    const linePositions = new Float32Array(timelineCount * 3)

    for (let i = 0; i < timelineCount; i++) {
      const x = (i / (timelineCount - 1)) * 6 - 3
      linePositions[i * 3] = x
      linePositions[i * 3 + 1] = 0
      linePositions[i * 3 + 2] = 0

      // Create a sphere at each point
      const sphereGeometry = new THREE.SphereGeometry(0.1, 16, 16)
      const sphereMaterial = new THREE.MeshPhongMaterial({
        color: 0x8b5cf6,
        emissive: 0x4c1d95,
        shininess: 100,
      })

      const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial)
      sphere.position.set(x, 0, 0)
      scene.add(sphere)
      timelinePoints.push(sphere)

      // Add connecting lines to previous points
      if (i > 0) {
        const connectionGeometry = new THREE.BufferGeometry()
        const connectionPositions = new Float32Array([
          x,
          0,
          0,
          linePositions[(i - 1) * 3],
          linePositions[(i - 1) * 3 + 1],
          linePositions[(i - 1) * 3 + 2],
        ])

        connectionGeometry.setAttribute("position", new THREE.BufferAttribute(connectionPositions, 3))

        const connectionMaterial = new THREE.LineBasicMaterial({
          color: 0x6d28d9,
          linewidth: 2,
        })

        const connection = new THREE.Line(connectionGeometry, connectionMaterial)
        scene.add(connection)
      }
    }

    lineGeometry.setAttribute("position", new THREE.BufferAttribute(linePositions, 3))

    // Add floating particles around the timeline
    const particlesGeometry = new THREE.BufferGeometry()
    const particlesCount = 100

    const posArray = new Float32Array(particlesCount * 3)

    for (let i = 0; i < particlesCount * 3; i += 3) {
      posArray[i] = (Math.random() - 0.5) * 8
      posArray[i + 1] = (Math.random() - 0.5) * 4
      posArray[i + 2] = (Math.random() - 0.5) * 4
    }

    particlesGeometry.setAttribute("position", new THREE.BufferAttribute(posArray, 3))

    const particlesMaterial = new THREE.PointsMaterial({
      size: 0.02,
      color: 0x8b5cf6,
      transparent: true,
      blending: THREE.AdditiveBlending,
    })

    const particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial)
    scene.add(particlesMesh)

    // Add lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5)
    scene.add(ambientLight)

    const pointLight = new THREE.PointLight(0x8b5cf6, 1)
    pointLight.position.set(2, 3, 4)
    scene.add(pointLight)

    // Animation
    const animate = () => {
      requestAnimationFrame(animate)

      timelinePoints.forEach((point, i) => {
        // Pulse effect
        const scale = 1 + 0.2 * Math.sin(Date.now() * 0.001 + i)
        point.scale.set(scale, scale, scale)
      })

      particlesMesh.rotation.x += 0.0005
      particlesMesh.rotation.y += 0.0005

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
      timelinePoints.forEach((point) => {
        scene.remove(point)
        point.geometry.dispose()
        if (point.material instanceof THREE.Material) {
          point.material.dispose()
        } else if (Array.isArray(point.material)) {
          point.material.forEach((material) => material.dispose())
        }
      })
      scene.remove(particlesMesh)
      particlesGeometry.dispose()
      particlesMaterial.dispose()
    }
  }, [])

  return <div ref={containerRef} className="absolute inset-0 opacity-30" />
}

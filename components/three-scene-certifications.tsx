"use client"

import { useEffect, useRef } from "react"
import * as THREE from "three"

export function ThreeSceneCertifications() {
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

    // Create floating certificates (represented as planes)
    const certificates: THREE.Mesh[] = []
    const certCount = 5

    for (let i = 0; i < certCount; i++) {
      const geometry = new THREE.PlaneGeometry(1.5, 1)
      const material = new THREE.MeshPhongMaterial({
        color: 0x8b5cf6,
        transparent: true,
        opacity: 0.5,
        side: THREE.DoubleSide,
      })

      const cert = new THREE.Mesh(geometry, material)

      // Position certificates in a circular pattern
      const angle = (i / certCount) * Math.PI * 2
      const radius = 3

      cert.position.x = Math.cos(angle) * radius
      cert.position.y = Math.sin(angle) * radius
      cert.position.z = 0

      // Rotate to face center
      cert.lookAt(0, 0, 0)

      scene.add(cert)
      certificates.push(cert)

      // Add a border to each certificate
      const borderGeometry = new THREE.EdgesGeometry(geometry)
      const borderMaterial = new THREE.LineBasicMaterial({ color: 0xffffff })
      const border = new THREE.LineSegments(borderGeometry, borderMaterial)
      cert.add(border)
    }

    // Add particles
    const particlesGeometry = new THREE.BufferGeometry()
    const particlesCount = 100

    const posArray = new Float32Array(particlesCount * 3)

    for (let i = 0; i < particlesCount * 3; i += 3) {
      posArray[i] = (Math.random() - 0.5) * 8
      posArray[i + 1] = (Math.random() - 0.5) * 8
      posArray[i + 2] = (Math.random() - 0.5) * 8
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

      // Rotate the entire certificate display
      certificates.forEach((cert, i) => {
        const angle = (i / certCount) * Math.PI * 2 + Date.now() * 0.0003
        const radius = 3

        cert.position.x = Math.cos(angle) * radius
        cert.position.y = Math.sin(angle) * radius

        // Keep certificates facing the center
        cert.lookAt(0, 0, 0)
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
      certificates.forEach((cert) => {
        scene.remove(cert)
        cert.geometry.dispose()
        if (cert.material instanceof THREE.Material) {
          cert.material.dispose()
        } else if (Array.isArray(cert.material)) {
          cert.material.forEach((material) => material.dispose())
        }
      })
      scene.remove(particlesMesh)
      particlesGeometry.dispose()
      particlesMaterial.dispose()
    }
  }, [])

  return <div ref={containerRef} className="absolute inset-0 opacity-30" />
}

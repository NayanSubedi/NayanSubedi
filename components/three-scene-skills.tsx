"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

export function ThreeSceneSkills() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    // Scene setup
    const scene = new THREE.Scene();

    // Camera setup
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.z = 5;

    // Renderer setup
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0x000000, 0);
    containerRef.current.appendChild(renderer.domElement);

    // Create a sphere of points
    const sphereGeometry = new THREE.SphereGeometry(2, 32, 32);
    const sphereMaterial = new THREE.PointsMaterial({
      color: 0x8b5cf6,
      size: 0.05,
    });
    const sphere = new THREE.Points(sphereGeometry, sphereMaterial);

    // Move sphere slightly up
    sphere.position.y = 0.7;

    scene.add(sphere);

    // Create connecting lines
    const linesMaterial = new THREE.LineBasicMaterial({
      color: 0x6d28d9,
      transparent: true,
      opacity: 0.3,
    });

    const linesGeometry = new THREE.BufferGeometry();
    const linePositions: number[] = [];

    for (let i = 0; i < 50; i++) {
      const startPoint = new THREE.Vector3(
        (Math.random() - 0.5) * 4,
        (Math.random() - 0.5) * 4,
        (Math.random() - 0.5) * 4
      );

      const endPoint = new THREE.Vector3(
        (Math.random() - 0.5) * 4,
        (Math.random() - 0.5) * 4,
        (Math.random() - 0.5) * 4
      );

      linePositions.push(startPoint.x, startPoint.y, startPoint.z);
      linePositions.push(endPoint.x, endPoint.y, endPoint.z);
    }

    linesGeometry.setAttribute(
      "position",
      new THREE.Float32BufferAttribute(linePositions, 3)
    );
    const lines = new THREE.LineSegments(linesGeometry, linesMaterial);
    scene.add(lines);

    // Add lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);

    const pointLight = new THREE.PointLight(0x8b5cf6, 1);
    pointLight.position.set(2, 3, 4);
    scene.add(pointLight);

    // Animation
    const animate = () => {
      requestAnimationFrame(animate);

      sphere.rotation.x += 0.002;
      sphere.rotation.y += 0.003;

      lines.rotation.x += 0.001;
      lines.rotation.y += 0.002;

      renderer.render(scene, camera);
    };

    animate();

    // Handle window resize
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener("resize", handleResize);

    // Cleanup
    return () => {
      window.removeEventListener("resize", handleResize);
      if (containerRef.current) {
        containerRef.current.removeChild(renderer.domElement);
      }
      scene.remove(sphere);
      scene.remove(lines);
      sphereGeometry.dispose();
      sphereMaterial.dispose();
      linesGeometry.dispose();
      linesMaterial.dispose();
    };
  }, []);

  return <div ref={containerRef} className="absolute inset-0 opacity-30" />;
}

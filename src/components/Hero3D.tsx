"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

const STEEL_LIGHT = "#7FA6B8";
const CONTOUR = "#6B7864";
const RUST = "#B5652D";

function hasWebGL() {
  try {
    const canvas = document.createElement("canvas");
    return !!(
      window.WebGLRenderingContext &&
      (canvas.getContext("webgl") || canvas.getContext("experimental-webgl"))
    );
  } catch {
    return false;
  }
}

export default function Hero3D() {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount || !hasWebGL()) return; // no 3D layer — photo backdrop still shows

    const width = mount.clientWidth;
    const height = mount.clientHeight;

    const scene = new THREE.Scene();
    scene.fog = new THREE.Fog(0x14181c, 6, 16);
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.set(0, 5.5, 9);
    camera.lookAt(0, 0, 0);

    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    } catch {
      return; // WebGL unavailable — hero backdrop photo still shows, just no 3D layer
    }
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    mount.appendChild(renderer.domElement);

    const segs = 90;
    const size = 14;
    const geometry = new THREE.PlaneGeometry(size, size, segs, segs);
    const pos = geometry.attributes.position;
    for (let i = 0; i < pos.count; i++) {
      const x = pos.getX(i);
      const y = pos.getY(i);
      const h =
        Math.sin(x * 0.6) * 0.7 +
        Math.cos(y * 0.5) * 0.6 +
        Math.sin((x + y) * 0.35) * 0.9 +
        Math.cos(x * 0.9 - y * 0.4) * 0.35;
      pos.setZ(i, h);
    }
    geometry.computeVertexNormals();
    geometry.rotateX(-Math.PI / 2.4);

    const wireMat = new THREE.MeshBasicMaterial({
      color: new THREE.Color(STEEL_LIGHT),
      wireframe: true,
      transparent: true,
      opacity: 0.28,
    });
    const terrain = new THREE.Mesh(geometry, wireMat);
    scene.add(terrain);

    // Soft translucent fill beneath the wireframe so it reads as solid
    // terrain catching light, not just floating lines.
    const fillMat = new THREE.MeshBasicMaterial({
      color: new THREE.Color("#1D2329"),
      transparent: true,
      opacity: 0.55,
      side: THREE.DoubleSide,
    });
    const fill = new THREE.Mesh(geometry.clone(), fillMat);
    fill.position.y -= 0.01;
    scene.add(fill);

    const contourGroup = new THREE.Group();
    const contourGeo = new THREE.EdgesGeometry(geometry, 1);
    const contourMat = new THREE.LineBasicMaterial({
      color: new THREE.Color(CONTOUR),
      transparent: true,
      opacity: 0.1,
    });
    contourGroup.add(new THREE.LineSegments(contourGeo, contourMat));
    scene.add(contourGroup);

    const markerGeo = new THREE.SphereGeometry(0.045, 8, 8);
    const markerMat = new THREE.MeshBasicMaterial({ color: new THREE.Color(RUST) });
    const markerPositions: [number, number, number][] = [
      [-3.2, 0, -1.5],
      [1.8, 0, 2.1],
      [3.4, 0, -2.6],
    ];
    const markers = markerPositions.map(([x, , z]) => {
      const m = new THREE.Mesh(markerGeo, markerMat);
      m.position.set(x, 1.1, z);
      scene.add(m);
      return m;
    });

    let mouseX = 0;
    let mouseY = 0;
    const handleMouseMove = (e: MouseEvent) => {
      const rect = mount.getBoundingClientRect();
      mouseX = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
      mouseY = ((e.clientY - rect.top) / rect.height - 0.5) * 2;
    };
    mount.addEventListener("mousemove", handleMouseMove);

    let frame: number;
    let t = 0;
    const animate = () => {
      t += 0.0035;
      terrain.rotation.z = t * 0.15;
      fill.rotation.z = t * 0.15;
      contourGroup.rotation.z = t * 0.15;
      markers.forEach((m, i) => {
        m.position.y = 1.05 + Math.sin(t * 2 + i) * 0.08;
      });
      camera.position.x += (mouseX * 2.2 - camera.position.x) * 0.03;
      camera.position.y += (5.5 - mouseY * 0.8 - camera.position.y) * 0.03;
      camera.lookAt(0, 0, 0);
      renderer.render(scene, camera);
      frame = requestAnimationFrame(animate);
    };
    animate();

    const handleResize = () => {
      const w = mount.clientWidth;
      const h = mount.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener("resize", handleResize);

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("resize", handleResize);
      mount.removeEventListener("mousemove", handleMouseMove);
      geometry.dispose();
      wireMat.dispose();
      fillMat.dispose();
      contourGeo.dispose();
      contourMat.dispose();
      markerGeo.dispose();
      markerMat.dispose();
      renderer.dispose();
      if (mount.contains(renderer.domElement)) mount.removeChild(renderer.domElement);
    };
  }, []);

  return <div ref={mountRef} className="absolute inset-0" />;
}

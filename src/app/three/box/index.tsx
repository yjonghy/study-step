"use client"
import {useState, useRef, useEffect} from "react";
import * as THREE from 'three';
import { useFrame, ThreeElements } from "@react-three/fiber";
import { Canvas } from "@react-three/fiber";

type BoxProps = ThreeElements["mesh"];

export default function Box(props : BoxProps) {

    const meshRef = useRef<THREE.Mesh>(null!);
    const [hovered, setHover] = useState(false);
    const [active, setActive] = useState(false);

    // useFrame((state, delta) => {
    //     meshRef.current.rotation.x += delta;
    //     meshRef.current.rotation.y += delta;
    // });


    // useEffect(() => {
    //     console.log("give me a box")
    // }, [])

    return (
        <mesh
            ref={meshRef}
            scale={active ? 1.5 : 1}
            onClick={(event) => setActive(!active)}
            onPointerOver={(e) => setHover(true)}
            onPointerOut={(e) => setHover(false)}
            {...props}
        >
            <boxGeometry args={[1, 1, 1]} />
            <meshStandardMaterial color={hovered ? "hotpink" : "orange"} />
        </mesh>
    );
}

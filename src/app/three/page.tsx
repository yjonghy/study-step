"use client";
import {Canvas} from "@react-three/fiber";
import React from "react";
import Box from "@src/app/three/box";
import {OrbitControls} from '@react-three/drei';
import Hourplace from "@src/app/three/letter/hourplace";

export default function Home() {
    return (
        <div className="w-screen h-screen flex flex-col items-center justify-between p-24">
            <Canvas
                camera={{position: [0, 0, 10],}}>
                <ambientLight intensity={Math.PI / 2}/>
                <OrbitControls/>
                <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} decay={0} intensity={Math.PI}/>
                <pointLight position={[-10, -10, -10]} decay={0} intensity={Math.PI}/>

                {/*<Box position={[0, 0, 0]} />*/}


                {/*/!*x축이 0인 4개의 선*!/*/}
                {/*<Box position={[0, 1, 0]} />*/}
                {/*<Box position={[0, 2, 0]} />*/}
                {/*<Box position={[0, 3, 0]} />*/}
                {/*<Box position={[0, 4, 0]} />*/}
                {/*<Box position={[0, 5, 0]} />*/}

                {/*<Box position={[0, 0, 1]} />*/}
                {/*<Box position={[0, 0, 2]} />*/}
                {/*<Box position={[0, 0, 3]} />*/}
                {/*<Box position={[0, 0, 4]} />*/}
                {/*<Box position={[0, 0, 5]} />*/}

                {/*<Box position={[0, 5, 1]} />*/}
                {/*<Box position={[0, 5, 2]} />*/}
                {/*<Box position={[0, 5, 3]} />*/}
                {/*<Box position={[0, 5, 4]} />*/}
                {/*<Box position={[0, 5, 5]} />*/}

                {/*<Box position={[0, 1, 5]} />*/}
                {/*<Box position={[0, 2, 5]} />*/}
                {/*<Box position={[0, 3, 5]} />*/}
                {/*<Box position={[0, 4, 5]} />*/}
                {/*<Box position={[0, 5, 5]} />*/}

                {/*/!*x축이 5인 4개의 선*!/*/}
                {/*<Box position={[5, 1, 0]} />*/}
                {/*<Box position={[5, 2, 0]} />*/}
                {/*<Box position={[5, 3, 0]} />*/}
                {/*<Box position={[5, 4, 0]} />*/}
                {/*<Box position={[5, 5, 0]} />*/}

                {/*<Box position={[5, 0, 1]} />*/}
                {/*<Box position={[5, 0, 2]} />*/}
                {/*<Box position={[5, 0, 3]} />*/}
                {/*<Box position={[5, 0, 4]} />*/}
                {/*<Box position={[5, 0, 5]} />*/}

                {/*<Box position={[5, 5, 1]} />*/}
                {/*<Box position={[5, 5, 2]} />*/}
                {/*<Box position={[5, 5, 3]} />*/}
                {/*<Box position={[5, 5, 4]} />*/}
                {/*<Box position={[5, 5, 5]} />*/}

                {/*<Box position={[5, 1, 5]} />*/}
                {/*<Box position={[5, 2, 5]} />*/}
                {/*<Box position={[5, 3, 5]} />*/}
                {/*<Box position={[5, 4, 5]} />*/}
                {/*<Box position={[5, 5, 5]} />*/}

                {/*/!*위 4개의 선들을 이어주는 선*!/*/}
                {/*<Box position={[5, 0, 0]} />*/}
                {/*<Box position={[4, 0, 0]} />*/}
                {/*<Box position={[3, 0, 0]} />*/}
                {/*<Box position={[2, 0, 0]} />*/}
                {/*<Box position={[1, 0, 0]} />*/}

                {/*<Box position={[5, 5, 0]} />*/}
                {/*<Box position={[4, 5, 0]} />*/}
                {/*<Box position={[3, 5, 0]} />*/}
                {/*<Box position={[2, 5, 0]} />*/}
                {/*<Box position={[1, 5, 0]} />*/}

                {/*<Box position={[1, 5, 5]} />*/}
                {/*<Box position={[2, 5, 5]} />*/}
                {/*<Box position={[3, 5, 5]} />*/}
                {/*<Box position={[4, 5, 5]} />*/}
                {/*<Box position={[5, 5, 5]} />*/}

                {/*<Box position={[1, 0, 5]} />*/}
                {/*<Box position={[2, 0, 5]} />*/}
                {/*<Box position={[3, 0, 5]} />*/}
                {/*<Box position={[4, 0, 5]} />*/}
                {/*<Box position={[5, 0, 5]} />*/}

                <Hourplace/>
            </Canvas>
        </div>
    );
}
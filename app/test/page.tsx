'use client'

import React, { useEffect, useRef, useState } from 'react';

const EndlessCarDrivingSimulation: React.FC = () => {
  const carRef = useRef<HTMLDivElement>(null);
  const environmentRef = useRef<HTMLDivElement>(null);
  const [angle, setAngle] = useState(0);
  const [speed, setSpeed] = useState(0);
  const maxSpeed = 5;
  const acceleration = 0.1;
  const deceleration = 0.05;
  const rotationSpeed = 2;

  const keys = useRef({
    w: false,
    a: false,
    s: false,
    d: false,
  });

  const [worldPosition, setWorldPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const createTrees = () => {
      const environment = environmentRef.current;
      if (!environment) return;

      for (let i = 0; i < 50; i++) {
        const tree = document.createElement('div');
        tree.className = 'tree absolute';
        tree.style.left = `${Math.random() * 300}%`;
        tree.style.top = `${Math.random() * 120}%`;
        environment.appendChild(tree);
      }
    };

    const updateEnvironmentPosition = () => {
      if (!environmentRef.current) return;

      environmentRef.current.style.transform = `translate(${-worldPosition.x}px, ${-worldPosition.y}px) rotate(${-angle}deg)`;
    };

    const gameLoop = () => {
      if (keys.current.w && speed < maxSpeed) setSpeed((prev) => prev + acceleration);
      if (keys.current.s && speed > -maxSpeed / 2) setSpeed((prev) => prev - acceleration);
      if (!keys.current.w && !keys.current.s) {
        if (speed > 0) setSpeed((prev) => Math.max(0, prev - deceleration));
        if (speed < 0) setSpeed((prev) => Math.min(0, prev + deceleration));
      }
      if (keys.current.a) setAngle((prev) => prev - rotationSpeed);
      if (keys.current.d) setAngle((prev) => prev + rotationSpeed);

      const radians = angle * (Math.PI / 180);
      setWorldPosition((prev) => ({
        x: prev.x + Math.sin(radians) * speed,
        y: prev.y - Math.cos(radians) * speed,
      }));

      updateEnvironmentPosition();
      requestAnimationFrame(gameLoop);
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key in keys.current) keys.current[e.key as keyof typeof keys.current] = true;
    };

    const handleKeyUp = (e: KeyboardEvent) => {
      if (e.key in keys.current) keys.current[e.key as keyof typeof keys.current] = false;
    };

    createTrees();
    gameLoop();

    document.addEventListener('keydown', handleKeyDown);
    document.addEventListener('keyup', handleKeyUp);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('keyup', handleKeyUp);
    };
  }, [angle, speed, worldPosition.x, worldPosition.y]);

  return (
    <div className="relative w-screen h-screen overflow-hidden bg-blue-300">
      <div
        id="gameArea"
        className="relative w-full h-full overflow-hidden"
      >
        <div
          id="environment"
          ref={environmentRef}
          className="absolute w-[300vw] h-[300vh] left-[-100vw] top-[-100vh] transition-transform duration-100"
        >
          <div className="absolute w-full h-full bg-green-600"></div>
          <div className="absolute w-full h-[60%] top-1/2 transform -translate-y-1/2 bg-gray-600"></div>
        </div>
        <div
          id="car"
          ref={carRef}
          className="absolute w-[40px] h-[70px] left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-[url('data:image/svg+xml;utf8,<svg xmlns=&quot;http://www.w3.org/2000/svg&quot; viewBox=&quot;0 0 40 70&quot;><rect width=&quot;40&quot; height=&quot;70&quot; fill=&quot;red&quot;/><rect x=&quot;5&quot; y=&quot;10&quot; width=&quot;30&quot; height=&quot;20&quot; fill=&quot;lightblue&quot;/><rect x=&quot;5&quot; y=&quot;50&quot; width=&quot;30&quot; height=&quot;15&quot; fill=&quot;lightblue&quot;/><circle cx=&quot;10&quot; cy=&quot;65&quot; r=&quot;5&quot; fill=&quot;black&quot;/><circle cx=&quot;30&quot; cy=&quot;65&quot; r=&quot;5&quot; fill=&quot;black&quot;/></svg>')] bg-contain bg-no-repeat z-10"
        ></div>
      </div>
    </div>
  );
};

export default EndlessCarDrivingSimulation;

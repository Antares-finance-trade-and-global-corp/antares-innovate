"use client";

import React, { useState, useEffect, useRef } from "react";
import Blog from "../../components/header/Blog";
import Certificates from "../../components/header/Certificates";
import Footer from "../../components/header/Footer";
import OurServices from "../../components/header/OurServices";
import Slider from "../../components/header/Slider";
import Statistics from "../../components/header/Statistics";
import TextIntroduction from "../../components/header/TextIntroduction";
import dynamic from "next/dynamic";

const Scene = dynamic(() => import("../../components/sections/3D/Scene"), {
  ssr: false,
});

//Se hace importe dinámico a estos elementos para acelerar la carga de la Escena
const OurWork = dynamic(() => import("../../components/header/OurWork"), {
  ssr: false,
  loading: () => <div>Cargando OurWork...</div>,
});

const VideoLanding = dynamic(
  () => import("../../components/landing/VideoLanding"),
  {
    ssr: false,
    loading: () => <div>Cargando Video...</div>,
  }
);

export default function Home() {
  const [showScene, setShowScene] = useState(true);
  const sceneContainerRef = useRef(null);

  useEffect(() => {
    const currentRef = sceneContainerRef.current;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setShowScene(entry.isIntersecting);

        if (!entry.isIntersecting) {
          const canvas = document.querySelector("canvas");
          if (canvas) {
            canvas.remove();
          }
        }
      },
      {
        root: null,
        rootMargin: "0px",
        threshold: 0.1,
      }
    );

    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, []);

  return (
    <div className="">
      <div className="mx-auto scene-size relative">
        {showScene ? (
          <div className="relative" ref={sceneContainerRef}>
            <Scene />
          </div>
        ) : (
          <div className="relative">Escena 3D no visible</div>
        )}

        <div className="absolute top-[calc(50%+200px)] left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10">
          <Certificates />
        </div>
      </div>

      <div
        className="w-full min-h-screen flex items-center justify-center overflow-visible"
        style={{
          backgroundImage: `url(${"/assets/images/bg3.jpg"})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <TextIntroduction />
      </div>

      <div
        className="relative overflow-hidden"
        style={{
          borderBottomLeftRadius: "20px",
          borderBottomRightRadius: "20px",
        }}
      >
        <div className="relative z-10 mt-[100px]">
          <VideoLanding />
          <Slider />
        </div>
      </div>

      <OurServices />
      <OurWork />

      <Statistics />
      <Blog />

      <Footer />
    </div>
  );
}

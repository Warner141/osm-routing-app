import React, { useEffect, useRef } from "react";
import maplibregl from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";

export const MapComponent: React.FC = () => {
  const mapContainerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!mapContainerRef.current) return;

    const map = new maplibregl.Map({
      container: mapContainerRef.current,
      style: "https://demotiles.maplibre.org/style.json", // Demo basemap style
      center: [0, 0], // Longitude, Latitude [lng, lat]
      zoom: 10, // Starting zoom level
    });

    // Cleanup map on component unmount
    return () => {
      map.remove();
    };
  }, []);

  return <div ref={mapContainerRef} style={{ width: "80%", height: "400px" }} />;
};

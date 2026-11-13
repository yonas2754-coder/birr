"use client";

import { useEffect } from "react";

export default function LocationBootstrap() {
  useEffect(() => {
    let visitorId = localStorage.getItem("visitorId");

    if (!visitorId) {
      visitorId = crypto.randomUUID();
      localStorage.setItem("visitorId", visitorId);
    }

    if (!navigator.geolocation) {
      console.error("GPS is not supported by this browser");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude, accuracy } = position.coords;

        try {
          const response = await fetch("/api/location", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              visitorId,
              latitude,
              longitude,
              accuracy,
            }),
          });

          const result = await response.json();

          console.log("Location saved:", result);
        } catch (error) {
          console.error("Could not save location:", error);
        }
      },
      (error) => {
        console.error("Location permission or GPS error:", error.message);
      },
      {
        enableHighAccuracy: true,
        timeout: 15000,
        maximumAge: 0,
      }
    );
  }, []);

  return null;
}
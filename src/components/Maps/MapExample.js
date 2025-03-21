import React, { useEffect, useRef, useState } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet-fullscreen/dist/leaflet.fullscreen.css";
import "leaflet-fullscreen";
import "leaflet-routing-machine";

function MapExample() {
  const mapRef = useRef(null);
  const [map, setMap] = useState(null);
  const [routingControl, setRoutingControl] = useState(null);
 

  // Fetch charging stations from backend
  useEffect(() => {
    fetch("http://localhost:8081/charging-stations")
      .then((response) => response.json())
      .then((data) => setLocations(data))
      .catch((error) => {
        console.error("Error fetching charging stations:", error);
        alert("Failed to load charging stations. Please try again later.");
      });
  }, []);

  // Initialize map and markers
  const [locations, setLocations] = useState([]);
  const routeControlRef = useRef(null);

  // Fetch charging stations from backend
  useEffect(() => {
    fetch("http://localhost:8081/api/charging-stations")
      .then((response) => response.json())
      .then((data) => {
        console.log("Fetched Locations:", data);
        setLocations(data);
      })
      .catch((error) => {
        console.error("Error fetching charging stations:", error);
        alert("Failed to load charging stations.");
      });
  }, []);

  // Initialize map
  useEffect(() => {
    if (!mapRef.current || map) return;

    const initialLat = 6.9271;
    const initialLng = 79.8612;

    const newMap = L.map(mapRef.current, {
      fullscreenControl: true,
      fullscreenControlOptions: { position: "topright" },
    }).setView([initialLat, initialLng], 14);

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution: "&copy; OpenStreetMap contributors",
    }).addTo(newMap);

    // Icon status for charging stations
    const iconStatus = {
      available: new L.Icon({
        iconUrl: "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-green.png",
        iconSize: [25, 41],
        iconAnchor: [12, 41],
        popupAnchor: [1, -34],
        shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
        shadowSize: [41, 41],
      }),
      occupied: new L.Icon({
        iconUrl: "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-blue.png",
        iconSize: [25, 41],
        iconAnchor: [12, 41],
        popupAnchor: [1, -34],
        shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
        shadowSize: [41, 41],
      }),
      unplugged: new L.Icon({
        iconUrl: "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-red.png",
        iconSize: [25, 41],
        iconAnchor: [12, 41],
        popupAnchor: [1, -34],
        shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
        shadowSize: [41, 41],
      }),
    };

    // Only add markers if locations are available
    locations.forEach((location) => {
      const icon = iconStatus[location.status] || iconStatus.available;
      L.marker([location.latitude, location.longitude], { icon })
        .addTo(newMap)
        .bindPopup(`<b>${location.name}</b><br>Status: ${location.status}`);
    });

    setMap(newMap);
  }, [locations, map]);

  // Track user location and create routing to nearest available station
  useEffect(() => {
    if (!map || !locations.length) return;
  // Icons for different statuses
  const iconStatus = {
    available: new L.Icon({
      iconUrl:
        "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-green.png",
      iconSize: [25, 41],
      iconAnchor: [12, 41],
      popupAnchor: [1, -34],
      shadowUrl:
        "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
      shadowSize: [41, 41],
    }),
    occupied: new L.Icon({
      iconUrl:
        "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-blue.png",
      iconSize: [25, 41],
      iconAnchor: [12, 41],
      popupAnchor: [1, -34],
      shadowUrl:
        "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
      shadowSize: [41, 41],
    }),
    unplugged: new L.Icon({
      iconUrl:
        "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-red.png",
      iconSize: [25, 41],
      iconAnchor: [12, 41],
      popupAnchor: [1, -34],
      shadowUrl:
        "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
      shadowSize: [41, 41],
    }),
  };

  // Add markers when locations are available
  useEffect(() => {
    if (!map || locations.length === 0) return;

    // Clear existing markers to prevent duplication
    map.eachLayer((layer) => {
      if (layer instanceof L.Marker) {
        map.removeLayer(layer);
      }
    });

    locations.forEach((location) => {
      let icon;
      const status = location.status?.toLowerCase(); // Convert to lowercase
    
      if (status === "available") {
        icon = iconStatus.available;
      } else if (status === "occupied") {
        icon = iconStatus.occupied;
      } else if (status === "unplugged") {
        icon = iconStatus.unplugged;
      } else {
        icon = iconStatus.available; // Default fallback
      }
    
      L.marker([location.latitude, location.longitude], { icon })
        .addTo(map)
        .bindPopup(
          `<b>${location.name}</b><br>Status: ${location.status}<br>Charge: ${location.chargeLevel}%`
        );
    });
    

    // Add Legend
    const legend = L.control({ position: "bottomright" });
    legend.onAdd = function () {
      const div = L.DomUtil.create("div", "info legend");
      div.innerHTML += "<h4>Station Status</h4>";
      div.innerHTML += '<i style="background: green"></i> Available<br>';
      div.innerHTML += '<i style="background: blue"></i> Occupied<br>';
      div.innerHTML += '<i style="background: red"></i> Unplugged<br>';
      div.style.background = "white";
      div.style.padding = "10px";
      div.style.borderRadius = "5px";
      return div;
    };
    legend.addTo(map);
  }, [map, locations]);

  // Track user location and route to nearest available station
  useEffect(() => {
    if (!map || locations.length === 0) return;

    const carIcon = new L.Icon({
      iconUrl: "https://cdn-icons-png.flaticon.com/512/744/744465.png",
      iconSize: [40, 40],
      iconAnchor: [20, 40],
      popupAnchor: [0, -35],
    });

    let userMarker = null; // Store reference to user's marker

    if (navigator.geolocation) {
      navigator.geolocation.watchPosition(
        (position) => {
          const userLat = position.coords.latitude;
          const userLng = position.coords.longitude;

          // Remove previous user marker if it exists
          if (userMarker) {
            map.removeLayer(userMarker);
          }

          // Add new user marker
          userMarker = L.marker([userLat, userLng], { icon: carIcon })
            .addTo(map)
            .bindPopup("<b>Your Car</b>")
            .openPopup();

          if (routingControl) {
            map.removeControl(routingControl); // Remove previous routing control
          // Remove existing route before adding a new one
          if (routeControlRef.current) {
            map.removeControl(routeControlRef.current);
          }

          // Find the nearest available charging station
          const availableStations = locations.filter(
            (station) => station.status.toLowerCase() === "available"
          );
          if (availableStations.length === 0) return;

          const newRoutingControl = L.Routing.control({
            waypoints: [L.latLng(userLat, userLng), L.latLng(nearestStation.latitude, nearestStation.longitude)],
            routeWhileDragging: false,
            createMarker: () => null,
            show: false,
          let nearestStation = availableStations.reduce((prev, curr) => {
            const prevDist = Math.hypot(userLat - prev.latitude, userLng - prev.longitude);
            const currDist = Math.hypot(userLat - curr.latitude, userLng - curr.longitude);
            return prevDist < currDist ? prev : curr;
          });

          // Add routing to the nearest station
          routeControlRef.current = L.Routing.control({
            waypoints: [
              L.latLng(userLat, userLng),
              L.latLng(nearestStation.latitude, nearestStation.longitude),
            ],
            routeWhileDragging: true,
            createMarker: () => null, // Don't create markers for waypoints
            show: true,
            addWaypoints: false,
            fitSelectedRoutes: true,
            lineOptions: {
              styles: [{ color: "blue", weight: 5 }],
            },
          }).addTo(map);
        },
        (error) => {
          console.error("Error getting user location:", error);
        },
        {
          enableHighAccuracy: true,
          maximumAge: 5000,
          timeout: 10000,
        }
      );
    }
  }, [map, locations, routingControl]);
  }, [map, locations]);

  return (
    <div>
      <div ref={mapRef} style={{ height: "600px", width: "100%" }} />
      <style>
        {`
          .legend {
            background: white;
            padding: 10px;
            border-radius: 5px;
          }
          .legend i {
            width: 18px;
            height: 18px;
            display: inline-block;
            margin-right: 8px;
          }

          .leaflet-routing-container {
            background: rgba(255, 255, 255, 0.9);
            padding: 10px;
            border-radius: 8px;
            box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.2);
          }
          
          .leaflet-routing-container h2, 
          .leaflet-routing-container h3 {
            color: #333;
          }
          .leaflet-routing-container .leaflet-routing-alt {
            background: rgba(240, 240, 240, 0.9);
            padding: 8px;
            border-radius: 5px;
            margin-bottom: 5px;
          }
        `}
      </style>
    </div>
  );
}

export default MapExample;

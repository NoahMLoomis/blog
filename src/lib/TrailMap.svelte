<script>
import { onMount } from 'svelte';
import 'leaflet/dist/leaflet.css';

const { posts = [] } = $props();

const trailPath = '/Full_PCT_Simplified.geojson';

let map;
let markers = [];
let trailLayer;

onMount(async () => {
  if (!document.getElementById('map')) return;

  const L = await import('leaflet');

  const initialCenter = [44.389267, -121.999961]; // Center of PCT in Oregon as fallback
  const initialZoom = 4;

  map = L.map('map').setView(initialCenter, initialZoom);

  // Add tile layer (terrain-oriented style that works well for hiking)
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    minZoom: 5,
    attribution:
      'Map data: &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, <a href="http://viewfinderpanoramas.org">SRTM</a> | Map style: &copy; <a href="https://opentopomap.org">OpenTopoMap</a> (<a href="https://creativecommons.org/licenses/by-sa/3.0/">CC-BY-SA</a>)',
  }).addTo(map);

  // Load and display the PCT Trail
  try {
    const response = await fetch(trailPath);
    const trailData = await response.json();

    trailLayer = L.geoJSON(trailData, {
      style: {
        color: '#ff6b6b',
        weight: 3,
        opacity: 0.8,
      },
    }).addTo(map);

    // Add markers for all blog post locations
    if (posts && posts.length >= 0) {
      posts.forEach((loc) => {
        console.log(loc);
        if (loc && loc.lat && loc.lon) {
          const marker = L.marker([loc.lat, loc.lon]).addTo(map).bindPopup(`
                ${loc.title ? `<a href=${loc.id}>${loc.title}</a><br>` : ''}
                ${loc.date ? `${new Date(loc.date).toLocaleDateString()}<br>` : ''}
                ${loc.lat}, ${loc.lon}
              `);

          markers.push(marker);
        }
      });

      // If we have multiple locations, fit the map to show all markers and trail
      if (markers.length > 1 || trailLayer) {
        const group = L.featureGroup([...markers, trailLayer]);
        map.fitBounds(group.getBounds(), { padding: [30, 30] });
      }
    }
  } catch (error) {
    console.error('Error loading trail data:', error);
  }
});
</script>

<div id="map" class="mb-4 h-screen w-full rounded-lg shadow-lg"></div>

<script>
import { onMount } from 'svelte';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

let map;
let fileInput;
let activityData = null;
let stats = null;

function parseGPX(gpxText) {
  const parser = new DOMParser();
  const gpx = parser.parseFromString(gpxText, 'text/xml');

  const trackPoints = Array.from(gpx.getElementsByTagName('trkpt')).map((point) => ({
    lat: parseFloat(point.getAttribute('lat')),
    lon: parseFloat(point.getAttribute('lon')),
    elevation: parseFloat(point.getElementsByTagName('ele')[0]?.textContent || 0),
    time: new Date(point.getElementsByTagName('time')[0]?.textContent || 0),
  }));

  const metadata = {
    name: gpx.getElementsByTagName('name')[0]?.textContent || 'Unnamed Activity',
    time: new Date(
      gpx.getElementsByTagName('metadata')[0]?.getElementsByTagName('time')[0]?.textContent || 0,
    ),
    type: gpx.getElementsByTagName('type')[0]?.textContent || 'Activity',
  };

  return { trackPoints, metadata };
}

onMount(() => {
  // Initialize map
  map = L.map('map').setView([0, 0], 2);
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '© OpenStreetMap contributors',
  }).addTo(map);
});

function calculateStats(trackPoints) {
  if (!trackPoints.length) return null;

  let totalDistance = 0;
  let totalElevationGain = 0;
  const startTime = trackPoints[0].time;
  const endTime = trackPoints[trackPoints.length - 1].time;
  const duration = (endTime - startTime) / 1000 / 60; // in minutes

  // Calculate distance and elevation
  for (let i = 1; i < trackPoints.length; i++) {
    const prev = trackPoints[i - 1];
    const curr = trackPoints[i];

    // Distance using Haversine formula
    const R = 6371; // Earth's radius in km
    const dLat = ((curr.lat - prev.lat) * Math.PI) / 180;
    const dLon = ((curr.lon - prev.lon) * Math.PI) / 180;
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos((prev.lat * Math.PI) / 180) *
        Math.cos((curr.lat * Math.PI) / 180) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = R * c;

    totalDistance += distance;

    // Elevation gain
    const elevDiff = curr.elevation - prev.elevation;
    if (elevDiff > 0) totalElevationGain += elevDiff;
  }

  return {
    distance: totalDistance.toFixed(2),
    duration: duration.toFixed(0),
    elevationGain: totalElevationGain.toFixed(0),
    averageSpeed: ((totalDistance / duration) * 60).toFixed(2),
  };
}

async function handleFileSelect(event) {
  const file = event.target.files[0];
  if (!file) return;

  const text = await file.text();
  const { trackPoints, metadata } = parseGPX(text);
  activityData = { trackPoints, metadata };

  // Calculate stats
  stats = calculateStats(trackPoints);

  // Clear existing layers
  map.eachLayer((layer) => {
    if (layer instanceof L.Polyline || layer instanceof L.Marker) {
      map.removeLayer(layer);
    }
  });

  // Draw route
  if (trackPoints.length > 0) {
    const route = trackPoints.map((point) => [point.lat, point.lon]);
    const polyline = L.polyline(route, { color: 'red', weight: 3 }).addTo(map);

    // Add start and end markers
    L.marker(route[0], { title: 'Start' }).addTo(map).bindPopup('Start');
    L.marker(route[route.length - 1], { title: 'End' })
      .addTo(map)
      .bindPopup('End');

    // Fit map to route bounds
    map.fitBounds(polyline.getBounds());
  }
}
</script>

/ export // src/routes/+page.svelte
<div class="mx-auto max-w-4xl p-4">
  <div class="mb-4">
    <input
      type="file"
      accept=".gpx"
      bind:this={fileInput}
      on:change={handleFileSelect}
      class="block w-full text-sm text-gray-500 file:mr-4 file:rounded-full file:border-0 file:bg-blue-50 file:px-4 file:py-2 file:text-sm file:font-semibold file:text-blue-700 hover:file:bg-blue-100"
    />
  </div>

  <div id="map" class="mb-4 h-96 w-full rounded-lg shadow-lg"></div>

  {#if stats}
    <div class="mb-4 grid grid-cols-2 gap-4 md:grid-cols-4">
      <div class="rounded-lg bg-white p-4 shadow">
        <h3 class="text-sm font-medium text-gray-500">Distance</h3>
        <p class="text-2xl font-bold">{stats.distance} km</p>
      </div>
      <div class="rounded-lg bg-white p-4 shadow">
        <h3 class="text-sm font-medium text-gray-500">Duration</h3>
        <p class="text-2xl font-bold">{stats.duration} min</p>
      </div>
      <div class="rounded-lg bg-white p-4 shadow">
        <h3 class="text-sm font-medium text-gray-500">Elevation Gain</h3>
        <p class="text-2xl font-bold">{stats.elevationGain} m</p>
      </div>
      <div class="rounded-lg bg-white p-4 shadow">
        <h3 class="text-sm font-medium text-gray-500">Avg Speed</h3>
        <p class="text-2xl font-bold">{stats.averageSpeed} km/h</p>
      </div>
    </div>
  {/if}

  {#if activityData}
    <div class="rounded-lg bg-white p-4 shadow">
      <h2 class="mb-2 text-xl font-bold">{activityData.metadata.name}</h2>
      <p class="text-gray-600">
        Date: {activityData.metadata.time.toLocaleDateString()}
      </p>
      <p class="text-gray-600">
        Type: {activityData.metadata.type}
      </p>
    </div>
  {/if}
</div>

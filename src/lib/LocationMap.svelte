<script>
    import { onMount } from 'svelte';
    import 'leaflet/dist/leaflet.css';

    const { location } = $props();
    let map;

    console.log("Before onMount:", location); // This should log before `onMount`

    onMount(async () => {
        console.log("Inside onMount"); // If this doesn't log, onMount isn't running
        console.log("Location:", location);
      
        if (!location) return;
      
        const L = await import('leaflet');
      
        console.log("Leaflet imported:", L); // Check if Leaflet loads
      
        if (!map) {
            map = L.map('map').setView([37.525929, -120.043939], 5);
          
            L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                maxZoom: 19,
                attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
            }).addTo(map);
          
            console.log("Map initialized:", map);
        }
    });
</script>

{#if location }
<div id="map" class="mb-4 h-96 w-full rounded-lg shadow-lg"></div>
{/if}


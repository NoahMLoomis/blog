<script>
import TrailMap from '$lib/TrailMap.svelte';

export let data;
const { posts, weatherData } = data;
</script>

<div class="prose mt-8">
  This map shows all the locations from where I've made a blog post. Click on the marker to see the
  blog post in question
</div>
<br />

<TrailMap {posts} />

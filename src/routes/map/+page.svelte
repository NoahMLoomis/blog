<script>
import TrailMap from '$lib/TrailMap.svelte';

export let data;
const { posts } = data;
</script>

<h1 class="mb-6 text-3xl font-bold">Pacific Crest Trail Journey</h1>

<div class="prose mt-8">
  This map shows all the locations from where I've made a blog post. Click on the marker to see the
  blog post in question
</div>

<TrailMap {posts} />

import { loadPosts } from '$lib/content';

export async function load() {
  const posts = loadPosts();

  const postsWithLocations = posts.filter((post) => post.lat && post.lon);

  const response = await fetch('https://api.weather.gov/points/33.8148,-116.6794');
  const weatherData = await response.json();

  return {
    posts: postsWithLocations,
    weatherData,
    //trailData,
  };
}

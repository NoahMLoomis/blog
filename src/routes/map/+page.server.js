import { loadPosts} from '$lib/content';

export const ssr = false;
export const csr = true;

export async function load() {
  const posts = loadPosts();

  const postsWithLocations = posts.filter(post =>
    post.lat && post.lon
  );

  return {
    posts: postsWithLocations
  };
}

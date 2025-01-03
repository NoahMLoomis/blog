import { loadPage } from '$lib/content';

export async function load() {
  const post = loadPage('home');

  return {
    post,
  };
}

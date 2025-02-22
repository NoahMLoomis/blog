import { error } from '@sveltejs/kit';
import { loadPage } from '$lib/content';

export const ssr = false;
export const csr = true;

export async function load({ params }) {
  const post = loadPage(params.slug);

  if (!post) {
    error(404, { message: 'Not Found' });
  }

  return {
    post,
  };
}

<script>
import '/src/css/index.css';
import config from '/src/config';
import Logo from '$lib/Logo.svelte';
import PageLoader from './PageLoader.svelte';
import { injectAnalytics } from '@vercel/analytics/sveltekit';

let { children } = $props();

injectAnalytics();
</script>

<svelte:head>
  <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
  <link rel="alternate" type="application/rss+xml" title="RSS" href="/feed.xml" />
</svelte:head>

<PageLoader />

<div class="max-w-container mx-auto flex min-h-screen flex-col">
  <header class="flex flex-row justify-between px-4 py-8 md:p-8">
    <figure>
      <a class="flex flex-row items-center gap-4" href="/" title={config.siteTitle}>
        <Logo />
        <!-- <!-- display site title next to the logo -->
        <h1 class="text-4xl leading-none tracking-tight">{config.siteTitle}</h1>
      </a>
    </figure>

    <h2 class="flex flex-row items-center gap-4 font-bold">
      <a href="/map">Progress Tracker</a>
      <a href="/archive">All Posts</a>
    </h2>
  </header>

  <main class="flex-1">
    {@render children()}
  </main>

  <footer class="mt-8">
    <div class="copy px-4 py-8 text-xl md:p-8">
      <p>
        &copy; {new Date().getFullYear()}
        {config.siteTitle} <span class="mx-2 inline-block text-current/20">|</span> Built with
        <a href="https://tablogdemo.vercel.app/">Tablog Theme</a>
        for SvelteKit by
        <a href="https://www.jakubpelak.com/">Jakub Pelák</a>
      </p>
    </div>
  </footer>
</div>

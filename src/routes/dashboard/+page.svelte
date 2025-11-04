<script lang="ts">
	import { enhance } from '$app/forms';
	import type { PageServerData } from './$types';
	import { LogOut, Plus } from '@lucide/svelte';
	let { data }: { data: PageServerData } = $props();
	  import { Button } from "$lib/components/ui/button/index.js";


	let username = data?.user?.username ?? 'Guest';
	let userid = data?.user?.id ?? '—';
	let initial = username?.charAt(0)?.toUpperCase() ?? 'G';

	const bubbles = [
		{ size: 220, top: '5%', left: '10%', delay: '0s', opacity: 0.18, hue: 200 },
		{ size: 140, top: '65%', left: '75%', delay: '2s', opacity: 0.14, hue: 280 },
		{ size: 100, top: '30%', left: '80%', delay: '1s', opacity: 0.12, hue: 160 },
		{ size: 180, top: '75%', left: '15%', delay: '3s', opacity: 0.10, hue: 330 },
		{ size: 60, top: '12%', left: '55%', delay: '1.5s', opacity: 0.10, hue: 45 },
	];
</script>

<svelte:head>
	<title>Dashboard</title>
</svelte:head>

<div class="min-h-screen grid place-items-center relative overflow-hidden p-12">
	{#each bubbles as b}
		<span
			class="absolute rounded-full filter blur-lg mix-blend-screen will-change-transform animate-float"
			style="
				width: {b.size}px;
				height: {b.size}px;
				top: {b.top};
				left: {b.left};
				animation-delay: {b.delay};
				opacity: {b.opacity};
				background: radial-gradient(circle at 30% 30%, hsla({b.hue},90%,65%,0.95), hsla({b.hue+30},85%,55%,0.55));
			"
			aria-hidden="true"
		></span>
	{/each}

	<main class="flex items-center gap-5 p-7 rounded-2xl bg-white bg-opacity-90 shadow-lg backdrop-blur-lg border border-white border-opacity-20 max-w-2xl w-full relative z-10">
		<div class="min-w-24 min-h-24 rounded-full bg-radial-to-r! from-blue-400! to-purple-600 flex items-center justify-center text-pink-400 font-bold text-5xl shadow-lg transition-transform duration-220 -hover:translate-y-1.5 hover:scale-105">
			{initial}
		</div>
		<div class="flex-1 min-w-0">
			<h1 class="text-2xl mb-1 flex items-baseline gap-2">
				Hi, <span class="bg-radial-to-r! from-pink-400! to-transparent rounded-full px-2 py-1 shadow-md font-bold">{username}</span>
			</h1>
			<p class="text-gray-600 text-sm mb-4">Your user ID is <span class="font-semibold text-gray-800 bg-gray-200 rounded px-1">{userid}</span>.</p>


              <div class="flex flex-row justify-evenly gap-4 items-center">
			<Button href="/add-book" class="gap-2 appearance-none border-none py-2 px-4 rounded-full font-bold text-white bg-radial-to-r! from-pink-400! to-yellow-400! shadow-lg! transition-transform duration-180 hover:-translate-y-1 active:-translate-y-px focus:outline-none focus:ring-2 focus:ring-purple-300">
				<Plus />	Add New Book
			</Button>

			<form method="post" action="?/logout" use:enhance class="mt-1">
				<Button type="submit" class="appearance-none border-none py-2 px-4 rounded-full font-bold text-white bg-radial-to-r! from-pink-400! to-yellow-400! shadow-lg! transition-transform duration-180 hover:-translate-y-1! active:-translate-y-px focus:outline-none focus:ring-2 focus:ring-purple-300">
					<LogOut /> Sign out
				</Button>
			</form>
			</div>
		</div>
	</main>
</div>

<style>
	@keyframes float {
		0% { transform: translateY(0) translateX(0) scale(1); }
		50% { transform: translateY(-24px) translateX(8px) scale(1.03); }
		100% { transform: translateY(0) translateX(0) scale(1); }
	}

	.animate-float {
		animation: float 8s ease-in-out infinite;
	}
</style>

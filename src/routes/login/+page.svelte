<script lang='ts'>
	import { enhance } from '$app/forms';
	import type { ActionData } from './$types';

	let { form }: { form: ActionData } = $props();

	let hide = $state(true);

	let EyeIcon = $derived(hide ? '👁️' : '🙈');
</script>

<div class="flex items-center justify-center min-h-[60vh] p-6 bg-pink-50">
	<!-- Card -->
	<div class="relative w-full max-w-md bg-white/90 backdrop-blur-sm rounded-2xl shadow-2xl border border-pink-200 overflow-hidden">
		<!-- Decorative floral corners (inline svg for a flowery feel) -->
		<svg class="absolute top-0 left-0 -translate-x-1/2 -translate-y-1/2 w-40 h-40 opacity-30 pointer-events-none" viewBox="0 0 120 120" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
			<g fill="#FCE7F3">
				<circle cx="20" cy="20" r="18"/>
				<circle cx="40" cy="10" r="6"/>
				<circle cx="10" cy="40" r="6"/>
			</g>
		</svg>
		<svg class="absolute bottom-0 right-0 translate-x-1/2 translate-y-1/2 w-40 h-40 opacity-30 pointer-events-none" viewBox="0 0 120 120" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
			<g fill="#FCE7F3">
				<circle cx="100" cy="100" r="18"/>
				<circle cx="80" cy="110" r="6"/>
				<circle cx="110" cy="80" r="6"/>
			</g>
		</svg>

		<div class="p-6">
			<!-- Logo + heading -->
			<div class="flex flex-col items-center gap-3 mb-4">
				<img src="/logopng.png" alt="Logo" class="w-20 h-20 rounded-full object-cover border-4 border-white shadow-md"/>
				<h2 class="text-2xl font-semibold text-pink-600">Welcome back!</h2>
				<p class="text-sm text-pink-500/80">Login to access your library</p>
			</div>

			<form method="post" action="?/login" use:enhance class="space-y-4">
				<label class="block">
					<span class="text-sm font-medium text-pink-600">Username</span>
					<input
						name="username"
						autocomplete="username"
						placeholder="your username"
						class="mt-2 w-full px-4 py-2 rounded-xl border border-pink-200 bg-white focus:outline-none focus:ring-2 focus:ring-pink-300 focus:border-pink-400 shadow-sm transition"
					/>
				</label>

				<label class="block">
					<span class="text-sm font-medium text-pink-600">Password</span>
					<div class="relative">
					<input
						type={hide ? 'password' : 'text'}
						name="password"
						autocomplete="current-password"
						
						class="mt-2 w-full px-4 py-2 rounded-xl border border-pink-200 bg-white focus:outline-none focus:ring-2 focus:ring-pink-300 focus:border-pink-400 shadow-sm transition"
					/>

					<button
						type="button"
						class="absolute top-1/2 right-4 -translate-y-1/2 text-pink-400 hover:text-pink-600 transition"
						onclick={() => (hide = !hide)}
						tabindex="-1"
						aria-label={hide ? 'Show password' : 'Hide password'}
					>
						{EyeIcon} </button> </div>

				</label>

				<div class="flex items-center justify-between gap-3">
					<button
						type="submit"
						class="flex-1 px-4 py-2 rounded-xl font-semibold text-white bg-gradient-to-br from-pink-500 to-pink-600 hover:from-pink-600 hover:to-pink-700 transition-shadow shadow-md"
					>
						Login
					</button>

					<button
						type="submit"
						formaction="?/register"
						class="flex-1 px-4 py-2 rounded-xl font-semibold text-pink-600 bg-white border border-pink-200 hover:bg-pink-50 transition"
					>
						Register
					</button>
				</div>

				
			</form>
		</div>
	</div>
</div>
<p style='color: red'>{form?.message ?? ''}</p>

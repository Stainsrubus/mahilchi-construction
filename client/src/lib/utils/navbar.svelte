<script lang="ts">
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	import { activeSection } from '$lib/stores';
	import { fade } from 'svelte/transition';

	const navItems = [
		{ id: 'home', label: 'Home', href: '/' },
		{ id: 'about', label: 'About', href: '/about' },
		{ id: 'service', label: 'Service', href: '/services' },
		{ id: 'projects', label: 'Projects', href: '/projects' },
		{ id: 'contact', label: 'Contact Us', href: '/contact' }
	];

	const isActive = (itemId: string) => {
		const currentPath = $page.url.pathname;
		
		// Direct path matching - only one item should be active at a time
		if (itemId === 'home') {
			return currentPath === '/';
		}
		if (itemId === 'about') {
			return currentPath === '/about';
		}
		if (itemId === 'service') {
			return currentPath === '/services';
		}
		if (itemId === 'projects') {
			return currentPath === '/projects' || currentPath.startsWith('/projects/');
		}
		if (itemId === 'contact') {
			return currentPath === '/contact';
		}
		
		return false;
	};

	const handleNavigation = (itemId: string, href: string) => {
		goto(href);
	};
</script>

<nav
	class="bg-primary text-white fixed w-full z-10"
	in:fade={{ duration: 500 }}
	out:fade={{ duration: 500 }}
>
	<div class="container mx-auto h-16 px-4 py-3 flex justify-between items-center">
		<div class="text-xl font-bold">
			<img src="/images/Logo.png" class="h-10" alt="">
		</div>
		
		<div class="hidden md:flex space-x-6 font-medium text-sm justify-between items-center">
			{#each navItems as item}
				<a 
					href={item.href}
					on:click|preventDefault={() => handleNavigation(item.id, item.href)}
					class="relative transition-colors duration-300 cursor-pointer px-2 py-1"
					class:active={isActive(item.id)}
					class:hover-style={!isActive(item.id)}
				>
					{item.label}
				</a>
			{/each}
			
			<button
				class="rounded-full py-[10px] px-[22px] bg-[linear-gradient(87.95deg,#F2960F_0.88%,#F9BF30_10.7%,#F9BF30_94.21%,#FAA21A_99.12%),linear-gradient(180deg,rgba(255,255,255,0.371)_-5.09%,rgba(255,255,255,0)_20.37%)] text-[#040B14] font-medium text-base"
			>
				+91 1234567890
			</button>
		</div>
		
		<button class="md:hidden">
			<svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
				<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
			</svg>
		</button>
	</div>
</nav>

<style>
	.active {
		color: #facc15; /* yellow-400 */
	}

	.hover-style:hover {
		color: #facc15; /* yellow-400 */
	}

	/* Ensure active items don't get hover styles */
	.active:hover {
		color: #facc15;
	}
</style>
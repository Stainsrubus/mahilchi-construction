<script lang="ts">
	import Icon from "@iconify/svelte";
	import { onMount } from "svelte";

	// Import all images from lib/images
	import img8 from "$lib/images/8.webp";
	import img1 from "$lib/images/1.webp";
	import home3 from "$lib/images/home3.webp";
	import home4 from "$lib/images/home4.webp";
	import img5 from "$lib/images/5.webp";
	import img4 from "$lib/images/4.webp";
	import img3 from "$lib/images/3.webp";
	import img6 from "$lib/images/6.webp";
	import img9 from "$lib/images/9.webp";

	// Animation refs
	let footerElement: HTMLElement;
	let leftSection: HTMLElement;
	let linksSection: HTMLElement;
	let services1: HTMLElement;
	let services2: HTMLElement;
	let projects: HTMLElement;

	onMount(() => {
		setInitialState();
		const observer = new IntersectionObserver(
			(entries) => {
				entries.forEach((entry) => {
					if (entry.isIntersecting) {
						animateIn();
					} else {
						animateOut();
					}
				});
			},
			{
				threshold: 0.2,
				rootMargin: "0px 0px -100px 0px"
			}
		);
		if (footerElement) observer.observe(footerElement);
		return () => {
			if (footerElement) observer.unobserve(footerElement);
		};
	});

	function setInitialState() {
		const elements = [leftSection, linksSection, services1, services2, projects];
		elements.forEach((el) => {
			if (el) {
				el.style.opacity = "0";
				el.style.transform = "translateY(50px)";
				el.style.transition = "all 0.8s ease-out";
			}
		});
	}

	function animateIn() {
		const elements = [
			{ el: leftSection, delay: 100 },
			{ el: linksSection, delay: 100 },
			{ el: services1, delay: 100 },
			{ el: services2, delay: 100 },
			{ el: projects, delay: 200 }
		];
		elements.forEach(({ el, delay }) => {
			if (el) {
				setTimeout(() => {
					el.style.opacity = "1";
					el.style.transform = "translateY(0)";
				}, delay);
			}
		});
	}

	function animateOut() {
		const elements = [leftSection, linksSection, services1, services2, projects];
		elements.forEach((el) => {
			if (el) {
				el.style.opacity = "0";
				el.style.transform = "translateY(50px)";
			}
		});
	}
</script>

<style>
	.transformed-square {
		transform: rotate(45deg) scale(.4);
	}
</style>

<footer bind:this={footerElement} class="bg-gray-100 py-12 !relative overflow-hidden">
	<div class="transformed-square absolute -top-100 -left-90 bg-[#4584FF]/5 rounded-[30%] w-[900px] h-[900px]"></div>
	<div class="container mx-auto px-4 z-30">
		<!-- Footer Content -->
		<div class="flex flex-col md:flex-row justify-between gap-8">
			<!-- Left Section -->
			<div bind:this={leftSection} class="w-full md:w-1/4 mb-8 md:mb-0">
				<p class="text-gray-600 mb-6">
					We are a trusted construction company, delivering quality residential, commercial, and industrial projects. Our focus is on strong design, timely completion, and lasting customer satisfaction. Connect with us to build your future.
				</p>
				<div class="flex space-x-4">
					<a href="#"><Icon icon="ic:outline-facebook" width="24" height="24" /></a>
					<a href="#"><Icon icon="mdi:instagram" width="24" height="24" /></a>
					<a href="#"><Icon icon="mdi:linkedin" width="24" height="24" /></a>
				</div>
			</div>
			<!-- Website Links -->
			<div bind:this={linksSection} class="w-full md:w-1/4">
				<h3 class="text-lg font-semibold text-gray-800 mb-4">Website Links</h3>
				<ul class="space-y-2">
					<li><a href="/" class="text-gray-600 hover:text-blue-600">Home</a></li>
					<li><a href="/about" class="text-gray-600 hover:text-blue-600">About</a></li>
					<li><a href="/services" class="text-gray-600 hover:text-blue-600">Services</a></li>
					<li><a href="/contact" class="text-gray-600 hover:text-blue-600">Contact</a></li>
				</ul>
			</div>
			<!-- Services 1 -->
			<div bind:this={services1} class="w-full md:w-1/4">
				<h3 class="text-lg font-semibold text-gray-800 mb-4">Services</h3>
				<ul class="space-y-2">
					<li><a href="#" class="text-gray-600 hover:text-blue-600">Home Renovation</a></li>
					<li><a href="#" class="text-gray-600 hover:text-blue-600">Architecture</a></li>
					<li><a href="#" class="text-gray-600 hover:text-blue-600">Interior Design</a></li>
					<li><a href="#" class="text-gray-600 hover:text-blue-600">Consultation</a></li>
				</ul>
			</div>
			<!-- Services 2 -->
			<div bind:this={services2} class="w-full md:w-1/4">
				<h3 class="text-lg font-semibold text-gray-800 mb-4">Services</h3>
				<ul class="space-y-2">
					<li><a href="#" class="text-gray-600 hover:text-blue-600">Exterior Design</a></li>
					<li><a href="#" class="text-gray-600 hover:text-blue-600">Landscaping</a></li>
					<li><a href="#" class="text-gray-600 hover:text-blue-600">Project Management</a></li>
					<li><a href="#" class="text-gray-600 hover:text-blue-600">Custom Solutions</a></li>
				</ul>
			</div>
			<!-- Top Projects -->
			<div bind:this={projects} class="w-full md:w-1/4">
				<h3 class="text-lg font-semibold text-gray-800 mb-4">Top Projects</h3>
				<div class="grid grid-cols-3 md:gap-2 gap-3">
					<img src={img8} loading="lazy" alt="Project 1" class="w-full h-16 object-cover rounded" />
					<img src={img1} loading="lazy"  alt="Project 2" class="w-full h-16 object-cover rounded" />
					<img src={home3} loading="lazy"  alt="Project 3" class="w-full h-16 object-cover rounded" />
					<img src={home4} loading="lazy"  alt="Project 4" class="w-full h-16 object-cover rounded" />
					<img src={img5} loading="lazy"  alt="Project 5" class="w-full h-16 object-cover rounded" />
					<img src={img4} loading="lazy"  alt="Project 6" class="w-full h-16 object-cover rounded" />
					<img src={img3} loading="lazy"  alt="Project 4" class="w-full h-16 object-cover rounded" />
					<img src={img6} loading="lazy"  alt="Project 5" class="w-full h-16 object-cover rounded" />
					<img src={img9} loading="lazy"  alt="Project 6" class="w-full h-16 object-cover rounded" />
				</div>
			</div>
		</div>
		<!-- Footer Bottom -->
		<div class="mt-12 pt-6 border-t border-gray-200 text-center text-gray-500 text-sm">
			<a href="https://www.wenoxo.in/" target="_blank">©2025 Wenoxo Technologies. All rights reserved</a>
		</div>
	</div>
</footer>

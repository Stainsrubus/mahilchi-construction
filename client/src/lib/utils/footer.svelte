<script lang="ts">
	import Icon from "@iconify/svelte";
	import { onMount } from "svelte";

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
			{ el: linksSection, delay: 200 },
			{ el: services1, delay: 300 },
			{ el: services2, delay: 400 },
			{ el: projects, delay: 500 }
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
			<div bind:this={leftSection} class="w-full z-20 md:w-1/4 mb-8 md:mb-0">
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
					<li><a href="#" class="text-gray-600 hover:text-blue-600">Home</a></li>
					<li><a href="#" class="text-gray-600 hover:text-blue-600">About</a></li>
					<li><a href="#" class="text-gray-600 hover:text-blue-600">Services</a></li>
					<li><a href="#" class="text-gray-600 hover:text-blue-600">Contact</a></li>
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
					<img src="/images/Rectangle 3.png" alt="Project 1" class="w-full h-16 object-cover rounded" />
					<img src="/images/Rectangle 4.png" alt="Project 2" class="w-full h-16 object-cover rounded" />
					<img src="/images/Rectangle 5.png" alt="Project 3" class="w-full h-16 object-cover rounded" />
					<img src="/images/Rectangle 6.png" alt="Project 4" class="w-full h-16 object-cover rounded" />
					<img src="/images/Rectangle 7.png" alt="Project 5" class="w-full h-16 object-cover rounded" />
					<img src="/images/Rectangle 8.png" alt="Project 6" class="w-full h-16 object-cover rounded" />
					<img src="/images/Rectangle 9.png" alt="Project 4" class="w-full h-16 object-cover rounded" />
					<img src="/images/Rectangle 10.png" alt="Project 5" class="w-full h-16 object-cover rounded" />
					<img src="/images/Rectangle 11.png" alt="Project 6" class="w-full h-16 object-cover rounded" />
				</div>
			</div>
		</div>

		<!-- Footer Bottom -->
		<div class="mt-12 pt-6 border-t border-gray-200 text-center text-gray-500 text-sm">
			<p>©2025 Wenoxo Technologies. All rights reserved
			</p>
		</div>
	</div>
</footer>

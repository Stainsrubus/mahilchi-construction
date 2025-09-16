<script lang="ts">
    import { onMount } from 'svelte';
    import productsData from '$lib/utils/productData.json';
    import { goto } from '$app/navigation';

    // Assuming you have a utility to import images dynamically or map them from $lib
    // For example, if your images are named as product1.jpg, product2.jpg, etc., in $lib/images/products/
    // You can dynamically import them or use a mapping function.
    // For this example, I'll assume you have a way to map product.mainImage to the correct import path.

    let products = productsData.products;

    let productElements: HTMLElement[] = [];
    let observers: IntersectionObserver[] = [];

    onMount(() => {
        // Set initial state immediately
        setInitialState();

        // Create individual observers for each product card
        productElements.forEach((element, index) => {
            if (element) {
                const observer = new IntersectionObserver(
                    (entries) => {
                        entries.forEach((entry) => {
                            if (entry.isIntersecting) {
                                animateCardIn(entry.target as HTMLElement);
                            } else {
                                animateCardOut(entry.target as HTMLElement);
                            }
                        });
                    },
                    {
                        threshold: 0.1,
                        rootMargin: '0px 0px -50px 0px'
                    }
                );
                observer.observe(element);
                observers.push(observer);
            }
        });

        return () => {
            // Clean up all observers
            observers.forEach(observer => observer.disconnect());
        };
    });

    function setInitialState() {
        productElements.forEach(el => {
            if (el) {
                el.style.opacity = '0';
                el.style.transform = 'translateY(50px)';
                el.style.transition = 'all 0.8s ease-out';
            }
        });
    }

    function animateCardIn(element: HTMLElement) {
        if (element) {
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        }
    }

    function animateCardOut(element: HTMLElement) {
        if (element) {
            element.style.opacity = '0';
            element.style.transform = 'translateY(50px)';
        }
    }
</script>

<div class="bg-white md:py-20 py-10 px-4 sm:px-6 lg:px-8">
    <div class="container mx-auto">
        <!-- Product Cards Grid -->
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 gap-12">
            {#each products as product (product.id)}
                <!-- svelte-ignore a11y_click_events_have_key_events -->
                <!-- svelte-ignore a11y_no_static_element_interactions -->
                <div
                    onclick={() => goto(`/projects/${product.id}`)}
                    bind:this={productElements[product.id - 1]}
                    class="bg-white rounded-lg overflow-hidden shadow-lg transition-all duration-300 hover:shadow-xl group"
                >
                    <!-- Product Image -->
                    <div class="md:h-96 h-72 overflow-hidden">
                        <img
                            src={product.mainImage}
                            alt={product.title}
                            loading="lazy"
                            class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                        />
                    </div>

                    <!-- Product Content -->
                    <div class="p-8">
                        <!-- Category -->
                        <p class="text-sm font-semibold text-blue-600 uppercase tracking-wide mb-2">
                            {product.category}
                        </p>

                        <!-- Title -->
                        <h3 class="text-2xl font-bold text-gray-900 mb-4">
                            {product.title}
                        </h3>

                        <!-- Description -->
                        <p class="text-gray-600 leading-relaxed mb-6 md:hidden">
                            {product.description.length > 200 ? `${product.description.slice(0, 200)}...` : product.description}
                        </p>
                        <p class="hidden md:block">
                            {product.description}
                        </p>

                        <button class="inline-flex items-center text-blue-600 font-semibold hover:text-blue-800 transition-colors">
                            Read More
                            <svg class="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
                            </svg>
                        </button>
                    </div>
                </div>
            {/each}
        </div>
    </div>
</div>

<style>
    /* Custom styles for better appearance */
    .group:hover .group-hover\:scale-110 {
        transform: scale(1.1);
    }

    /* Smooth transitions */
    .transition-transform {
        transition-property: transform;
        transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
        transition-duration: 300ms;
    }

    /* Responsive adjustments */
    @media (max-width: 768px) {
        .grid {
            gap: 2rem;
        }

        .p-8 {
            padding: 1.5rem;
        }

        .md\:h-96 {
            height: 16rem;
        }
    }

    @media (max-width: 640px) {
        .grid {
            grid-template-columns: 1fr;
        }

        .text-2xl {
            font-size: 1.5rem;
        }
    }
</style>

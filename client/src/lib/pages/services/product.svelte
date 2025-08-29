<script lang="ts">
    import { onMount } from 'svelte';

    // Array of 10 project images (replace with actual image paths)
    const images = [
        '/images/home3.png',
        '/images/interior1.png',
        '/images/interior2.png',
        '/images/interior3.png',
        '/images/home1.png',
        '/images/home2.png',
     
    ];

    let carousel: HTMLDivElement;
    let scrollInterval: number;
    
    // Animation elements
    let sectionElement: HTMLElement;
    let headerContent: HTMLElement;
    let carouselContainer: HTMLElement;

    onMount(() => {
        // Set initial state immediately
        setInitialState();
        
        // Carousel scroll functionality
        const scrollSpeed = 1; // Adjust speed as needed
        const scrollWidth = carousel.scrollWidth / 2; // Half the total width for continuous effect

        const startScroll = () => {
            scrollInterval = setInterval(() => {
                carousel.scrollLeft += scrollSpeed;
                if (carousel.scrollLeft >= scrollWidth) {
                    carousel.scrollLeft = 0; // Reset to start for continuous loop
                }
            }, 20); // Adjust interval for smoother/faster scrolling
        };

        startScroll();

        // Intersection Observer for animations
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        // First reset to initial state, then animate in
                        animateOut();
                        setTimeout(() => {
                            animateIn();
                        }, 50);
                    } else {
                        // Reset elements when leaving view
                        animateOut();
                    }
                });
            },
            {
                threshold: 0.2,
                rootMargin: '0px 0px -100px 0px'
            }
        );

        if (sectionElement) {
            observer.observe(sectionElement);
        }

        return () => {
            clearInterval(scrollInterval);
            if (sectionElement) {
                observer.unobserve(sectionElement);
            }
        };
    });

    function setInitialState() {
        const elements = [headerContent, carouselContainer];
        elements.forEach(el => {
            if (el) {
                el.style.opacity = '0';
                el.style.transform = 'translateY(50px)';
                el.style.transition = 'all 0.8s ease-out';
            }
        });
    }

    function animateIn() {
        const elements = [
            { el: headerContent, delay: 100 },
            // { el: carouselContainer, delay: 300 }
        ];

        elements.forEach(({ el, delay }) => {
            if (el) {
                setTimeout(() => {
                    el.style.opacity = '1';
                    el.style.transform = 'translateY(0)';
                }, delay);
            }
        });
    }

    function animateOut() {
        const elements = [headerContent];
        elements.forEach(el => {
            if (el) {
                el.style.opacity = '0';
                el.style.transform = 'translateY(50px)';
            }
        });
    }
</script>

<section bind:this={sectionElement} class="md:py-20 py-10">
    <div class="container mx-auto px-5 md:px-auto">
        <div class=" flex flex-col">
            <div bind:this={headerContent}>
                <div class="flex items-center md:mb-6 mb-3">
                    <div class="w-1 h-6 bg-yellow-500 mr-2"></div>
                    <h2 class="text-sm font-semibold text-gray-500">OUR PROJECTS</h2>
                </div>
                <h1 class="text-2xl font-semibold leading-normal text-gray-800 mb-10">
                    Making Lasting  <br class="md:block hidden" />First Impressions
                </h1>
            </div>
        </div>
        
        <div  class="relative overflow-hidden">
            <div bind:this={carousel} class="flex overflow-x-auto scroll-smooth space-x-8 pb-4" style="scroll-behavior: smooth;">
                {#each images.concat(images) as image} <!-- Duplicate array for continuous effect -->
                    <div class="md:min-w-[450px] min-w-[300px] lg:h-[500px] md:h-[450px] h-[300px] bg-gray-300 overflow-hidden shadow-md">
                        <img src={image} alt="Project" class="w-full h-full object-cover" />
                    </div>
                {/each}
            </div>
        </div>
    </div>
</section>

<style>
    /* Hide scrollbar but keep functionality */
    .scroll-smooth::-webkit-scrollbar {
        display: none;
    }
    .scroll-smooth {
        -ms-overflow-style: none; /* IE and Edge */
        scrollbar-width: none; /* Firefox */
    }
</style>
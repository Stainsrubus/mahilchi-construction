<script lang="ts">
  import { onMount, onDestroy } from 'svelte';
  
  // Import images from $lib
  import home3 from "$lib/images/home3.webp";
  import interior1 from "$lib/images/interior1.webp";
  import interior2 from "$lib/images/interior2.webp";
  import interior3 from "$lib/images/interior3.webp";
  import home1 from "$lib/images/home1.webp";
  import home2 from "$lib/images/home2.webp";

  // Array of project images
  const images = [
    home3,
    interior1,
    interior2,
    interior3,
    home1,
    home2,
  ];

  let scrollContainer: HTMLDivElement;
  let scrollInterval: NodeJS.Timeout;
  
  // Animation elements
  let sectionElement: HTMLElement;
  let headerContent: HTMLElement;
  let carouselContainer: HTMLElement;

  onMount(() => {
    // Set initial state immediately
    setInitialState();

    // Intersection Observer for scroll animations
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
            // Reset elements when leaving view and stop scrolling
            animateOut();
            stopScrollAnimation();
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
      if (sectionElement) {
        observer.unobserve(sectionElement);
      }
      if (scrollInterval) clearInterval(scrollInterval);
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
    // Animate header content first
    setTimeout(() => {
      if (headerContent) {
        headerContent.style.opacity = '1';
        headerContent.style.transform = 'translateY(0)';
      }
    }, 100);
    
    // Animate carousel container
    setTimeout(() => {
      if (carouselContainer) {
        carouselContainer.style.opacity = '1';
        carouselContainer.style.transform = 'translateY(0)';
      }
    }, 300);
    
    // Start the scrolling animation after elements are visible
    setTimeout(() => {
      startScrollAnimation();
    }, 500);
  }
  
  function animateOut() {
    const elements = [headerContent, carouselContainer];
    elements.forEach(el => {
      if (el) {
        el.style.opacity = '0';
        el.style.transform = 'translateY(50px)';
      }
    });
    stopScrollAnimation();
  }
  
  function startScrollAnimation() {
    if (!scrollContainer) return;
    
    // Reset scroll position
    if (scrollContainer) {
      scrollContainer.style.transform = 'translateX(0px)';
    }
    
    const scrollWidth = scrollContainer.scrollWidth / 2; // Half the total width for smooth loop
    let scrollPosition = 0;
    
    scrollInterval = setInterval(() => {
      scrollPosition += 1;
      if (scrollPosition >= scrollWidth) {
        scrollPosition = 0; // Reset to start for continuous loop
      }
      if (scrollContainer) {
        scrollContainer.style.transform = `translateX(-${scrollPosition}px)`;
      }
    }, 30); // Adjust speed by changing interval (lower = faster)
  }
  
  function stopScrollAnimation() {
    if (scrollInterval) {
      clearInterval(scrollInterval);
      scrollInterval = null;
    }
    // Reset scroll position
    if (scrollContainer) {
      scrollContainer.style.transform = 'translateX(0px)';
    }
  }
  
  onDestroy(() => {
    if (scrollInterval) clearInterval(scrollInterval);
  });
</script>

<svelte:head>
  <!-- Preload all images -->
  {#each images as image}
    <link rel="preload" as="image" href={image} />
  {/each}
</svelte:head>

<section bind:this={sectionElement} class="md:py-20 py-10">
  <div class="container mx-auto px-5 md:px-auto">
    <div class="flex flex-col">
      <div bind:this={headerContent}>
        <div class="flex items-center md:mb-6 mb-3">
          <div class="w-1 h-6 bg-yellow-500 mr-2"></div>
          <h2 class="text-sm font-semibold text-gray-500">OUR PROJECTS</h2>
        </div>
        <h1 class="text-2xl font-semibold leading-normal text-gray-800 mb-10">
          Making Lasting First Impressions
        </h1>
      </div>
    </div>

    <!-- Scrolling Container -->
    <div class="relative overflow-hidden">
      <div
        bind:this={scrollContainer}
        class="flex gap-8"
        style="transition: transform 0.1s linear; will-change: transform;"
      >
        {#each images.concat(images) as image, i}
          <div class="md:min-w-[450px] min-w-[300px] lg:h-[500px] md:h-[450px] h-[300px] bg-gray-300 overflow-hidden shadow-md">
            <img
              src={image}
              alt={`Project ${i + 1}`}
              loading="lazy"
              class="w-full h-full object-cover"
            />
          </div>
        {/each}
      </div>
    </div>
  </div>
</section>

<style>
  /* Hide scrollbar but keep functionality */
  .overflow-hidden {
    overflow: hidden;
  }
  
  /* Ensure smooth performance */
  .flex {
    will-change: transform;
  }
</style>
<script lang="ts">
  import { onMount } from 'svelte';
  
  // Import images from $lib/images
  import grandHall from '$lib/images/8.webp';
  import elegantStage from '$lib/images/6.webp';
  import modernVenue from '$lib/images/5.webp';
  import conferenceCenter from '$lib/images/4.webp';
  import weddingHall from '$lib/images/3.webp';
  import exhibitionSpace from '$lib/images/2.webp';
  
  const projects = [
    { id: 1, name: "Grand Hall", image: grandHall },
    { id: 2, name: "Elegant Stage", image: elegantStage },
    { id: 3, name: "Modern Venue", image: modernVenue },
    { id: 4, name: "Conference Center", image: conferenceCenter },
    { id: 5, name: "Wedding Hall", image: weddingHall },
    { id: 6, name: "Exhibition Space", image: exhibitionSpace },
  ];
  
  let cardsVisible = $state(false);
  let activeCard = $state<number | null>(null);
  let isTouchDevice = $state(false);
  let lastInteractionTime = $state(0);
  
  onMount(() => {
    // Check if it's a touch device
    isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    
    setTimeout(() => {
      cardsVisible = true;
    }, 500);
  });
  
  function handleCardInteraction(index: number) {
    const now = Date.now();
    
    // Prevent rapid consecutive interactions
    if (now - lastInteractionTime < 300) return;
    lastInteractionTime = now;
    
    if (isTouchDevice) {
      // For touch devices, toggle the clicked card
      activeCard = activeCard === index ? null : index;
    } else {
      // For non-touch devices, close any previously clicked card when hovering a new one
      activeCard = null;
    }
  }
  
  function isCardActive(index: number) {
    // Card is active if it's either being hovered (non-touch) or explicitly clicked (touch)
    return activeCard === index;
  }
</script>

<!-- Preload critical images -->
<svelte:head>
  <link rel="preload" as="image" href={grandHall} />
  <link rel="preload" as="image" href={elegantStage} />
  <link rel="preload" as="image" href={modernVenue} />
  <link rel="preload" as="image" href={conferenceCenter} />
  <link rel="preload" as="image" href={weddingHall} />
  <link rel="preload" as="image" href={exhibitionSpace} />
</svelte:head>

<div class="p-4 container mx-auto py-10 lg:py-20">
  {#each projects as project, index}
    {#if index % 3 === 0}
      <!-- Full-width card -->
      <div 
        class="w-full h-64 md:h-96 relative mb-4 overflow-hidden group" 
        style="perspective: 1000px;"
        on:click={() => handleCardInteraction(index)}
        on:mouseover={() => !isTouchDevice && handleCardInteraction(index)}
        class:active={isCardActive(index)}
      >
        <img
          src={project.image || "/placeholder.svg"}
          alt={project.name}
          class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          loading="lazy"
          width="1200"
          height="600"
        />
        <!-- Door card panel -->
        <div
          class="absolute bottom-0 right-0 w-[30%] h-[50%] bg-gray-200/90 backdrop-blur-sm text-primary flex items-center justify-center
                 transition-all duration-700 ease-out transform-gpu shadow-2xl border-l-2 border-t-2 border-white/20
                 {cardsVisible ? 'opacity-100' : 'opacity-0'} door-card"
        >
          <h3 class="text-lg font-bold text-center px-2 transition-transform duration-500 group-hover:scale-110">
            {project.name}
          </h3>
        </div>
      </div>
    {:else if index % 2 === 1 && projects[index + 1]}
      <!-- Half-width cards (grouped in pairs) -->
      <div class="flex gap-4 mb-4">
        <div 
          class="w-1/2 md:h-96 h-64 relative overflow-hidden group" 
          style="perspective: 1000px;"
          on:click={() => handleCardInteraction(index)}
          on:mouseover={() => !isTouchDevice && handleCardInteraction(index)}
          class:active={isCardActive(index)}
        >
          <img
            src={projects[index].image || "/placeholder.svg"}
            alt={projects[index].name}
            class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            loading="lazy"
            width="600"
            height="600"
          />
          <!-- Door card panel -->
          <div
            class="absolute bottom-0 right-0 w-[50%] h-[50%] bg-gray-200/90 backdrop-blur-sm text-primary flex items-center justify-center
                   transition-all duration-700 ease-out transform-gpu shadow-2xl border-l-2 border-t-2 border-white/20
                   {cardsVisible ? 'opacity-100' : 'opacity-0'} door-card"
          >
            <h3 class="text-sm font-bold text-center px-1 transition-transform duration-500 group-hover:scale-110">
              {projects[index].name}
            </h3>
          </div>
        </div>
        <div 
          class="w-1/2 h-64 md:h-96 relative overflow-hidden group" 
          style="perspective: 1000px;"
          on:click={() => handleCardInteraction(index + 1)}
          on:mouseover={() => !isTouchDevice && handleCardInteraction(index + 1)}
          class:active={isCardActive(index + 1)}
        >
          <img
            src={projects[index + 1].image || "/placeholder.svg"}
            alt={projects[index + 1].name}
            class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            loading="lazy"
            width="600"
            height="600"
          />
          <!-- Door card panel -->
          <div
            class="absolute bottom-0 right-0 w-[50%] h-[50%] bg-gray-200/90 backdrop-blur-sm text-primary flex items-center justify-center
                   transition-all duration-700 ease-out transform-gpu shadow-2xl border-l-2 border-t-2 border-white/20
                   {cardsVisible ? 'opacity-100' : 'opacity-0'} door-card"
          >
            <h3 class="text-sm font-bold text-center px-1 transition-transform duration-500 group-hover:scale-110">
              {projects[index + 1].name}
            </h3>
          </div>
        </div>
      </div>
    {/if}
  {/each}
</div>

<style>
  /* Base door card style - hidden by default */
  .door-card {
    transform: rotateY(-90deg);
    transform-origin: right center;
    opacity: 0;
  }
  
  /* Show door card on hover (desktop) */
  .group:hover .door-card {
    transform: rotateY(0deg);
    opacity: 1;
  }
  
  /* Show door card when active (mobile or explicitly clicked) */
  .active .door-card {
    transform: rotateY(0deg);
    opacity: 1;
  }
  
  /* Prevent both hover and active states from showing simultaneously */
  .active.group:hover .door-card {
    transform: rotateY(0deg);
    opacity: 1;
  }
  
  /* Safari-specific fixes */
  @media not all and (min-resolution:.001dpcm) { 
    @supports (-webkit-appearance:none) {
      .door-card {
        -webkit-backface-visibility: hidden;
      }
    }
  }
  
  /* Improve performance on mobile */
  .door-card {
    -webkit-backface-visibility: hidden;
    backface-visibility: hidden;
    will-change: transform, opacity;
  }
  
  /* Responsive adjustments */
  @media (max-width: 768px) {
    .door-card {
      width: 40% !important;
    }
  }
</style>
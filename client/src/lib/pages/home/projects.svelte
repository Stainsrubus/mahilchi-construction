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
  
  onMount(() => {
    setTimeout(() => {
      cardsVisible = true;
    }, 500);
  });
</script>

<!-- Preload critical images (first few for above-the-fold) -->
<svelte:head>
  <link rel="preload" as="image" href={grandHall} />
  <link rel="preload" as="image" href={elegantStage} />
  <link rel="preload" as="image" href={modernVenue} />
  <link rel="preload" as="image" href={conferenceCenter } />
  <link rel="preload" as="image" href={weddingHall} />
  <link rel="preload" as="image" href={exhibitionSpace} />
</svelte:head>

<div class="p-4 container mx-auto py-10 lg:py-20">
  {#each projects as project, index}
    {#if index % 3 === 0}
      <!-- Full-width card -->
      <div class="w-full h-64 md:h-96 relative mb-4 overflow-hidden group" style="perspective: 1000px;">
        <img
          src={project.image || "/placeholder.svg"}
          alt={project.name}
          class="w-full h-full object-cover transition-transform duration-1500 group-hover:scale-105"
          loading="lazy"
          width="1200"
          height="600"
        />
        <!-- Fixed door card: initially hidden (translate-x-full), visible on hover (translate-x-0) -->
        <div
          class="absolute bottom-0 right-0 w-[30%] h-[50%] bg-gray-200/90 backdrop-blur-sm text-primary flex items-center justify-center
                 transition-all duration-2000 ease-in-out transform-gpu shadow-2xl border-l-2 border-t-2 border-white/20 opacity-0
                 {cardsVisible ? 'opacity-100' : 'opacity-0'} rotate-y-[-140deg]
                 group-hover: group-hover:rotate-y-[0deg]"
          style="transform-origin: right center;"
        >
          <h3 class="text-lg font-bold text-center px-2 transform group-hover:scale-110 transition-transform duration-500">
            {project.name}
          </h3>
        </div>
      </div>
    {:else if index % 2 === 1 && projects[index + 1]}
      <!-- Half-width cards (grouped in pairs) -->
      <div class="flex gap-4 mb-4">
        <div class="w-1/2 md:h-96 h-64 relative overflow-hidden group" style="perspective: 1000px;">
          <img
            src={projects[index].image || "/placeholder.svg"}
            alt={projects[index].name}
            class="w-full h-full object-cover transition-transform duration-1500 group-hover:scale-105"
            loading="lazy"
            width="600"
            height="600"
          />
          <!-- Fixed door card: initially hidden (translate-x-full), visible on hover (translate-x-0) -->
          <div
            class="absolute bottom-0 right-0 w-[50%] h-[50%] bg-gray-200/90 backdrop-blur-sm text-primary flex items-center justify-center
                   transition-all duration-2000 ease-in-out transform-gpu shadow-2xl border-l-2 border-t-2 border-white/20 opacity-0
                   {cardsVisible ? 'opacity-100' : 'opacity-0'} rotate-y-[-140deg]
                   group-hover: group-hover:rotate-y-[0deg]"
            style="transform-origin: right center;"
          >
            <h3 class="text-sm font-bold text-center px-1 transform group-hover:scale-110 transition-transform duration-500">
              {projects[index].name}
            </h3>
          </div>
        </div>
        <div class="w-1/2 h-64 md:h-96 relative overflow-hidden group" style="perspective: 1000px;">
          <img
            src={projects[index + 1].image || "/placeholder.svg"}
            alt={projects[index + 1].name}
            class="w-full h-full object-cover transition-transform duration-1500 group-hover:scale-105"
            loading="lazy"
            width="600"
            height="600"
          />
          <!-- Fixed door card: initially hidden (translate-x-full), visible on hover (translate-x-0) -->
          <div
            class="absolute bottom-0 right-0 w-[50%] h-[50%] bg-gray-200/90 backdrop-blur-sm text-primary flex items-center justify-center
                   transition-all duration-2000 ease-in-out transform-gpu shadow-2xl border-l-2 border-t-2 border-white/20 opacity-0
                   {cardsVisible ? 'opacity-100' : 'opacity-0'} rotate-y-[-140deg]
                   group-hover: group-hover:rotate-y-[0deg]"
            style="transform-origin: right center;"
          >
            <h3 class="text-sm font-bold text-center px-1 transform group-hover:scale-110 transition-transform duration-500">
              {projects[index + 1].name}
            </h3>
          </div>
        </div>
      </div>
    {/if}
  {/each}
</div>

<style>
  .rotate-y-\[90deg\] {
    transform: rotateY(0deg);
  }
  
  .rotate-y-0 {
    transform: rotateY(90deg);
  }
  
  .group-hover\:rotate-y-0:hover {
    transform: rotateY(0deg);
  }
</style>
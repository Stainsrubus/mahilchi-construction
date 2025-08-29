<script lang="ts">
  import { onMount } from 'svelte';
  import { fly } from 'svelte/transition';
  import { cubicOut } from 'svelte/easing';
  import { page } from '$app/stores';
  import Icon from '@iconify/svelte';

  // Import your JSON data
  import productsData from '$lib/utils/productData.json';
  import Cta from '$lib/utils/cta.svelte';
	import { goto } from '$app/navigation';

  // State variables
  let product: any = null;
  let showDialog = false;
  let currentImageIndex = 0;
  let currentMainIndex = 0;
  let isLoading = true;
  let error: any = null;
  const mapUrl = "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3022.2153999999996!2d-73.98784492416498!3d40.74844097138957!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c259a9b3117469%3A0xd134e19abd59c8e3!2sEmpire%20State%20Building!5e0!3m2!1sen!2sus!4v1620000000000!5m2!1sen!2sus";

  // Get product ID from URL
  $: productId = $page.params.id;

  onMount(async () => {
    try {
      isLoading = true;
      product = productsData.products.find(p => p.id === parseInt(productId));

      if (!product) {
        throw new Error('Product not found');
      }
    } catch (err: any) {
      error = err.message;
    } finally {
      isLoading = false;
    }
  });

  // Open dialog with selected image
  function openDialog(index: number) {
    currentImageIndex = index;
    showDialog = true;
  }

  // Close dialog
  function closeDialog() {
    showDialog = false;
  }

  // Navigate carousel
  function nextImage() {
    currentImageIndex = (currentImageIndex + 1) % product.images.length;
  }

  function prevImage() {
    currentImageIndex = (currentImageIndex - 1 + product.images.length) % product.images.length;
  }

  // Update main image when thumbnail is clicked
  function updateMainImage(index: number) {
    currentMainIndex = index;
    product.mainImage = product.images[index].full;
  }
</script>

{#if isLoading}
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
    <div class="text-center">
      <p class="text-lg text-gray-600">Loading...</p>
    </div>
  </div>
{:else if error}
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
    <div class="text-center">
      <p class="text-lg text-red-600">{error}</p>
    </div>
  </div>
{:else}
  <div class="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
    <!-- Project Header -->
    <div class="mb-8 flex items-center gap-4">
        <button
        on:click={() => goto(`/projects`)}
				class="rounded-full flex justify-center items-center h-10 w-10 text-xs text-nowrap bg-[linear-gradient(87.95deg,#F2960F_0.88%,#F9BF30_10.7%,#F9BF30_94.21%,#FAA21A_99.12%),linear-gradient(180deg,rgba(255,255,255,0.371)_-5.09%,rgba(255,255,255,0)_20.37%)] text-[#040B14] font-medium lg:text-base"
			>
      <Icon icon="material-symbols:chevron-left-rounded" width="32" height="32" />
			</button>

    
<div>
  <p class="text-sm font-medium text-gray-500 uppercase tracking-wider mb-2 ml-auto">
    {product.category}
  </p>
<h1 class="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900">{product.title}</h1>
</div>

    </div>


    <!-- Main Image -->
    <div class="mb-8 rounded-lg overflow-hidden shadow-lg">
      <img
        src={product.mainImage}
        alt={product.title}
        class="w-full h-64 sm:h-80 md:h-96 object-cover cursor-pointer transition-transform duration-300 hover:scale-105"
        on:click={() => openDialog(currentMainIndex)}
      />
    </div>

    <!-- Thumbnail Gallery -->
    <div class="flex flex-wrap gap-4 mb-12">
      {#each product.images as image, index}
        <div
          class="rounded-lg overflow-hidden shadow-md cursor-pointer transition-all duration-300 w-20 h-20 hover:shadow-lg"
          on:click={() => {
            updateMainImage(index);
            // openDialog(index);
          }}
        >
          <img
            src={image.thumbnail}
            alt={`Thumbnail ${index + 1}`}
            class="w-full h-full object-cover"
          />
        </div>
      {/each}
    </div>

    <!-- Project Description -->
    <div class="mb-4 md:mb-5">
      <h2 class="text-xl sm:text-2xl font-semibold text-gray-800 mb-4">Project Details</h2>
      <p class="text-gray-600 leading-relaxed whitespace-pre-line text-sm sm:text-base">
        {product.description}
      </p>
    </div>
  </div>
{/if}

<!-- Map Section -->
<section class="container mx-auto mb-10 md:mb-20 px-4 sm:px-6 lg:px-8">
  <h2 class="text-xl sm:text-2xl font-semibold text-gray-800 mb-4">Map</h2>
  <div class="bg-white rounded-lg shadow-lg overflow-hidden h-64 sm:h-80 md:h-96 transition-all duration-300 hover:shadow-xl">
    <iframe
      src={mapUrl}
      width="100%"
      height="100%"
      style="border:0;"
      allowfullscreen=""
      loading="lazy"
      class="w-full h-full"
    ></iframe>
  </div>
</section>

<Cta />

<!-- Image Dialog -->
{#if showDialog}
  <div
    class="fixed inset-0 bg-black/60 flex items-center justify-center z-50"
    on:click={closeDialog}
    transition:fly={{ y: 50, duration: 300, easing: cubicOut }}
  >
    <div
      class="relative rounded-lg overflow-hidden w-[80%] h-[60vh] md:h-[70vh]  mx-4"
      on:click|stopPropagation
    >
      <!-- Close Button -->
      <button
        class="absolute top-4 right-4 text-white hover:text-gray-300 z-10"
        on:click={closeDialog}
      >
        <Icon icon="mdi:close" width="24" height="24" />
      </button>

      <!-- Main Image in Dialog -->
      <img
        src={product.images[currentImageIndex].full}
        alt={`Image ${currentImageIndex + 1}`}
        class="w-full h-full object-cover"
      />

      <!-- Navigation Arrows -->
      <button
        class="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 text-white bg-black/50 rounded-full p-2 sm:p-3 hover:bg-black/70 transition-colors duration-200"
        on:click={prevImage}
      >
        <Icon icon="mdi:chevron-left" class="w-6 h-6 sm:w-8 sm:h-8" />
      </button>
      <button
        class="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 text-white bg-black/50 rounded-full p-2 sm:p-3 hover:bg-black/70 transition-colors duration-200"
        on:click={nextImage}
      >
        <Icon icon="mdi:chevron-right" class="w-6 h-6 sm:w-8 sm:h-8" />
      </button>

      <!-- Dots Navigation -->
      <div class="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
        {#each product.images as _, index}
          <button
            class="w-2 h-2 sm:w-3 sm:h-3 rounded-full cursor-pointer {index === currentImageIndex ? 'bg-white' : 'bg-white/50'}"
            on:click={() => { currentImageIndex = index; }}
          ></button>
        {/each}
      </div>
    </div>
  </div>
{/if}

<style>
  /* Animation for form submission */
  @keyframes pulse {
    0% { transform: scale(1); }
    50% { transform: scale(1.05); }
    100% { transform: scale(1); }
  }
</style>
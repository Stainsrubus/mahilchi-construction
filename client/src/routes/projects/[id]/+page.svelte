<script lang="ts">
    import { onMount } from 'svelte';
    import { fly } from 'svelte/transition';
    import { cubicOut } from 'svelte/easing';
    import { page } from '$app/stores';
    import Icon from '@iconify/svelte';
  
    // Import your JSON data
    import productsData from '$lib/utils/productData.json';
	import Cta from '$lib/utils/cta.svelte';
  
    // State variables
    let product: any = null;
    let showDialog = false;
    let currentImageIndex = 0;
    let isLoading = true;
    let error :any = null;
    const mapUrl = "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3022.2153999999996!2d-73.98784492416498!3d40.74844097138957!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c259a9b3117469%3A0xd134e19abd59c8e3!2sEmpire%20State%20Building!5e0!3m2!1sen!2sus!4v1620000000000!5m2!1sen!2sus";
  
    // Get product ID from URL
    $: productId = $page.params.id;
  
    onMount(async () => {
      try {
        isLoading = true;
        // Find product by ID
        product = productsData.products.find(p => p.id === parseInt(productId));
  
        if (!product) {
          throw new Error('Product not found');
        }
      } catch (err:any) {
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
      <div class="mb-8">
        <p class="text-sm font-medium text-gray-500 uppercase tracking-wider mb-2">
          {product.category}
        </p>
        <h1 class="text-3xl font-bold text-gray-900">{product.title}</h1>
      </div>
  
      <!-- Main Image -->
      <div class="mb-8 rounded-lg overflow-hidden shadow-lg">
        <img
          src={product.mainImage}
          alt={product.title}
          class="w-full h-[500px] object-cover cursor-pointer transition-transform duration-300 hover:scale-[1.02]"
          on:click={() => openDialog(0)}
        />
      </div>
  
      <!-- Thumbnail Gallery -->

      <div class="flex gap-4 mb-12">
        {#each product.images as image, index}
          <div
            class="rounded-lg overflow-hidden shadow-md cursor-pointer transition-all duration-300 h-20 w-20 hover:shadow-lg"
            on:click={() => {
              updateMainImage(index);
              openDialog(index);
            }}
          >
            <img
             style="width: 100px; height: 100px"
              src={image.thumbnail}
              alt={`Thumbnail ${index + 1}`}
              class="w-20 !h-20 object-cover"
            />
          </div>
        {/each}
      </div>
  
      <!-- Project Description -->
      <div class="md:mb-12 ">
        <h2 class="text-xl font-semibold text-gray-800 mb-4">Project Details</h2>
        <p class="text-gray-600 leading-relaxed whitespace-pre-line">
          {product.description}
        </p>
      </div>

    </div>
  {/if}
  <section class="container mx-auto md:mb-20 mb-10 px-5 md:px-auto">
    <div class="bg-white rounded-lg shadow-lg overflow-hidden h-96 transition-all duration-300 hover:shadow-xl">
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

  <style>
    /* Animation for the genie effect */
    @keyframes genie {
      0% {
        transform: scaleY(0);
        opacity: 0;
      }
      100% {
        transform: scaleY(1);
        opacity: 1;
      }
    }
  
    /* Apply genie effect to dialog */
    [data-genie] {
      animation: genie 0.3s ease-out forwards;
      transform-origin: top;
    }
  
    /* Responsive adjustments */
    @media (max-width: 768px) {
      .md\:grid-cols-4 {
        grid-template-columns: repeat(2, 1fr);
      }
  
      .md\:grid-cols-6 {
        grid-template-columns: repeat(3, 1fr);
      }
    }
  </style>
  
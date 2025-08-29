<script lang="ts">
  import Icon from '@iconify/svelte';
  import { onMount } from 'svelte';
  import { fade } from 'svelte/transition';

  // Form data
  let name = '';
  let email = '';
  let phone = '';
  let message = '';
  let isSubmitted = false;

  // Map data
  const mapUrl = "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3022.2153999999996!2d-73.98784492416498!3d40.74844097138957!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c259a9b3117469%3A0xd134e19abd59c8e3!2sEmpire%20State%20Building!5e0!3m2!1sen!2sus!4v1620000000000!5m2!1sen!2sus";

  // Handle form submission
  function handleSubmit(e: Event) {
    e.preventDefault();
    isSubmitted = true;

    // Reset form after 3 seconds
    setTimeout(() => {
      isSubmitted = false;
      name = '';
      email = '';
      phone = '';
      message = '';
    }, 3000);
  }

  // Animation elements
  let formSection: HTMLElement;
  let mapSection: HTMLElement;

  onMount(() => {
    const setupAnimation = (element: HTMLElement, animateIn: () => void, animateOut: () => void) => {
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
        { threshold: 0.2, rootMargin: '0px 0px -100px 0px' }
      );

      if (element) {
        observer.observe(element);
      }

      return observer;
    };

    const formObserver = setupAnimation(
      formSection,
      () => {
        if (formSection) {
          formSection.style.opacity = '1';
          formSection.style.transform = 'translateY(0)';
        }
      },
      () => {
        if (formSection) {
          formSection.style.opacity = '0';
          formSection.style.transform = 'translateY(50px)';
        }
      }
    );

    const mapObserver = setupAnimation(
      mapSection,
      () => {
        if (mapSection) {
          mapSection.style.opacity = '1';
          mapSection.style.transform = 'translateY(0)';
        }
      },
      () => {
        if (mapSection) {
          mapSection.style.opacity = '0';
          mapSection.style.transform = 'translateY(50px)';
        }
      }
    );

    return () => {
      if (formSection) formObserver.unobserve(formSection);
      if (mapSection) mapObserver.unobserve(mapSection);
    };
  });
</script>

<div class="container mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 md:py-20">
  <!-- Form and Image Section -->
  <div
    bind:this={formSection}
    class="flex flex-col lg:flex-row gap-6 lg:gap-12 mb-12 sm:mb-16 md:mb-20 transition-all duration-800"
    style="opacity: 0; transform: translateY(50px);"
    in:fade={{ duration: 800 }}
  >
    <!-- Image -->
    <div class="w-full lg:w-1/2">
      <img
        src="https://images.unsplash.com/photo-1570129477492-45c003edd2be?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
        alt="Modern house construction"
        class="h-full w-full  rounded-lg object-cover"
      />
    </div>

    <!-- Contact Form -->
    <div class="w-full lg:w-1/2 bg-gray-100 p-6 sm:p-8 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
      <h3 class="text-xl sm:text-2xl font-semibold text-gray-800 mb-4">Get in Touch</h3>
      <p class="text-gray-600 mb-6 text-sm sm:text-base">Fill out the form below and we'll get back to you as soon as possible.</p>

      <form on:submit={handleSubmit} class="space-y-4">
        <div>
          <label for="name" class="block text-sm font-medium text-gray-700 mb-1">Name</label>
          <input
            type="text"
            id="name"
            bind:value={name}
            required
            class="w-full p-2 sm:p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500 text-sm sm:text-base"
          />
        </div>

        <div>
          <label for="email" class="block text-sm font-medium text-gray-700 mb-1">Email</label>
          <input
            type="email"
            id="email"
            bind:value={email}
            required
            class="w-full p-2 sm:p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500 text-sm sm:text-base"
          />
        </div>

        <div>
          <label for="phone" class="block text-sm font-medium text-gray-700 mb-1">Phone</label>
          <input
            type="tel"
            id="phone"
            bind:value={phone}
            class="w-full p-2 sm:p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500 text-sm sm:text-base"
          />
        </div>

        <div>
          <label for="message" class="block text-sm font-medium text-gray-700 mb-1">Message</label>
          <textarea
            id="message"
            bind:value={message}
            rows="4"
            required
            class="w-full p-2 sm:p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500 text-sm sm:text-base"
          ></textarea>
        </div>

        <button
          type="submit"
          class="w-full bg-yellow-500 hover:bg-yellow-600 text-white font-medium py-2 px-4 rounded-md transition-colors duration-200 {isSubmitted ? 'animate-pulse' : ''}"
        >
          {isSubmitted ? 'Message Sent!' : 'Send Message'}
        </button>
      </form>
    </div>
  </div>

  <!-- Map and Info Section -->
  <div
    bind:this={mapSection}
    class="space-y-8 transition-all duration-800"
    style="opacity: 0; transform: translateY(50px);"
    in:fade={{ duration: 800 }}
  >
    <!-- Map -->
    <div class="bg-white rounded-lg shadow-lg overflow-hidden h-64 sm:h-80 md:h-96 hover:shadow-xl transition-shadow duration-300">
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

    <!-- Find Us Easily Section -->
    <div class="bg-white p-6 sm:p-8 rounded-lg transition-shadow duration-300">
      <h3 class="text-xl sm:text-2xl font-semibold text-gray-800 mb-4">Find Us Easily</h3>
      <p class="text-gray-600 mb-6 text-sm sm:text-base">
        We're conveniently located to serve you better. Visit us during our business hours or contact us anytime.
      </p>

      <div class="flex flex-col sm:flex-row justify-between gap-4 sm:gap-6">
        <div class="flex items-center text-gray-600">
          <Icon icon="cil:location-pin" width="20" height="20" class="mr-2" />
          <p class="text-sm sm:text-base">1234 Main Street, Anytown, USA 12345</p>
        </div>
        <div class="flex items-center text-gray-600">
          <Icon icon="cil:clock" width="20" height="20" class="mr-2" />
          <p class="text-sm sm:text-base">Monday - Friday | 9:00 am - 5:00 pm</p>
        </div>
        <div class="flex items-center text-gray-600">
          <Icon icon="cil:calendar" width="20" height="20" class="mr-2" />
          <p class="text-sm sm:text-base">Check the map above for the location</p>
        </div>
      </div>
    </div>
  </div>
</div>

<style>
  /* Animation for form submission */
  @keyframes pulse {
    0% { transform: scale(1); }
    50% { transform: scale(1.05); }
    100% { transform: scale(1); }
  }

  .animate-pulse {
    animation: pulse 0.5s ease;
  }
</style>
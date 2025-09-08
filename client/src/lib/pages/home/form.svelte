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
       <div class="text-primary">
        <h2 class="text-3xl uppercase font-medium leading-relaxed mb-4 w-[60%]"> Let’s Build With Us</h2>
       <div class="flex flex-col gap-8 pt-8">
        <p>
            At Mahilchi Construction, we believe every project is more than just concrete and steel — it’s about creating spaces that inspire and stand the test of time. Whether you’re planning a dream home, a modern commercial space, or a large-scale industrial project, our dedicated team is here to make it happen.
        </p>
        <p>
            With 20+ years of experience, a proven track record of on-time delivery, and a commitment to innovation and quality, we provide personalized solutions that fit your vision, budget, and lifestyle.
        </p>
        <p>
            Let’s collaborate to bring your ideas to life — contact us today and start building with trust.
        </p>
       </div>
       </div>
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
<script lang="ts">
    import { fly } from 'svelte/transition';
    import { onMount } from 'svelte';
    import Hero from "$lib/pages/about/hero.svelte";
	import Milestone from '$lib/pages/about/milestone.svelte';
	import Faqs from '$lib/pages/about/faqs.svelte';
	import Cta from '$lib/utils/cta.svelte';
	import Whoweare from '$lib/pages/about/whoweare.svelte';
	import About from '$lib/pages/about/about.svelte';


    let isLoading = true;
    let imagesLoaded = {
      hero: false,
      team1: false,
      team2: false,
      house: false
    };
    
    onMount(() => {
      setTimeout(() => {
        isLoading = false;
      }, 50);
      preloadImages();
    });
    
    function preloadImages() {
      const imageUrls = ['/hero-house.jpg', '/team-meeting.jpg', '/team-2.jpg', '/house-2.jpg'];
      
      imageUrls.forEach((url, index) => {
        const img = new Image();
        img.onload = () => {
          const keys = ['hero', 'team1', 'team2', 'house'];
          imagesLoaded[keys[index]] = true;
        };
        img.onerror = () => {
          const keys = ['hero', 'team1', 'team2', 'house'];
          imagesLoaded[keys[index]] = true;
        };
        img.src = url;
      });
    }
    
    let formData = {
      name: '',
      email: '',
      message: ''
    };
    
    let formSubmitting = false;
    
  
    async function handleSubmit(event: { preventDefault: () => void; }) {
      event.preventDefault();
      formSubmitting = true;
      
      try {
        await new Promise(resolve => setTimeout(resolve, 1000));
        console.log('Form submitted:', formData);
        formData = { name: '', email: '', message: '' };
        alert('Message sent successfully!');
      } catch (error) {
        console.error('Form submission error:', error);
        alert('Failed to send message. Please try again.');
      } finally {
        formSubmitting = false;
      }
    }
  </script>
  
 <Hero />
    <!-- Hero Section -->
   
   <Whoweare />
<About />
<Milestone />

<Faqs />
  
    <Cta />

  
  <style>
    :global(html) {
      scroll-behavior: smooth;
    }
    
    :global(.animate-pulse) {
      animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
    }
    .tab-active {
            border-bottom: 2px solid #f97316;
            color: #f97316;
        }
    
    @keyframes pulse {
      0%, 100% {
        opacity: 1;
      }
      50% {
        opacity: .5;
      }
    }
  </style>
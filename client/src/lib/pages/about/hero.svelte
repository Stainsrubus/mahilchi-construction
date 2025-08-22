<script lang="ts">
    import { onMount } from 'svelte';
    import { fly } from 'svelte/transition';
  
    // Stats data
    const stats = [
      { value: 12, label: 'Years Experience' },
      { value: 100, label: 'Success Rate' },
      { value: 50, label: 'Team Members' },
      { value: 25, label: 'Awards Won' }
    ];
  
    // Display values for counters
    let displayValues: number[] = [0, 0, 0, 0];
    let sections: HTMLElement[] = [];
    let animated = [false,false, false, false, false];
  
    // Elements for animations
    let about:HTMLElement;
    let aboutSection: HTMLElement;
    let aboutHeading: HTMLElement;
    let aboutParagraph: HTMLElement;
    let aboutImages: HTMLElement[] = [];
  
    let videoSection: HTMLElement;
  
    onMount(() => {
      // Setup for stats counters
      const statObservers = stats.map((_, index) => {
        const observer = new IntersectionObserver(
          (entries) => {
            entries.forEach(entry => {
              if (entry.isIntersecting && !animated[index]) {
                animateCounter(index, stats[index].value);
                animated[index] = true;
              } else if (!entry.isIntersecting) {
                // Reset when out of view
                displayValues[index] = 0;
                animated[index] = false;
              }
            });
          },
          { threshold: 0.5 }
        );
  
        if (sections[index]) {
          observer.observe(sections[index]);
        }
  
        return observer;
      });
  
      // Setup for About Us section
      const setupAboutAnimation = () => {
        const observer = new IntersectionObserver(
          (entries) => {
            entries.forEach(entry => {
              if (entry.isIntersecting) {
                animateInAbout();
              } else {
                animateOutAbout();
              }
            });
          },
          { threshold: 0.2, rootMargin: '0px 0px -100px 0px' }
        );
  
        if (aboutSection) {
          observer.observe(aboutSection);
        }
  
        return observer;
      };
  
      // Setup for Video section
      const setupVideoAnimation = () => {
        const observer = new IntersectionObserver(
          (entries) => {
            entries.forEach(entry => {
              if (entry.isIntersecting) {
                animateInVideo();
              } else {
                animateOutVideo();
              }
            });
          },
          { threshold: 0.2, rootMargin: '0px 0px -100px 0px' }
        );
  
        if (videoSection) {
          observer.observe(videoSection);
        }
  
        return observer;
      };
  
      const aboutObserver = setupAboutAnimation();
      const videoObserver = setupVideoAnimation();
  
      // Set initial state for About Us section
      setInitialAboutState();
  
      return () => {
        // Cleanup for stats counters
        statObservers.forEach((observer, index) => {
          if (sections[index]) {
            observer.unobserve(sections[index]);
          }
        });
  
        // Cleanup for About Us section
        if (aboutSection) aboutObserver.unobserve(aboutSection);
  
        // Cleanup for Video section
        if (videoSection) videoObserver.unobserve(videoSection);
      };
    });
  
    function animateCounter(index: number, target: number) {
      const duration = 1500; // Animation duration in ms
      const start = 0;
      const startTime = performance.now();
  
      function update(currentTime: number) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        displayValues[index] = Math.floor(progress * target);
  
        if (progress < 1) {
          requestAnimationFrame(update);
        } else {
          displayValues[index] = target;
        }
      }
  
      requestAnimationFrame(update);
    }
  
    // About Us section animation functions
    function setInitialAboutState() {
      const elements = [aboutHeading, aboutParagraph, ...aboutImages];
      elements.forEach(el => {
        if (el) {
          el.style.opacity = '0';
          el.style.transform = 'translateY(50px)';
          el.style.transition = 'all 0.8s ease-out';
        }
      });
    }
  
    function animateInAbout() {
      const elements = [
         { el: about, delay: 200 },
        { el: aboutHeading, delay: 200 },
        { el: aboutParagraph, delay: 300 },
        { el: aboutImages[0], delay: 500 },
        { el: aboutImages[1], delay: 700 }
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
  
    function animateOutAbout() {
      const elements = [about,aboutHeading, aboutParagraph, ...aboutImages];
      elements.forEach(el => {
        if (el) {
          el.style.opacity = '0';
          el.style.transform = 'translateY(50px)';
        }
      });
    }
  
    // Video section animation functions
    function animateInVideo() {
      if (videoSection) {
        videoSection.style.opacity = '1';
        videoSection.style.transform = 'translateY(0)';
      }
    }
  
    function animateOutVideo() {
      if (videoSection) {
        videoSection.style.opacity = '0';
        videoSection.style.transform = 'translateY(50px)';
      }
    }
  </script>
  
  <style>
    /* Common animation styles */
    .animate-element {
      opacity: 0;
      transform: translateY(50px);
      transition: all 0.8s ease-out;
    }
  </style>
  
  <!-- About Us Section -->
  <section bind:this={aboutSection} class="relative flex items-center">
    <div class="relative bg-primary h-[563px] p-0 w-screen">
      <div class="my-10 flex flex-col items-center justify-center text-center">



      <div       bind:this={about}  class="animate-element">
        <h1  
  
        class="bg-[#163A59] text-[#88A1B1]  border-[#88A1B1] w-fit border px-4 py-2 rounded-full  ">
          About Us
        </h1>
      </div>
     
        <h1
          bind:this={aboutHeading}
          class="text-4xl text-white md:text-6xl font-bold my-5 leading-tight max-w-6xl mx-auto !font-montserrat animate-element"
        >
        Building with Vision, Delivering with Trust
        </h1>
        <p
          bind:this={aboutParagraph}
          class="text-base max-w-lg mx-auto !font-montserrat text-[#88A1B1] animate-element"
        >
        We specialize in creating durable, modern, and sustainable construction solutions with a strong focus on design excellence and project management expertise.

        </p>
      </div>
  
      <img
        bind:this={aboutImages[0]}
        src="/svg/build1.svg"
        alt="Modern luxury home at sunset"
        class="absolute h-3/4 left-0 bottom-0 object-contain animate-element"
      />
      <img
        bind:this={aboutImages[1]}
        src="/svg/build2.svg"
        alt="Modern luxury home at sunset"
        class="absolute h-3/4 right-0 bottom-0 object-contain animate-element"
      />
    </div>
  </section>
  
  <!-- Video Section -->
  <section bind:this={videoSection} class="relative -mt-40 mx-[5%] ">
    <div class="relative w-full h-fit">
      <video
        class="w-full h-[500px] object-cover rounded-4xl"
        muted
        autoplay
        loop
        playsinline
        src="/video/construction.webm"
        type="video/*"
        preload="auto"
      ></video>
    </div>
  </section>
  
  <!-- Stats Section -->
  <section class="py-20 flex items-center justify-center">
    <!-- Stats Section -->
    <div class="flex w-[70%] justify-between items-center gap-x-5 gap-y-10 md:gap-x-10 md:gap-y-20"
         in:fly={{ y: 30, duration: 800, delay: 400 }}>
      {#each stats as stat, index}
        <div class="text-center" bind:this={sections[index]}>
          <div class="text-3xl md:text-5xl font-bold text-primary mb-2">
            {displayValues[index]}{stat.label.includes('Success Rate') ? '%' : '+'}
          </div>
          <div class="text-sm md:text-base text-primary">
            {stat.label}
          </div>
        </div>
      {/each}
    </div>
  </section>
  
<script lang="ts">
  import { onMount } from 'svelte';
  import { fly } from 'svelte/transition';
  import build1 from "$lib/svg/build1.svg";
  import build2 from "$lib/svg/build2.svg";
  import video1 from "$lib/video/video1.webm";

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
  let animated = [false, false, false, false];
  // Elements for animations
  let about: HTMLElement;
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
    const elements = [about, aboutHeading, aboutParagraph, ...aboutImages];
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
    const elements = [about, aboutHeading, aboutParagraph, ...aboutImages];
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

<svelte:head>
  <link rel="preload" as="image" href={build1} />
  <link rel="preload" as="image" href={build2} />
  <link rel="preload" as="video" href={video1} type="video/webm" />
</svelte:head>

<!-- About Us Section -->
<section bind:this={aboutSection} class="relative flex items-center">
  <div class="relative bg-primary md:h-[563px] h-[500px] p-0 w-screen">
    <div class="my-10 flex flex-col items-center justify-center text-center">
      <div bind:this={about} class="animate-element">
        <!-- Uncomment if needed
        <h1 class="bg-[#163A59] text-[#88A1B1] border-[#88A1B1] w-fit border px-4 py-2 rounded-full">
          Services
        </h1>
        -->
      </div>

      <h1
        bind:this={aboutHeading}
        class="text-4xl mx-auto text-white md:text-6xl font-bold my-5 leading-tight lg:max-w-6xl max-w-[95%] !font-montserrat animate-element"
      >
        Residential Building Construction<br />
        Building Your Dream, Brick by Brick
      </h1>

      <p
        bind:this={aboutParagraph}
        class="text-base max-w-lg mx-auto !font-montserrat text-[#88A1B1] animate-element"
      >
        We build beautiful, durable homes that blend modern designs with traditional layouts. With quality work, strong structures, and on-time delivery, we create safe and comfortable spaces for your family.
      </p>
    </div>

    <img
      bind:this={aboutImages[0]}
      src={build1}
      alt="Modern luxury home at sunset"
      loading="lazy"
      class="absolute h-3/4 left-0 md:block hidden bottom-0 object-contain animate-element"
    />

    <img
      bind:this={aboutImages[1]}
      src={build2}
      alt="Modern luxury home at sunset"
      loading="lazy"
      class="absolute h-3/4 right-0 md:block hidden bottom-0 object-contain animate-element"
    />
  </div>
</section>

<!-- Video Section -->
<section class="relative container md:mx-auto lg:-mt-40 md:-mt-44 -mt-36 px-[5%]">
  <div class="relative w-full h-fit" style="pointer-events: none;">
    <video
      class="w-full md:h-[500px] h-[300px] object-cover md:rounded-4xl rounded-2xl"
      muted
      autoplay
      loop
      playsinline
      preload="auto"
    >
      <source src={video1} type="video/webm" />
    </video>
  </div>
</section>

<!-- Stats Section -->
<section class="lg:py-20 py-10 flex items-center justify-center">
  <div
    class="flex lg:w-[70%] justify-between items-center gap-x-5 gap-y-10 md:gap-x-10 md:gap-y-20"
    in:fly={{ y: 30, duration: 800, delay: 400 }}
  >
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

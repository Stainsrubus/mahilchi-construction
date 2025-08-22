<script lang="ts">
  import { onMount, onDestroy } from 'svelte';
  
  // Milestone data
  const milestones = [
    { year: '2012', title: 'Lorem ipsum', description: 'Lorem ipsum Dolor Sit Amet, Consectetur Adipiscing Lorem ipsum Dolor Sit Amet' },
    { year: '2013', title: 'Lorem ipsum', description: 'Lorem ipsum Dolor Sit Amet, Consectetur Adipiscing Lorem ipsum Dolor Sit Amet' },
    { year: '2014', title: 'Lorem ipsum', description: 'Lorem ipsum Dolor Sit Amet, Consectetur Adipiscing Lorem ipsum Dolor Sit Amet' },
    { year: '2015', title: 'Lorem ipsum', description: 'Lorem ipsum Dolor Sit Amet, Consectetur Adipiscing Lorem ipsum Dolor Sit Amet' },
    { year: '2016', title: 'Lorem ipsum', description: 'Lorem ipsum Dolor Sit Amet, Consectetur Adipiscing Lorem ipsum Dolor Sit Amet' }
  ];
  
  let scrollContainer: HTMLDivElement;
  let scrollInterval: NodeJS.Timeout;
  
  // Animation elements
  let sectionElement: HTMLElement;
  let headerContent: HTMLElement;
  let scrollingContainer: HTMLElement;
  
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
    const elements = [headerContent, scrollingContainer];
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
    
    // Animate scrolling container
    setTimeout(() => {
      if (scrollingContainer) {
        scrollingContainer.style.opacity = '1';
        scrollingContainer.style.transform = 'translateY(0)';
      }
    }, 300);
    
    // Start the scrolling animation after elements are visible
    setTimeout(() => {
      startScrollAnimation();
    }, 800);
  }
  
  function animateOut() {
    const elements = [headerContent, scrollingContainer];
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

<section bind:this={sectionElement} class="py-20 bg-[#152F45] text-white">
  <div class="container mx-auto lg:px-16">
      <!-- Header Content -->
      <div bind:this={headerContent} class="flex justify-between items-start mb-12">
          <h2 class="text-3xl md:text-4xl font-semibold">Key Milestones</h2>
          <div class="text-right">
              <div class="text-3xl md:text-4xl font-bold text-white opacity-80">2025</div>
          </div>
      </div>
      
      <!-- Scrolling Container -->
      <div bind:this={scrollingContainer} class="relative overflow-hidden">
          <div
              bind:this={scrollContainer}
              class="flex gap-8"
              style="transition: transform 0.1s linear;"
          >
              {#each milestones as milestone}
                  <div class="inline-block bg-transparent p-6 rounded-2xl border-2 border-[#23465C] min-w-[375px]">
                      <div class="text-[#88A1B1] w-fit rounded-full px-4 py-2 border-[#23465C] border text-base mb-3">{milestone.year}</div>
                      <p class="text-[#F9BF30] text-lg my-4">{milestone.title}</p>
                      <p class="text-[#88A1B1] leading-relaxed">{milestone.description}</p>
                  </div>
              {/each}
              {#each milestones as milestone}
                  <div class="inline-block bg-transparent p-6 rounded-2xl border-2 border-[#23465C] min-w-[375px]">
                      <div class="text-[#88A1B1] w-fit rounded-full px-4 py-2 border-[#23465C] border text-base mb-3">{milestone.year}</div>
                      <p class="text-[#F9BF30] text-lg my-4">{milestone.title}</p>
                      <p class="text-[#88A1B1] leading-relaxed">{milestone.description}</p>
                  </div>
              {/each}
          </div>
      </div>
  </div>
</section>

<style>
  /* Ensure smooth scrolling container */
  .overflow-hidden {
      overflow: hidden;
  }
  .whitespace-nowrap {
      white-space: nowrap;
  }
  @media (max-width: 768px) {
      .flex {
          flex-direction: column;
          align-items: center;
      }
      .text-3xl {
          text-align: center;
      }
      .text-right {
          text-align: center;
      }
  }
</style>
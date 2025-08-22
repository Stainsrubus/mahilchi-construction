<script lang="ts">
    import { onMount } from 'svelte';
    import Icon from '@iconify/svelte';
    
    // Services data
    const services = [
      {
        title: "Building Construction",
        description: "We handle all types of construction with precision and care, from homes to commercial and industrial projects. With a focus on quality, safety, and timely delivery, we build strong and lasting structures within your budget.",
        icon: "/svg/vector1.svg"
      },
      {
        title: "Exterior Finishing",
        description: "We offer expert exterior finishing that protects your building while enhancing its look. From plastering and painting to cladding and designs, we ensure durability with a stylish finish that makes your property stand out.",
        icon: "/svg/vector2.svg"
      },
      {
        title: "Interior Design & Execution",
        description: "We design and build interiors tailored to your style. From planning and materials to execution, we create spaces that look great, feel comfortable, and truly fit your lifestyle.",
        icon: "/svg/vector3.svg"
      }
    ];
    
    // Track hovered card
    let hoveredIndex = -1;
    
    // Animation elements
    let sectionElement: HTMLElement;
    let headerElement: HTMLElement;
    let gridElement: HTMLElement;
    let cardElements: HTMLElement[] = [];
    
    // Set first card as hovered by default
    $: if (services.length > 0 && hoveredIndex === -1) {
        hoveredIndex = 0;
    }
    
    onMount(() => {
      // Set initial state immediately
      setInitialState();
      
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
              // Reset elements when leaving view
              animateOut();
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
      };
    });
    
    function setInitialState() {
      const elements = [headerElement, ...cardElements];
      elements.forEach(el => {
        if (el) {
          el.style.opacity = '0';
          el.style.transform = 'translateY(50px)';
          el.style.transition = 'all 0.8s ease-out';
        }
      });
    }
    
    function animateIn() {
      const elements = [
        { el: headerElement, delay: 100 },
        ...cardElements.map((el, index) => ({ el, delay: 200 + (index * 150) }))
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
    
    function animateOut() {
      const elements = [headerElement, ...cardElements];
      elements.forEach(el => {
        if (el) {
          el.style.opacity = '0';
          el.style.transform = 'translateY(50px)';
        }
      });
    }
    
    // Handle overlay grid hover
    function handleOverlayHover(index: number) {
      hoveredIndex = index;
    }
    
    function handleOverlayLeave() {
      // Don't reset to -1, keep the last hovered card highlighted
      // hoveredIndex = -1;
    }
  </script>
  
  <section bind:this={sectionElement} class="bg-[#F5F6F8] !py-20 relative">
    <div class="mx-[5%]">
      <!-- Section Header -->
      <h2 bind:this={headerElement} class="text-3xl font-bold text-gray-800 text-center leading-normal !pb-12">
        Laying the Foundation <br /> for Your Success.
      </h2>
  
      <!-- Services Grid Container -->
      <div class="relative">
        <!-- Services Grid -->
        <div bind:this={gridElement} class="grid grid-cols-1 md:grid-cols-3 gap-6 relative z-0">
          {#each services as service, index}
            <!-- svelte-ignore a11y_no_static_element_interactions -->
            <div
              bind:this={cardElements[index]}
              class="rounded-lg relative bg-white overflow-hidden p-6 transition-all duration-300 ease-in-out transform group"
              class:bg-yellow-400={hoveredIndex === index}
              class:scale-105={hoveredIndex === index}
            >
              <!-- Card Content Wrapper -->
              <div class="h-full flex flex-col">
                <!-- Icon Section -->
                <div class="w-16 h-16 mb-4 rounded-lg flex items-start justify-start">
                  <img src={service.icon} alt="icon">
                </div>
                
                <!-- Title -->
                <h3 class="text-xl font-bold text-gray-800 text-left mb-2">
                  {service.title}
                </h3>
                
                <!-- Description -->
                <p class="text-gray-600 text-left mb-6 flex-grow">
                  {service.description}
                </p>
  
                <div>
                  <div>
                    <p class="text-primary text-base font-semibold underline">
                      Learn More
                    </p>
                  </div>
                  <div class="absolute bottom-0 -right-1 rounded-sm bg-[#F5F6F8] w-fit">
                    <button class="text-white font-medium p-2 rounded-lg flex items-center transition-colors duration-200">
                      <div class="w-10 h-10 bg-primary rounded-sm flex items-center justify-center transition-colors duration-200">
                        <Icon icon="mdi:arrow-top-right-thin" width="20" height="20" />
                      </div>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          {/each}
        </div>
  
        <!-- Invisible Overlay Grid - Fixed positioning with proper gap calculation -->
        <div class="absolute top-0 left-0 w-full h-full flex z-10 pointer-events-auto">
          {#each services as _, index}
            <!-- svelte-ignore a11y_no_static_element_interactions -->
            <div
              class="h-full bg-transparent cursor-pointer flex-1"
              class:mr-6={index < services.length - 1}
              on:mouseenter={() => handleOverlayHover(index)}
              on:mouseleave={handleOverlayLeave}
            ></div>
          {/each}
        </div>
      </div>
    </div>
  </section>
  
  <style>
    /* Ensure the entire card area is clickable */
    .group {
      cursor: pointer;
    }
  
    /* Smooth transition for hover effects */
    .transition-all {
      transition-property: all;
    }
  </style>
<script lang="ts">
  import Icon from "@iconify/svelte";
  import { onMount } from 'svelte';
  
  // Animation elements
  let sectionElement: HTMLElement;
  let textContent: HTMLElement;
  let buttonElement: HTMLElement;
  
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
      const elements = [textContent, buttonElement];
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
          { el: textContent, delay: 100 },
          { el: buttonElement, delay: 300 }
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
      const elements = [textContent, buttonElement];
      elements.forEach(el => {
          if (el) {
              el.style.opacity = '0';
              el.style.transform = 'translateY(50px)';
          }
      });
  }
</script>

<section bind:this={sectionElement} class="relative text-white bg-[url('/images/cta.png')] bg-no-repeat bg-cover bg-center">
  <div class="md:py-20 py-10 container mx-auto lg:px-16">
      <div class="absolute inset-0 bg-black/80"></div>
      
      <div class="relative z-10 container mx-auto px-4 text-center flex flex-col md:flex-row justify-between md:items-center items-start">
          <div bind:this={textContent} class="text-left flex flex-col gap-5">
              <h2 class="text-3xl md:text-4xl font-semibold leading-normal">
                  Let's work together<br>
                  on a quote today
              </h2>
              <p class="text-xl text-gray-300 leading-loose max-w-2xl mx-auto">
                Looking for a trusted construction partner? We deliver quality work, on time and within budget. Share your project details with us today and let’s bring your vision to life.
              </p>
          </div>
          <div class="mt-8 md:mt-0" bind:this={buttonElement}>
              <button
                  class="rounded-full py-[10px] px-[22px] bg-[linear-gradient(87.95deg,#F2960F_0.88%,#F9BF30_10.7%,#F9BF30_94.21%,#FAA21A_99.12%),linear-gradient(180deg,rgba(255,255,255,0.371)_-5.09%,rgba(255,255,255,0)_20.37%)] text-[#040B14] font-medium text-base flex items-center gap-2 hover:scale-105 transition-transform duration-200"
              >
                  <Icon icon="solar:arrow-right-linear" width="24" height="24" />
                  Contact
              </button>
          </div>
      </div>
  </div>
</section>
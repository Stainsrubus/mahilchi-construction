<script lang="ts">
  import { fade } from 'svelte/transition';
</script>

<nav
  class="bg-primary text-white  fixed  w-full z-10"
  in:fade={{ duration: 500 }}
  out:fade={{ duration: 500 }}
>
  <div class="container mx-auto h-16 px-4 py-3 flex justify-between items-center">
    <div class="text-xl font-bold">Your Company</div>
    <div class="hidden md:flex space-x-6 font-medium text-sm justify-between items-center">
      <a href="/" class="hover:text-yellow-400">Home</a>
      <a href="/about" class="hover:text-yellow-400">About</a>
      <a href="/services" class="hover:text-yellow-400">Service</a>
      <a href="/projects" class="hover:text-yellow-400">Projects</a>
      <a href="/contact" class="hover:text-yellow-400">Contact Us</a>
      <button
      class="rounded-full
             py-[10px] px-[22px]
             bg-[linear-gradient(87.95deg,#F2960F_0.88%,#F9BF30_10.7%,#F9BF30_94.21%,#FAA21A_99.12%),linear-gradient(180deg,rgba(255,255,255,0.371)_-5.09%,rgba(255,255,255,0)_20.37%)] 
             text-[#040B14] font-medium text-base">
      +91 1234567890
    </button>
    
      
    </div>
    <button class="md:hidden">
      <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
      </svg>
    </button>
  </div>
</nav>

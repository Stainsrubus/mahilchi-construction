<script lang="ts">
  // Import images and SVGs from $lib
  import card1 from '$lib/images/card1.png';
  import card2 from '$lib/images/card2.png';
  import aboutImage from '$lib/images/3.JPG';
  import vector4 from '$lib/svg/vector4.svg';
  import vector5 from '$lib/svg/vector5.svg';
  import vector6 from '$lib/svg/vector6.svg';
  import callIcon from '$lib/svg/call.svg';

  // Define services for the "About Mahilchi Construction" section
  const services = [
    { name: "Building Construction", icon: vector4 },
    { name: "Exterior Finishing", icon: vector5 },
    { name: "Interior Design & Execution", icon: vector6 },
  ];
</script>

<!-- Preload critical image -->
<svelte:head>
  <link rel="preload" as="image" href={aboutImage} />
</svelte:head>

<div class="container mx-auto p-4 md:p-8 py-10 lg:py-20">
  <!-- Service Cards -->
  <div class="flex md:flex-row flex-col gap-4 md:gap-8 mb-12 items-center">
    <div class="p-6 rounded-lg gap-4 flex flex-col items-start">
      <img src={card2} class="h-10 w-10" alt="Residential Construction" loading="lazy" width="40" height="40" />
      <div>
        <h3 class="text-xl md:text-3xl w-[60%] font-medium mb-2">Residential Construction</h3>
        <p class="text-gray-600">
          Homes built with care, blending comfort, style, and durability. Every design reflects modern living while ensuring lasting value. A perfect balance of elegance and functionality for your lifestyle.
        </p>
      </div>
    </div>
    <hr class="h-72 w-0.5 bg-gray-200 hidden lg:block" />
    <div class="p-6 gap-4 rounded-lg flex flex-col items-start">
      <img src={card1} class="h-10 w-10" alt="Commercial Construction" loading="lazy" width="40" height="40" />
      <div>
        <h3 class="text-xl md:text-3xl w-[60%] font-medium mb-2">Commercial Construction</h3>
        <p class="text-gray-600">
          Spaces that drive business growth through smart design and solid structure. From offices to retail outlets, every project is crafted for performance. A professional setting that motivates success and innovation.
        </p>
      </div>
    </div>
    <hr class="h-72 w-0.5 bg-gray-200 hidden lg:block" />
    <div class="p-6 rounded-lg flex flex-col gap-4 items-start">
      <img src={card1} class="h-10 w-10" alt="Industrial Construction" loading="lazy" width="40" height="40" />
      <div>
        <h3 class="text-xl md:text-3xl w-[60%] font-medium mb-2">Industrial Construction</h3>
        <p class="text-gray-600">
          Facilities engineered to handle productivity with strength and precision. Safe, efficient, and built to meet industrial demands. A strong foundation for industries to scale and grow.
        </p>
      </div>
    </div>
  </div>

  <!-- About Section -->
  <div class="flex flex-col pt-10 lg:pt-20 md:flex-row items-center gap-x-20 gap-y-10">
    <div class="w-full md:w-1/2">
      <img
        src={aboutImage}
        alt="Mahilchi Construction Building"
        class="w-full h-auto shadow-lg"
        width="600"
        height="400"
      />
    </div>
    <div class="w-full md:w-1/2">
      <h2 class="text-3xl font-medium leading-relaxed mb-4 w-[60%]">ABOUT MAHILCHI CONSTRUCTION</h2>
      <p class="text-gray-600 mb-6">
        Mahilchi Construction is committed to delivering excellence in every project, from homes to industries. With a blend of innovation, durability, and modern design, we create spaces that stand the test of time. Our expertise covers building construction, interior design, and exterior finishing, ensuring complete solutions under one roof.

      </p>
      <div class="flex flex-wrap gap-x-10 gap-y-5 mb-6">
        {#each services as service}
          <div class="flex items-center gap-6">
            <img class="text-2xl" src={service.icon} alt={service.name} width="24" height="24" />
            <span>{service.name}</span>
          </div>
        {/each}
      </div>
      <button
        class="rounded-full flex py-[10px] gap-3 px-[22px] bg-[linear-gradient(87.95deg,#F2960F_0.88%,#F9BF30_10.7%,#F9BF30_94.21%,#FAA21A_99.12%),linear-gradient(180deg,rgba(255,255,255,0.371)_-5.09%,rgba(255,255,255,0)_20.37%)] text-[#040B14] font-medium text-base w-fit"
      >
        Services <span><img src={callIcon} alt="Call icon" width="20" height="20" /></span>
      </button>
    </div>
  </div>
</div>
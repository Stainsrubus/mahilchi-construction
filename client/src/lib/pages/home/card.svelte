<script>
  // Define services for the "About Mahilchi Construction" section
  const services = [
    { name: "Building Construction", icon:"/svg/vector4.svg", },
    { name: "Exterior Finishing", icon: "/svg/vector5.svg", },
    { name: "Interior Design & Execution", icon:"/svg/vector6.svg",},
  ];
</script>

<div class="container mx-auto  p-4 md:p-8 py-10 lg:py-20">
  <!-- Service Cards -->
  <div class="flex  md:flex-row flex-col gap-4  md:gap-8 mb-12 items-center">
    <div class=" p-6 rounded-lg gap-4  flex flex-col items-start ">
        <img src="/images/card2.png" class="h-10 w-10" alt="">
     <div>
        <h3 class="text-xl md:text-3xl w-[60%] font-medium  mb-2">Residential Construction</h3>
        <p class="text-gray-600">
          Homes built with care, blending comfort, style, and durability. Every design reflects modern living while ensuring lasting value. A perfect balance of elegance and functionality for your lifestyle.

        </p>
     </div>
    </div>
    <hr class="h-72 w-0.5 bg-gray-200 hidden lg:block" />
    <div class=" p-6 gap-4 rounded-lg  flex flex-col items-start ">
        <img src="/images/card1.png" class="h-10 w-10" alt="">
      <div>
        <h3 class="text-xl md:text-3xl w-[60%] font-medium mb-2">Commercial Construction</h3>
      <p class="text-gray-600">
        Spaces that drive business growth through smart design and solid structure. From offices to retail outlets, every project is crafted for performance. A professional setting that motivates success and innovation.
      </p>
      </div>
    </div>
    <hr class="h-72 w-0.5 bg-gray-200 hidden lg:block" />
    <div class=" p-6 rounded-lg  flex flex-col gap-4 items-start ">
<img src="/images/card1.png" class="h-10 w-10" alt="">
     <div>
        <h3 class="text-xl md:text-3xl w-[60%] font-medium mb-2">Industrial Construction</h3>
        <p class="text-gray-600">
          Facilities engineered to handle productivity with strength and precision. Safe, efficient, and built to meet industrial demands. A strong foundation for industries to scale and grow.
        </p>
     </div>
    </div>
  </div>

  <!-- About Section -->
  <div class="flex flex-col py-10 lg:py-20 md:flex-row items-center gap-x-20  gap-y-10">
    <div class="w-full md:w-1/2">
      <img
        src="/images/3.JPG"
        alt="Mahilchi Construction Building"
        class="w-full h-auto shadow-lg"
      />
    </div>
    <div class="w-full md:w-1/2">
      <h2 class="text-3xl font-medium leading-relaxed mb-4 w-[60%]">ABOUT MAHILCHI CONSTRUCTION</h2>
      <p class="text-gray-600 mb-6">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
      </p>
      <div class="flex flex-wrap  gap-x-10 gap-y-5 mb-6">
        {#each services as service}
          <div class="flex items-center gap-6">
            <img class="text-2xl"  src="{service.icon}" alt=""/>
            <span>{service.name}</span>
          </div>
        {/each}
      </div>
      <button
				class="rounded-full flex py-[10px] gap-3 px-[22px] bg-[linear-gradient(87.95deg,#F2960F_0.88%,#F9BF30_10.7%,#F9BF30_94.21%,#FAA21A_99.12%),linear-gradient(180deg,rgba(255,255,255,0.371)_-5.09%,rgba(255,255,255,0)_20.37%)] text-[#040B14] font-medium text-base w-fit"
			>
            Services <span><img src="/svg/call.svg" alt=""></span>
			</button>
   
    </div>
  </div>
</div>

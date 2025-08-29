<script lang="ts">
    // Service data as JSON
    const services = [
      {
        tag: "Residential Building Construction",
        title: "Building Your Dream, Brick by Brick",
        description: "We build beautiful, durable homes that blend modern designs with traditional layouts. With quality work, strong structures, and on-time delivery, we create safe and comfortable spaces for your family.",
        image: "/images/interior1.png",
        alt: "Modern residential house"
      },
      {
        tag: "Commercial Building Construction",
        title: "Spaces That Empower Business",
        description: "We design and build professional spaces that support business growth from offices and shops to large complexes. With smart design, reliable construction, and on-time delivery, we create safe, lasting spaces for your success.",
        image: "/images/interior2.png",
        alt: "Modern commercial building"
      },
      {
        tag: "Industrial Building Construction",
        title: "Constructing the Future of Industry",
        description: "We specialize in building strong and efficient industrial facilities like warehouses, factories, and plants. With a focus on safety, productivity, and durability, we deliver solutions that support your business growth for years to come.",
        image: "/images/interior3.png",
        alt: "Modern industrial building"
      }
    ];
  </script>
  
  <div class="  mx-[5%] md:py-20 py-5">
    {#each services as service, index}
      <div class="flex flex-col border rounded-lg shadow-lg md:flex-row  md:gap-5 gap-2 md:mb-12 mb-6">
        <!-- Content -->
        <div class="md:w-1/2 md:space-y-6 space-y-4 p-8">
          <div class=" rounded-full inline-block md:text-sm text-xs  font-medium ">
            {service.tag}
          </div>
          <h2 class="md:text-3xl text-2xl font-semibold text-gray-900 w-[70%]">{service.title}</h2>
          <p class="text-gray-600 md:text-base text-sm leading-relaxed">
            {service.description}
          </p>
        </div>
  
        <!-- Image -->
        <div class="md:w-1/2">
          <div class="overflow-hidden md:rounded-r-xl rounded-b-xl shadow-lg group">
            <img
              src={service.image}
              alt={service.alt}
              class="w-full md:h-96 object-cover transition-transform duration-500 group-hover:scale-105"
            />
          </div>
        </div>
      </div>
    {/each}
  </div>
  
<script lang="ts">
    // Service data as JSON
    const services = [
      {
        tag: "HOMES BUILT TO LAST",
        title: "Residential Building Construction",
        description: "Lorem Ipsum Dolor Sit Amet, Consectetur Adipiscing Elit, Sed Do Eiusmod Tempor Incididunt Ut Labore Et Dolore Magna Aliqua. Ut Enim Ad Minim Veniam, Quis Nostrud Exercitation Ullamco Laboris Nisi Ut Aliquip Ex Ea Commodo Consequat. Duis Aute Irure Dolor In Reprehenderit In Voluptate Velit Esse",
        image: "https://images.unsplash.com/photo-1570129477492-45c003edd2be?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
        alt: "Modern residential house"
      },
      {
        tag: "SPACES THAT EMPOWER BUSINESS",
        title: "Commercial Building Construction",
        description: "Lorem Ipsum Dolor Sit Amet, Consectetur Adipiscing Elit, Sed Do Eiusmod Tempor Incididunt Ut Labore Et Dolore Magna Aliqua. Ut Enim Ad Minim Veniam, Quis Nostrud Exercitation Ullamco Laboris Nisi Ut Aliquip Ex Ea Commodo Consequat. Duis Aute Irure Dolor In Reprehenderit In Voluptate Velit Esse",
        image: "https://images.unsplash.com/photo-1565008447742-97f6f38c985c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2074&q=80",
        alt: "Modern commercial building"
      },
      {
        tag: "ENGINEERING FOR PRODUCTIVITY",
        title: "Industrial Building Construction",
        description: "Lorem Ipsum Dolor Sit Amet, Consectetur Adipiscing Elit, Sed Do Eiusmod Tempor Incididunt Ut Labore Et Dolore Magna Aliqua. Ut Enim Ad Minim Veniam, Quis Nostrud Exercitation Ullamco Laboris Nisi Ut Aliquip Ex Ea Commodo Consequat. Duis Aute Irure Dolor In Reprehenderit In Voluptate Velit Esse",
        image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2073&q=80",
        alt: "Modern industrial building"
      }
    ];
  </script>
  
  <div class="  mx-[5%] py-20">
    {#each services as service, index}
      <div class="flex flex-col border rounded-lg shadow-lg md:flex-row  gap-5 mb-12">
        <!-- Content -->
        <div class="md:w-1/2 space-y-6 p-8">
          <div class=" rounded-full inline-block text-sm font-medium ">
            {service.tag}
          </div>
          <h2 class="text-3xl font-semibold text-gray-900 w-[70%]">{service.title}</h2>
          <p class="text-gray-600 leading-relaxed">
            {service.description}
          </p>
        </div>
  
        <!-- Image -->
        <div class="md:w-1/2">
          <div class="overflow-hidden rounded-r-xl shadow-lg group">
            <img
              src={service.image}
              alt={service.alt}
              class="w-full h-96 object-cover transition-transform duration-500 group-hover:scale-105"
            />
          </div>
        </div>
      </div>
    {/each}
  </div>
  
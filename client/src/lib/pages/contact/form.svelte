<script lang="ts">
	import Icon from '@iconify/svelte';
    import { onMount } from 'svelte';
    import { fade } from 'svelte/transition';
  
    // Form data
    let name = '';
    let email = '';
    let phone = '';
    let message = '';
    let isSubmitted = false;
  
    // Map data
    const mapUrl = "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3022.2153999999996!2d-73.98784492416498!3d40.74844097138957!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c259a9b3117469%3A0xd134e19abd59c8e3!2sEmpire%20State%20Building!5e0!3m2!1sen!2sus!4v1620000000000!5m2!1sen!2sus";
  
    // Contact info
    const contactInfo = [
      { label: "Email", value: "info@example.com" },
      { label: "Phone", value: "+1 234 567 890" },
      { label: "Address", value: "123 Main St, City, Country" }
    ];
  
    // Working hours
    const workingHours = [
      { day: "Monday", hours: "9:00 AM - 5:00 PM" },
      { day: "Tuesday", hours: "9:00 AM - 5:00 PM" },
      { day: "Wednesday", hours: "9:00 AM - 5:00 PM" },
      { day: "Thursday", hours: "9:00 AM - 5:00 PM" },
      { day: "Friday", hours: "9:00 AM - 5:00 PM" },
      { day: "Saturday", hours: "10:00 AM - 2:00 PM" },
      { day: "Sunday", hours: "Closed" }
    ];
  
    // Handle form submission
    function handleSubmit(e: Event) {
      e.preventDefault();
      isSubmitted = true;
  
      // Reset form after 3 seconds
      setTimeout(() => {
        isSubmitted = false;
        name = '';
        email = '';
        phone = '';
        message = '';
      }, 3000);
    }
  </script>
  
  <div class="container mx-auto px-4 md:px-6 lg:px-8 py-20 ">
    <div class="flex flex-col justify-between">
      <!-- Left Column - Image and Form -->
      <div class=" gap-20 mb-20 flex w-full">
        <!-- Image -->
       
          <img
            src="https://images.unsplash.com/photo-1570129477492-45c003edd2be?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
            alt="Modern house construction"
            class="w-1/2 rounded-lg object-cover"
          />

  
        <!-- Contact Form -->
        <div class="bg-[#F5F6F8] w-1/2 p-6 ml-10 rounded-lg shadow-lg transition-all duration-300 hover:shadow-xl">
          <h3 class="text-xl font-semibold text-gray-800 mb-4">Get in Touch</h3>
          <p class="text-gray-600 mb-6">Fill out the form below and we'll get back to you as soon as possible.</p>
  
          <form on:submit={handleSubmit} class="space-y-4">
            <div>
              <label for="name" class="block text-sm font-medium text-gray-700 mb-1">Name</label>
              <input
                type="text"
                id="name"
                bind:value={name}
                required
                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500"
              />
            </div>
  
            <div>
              <label for="email" class="block text-sm font-medium text-gray-700 mb-1">Email</label>
              <input
                type="email"
                id="email"
                bind:value={email}
                required
                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500"
              />
            </div>
  
            <div>
              <label for="phone" class="block text-sm font-medium text-gray-700 mb-1">Phone</label>
              <input
                type="tel"
                id="phone"
                bind:value={phone}
                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500"
              />
            </div>
  
            <div>
              <label for="message" class="block text-sm font-medium text-gray-700 mb-1">Message</label>
              <textarea
                id="message"
                bind:value={message}
                rows="4"
                required
                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500"
              ></textarea>
            </div>
  
            <button
              type="submit"
              class="w-full bg-yellow-500 hover:bg-yellow-600 text-white font-medium py-2 px-4 rounded-md transition-colors duration-200"
            >
              {isSubmitted ? 'Message Sent!' : 'Send Message'}
            </button>
          </form>
        </div>
      </div>
  
      <!-- Right Column - Map and Info -->
      <div class="space-y-8  w-full">
        <!-- Map -->
        <div class="bg-white rounded-lg shadow-lg overflow-hidden h-96 transition-all duration-300 hover:shadow-xl">
          <iframe
            src={mapUrl}
            width="100%"
            height="100%"
            style="border:0;"
            allowfullscreen=""
            loading="lazy"
            class="w-full h-full"
          ></iframe>
        </div>
  
        <!-- Find Us Easily Section -->
        <div class="bg-white p-6 rounded-lg  transition-all duration-300 ">
          <h3 class="text-xl font-semibold text-gray-800 mb-4">Find Us Easily</h3>
          <p class="text-gray-600 mb-6">
            We're conveniently located to serve you better. Visit us during our business hours or contact us anytime.
          </p>
  
    <div class="flex justify-between ">
        <div class="flex items-center text-gray-600">
          <Icon icon="cil:location-pin" width="24" height="24" class="mr-2" />
          <p class="text-sm">1234 Main Street, Anytown, USA 12345</p>
        </div>
        <div class="flex items-center text-gray-600">
          <Icon icon="cil:clock" width="24" height="24" class="mr-2" />
          <p class="text-sm">Monday - Friday | 9:00 am - 5:00 pm</p>
        </div>
        <div class="flex items-center text-gray-600">
          <Icon icon="cil:calendar" width="24" height="24" class="mr-2" />
          <p class="text-sm">Check the map above for the location</p>
        </div>
    </div>
        </div>
      </div>
    </div>
  </div>
  
  <style>
    /* Animation for form submission */
    @keyframes pulse {
      0% { transform: scale(1); }
      50% { transform: scale(1.05); }
      100% { transform: scale(1); }
    }
  
    /* Apply pulse animation when form is submitted */
    #form-submitted {
      animation: pulse 0.5s ease;
    }
  
    /* Responsive adjustments */
    @media (max-width: 768px) {
      .lg\:grid-cols-2 {
        grid-template-columns: 1fr;
      }
    }
  </style>
  
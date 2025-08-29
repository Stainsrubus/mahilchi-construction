<script lang="ts">
    import Icon from '@iconify/svelte';
    import * as Tabs from "$lib/components/ui/tabs/index.js";
    import { onMount } from 'svelte';
    
    // Animation elements
    let sectionElement: HTMLElement;
    let imageSection: HTMLElement;
    let headerContent: HTMLElement;
    let tabsList: HTMLElement;
    let tabsContent: HTMLElement;
    
    onMount(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        // Animate elements when entering view
                        animateIn();
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
    
    function animateIn() {
        const elements = [
            { el: imageSection, delay: 100 },
            { el: headerContent, delay: 200 },
            { el: tabsList, delay: 400 },
            { el: tabsContent, delay: 600 }
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
        const elements = [imageSection, headerContent, tabsList, tabsContent];
        elements.forEach(el => {
            if (el) {
                el.style.opacity = '0';
                el.style.transform = 'translateY(50px)';
            }
        });
    }
    
    function setInitialState() {
        const elements = [imageSection, headerContent, tabsList, tabsContent];
        elements.forEach(el => {
            if (el) {
                el.style.opacity = '0';
                el.style.transform = 'translateY(50px)';
                el.style.transition = 'all 0.8s ease-out';
            }
        });
    }
    
    // Set initial state after elements are bound
    $: if (imageSection && headerContent && tabsList && tabsContent) {
        setInitialState();
    }
</script>

<section bind:this={sectionElement} class="md:py-16 py-24">
    <div class="container mx-auto lg:px-16">
        <div class="flex flex-col md:flex-row w-full md:gap-10 overflow-hidden">
            <!-- House Image Section -->
            <div bind:this={imageSection} class=" flex items-center justify-center md:w-[45%]  py-6 md:py-8">
                <img
                    src="/images/home3.png"
                    alt="House"
                    class="md:w-full w-[90%] !h-full rounded-lg object-cover hover:scale-105 transition-transform duration-300"
                />
            </div>

            <!-- Content Section -->
            <div class="w-full md:w-1/2 py-6 md:py-8 px-5 md:px-auto">
                <!-- Header Content -->
                <div bind:this={headerContent}>
                    <div class="flex gap-2 items-center flex-row mb-5">
                        <div class="bg-yellow-500 w-1 h-4"></div>
                        <h3 class="text-sm font-semibold text-gray-500">WHO WE ARE</h3>
                    </div>
                    <h1 class="text-4xl font-bold text-primary leading-normal mb-6">
                        Lorem Ipsum Dummy Content Generator
                    </h1>
                </div>

                <Tabs.Root value="mission" class="w-full ">
                    <!-- Tabs List -->
                    <div bind:this={tabsList} class="overflow-x-auto">
                        <Tabs.List class="flex md:space-x-4 spaxe-x-1 !bg-transparent overflow-x-scroll no-scrollbar">
                            <Tabs.Trigger
                                value="mission"
                                class="px-3 py-4 text-lg font-medium !shadow-none !rounded-none !bg-transparent text-gray-500 hover:text-gray-700 data-[state=active]:border-b-2 data-[state=active]:border-b-[#F9B125] data-[state=active]:text-[#F9B125] transition-colors duration-200"
                            >
                                Our Mission
                            </Tabs.Trigger>
                            <Tabs.Trigger
                                value="expertise"
                                class="px-3 py-4 text-lg font-medium !shadow-none !rounded-none !bg-transparent text-gray-500 hover:text-gray-700 data-[state=active]:border-b-2 data-[state=active]:border-b-[#F9B125] data-[state=active]:text-[#F9B125] transition-colors duration-200"
                            >
                                Our Vision
                            </Tabs.Trigger>
                            <Tabs.Trigger
                                value="values"
                                class="px-3 py-4 text-lg font-medium !shadow-none !rounded-none !bg-transparent text-gray-500 hover:text-gray-700 data-[state=active]:border-b-2 data-[state=active]:border-b-[#F9B125] data-[state=active]:text-[#F9B125] transition-colors duration-200"
                            >
                                Our Values
                            </Tabs.Trigger>
                        </Tabs.List>
                    </div>

                    <!-- Tabs Content -->
                    <div bind:this={tabsContent}>
                        <Tabs.Content value="mission" class="mt-6 text-gray-600">
                            <p class="leading-loose">
                                We strive to transform every client’s vision into reality through innovative design and efficient project management. With a focus on Design & PMC and Tanki (Total Contract) Projects, we deliver reliable, end-to-end solutions. Our commitment is to ensure quality, timeliness, and lasting relationships built on trust and transparency.
                            </p>
                            <div class="grid grid-cols-2 gap-5 mt-6">
                                <div class="flex items-center">
                                    <img src="/svg/tick.svg" alt="">
                                    <span class="ml-2">2000+ Projects Completed</span>
                                </div>
                                <div class="flex items-center">
                                    <img src="/svg/tick.svg" alt="">
                                    <span class="ml-2">100+ Years of Experience</span>
                                </div>
                                <div class="flex items-center">
                                    <img src="/svg/tick.svg" alt="">
                                    <span class="ml-2">250+ Awards Won</span>
                                </div>
                                <div class="flex items-center">
                                    <img src="/svg/tick.svg" alt="">
                                    <span class="ml-2">1000+ Happy Customers</span>
                                </div>
                            </div>
                        </Tabs.Content>

                        <Tabs.Content value="expertise" class="mt-6 text-gray-600">
                            <p class="leading-loose">
                                To be the most trusted and innovative partner in the construction industry, delivering projects that stand as benchmarks of quality, sustainability, and excellence — across residential, commercial, and industrial sectors.
                            </p>
                            <div class="grid grid-cols-2 gap-5 mt-6">
                                <div class="flex items-center">
                                    <img src="/svg/tick.svg" alt="">
                                    <span class="ml-2">2000+ Projects Completed</span>
                                </div>
                                <div class="flex items-center">
                                    <img src="/svg/tick.svg" alt="">
                                    <span class="ml-2">100+ Years of Experience</span>
                                </div>
                                <div class="flex items-center">
                                    <img src="/svg/tick.svg" alt="">
                                    <span class="ml-2">250+ Awards Won</span>
                                </div>
                                <div class="flex items-center">
                                    <img src="/svg/tick.svg" alt="">
                                    <span class="ml-2">1000+ Happy Customers</span>
                                </div>
                            </div>
                        </Tabs.Content>

                        <Tabs.Content value="values" class="mt-6">
                            <p class="leading-loose">
                                Trust – We honor our commitments and build confidence through transparency.<br />
                                Innovation – Embracing modern methods and creative solutions in construction.<br />
                                Quality – Delivering durable, sustainable, and high-standard outcomes.<br />
                                Responsibility – Upholding safety, ethics, and environmental care in every project.<br />
                                Partnership – Growing together with clients, employees, and communities.<br />
                                
                            </p>
                            <div class="grid grid-cols-2 gap-5 mt-6">
                                <div class="flex items-center">
                                    <img src="/svg/tick.svg" alt="">
                                    <span class="ml-2">2000+ Projects Completed</span>
                                </div>
                                <div class="flex items-center">
                                    <img src="/svg/tick.svg" alt="">
                                    <span class="ml-2">100+ Years of Experience</span>
                                </div>
                                <div class="flex items-center">
                                    <img src="/svg/tick.svg" alt="">
                                    <span class="ml-2">250+ Awards Won</span>
                                </div>
                                <div class="flex items-center">
                                    <img src="/svg/tick.svg" alt="">
                                    <span class="ml-2">1000+ Happy Customers</span>
                                </div>
                            </div>
                        </Tabs.Content>
                    </div>
                </Tabs.Root>
            </div>
        </div>
    </div>
</section>
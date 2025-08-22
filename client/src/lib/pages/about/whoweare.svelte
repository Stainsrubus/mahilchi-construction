<script lang="ts">
    import Icon from "@iconify/svelte";
    import { onMount } from 'svelte';
    
    let sectionElement: HTMLElement;
    let leftContent: HTMLElement;
    let rightImages: HTMLElement;
    let image1: HTMLElement;
    let image2: HTMLElement;
    let infoCard: HTMLElement;
    
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
    
    function animateIn() {
        const elements = [
            { el: leftContent, delay: 100 },
            { el: rightImages, delay: 200 },
            { el: image1, delay: 400 },
            { el: image2, delay: 600 },
            { el: infoCard, delay: 800 }
        ];
        
        elements.forEach(({ el, delay }) => {
            if (el) {
                setTimeout(() => {
                    el.style.opacity = '1';
                    el.style.transform = el === infoCard ? 'translateY(0) scale(1)' : 'translateY(0)';
                }, delay);
            }
        });
    }
    
    function animateOut() {
        const elements = [leftContent, rightImages, image1, image2, infoCard];
        elements.forEach(el => {
            if (el) {
                el.style.opacity = '0';
                el.style.transform = el === infoCard ? 'translateY(50px) scale(0.95)' : 'translateY(50px)';
            }
        });
    }
    
    function setInitialState() {
        const elements = [leftContent, rightImages, image1, image2, infoCard];
        elements.forEach(el => {
            if (el) {
                el.style.opacity = '0';
                el.style.transform = el === infoCard ? 'translateY(50px) scale(0.95)' : 'translateY(50px)';
                el.style.transition = 'all 0.8s ease-out';
            }
        });
    }
</script>

<section bind:this={sectionElement} class="relative py-16">
    <div class="container mx-auto lg:px-16">
        <div class="flex flex-col lg:flex-row items-start gap-12">
            <!-- Left Content -->
            <div bind:this={leftContent} class="w-full lg:w-1/2">
                <div class="flex gap-2 items-center flex-row mb-5">
                    <div class="bg-yellow-500 w-1 h-4"></div>
                    <h3 class="text-sm font-semibold text-gray-500">WHO WE ARE</h3>
                </div>
                <h2 class="text-3xl md:text-4xl font-sans leading-normal font-semibold mb-6 w-[70%] text-primary">
                    Lorem Ipsum Dummy Content Generator
                </h2>
                <div class="text-gray-600 text-lg leading-relaxed mb-8">
                    <p class="mb-4">
                        Lorem Ipsum Dolor Sit Amet, Consecutive Adipiscing Elit. Sed Do Eiusmod Tempor Incididunt Ut Labore Et Dolore Magna Aliqua. Ut Enim Ad Minim Veniam, Quis Nostrud Exercitation Ullamco Laboris Nisi Ut Aliquip Ex Ea Commodo Consequat.
                    </p>
                    <p class="mb-4">
                        Duis Aute Irure Dolor In Reprehenderit In Voluptate Velit Esse Cillum Dolore.
                    </p>
                    <p class="text-sm text-gray-500 mb-6">Over 20 years of experience</p>
                </div>
                <button class="rounded-full py-[10px] px-[22px] bg-[linear-gradient(87.95deg,#F2960F_0.88%,#F9BF30_10.7%,#F9BF30_94.21%,#FAA21A_99.12%),linear-gradient(180deg,rgba(255,255,255,0.371)_-5.09%,rgba(255,255,255,0)_20.37%)] text-[#040B14] font-medium text-base flex items-center gap-2 hover:scale-105 transition-transform duration-200">
                    View Services
                    <Icon icon="solar:arrow-right-linear" width="24" height="24" />
                </button>
            </div>

            <!-- Right Images -->
            <div bind:this={rightImages} class="w-full lg:w-1/2 flex justify-end relative">
                <div class="grid grid-cols-2 gap-5">
                    <!-- Team Image 1 -->
                    <div bind:this={image1}>
                        <img
                            src="/images/engineer.png"
                            alt="Professional team meeting"
                            class="w-72 h-80 object-cover rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300"
                        />
                    </div>

                    <!-- Team Image 2 -->
                    <div bind:this={image2} class="relative">
                        <img
                            src="/images/engineer.png"
                            alt="Team collaboration"
                            class="w-80 h-96 mt-28 object-cover rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300"
                        />
                    </div>
                    
                    <!-- Info Card -->
                    <div bind:this={infoCard} class="absolute flex gap-5 bottom-4 items-center left-20 bg-gray-800 text-white p-4 rounded-lg hover:bg-gray-700 transition-colors duration-200">
                        <img class="w-16" src="/images/iso.png" alt="">
                        <div class="flex flex-col justify-start gap-1 mb-1">
                            <h4 class="text-lg font-semibold">Heading Content</h4>
                            <p class="text-sm w-[90%]">
                                Lorem Ipsum Dolor Sit Amet, <br/>Consecutive Adipiscing Elit, Sed Do Eiusmod
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</section>
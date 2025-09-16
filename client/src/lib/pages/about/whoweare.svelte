<script lang="ts">
    import Icon from "@iconify/svelte";
    import { onMount } from 'svelte';
    import engineerImage from "$lib/images/engineer.png";
    import isoImage from "$lib/svg/iso.svg";
	import { goto } from "$app/navigation";

    let sectionElement: HTMLElement;
    let leftContent: HTMLElement;
    let rightImages: HTMLElement;
    let image1: HTMLElement;
    let image2: HTMLElement;
    let infoCard: HTMLElement;

    onMount(() => {
        setInitialState();

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        animateOut();
                        setTimeout(() => {
                            animateIn();
                        }, 50);
                    } else {
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

    function reloadAnimations() {
        animateOut();
        setTimeout(animateIn, 100);
    }
</script>

<svelte:head>
    <link rel="preload" as="image" href={engineerImage} />
    <link rel="preload" as="image" href={isoImage} />
</svelte:head>

<section bind:this={sectionElement} class="relative md:py-16 py-10">
    <div class="container mx-auto md:px-16 px-5">
        <div class="flex flex-col lg:flex-row items-start gap-12">
            <!-- Left Content -->
            <div bind:this={leftContent} class="w-full lg:w-1/2">
                <div class="flex gap-2 items-center flex-row mb-5">
                    <div class="bg-yellow-500 w-1 h-4"></div>
                    <h3 class="text-sm font-semibold text-gray-500">For Trust & Partnerships</h3>
                </div>
                <h2 class="text-3xl md:text-4xl font-sans leading-normal font-semibold mb-6 w-[80%] text-primary">
                    More Than Construction, We Build Trust
                </h2>
                <div class="text-gray-600 text-lg leading-relaxed mb-8">
                    <p class="mb-4">
                        Construction is not merely about raising structures — it is about shaping communities, enriching lifestyles, and creating spaces that inspire. At Mahilchi, we go beyond bricks and concrete to deliver projects that embody vision and value. With a strong foundation of innovation, expertise, and dedication, we ensure every project is executed with precision and care.
                    </p>
                    <p class="bg-[#F1F2FA] text-primary w-fit rounded-lg p-2">
                        Over 20 years of experience
                    </p>
                </div>

                <button 
                      on:click={() => {
                  goto('/services');
              }}
               class="rounded-full py-[10px] px-[22px] bg-[linear-gradient(87.95deg,#F2960F_0.88%,#F9BF30_10.7%,#F9BF30_94.21%,#FAA21A_99.12%),linear-gradient(180deg,rgba(255,255,255,0.371)_-5.09%,rgba(255,255,255,0)_20.37%)] text-[#040B14] font-medium text-base flex items-center gap-2 hover:scale-105 transition-transform duration-200">
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
                            src={engineerImage}
                            alt="Professional team meeting"
                            loading="lazy"
                            class="w-72 md:h-80 object-cover rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300"
                        />
                    </div>
                    <!-- Team Image 2 -->
                    <div bind:this={image2} class="relative">
                        <img
                            src={engineerImage}
                            alt="Team collaboration"
                            loading="lazy"
                            class="w-80 md:h-96 mt-28 object-cover rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300"
                        />
                    </div>

                    <!-- Info Card (Desktop) -->
                    <div bind:this={infoCard} class="absolute hidden md:flex gap-5 md:bottom-4 bottom-2 items-center left-20 bg-gray-800 text-white p-4 rounded-lg hover:bg-gray-700 transition-colors duration-200">
                        <img class="md:w-16 w-10" src={isoImage} alt="ISO Certification" loading="lazy" />
                        <div class="flex flex-col justify-start gap-1 mb-1">
                            <h4 class="md:text-lg text-base font-semibold">For Trust & Partnerships</h4>
                            <p class="md:text-sm text-xs w-[90%]">
                                Committed to <br/> Quality & Precision
                            </p>
                        </div>
                    </div>
                    <!-- Info Card (Mobile) -->
                    <div bind:this={infoCard} class="absolute w-full md:hidden flex gap-5 -bottom-32 items-center bg-gray-800 text-white p-4 rounded-lg hover:bg-gray-700 transition-colors duration-200">
                        <img class="md:w-16 w-10" src={isoImage} alt="ISO Certification" loading="lazy" />
                        <div class="flex flex-col justify-start gap-1 mb-1">
                            <h4 class="md:text-lg text-base font-semibold">For Trust & Partnerships</h4>
                            <p class="md:text-sm text-xs w-[90%]">
                                Committed to <br/> Quality & Precision
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
      
    </div>
</section>

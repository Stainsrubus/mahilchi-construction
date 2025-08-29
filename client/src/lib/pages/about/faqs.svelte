<script lang="ts">
    import { Tabs, TabsContent, TabsList, TabsTrigger } from "$lib/components/ui/tabs";
    import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "$lib/components/ui/accordion";
    import { Button } from "$lib/components/ui/button";
    import { onMount } from 'svelte';

    const faqData = {
      'Services We Provide': [
        {
          question: "Do you work on both residential and commercial projects?",
          answer: "Yes, we handle both residential and commercial construction projects."
        },
        {
          question: "Do you provide turnkey (total contract) solutions?",
          answer: "Yes, we manage the entire process from approvals and execution to final handover."
        },
        {
          question: "What areas do you serve?",
          answer: "We're open to projects across Tamil Nadu."
        },
        {
          question: "Do you help with government approvals and permits?",
          answer: "Yes, we assist with all necessary approvals."
        }
      ],
      'Design & Planning': [
        {
          question: "Can you assist with design and planning?",
          answer: "Absolutely. Our expert design team provides customized architectural and structural solutions to match your needs."
        },
        {
          question: "Can I see samples of your previous work?",
          answer: "You can view our completed projects on our website or request a portfolio during consultation."
        },
        {
          question: "Do you offer budget friendly construction options?",
          answer: "Yes, we offer plans to suit your budget without compromising on quality."
        },
        {
          question: "Can I suggest design changes during the project?",
          answer: "Yes, we allow minor design changes during construction whenever possible. However, major changes that affect the structure, approvals, or budget may not be feasible once work has started."
        }
      ],
      'Project Execution': [
        {
          question: "How can I request a quote?",
          answer: "Simply reach out through our website or give us a call. We offer free consultations and site visits."
        },
        {
          question: "How long does a typical project take?",
          answer: "Timelines vary based on size and scope, but we always provide a clear schedule before starting."
        },
        {
          question: "Who supervises the construction work?",
          answer: "Our qualified site engineers and supervisors monitor every phase to ensure quality and safety."
        },
        {
          question: "What materials do you use for construction?",
          answer: "We use high quality materials and follow industry standards for durability and safety."
        }
      ]
    };

    let activeTab = 'Services We Provide';
    let sectionElement: HTMLElement;
    let headerContent: HTMLElement;
    let tabButtons: HTMLElement;
    let tabContent: HTMLElement;

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

    function setInitialState() {
        const elements = [headerContent, tabButtons, tabContent];
        elements.forEach(el => {
            if (el) {
                el.style.opacity = '0';
                el.style.transform = 'translateY(50px)';
                el.style.transition = 'all 0.8s ease-out';
            }
        });
    }

    function animateIn() {
        setTimeout(() => {
            if (headerContent) {
                headerContent.style.opacity = '1';
                headerContent.style.transform = 'translateY(0)';
            }
        }, 100);
        setTimeout(() => {
            if (tabButtons) {
                tabButtons.style.opacity = '1';
                tabButtons.style.transform = 'translateY(0)';
            }
        }, 300);
        setTimeout(() => {
            if (tabContent) {
                tabContent.style.opacity = '1';
                tabContent.style.transform = 'translateY(0)';
            }
        }, 500);
    }

    function animateOut() {
        const elements = [headerContent, tabButtons, tabContent];
        elements.forEach(el => {
            if (el) {
                el.style.opacity = '0';
                el.style.transform = 'translateY(50px)';
            }
        });
    }
</script>

<section bind:this={sectionElement} class="py-12 md:py-20 bg-[#F5F6F8] text-gray-800">
    <div class="container mx-auto max-w-4xl px-4 sm:px-6 lg:px-16">
        <!-- Header Content -->
        <div bind:this={headerContent} class="text-center mb-6 md:mb-8">
            <h2 class="text-2xl sm:text-3xl lg:text-4xl font-bold text-primary mb-3 md:mb-4">Any Questions? Look Here.</h2>
            <p class="text-[#152F45E5] text-sm sm:text-base mb-4 md:mb-6">Lorem ipsum Dolor Sit Amet, Consectetur Adipiscing</p>
        </div>

        <!-- Custom Button Tabs -->
        <div bind:this={tabButtons} class="mx-auto max-w-full overflow-x-auto scrollbar-hide">
            <div class="flex justify-start gap-2 p-1 border border-[#EBEEF8] rounded-md min-w-max">
                {#each Object.keys(faqData) as tab}
                    <Button
                        variant={activeTab === tab ? 'default' : 'ghost'}
                        class="flex-shrink-0 px-3 py-1.5 text-sm sm:text-base rounded-md {activeTab === tab ? 'bg-[#F9BF30] text-black hover:bg-[#F9BF30]' : 'text-[#ACB6BE] hover:bg-gray-100'} transition-all duration-300"
                        onclick={() => (activeTab = tab)}
                    >
                        {tab}
                    </Button>
                {/each}
            </div>
        </div>

        <!-- Tabs Content -->
        <div bind:this={tabContent} class="mt-6 md:mt-8">
            <Tabs value={activeTab} on:valueChange={(e) => (activeTab = e.detail.value)} class="space-y-4 w-full">
                <TabsList class="hidden">
                    {#each Object.keys(faqData) as tab}
                        <TabsTrigger value={tab}>{tab}</TabsTrigger>
                    {/each}
                </TabsList>

                {#each Object.keys(faqData) as tab}
                    <TabsContent value={tab} class="w-full px-0 sm:px-4 pt-5 md:pt-7">
                        <Accordion type="single" collapsible class="space-y-3 w-full">
                            {#each faqData[tab] as faq, index}
                                <AccordionItem value={`item-${tab}-${index}`} class="bg-white rounded-md w-full">
                                    <AccordionTrigger class="px-4 py-2.5 hover:no-underline text-left font-medium text-gray-800 hover:bg-gray-50 text-sm sm:text-base">
                                        {index + 1}. {faq.question}
                                    </AccordionTrigger>
                                    <AccordionContent class="px-4 py-2.5 text-gray-600 text-sm sm:text-base">
                                        {faq.answer}
                                    </AccordionContent>
                                </AccordionItem>
                            {/each}
                        </Accordion>
                    </TabsContent>
                {/each}
            </Tabs>
        </div>
    </div>
</section>

<style>
    .scrollbar-hide::-webkit-scrollbar {
        display: none;
    }
    .scrollbar-hide {
        -ms-overflow-style: none;
        scrollbar-width: none;
    }
    @media (max-width: 640px) {
        .container {
            padding-left: 1rem;
            padding-right: 1rem;
        }
        .min-w-max {
            min-width: fit-content;
        }
        .text-sm {
            font-size: 0.875rem;
        }
        .px-3 {
            padding-left: 0.75rem;
            padding-right: 0.75rem;
        }
        .py-1\.5 {
            padding-top: 0.375rem;
            padding-bottom: 0.375rem;
        }
    }
</style>
<script lang="ts">
    import { Tabs, TabsContent, TabsList, TabsTrigger } from "$lib/components/ui/tabs";
    import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "$lib/components/ui/accordion";
    import { Button } from "$lib/components/ui/button";
    import { onMount } from 'svelte';

    // Updated FAQ data structure
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

    // Animation elements
    let sectionElement: HTMLElement;
    let headerContent: HTMLElement;
    let tabButtons: HTMLElement;
    let tabContent: HTMLElement;

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
        // Animate elements with staggered delays
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

  <section bind:this={sectionElement} class="py-20 bg-[#F5F6F8] text-gray-800">
    <div class="container mx-auto max-w-4xl flex flex-col items-center justify-center lg:px-16">
        <!-- Header Content -->
        <div bind:this={headerContent} class="text-center mb-8">
            <h2 class="text-3xl md:text-4xl font-bold text-primary mb-4">Any Questions? Look Here.</h2>
            <p class="text-[#152F45E5] mb-6">Lorem ipsum Dolor Sit Amet, Consectetur Adipiscing</p>
        </div>

        <!-- Custom Button Tabs -->
        <div bind:this={tabButtons} class="flex justify-start items-center mb-8 border border-[#EBEEF8] rounded-md p-1 gap-2 overflow-x-auto">
            {#each Object.keys(faqData) as tab, index}
                <Button
                    variant={activeTab === tab ? 'default' : 'ghost'}
                    class={activeTab === tab ? 'bg-[#F9BF30] text-black rounded-md hover:bg-[#F9BF30] duration-300 transition-all' : 'text-[#ACB6BE]'}
                    onclick={() => (activeTab = tab)}
                >
                    {tab}
                </Button>
            {/each}
        </div>

        <!-- Tabs Content -->
        <div bind:this={tabContent}>
            <Tabs value={activeTab} on:valueChange={(e) => (activeTab = e.detail.value)} class="space-y-4 max-w-4xl">
                <!-- Hidden TabsList (since we're using custom buttons) -->
                <TabsList class="hidden">
                    {#each Object.keys(faqData) as tab}
                        <TabsTrigger value={tab}>{tab}</TabsTrigger>
                    {/each}
                </TabsList>

                <!-- TabsContent for each tab -->
                {#each Object.keys(faqData) as tab}
                    <TabsContent value={tab} class="min-w-4xl px-4 pt-7">
                        <Accordion type="single" collapsible class="space-y-4">
                            {#each faqData[tab] as faq, index}
                                <AccordionItem value={`item-${tab}-${index}`} class="bg-white rounded-md">
                                    <AccordionTrigger class="px-4 py-3 hover:no-underline text-left font-medium text-gray-800 hover:bg-gray-50">
                                        {index + 1}. {faq.question}
                                    </AccordionTrigger>
                                    <AccordionContent class="px-4 py-3 text-gray-600">
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
    @media (max-width: 768px) {
        h2, p {
            text-align: center;
        }
        .flex {
            justify-content: center;
        }
    }
  </style>

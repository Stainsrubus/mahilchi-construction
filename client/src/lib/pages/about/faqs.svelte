<script lang="ts">
    import { Tabs, TabsContent, TabsList, TabsTrigger } from "$lib/components/ui/tabs";
    import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "$lib/components/ui/accordion";
    import { Button } from "$lib/components/ui/button";
    import { onMount } from 'svelte';
    
    // FAQ data for different tabs
    const faqData = {
      'getting-started': [
        {
          question: "How to Start a Project?",
          answer: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
        },
        {
          question: "What Are the Initial Costs?",
          answer: "Quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit."
        }
      ],
      'construction': [
        {
          question: "What Materials Are Used?",
          answer: "Eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est."
        },
        {
          question: "How Long Does Construction Take?",
          answer: "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam."
        }
      ],
      'support': [
        {
          question: "How to Contact Support?",
          answer: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut enim ad minim veniam, quis nostrud exercitation ullamco."
        },
        {
          question: "What Is the Warranty Period?",
          answer: "Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
        }
      ]
    };
  
    let activeTab = 'getting-started';
    
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
            <Button
                variant={activeTab === 'getting-started' ? 'default' : 'ghost'}
                class={activeTab === 'getting-started' ? 'bg-[#F9BF30] text-black rounded-md hover:bg-[#F9BF30] duration-300 transition-all' : 'text-[#ACB6BE]'}
                onclick={() => (activeTab = 'getting-started')}
            >
                Getting Started
            </Button>
            <Button
                variant={activeTab === 'construction' ? 'default' : 'ghost'}
                class={activeTab === 'construction' ? 'bg-[#F9BF30] text-black rounded-md hover:bg-[#F9BF30] duration-300 transition-all' : 'text-[#ACB6BE]'}
                onclick={() => (activeTab = 'construction')}
            >
                Construction
            </Button>
            <Button
                variant={activeTab === 'support' ? 'default' : 'ghost'}
                class={activeTab === 'support' ? 'bg-[#F9BF30] text-black rounded-md hover:bg-[#F9BF30] duration-300 transition-all' : 'text-[#ACB6BE]'}
                onclick={() => (activeTab = 'support')}
            >
                Support
            </Button>
        </div>
  
        <!-- Tabs Content -->
        <div bind:this={tabContent}>
            <Tabs value={activeTab} onValueChange={(e) => (activeTab = e)} class="space-y-4 max-w-4xl">
                <!-- Hidden TabsList (since we're using custom buttons) -->
                <TabsList class="hidden">
                    <TabsTrigger value="getting-started">Getting Started</TabsTrigger>
                    <TabsTrigger value="construction">Construction</TabsTrigger>
                    <TabsTrigger value="support">Support</TabsTrigger>
                </TabsList>
  
                <!-- TabsContent for Getting Started -->
                <TabsContent value="getting-started" class="min-w-4xl px-4 pt-7">
                    <Accordion type="single" class="space-y-4">
                        {#each faqData['getting-started'] as faq, index}
                            <AccordionItem value={`item-${index + 1}`} class="bg-white rounded-md">
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
  
                <!-- TabsContent for Construction -->
                <TabsContent value="construction" class="min-w-4xl px-4">
                    <Accordion type="single" class="space-y-4">
                        {#each faqData['construction'] as faq, index}
                            <AccordionItem value={`item-${index + 1}`} class="bg-white rounded-md">
                                <AccordionTrigger class="px-4 py-3 text-left hover:no-underline font-medium text-gray-800 hover:bg-gray-50">
                                    {index + 1}. {faq.question}
                                </AccordionTrigger>
                                <AccordionContent class="px-4 py-3 text-gray-600">
                                    {faq.answer}
                                </AccordionContent>
                            </AccordionItem>
                        {/each}
                    </Accordion>
                </TabsContent>
  
                <!-- TabsContent for Support -->
                <TabsContent value="support" class="min-w-4xl px-4">
                    <Accordion type="single" class="space-y-4">
                        {#each faqData['support'] as faq, index}
                            <AccordionItem value={`item-${index + 1}`} class="bg-white rounded-md">
                                <AccordionTrigger class="px-4 py-3 text-left font-medium text-gray-800 hover:no-underline hover:bg-gray-50">
                                    {index + 1}. {faq.question}
                                </AccordionTrigger>
                                <AccordionContent class="px-4 py-3 text-gray-600">
                                    {faq.answer}
                                </AccordionContent>
                            </AccordionItem>
                        {/each}
                    </Accordion>
                </TabsContent>
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
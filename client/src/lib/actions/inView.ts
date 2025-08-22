// src/lib/actions/inView.ts
export function inView(node: HTMLElement, { threshold = 0.1 } = {}) {
    const observer = new IntersectionObserver(
      ([entry]) => {
        console.log("inview")
        if (entry.isIntersecting) {
          node.dispatchEvent(new CustomEvent("enterview"));
          observer.unobserve(node); // animate only once
        }
      },
      { threshold }
    );
    observer.observe(node);
  
    return {
      destroy() {
        observer.disconnect();
      }
    };
  }
  
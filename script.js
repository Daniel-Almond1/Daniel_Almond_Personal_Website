// Corporate Portfolio Animations
document.addEventListener('DOMContentLoaded', function() {
    
    // Animate name slide in
    const nameElement = document.querySelector('.name');
    if (nameElement) {
        nameElement.style.opacity = '0';
        nameElement.style.transform = 'translateX(-50px)';
        
        setTimeout(() => {
            nameElement.style.transition = 'all 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
            nameElement.style.opacity = '1';
            nameElement.style.transform = 'translateX(0)';
        }, 500);
    }

    // Animate title lines
    const titleLines = document.querySelectorAll('.title-line-1, .title-line-2');
    titleLines.forEach((line, index) => {
        line.style.opacity = '0';
        line.style.transform = 'translateY(30px)';
        
        setTimeout(() => {
            line.style.transition = 'all 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
            line.style.opacity = '1';
            line.style.transform = 'translateY(0)';
        }, 800 + (index * 200));
    });

    // Animate subtitle
    const subtitle = document.querySelector('.hero-subtitle');
    if (subtitle) {
        subtitle.style.opacity = '0';
        subtitle.style.transform = 'translateY(20px)';
        
        setTimeout(() => {
            subtitle.style.transition = 'all 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
            subtitle.style.opacity = '1';
            subtitle.style.transform = 'translateY(0)';
        }, 1200);
    }

    // Animate description
    const description = document.querySelector('.hero-description');
    if (description) {
        description.style.opacity = '0';
        description.style.transform = 'translateY(20px)';
        
        setTimeout(() => {
            description.style.transition = 'all 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
            description.style.opacity = '1';
            description.style.transform = 'translateY(0)';
        }, 1400);
    }

    // Animate credentials with counting effect
    const credentials = document.querySelectorAll('.credential-value');
    credentials.forEach((credential, index) => {
        credential.style.opacity = '0';
        credential.style.transform = 'scale(0.8)';
        
        setTimeout(() => {
            credential.style.transition = 'all 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
            credential.style.opacity = '1';
            credential.style.transform = 'scale(1)';
            
            // Add counting animation for numbers
            const text = credential.textContent;
            if (text.includes('+')) {
                const number = parseInt(text);
                if (!isNaN(number)) {
                    animateCount(credential, 0, number, 1500);
                }
            }
        }, 1600 + (index * 200));
    });

    // Animate CTA buttons
    const buttons = document.querySelectorAll('.btn-primary, .btn-secondary');
    buttons.forEach((button, index) => {
        button.style.opacity = '0';
        button.style.transform = 'translateY(20px)';
        
        setTimeout(() => {
            button.style.transition = 'all 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
            button.style.opacity = '1';
            button.style.transform = 'translateY(0)';
        }, 2000 + (index * 150));
    });

    // Animate professional card
    const card = document.querySelector('.professional-card');
    if (card) {
        card.style.opacity = '0';
        card.style.transform = 'translateX(50px) scale(0.95)';
        
        setTimeout(() => {
            card.style.transition = 'all 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
            card.style.opacity = '1';
            card.style.transform = 'translateX(0) scale(1)';
        }, 1000);
    }

    // Animate work items on scroll
    const workItems = document.querySelectorAll('.work-item');
    const projectItems = document.querySelectorAll('.project-item');
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.style.transition = 'all 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }, index * 200);
            }
        });
    }, observerOptions);

    workItems.forEach(item => {
        item.style.opacity = '0';
        item.style.transform = 'translateY(30px)';
        observer.observe(item);
    });

    // Animate project items on scroll
    projectItems.forEach(item => {
        item.style.opacity = '0';
        item.style.transform = 'translateY(30px)';
        observer.observe(item);
    });

    // Animate section titles
    const sectionTitles = document.querySelectorAll('.section-title');
    sectionTitles.forEach(title => {
        title.style.opacity = '0';
        title.style.transform = 'translateY(20px)';
        
        const titleObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    setTimeout(() => {
                        entry.target.style.transition = 'all 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
                        entry.target.style.opacity = '1';
                        entry.target.style.transform = 'translateY(0)';
                    }, 300);
                }
            });
        }, observerOptions);
        
        titleObserver.observe(title);
    });

    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Add hover effects to work items
    workItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px)';
        });
        
        item.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });

    // Form submission handling
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            const submitBtn = document.getElementById('submitBtn');
            
            // Show loading state
            submitBtn.classList.add('loading');
            submitBtn.textContent = 'Sending...';
            submitBtn.disabled = true;
            
            // Let the form submit naturally to FormSubmit
            // FormSubmit will redirect to a success page or back to the form
        });
    }



    // Clickable graphs functionality
    const clickableGraphs = document.querySelectorAll('.clickable-graph');
    
    clickableGraphs.forEach(graph => {
        graph.addEventListener('click', function() {
            if (this.classList.contains('enlarged')) {
                // Shrink the graph back to normal size
                this.classList.remove('enlarged');
                this.style.zIndex = '';
                this.style.position = '';
                this.style.top = '';
                this.style.left = '';
                this.style.transform = '';
                this.style.maxWidth = '';
                this.style.maxHeight = '';
                this.style.background = '';
                this.style.boxShadow = '';
                this.style.borderRadius = '';
                this.style.padding = '';
                
                // Remove overlay if it exists
                const overlay = document.querySelector('.graph-overlay');
                if (overlay) {
                    overlay.classList.remove('active');
                }
            } else {
                // Enlarge the graph
                this.classList.add('enlarged');
                
                // Create overlay if it doesn't exist
                let overlay = document.querySelector('.graph-overlay');
                if (!overlay) {
                    overlay = document.createElement('div');
                    overlay.className = 'graph-overlay';
                    document.body.appendChild(overlay);
                }
                overlay.classList.add('active');
                
                // Close on overlay click
                overlay.addEventListener('click', function() {
                    graph.classList.remove('enlarged');
                    graph.style.zIndex = '';
                    graph.style.position = '';
                    graph.style.top = '';
                    graph.style.left = '';
                    graph.style.transform = '';
                    graph.style.maxWidth = '';
                    graph.style.maxHeight = '';
                    graph.style.background = '';
                    graph.style.boxShadow = '';
                    graph.style.borderRadius = '';
                    graph.style.padding = '';
                    overlay.classList.remove('active');
                });
            }
        });
    });
    
    // Close enlarged graphs on escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            const enlargedGraph = document.querySelector('.clickable-graph.enlarged');
            if (enlargedGraph) {
                enlargedGraph.classList.remove('enlarged');
                enlargedGraph.style.zIndex = '';
                enlargedGraph.style.position = '';
                enlargedGraph.style.top = '';
                enlargedGraph.style.left = '';
                enlargedGraph.style.transform = '';
                enlargedGraph.style.maxWidth = '';
                enlargedGraph.style.maxHeight = '';
                enlargedGraph.style.background = '';
                enlargedGraph.style.boxShadow = '';
                enlargedGraph.style.borderRadius = '';
                enlargedGraph.style.padding = '';
                
                const overlay = document.querySelector('.graph-overlay');
                if (overlay) {
                    overlay.classList.remove('active');
                }
            }
        }
    });
});

// Counting animation function
function animateCount(element, start, end, duration) {
    const startTime = performance.now();
    const originalText = element.textContent;
    const suffix = originalText.replace(/\d+/g, '');
    
    function updateCount(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        
        const current = Math.floor(start + (end - start) * progress);
        element.textContent = current + suffix;
        
        if (progress < 1) {
            requestAnimationFrame(updateCount);
        }
    }
    
    requestAnimationFrame(updateCount);
}

// Add subtle parallax effect to background elements
window.addEventListener('scroll', function() {
    const scrolled = window.pageYOffset;
    const parallaxElements = document.querySelectorAll('.hero');
    
    parallaxElements.forEach(element => {
        const speed = 0.5;
        element.style.transform = `translateY(${scrolled * speed}px)`;
    });
}); 
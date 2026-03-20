document.addEventListener('DOMContentLoaded', () => {

	// Dynamic footer year
	document.querySelectorAll('.footer-year').forEach(el => {
		el.textContent = new Date().getFullYear();
	});

	// Mobile Menu Toggle
	const mobileToggle = document.querySelector('.mobile-menu-toggle');
	const mainNav = document.querySelector('.main-nav');

	if (mobileToggle && mainNav) {
		mobileToggle.addEventListener('click', () => {
			mainNav.classList.toggle('open');
			mobileToggle.classList.toggle('active');

			// Force header background when menu is open on mobile
			const header = document.querySelector('.main-header');
			header.classList.toggle('menu-open');
		});
	}

	// Helper for checking mobile view
	const isMobile = () => window.innerWidth < 768;

	// Add toggle buttons to dropdowns for mobile
	// This ensures we don't break the main link functionality while offering a submenu toggle
	document.querySelectorAll('.has-dropdown').forEach(item => {
		// Create toggle button
		const toggleBtn = document.createElement('span');
		toggleBtn.className = 'mobile-submenu-toggle';
		toggleBtn.innerHTML = '<i class="fas fa-angle-down"></i>';
		
		// Insert inside the link, at the end
		const link = item.querySelector(':scope > a');
		if (link) {
			link.appendChild(toggleBtn);
		} else {
			item.appendChild(toggleBtn);
		}

		// Handle toggle click
		toggleBtn.addEventListener('click', (e) => {
			e.preventDefault();
			e.stopPropagation();
			
			// Toggle open state on parent li
			item.classList.toggle('active');
			
			// Optional: Close other open dropdowns (accordion behavior)
			document.querySelectorAll('.has-dropdown').forEach(otherItem => {
				if (otherItem !== item && otherItem.classList.contains('active')) {
					otherItem.classList.remove('active');
				}
			});
		});
	});

	// Scroll Effect for Header
	const header = document.querySelector('.main-header');
	
	const handleScroll = () => {
		if (window.scrollY > 50) {
			header.classList.add('scrolled');
		} else {
			header.classList.remove('scrolled');
		}
	};

	window.addEventListener('scroll', handleScroll);
	// Check on initial load
	handleScroll();

	// Smooth Scrolling for Anchors
	document.querySelectorAll('a[href^="#"]').forEach(anchor => {
		anchor.addEventListener('click', function (e) {
			e.preventDefault();
			const target = document.querySelector(this.getAttribute('href'));

			if (target) {
				// Close mobile menu if open
				if (mainNav.classList.contains('open')) {
					mainNav.classList.remove('open');
				}

				target.scrollIntoView({
					behavior: 'smooth'
				});
			}
		});
	});

	// --- Advanced Luxury Scroll Animations ---

	// Helper to add animation class with delay
	const addAnimation = (elements, animationClass, stagger = 100) => {
		if (!elements || elements.length === 0) return;
		
		const observer = new IntersectionObserver((entries) => {
			entries.forEach(entry => {
				if (entry.isIntersecting) {
					entry.target.classList.add('in-view');
					observer.unobserve(entry.target);
				}
			});
		}, { threshold: 0.1, rootMargin: "0px 0px -50px 0px" });

		elements.forEach((el, index) => {
			el.classList.add(animationClass);
			if (stagger > 0) {
				const delayClass = `delay-${Math.min((index % 5) * 100 + 100, 500)}`;
				el.classList.add(delayClass);
			}
			observer.observe(el);
		});
	};

	// 1. Group Animations (Cards, Grid Items) - Staggered
	const gridGroups = [
		{ selector: '.luxury-card', anim: 'reveal-up' },
		{ selector: '.stat-item', anim: 'reveal-scale' },
		{ selector: '.member-card', anim: 'reveal-up' },
		{ selector: '.member-gallery-card', anim: 'reveal-up' },
        { selector: '.activity-gallery-card', anim: 'reveal-up' },
		{ selector: '.value-card', anim: 'reveal-up' },
		{ selector: '.modern-value-card', anim: 'reveal-up' }, /* New */
		{ selector: '.board-card', anim: 'reveal-up' }, /* New */
		{ selector: '.contact-detail-row', anim: 'reveal-left' },
		{ selector: '.legal-item', anim: 'reveal-up' },
		{ selector: '.editorial-row', anim: 'reveal-up' } /* Fix for editorial layer */
	];

	gridGroups.forEach(group => {
		const items = document.querySelectorAll(group.selector);
		addAnimation(items, group.anim, 200);
	});

	// 2. Section Headers (Title, Suptitle, Desc)
	document.querySelectorAll('.section-header, .manifesto-box').forEach(header => {
		const children = header.querySelectorAll('.suptitle, .section-title, .divider-gold, .section-desc, .prestige-title, .section-lead');
		addAnimation(children, 'reveal-up', 150);
	});

	// 3. Standalone Elements
	addAnimation(document.querySelectorAll('.about-text p'), 'reveal-up', 100);
	addAnimation(document.querySelectorAll('.about-image-wrapper'), 'reveal-scale', 0);
	addAnimation(document.querySelectorAll('.president-spotlight'), 'reveal-up', 0); /* New */
	addAnimation(document.querySelectorAll('.timeline-milestone'), 'reveal-up', 0); /* New */
	addAnimation(document.querySelectorAll('.btn-gold, .btn-outline-gold'), 'reveal-up', 0);
	addAnimation(document.querySelectorAll('.registry-card'), 'reveal-up', 0);
	addAnimation(document.querySelectorAll('.contact-form-card'), 'reveal-right', 0);
	addAnimation(document.querySelectorAll('.contact-card-glass'), 'reveal-left', 0);
	addAnimation(document.querySelectorAll('.genesis-content'), 'reveal-up', 0); /* New Genesis Section */
	addAnimation(document.querySelectorAll('.genesis-visual'), 'reveal-left', 0); /* New Genesis Section */
	addAnimation(document.querySelectorAll('.history-node'), 'reveal-up', 0);
	addAnimation(document.querySelectorAll('.value-card-large'), 'reveal-up', 0);
	addAnimation(document.querySelectorAll('.member-profile-visual'), 'reveal-right', 0); /* New Member Profile */
	addAnimation(document.querySelectorAll('.member-profile-text'), 'reveal-up', 0); /* New Member Profile */
    addAnimation(document.querySelectorAll('.flagship-visual'), 'reveal-left', 0);
    addAnimation(document.querySelectorAll('.flagship-content'), 'reveal-up', 0);
    addAnimation(document.querySelectorAll('.activity-gallery-lead'), 'reveal-up', 0);
    addAnimation(document.querySelectorAll('.activity-gallery-grid, .activity-gallery-actions'), 'reveal-up', 0);
    addAnimation(document.querySelectorAll('.synergy-visual'), 'reveal-left', 0);
    addAnimation(document.querySelectorAll('.synergy-content'), 'reveal-up', 0);
    addAnimation(document.querySelectorAll('.synergy-carousel-wrapper'), 'reveal-up', 0);

    const galleryGrid = document.querySelector('.activity-gallery-grid');
    const galleryLoadMore = document.querySelector('.activity-gallery-load-more');
    const lightbox = document.querySelector('.gallery-lightbox');
    const lightboxImage = document.querySelector('.gallery-lightbox-image');
    const lightboxClose = document.querySelector('.gallery-lightbox-close');
    const lightboxPrev = document.querySelector('.gallery-lightbox-nav.prev');
    const lightboxNext = document.querySelector('.gallery-lightbox-nav.next');
    let currentGalleryIndex = 0;

    if (galleryGrid && galleryLoadMore) {
        galleryLoadMore.addEventListener('click', () => {
            const expanded = galleryGrid.classList.toggle('is-expanded');
            galleryLoadMore.textContent = expanded ? 'Pokaż mniej zdjęć' : 'Załaduj więcej zdjęć';
            galleryLoadMore.setAttribute('aria-expanded', expanded ? 'true' : 'false');
        });
    }

    if (galleryGrid && lightbox && lightboxImage && lightboxClose) {
        const galleryCards = galleryGrid.querySelectorAll('.activity-gallery-card');
        const galleryImages = Array.from(galleryCards).map((card) => card.querySelector('img'));

        const showLightboxImage = (index) => {
            const safeIndex = (index + galleryImages.length) % galleryImages.length;
            const image = galleryImages[safeIndex];
            if (!image) return;

            currentGalleryIndex = safeIndex;
            lightboxImage.src = image.src;
            lightboxImage.alt = image.alt;
        };

        const closeLightbox = () => {
            lightbox.classList.remove('open');
            lightbox.setAttribute('aria-hidden', 'true');
            lightboxImage.src = '';
            lightboxImage.alt = '';
            document.body.style.overflow = '';
        };

        galleryCards.forEach((card) => {
            card.addEventListener('click', () => {
                const index = Array.from(galleryCards).indexOf(card);
                showLightboxImage(index);
                lightbox.classList.add('open');
                lightbox.setAttribute('aria-hidden', 'false');
                document.body.style.overflow = 'hidden';
            });
        });

        lightboxPrev.addEventListener('click', () => {
            showLightboxImage(currentGalleryIndex - 1);
        });

        lightboxNext.addEventListener('click', () => {
            showLightboxImage(currentGalleryIndex + 1);
        });

        lightboxClose.addEventListener('click', closeLightbox);
        lightbox.addEventListener('click', (event) => {
            if (event.target === lightbox) {
                closeLightbox();
            }
        });

        document.addEventListener('keydown', (event) => {
            if (!lightbox.classList.contains('open')) return;

            if (event.key === 'Escape') {
                closeLightbox();
            }

            if (event.key === 'ArrowLeft') {
                showLightboxImage(currentGalleryIndex - 1);
            }

            if (event.key === 'ArrowRight') {
                showLightboxImage(currentGalleryIndex + 1);
            }
        });
    }

	// 4. Hero Text Parallax & Fade
	const heroContent = document.querySelector('.hero-content, .hero-page-content');
	if (heroContent) {
		const children = heroContent.querySelectorAll('.hero-title, .hero-lead, .hero-buttons, .hero-page-title, .hero-page-subtitle, .glass-breadcrumbs');
		if(children.length > 0) {
             addAnimation(children, 'reveal-up', 200);
        } else {
             heroContent.classList.add('reveal-up', 'in-view'); 
        }
	}

});
// Luxury Card Mouse Tracking Effect
const luxuryCards = document.querySelectorAll('.luxury-card');

luxuryCards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        card.style.setProperty('--mouse-x', `${x}px`);
        card.style.setProperty('--mouse-y', `${y}px`);
    });
});

// Vanilla Tilt Effect for Cards (3D movement)
/* 
function initTilt() {
    luxuryCards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const cardInner = card.querySelector('.card-inner');
            if (!cardInner) return;

            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            const centerX = rect.width / 2;
            const centerY = rect.height / 2;

            const rotateX = ((y - centerY) / centerY) * -5; // Max -5deg to 5deg
            const rotateY = ((x - centerX) / centerX) * 5;

            cardInner.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
        });

        card.addEventListener('mouseleave', () => {
            const cardInner = card.querySelector('.card-inner');
            if (!cardInner) return;

            cardInner.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)';
        });
    });
}
*/

// Init tilt on desktop only
/*
if (window.matchMedia('(min-width: 1024px)').matches) {
initTilt();
}
*/


// --- Universal Reveal Observer ---
// Renamed from Royal Epoch to generic to handle all structure types
document.addEventListener('DOMContentLoaded', () => {
    // New class selector for Flow timeline row
    const animatedRows = document.querySelectorAll('.flow-row, .epoch-item');
    if (animatedRows.length === 0) return;

    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('in-view');
                revealObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.15,
        rootMargin: "0px"
    });

    animatedRows.forEach(row => {
        // Add basic fade style via JS if not present in CSS
        row.style.opacity = '0';
        row.style.transform = 'translateY(20px)';
        row.style.transition = 'all 0.6s ease';
        
        revealObserver.observe(row);
    });
    
    // Inject the class helper for the above inline styles
    const style = document.createElement('style');
    style.innerHTML = `
        .flow-row.in-view, .epoch-item.in-view {
            opacity: 1 !important;
            transform: translateY(0) !important;
        }
    `;
    document.head.appendChild(style);
});


// --- Flow Timeline Progress Animation ---
document.addEventListener('DOMContentLoaded', () => {
    const section = document.querySelector('.flow-timeline-section');
    if (!section) return;

    const progressLine = section.querySelector('.flow-line-progress');
    const flowRows = section.querySelectorAll('.flow-row');

    const handleScroll = () => {
        const sectionRect = section.getBoundingClientRect();
        const viewportHeight = window.innerHeight;
        
        // Calculate progress based on scroll
        // Start filling when section top is at 70% of viewport
        const startOffset = viewportHeight * 0.7;
        let p = (viewportHeight - sectionRect.top) / (sectionRect.height + viewportHeight * 0.5);
        
        // Adjust logic: Fill from 0% when section enters to 100% when section leaves
        // Simple linear map: 
        // 0% when section.top = center
        // 100% when section.bottom = center
        
        const center = viewportHeight / 2;
        const relativeY = center - sectionRect.top;
        const totalHeight = sectionRect.height;
        
        // Clamp 0 to 100
        let percent = (relativeY / totalHeight) * 100;
        percent = Math.max(0, Math.min(100, percent));

        if (progressLine) {
            progressLine.style.height = `${percent}%`;
        }
        
        // Activate markers
        flowRows.forEach(row => {
            const marker = row.querySelector('.flow-marker');
            if(!marker) return;
            
            const markerRect = marker.getBoundingClientRect();
            // If the filled line passes the marker
            // Line top is section top. Line height is calculated relative to section.
            // We need to check if the 'progress point' is below the marker point.
            
            // Progress point Y coordinate in viewport space:
            const progressPointY = sectionRect.top + (sectionRect.height * (percent / 100));
            
            if (progressPointY > markerRect.top) {
                row.classList.add('active');
            } else {
                row.classList.remove('active');
            }
        });
    };

    window.addEventListener('scroll', () => requestAnimationFrame(handleScroll));
    handleScroll();
});

// --- Science & Business Reveal Animation ---
document.addEventListener('DOMContentLoaded', () => {
    const scienceElements = document.querySelectorAll('.science-image-wrapper, .science-content');
    if (scienceElements.length === 0) return;

    const scienceObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('in-view');
                scienceObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.2, // Trigger when 20% visible
        rootMargin: "0px"
    });

    scienceElements.forEach(el => scienceObserver.observe(el));
});


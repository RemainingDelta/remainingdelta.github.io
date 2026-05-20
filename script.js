// Mobile Menu Toggle
function toggleMenu() {
    const hamburger = document.querySelector('.hamburger');
    const mobileMenu = document.querySelector('.mobile-menu');
    
    hamburger.classList.toggle('active');
    mobileMenu.classList.toggle('active');
}

// Smooth scrolling for navigation links
document.addEventListener('DOMContentLoaded', function() {
    // Get all navigation links
    const navLinks = document.querySelectorAll('a[href^="#"]');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const navHeight = document.querySelector('#navbar').offsetHeight;
                const targetPosition = targetSection.offsetTop - navHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
                
                // Close mobile menu if open
                const hamburger = document.querySelector('.hamburger');
                const mobileMenu = document.querySelector('.mobile-menu');
                hamburger.classList.remove('active');
                mobileMenu.classList.remove('active');
            }
        });
    });
});

// Navbar scroll effect
window.addEventListener('scroll', function() {
    const navbar = document.querySelector('#navbar');
    
    if (window.scrollY > 100) {
        navbar.style.backgroundColor = 'rgba(2, 2, 49, 0.98)';
        navbar.style.boxShadow = '0 2px 20px rgba(68, 61, 255, 0.1)';
    } else {
        navbar.style.backgroundColor = 'rgba(2, 2, 49, 0.95)';
        navbar.style.boxShadow = 'none';
    }
});

// Active navigation link highlighting
window.addEventListener('scroll', function() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-links a[href^="#"]');
    
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        
        if (scrollY >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});

// Contact form handling
document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.querySelector('#contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(this);
            const name = formData.get('name');
            const email = formData.get('email');
            const subject = formData.get('subject');
            const message = formData.get('message');
            
            // Basic form validation
            if (!name || !email || !subject || !message) {
                showNotification('Please fill in all fields.', 'error');
                return;
            }
            
            if (!isValidEmail(email)) {
                showNotification('Please enter a valid email address.', 'error');
                return;
            }
            
            // Simulate form submission (replace with actual form handling)
            submitForm({ name, email, subject, message });
        });
    }
});

// Email validation
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Form submission (replace with your actual form handling)
function submitForm(data) {
    // Show loading state
    const submitBtn = document.querySelector('#contactForm button[type="submit"]');
    const originalText = submitBtn.textContent;
    submitBtn.textContent = 'Sending...';
    submitBtn.disabled = true;
    
    // Simulate API call
    setTimeout(() => {
        // Reset button
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
        
        // Show success message
        showNotification('Message sent successfully! I\'ll get back to you soon.', 'success');
        
        // Reset form
        document.querySelector('#contactForm').reset();
        
        // In a real application, you would send the data to your server:
        // fetch('/api/contact', {
        //     method: 'POST',
        //     headers: { 'Content-Type': 'application/json' },
        //     body: JSON.stringify(data)
        // })
        // .then(response => response.json())
        // .then(result => {
        //     if (result.success) {
        //         showNotification('Message sent successfully!', 'success');
        //         document.querySelector('#contactForm').reset();
        //     } else {
        //         showNotification('Failed to send message. Please try again.', 'error');
        //     }
        // })
        // .catch(error => {
        //     showNotification('An error occurred. Please try again.', 'error');
        // });
        
    }, 2000);
}

// Notification system
function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <span class="notification-message">${message}</span>
            <button class="notification-close" onclick="this.parentElement.parentElement.remove()">×</button>
        </div>
    `;
    
    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background-color: ${type === 'success' ? '#2f27ce' : type === 'error' ? '#ff00cb' : '#443dff'};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
        z-index: 10000;
        max-width: 400px;
        animation: slideInRight 0.3s ease-out;
    `;
    
    const content = notification.querySelector('.notification-content');
    content.style.cssText = `
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 1rem;
    `;
    
    const closeBtn = notification.querySelector('.notification-close');
    closeBtn.style.cssText = `
        background: none;
        border: none;
        color: white;
        font-size: 1.5rem;
        cursor: pointer;
        padding: 0;
        width: 24px;
        height: 24px;
        display: flex;
        align-items: center;
        justify-content: center;
    `;
    
    // Add to page
    document.body.appendChild(notification);
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        if (notification.parentElement) {
            notification.style.animation = 'slideOutRight 0.3s ease-out';
            setTimeout(() => notification.remove(), 300);
        }
    }, 5000);
}

// Add CSS animations for notifications
if (!document.querySelector('#notification-styles')) {
    const style = document.createElement('style');
    style.id = 'notification-styles';
    style.textContent = `
        @keyframes slideInRight {
            from {
                transform: translateX(100%);
                opacity: 0;
            }
            to {
                transform: translateX(0);
                opacity: 1;
            }
        }
        
        @keyframes slideOutRight {
            from {
                transform: translateX(0);
                opacity: 1;
            }
            to {
                transform: translateX(100%);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(style);
}

// Intersection Observer for scroll animations
function initScrollAnimations(root) {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    const elementsToAnimate = (root || document).querySelectorAll('.skill-category, .project-card, .timeline-item, .contact-item');

    elementsToAnimate.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        element.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
        observer.observe(element);
    });
}

document.addEventListener('DOMContentLoaded', function() {
    initScrollAnimations(null);
});

// ── Google Sheets CMS ──────────────────────────────────────────────────────────

const SHEET_ID = '1b77yjNkYwqpx0s6QcJw_0mR0yoYLqlflXborvsevKjU';

function parseCSV(text) {
    const rawRows = [];
    let fields = [];
    let cur = '';
    let inQuotes = false;

    for (let i = 0; i < text.length; i++) {
        const ch = text[i];
        const next = text[i + 1];
        if (inQuotes) {
            if (ch === '"' && next === '"') { cur += '"'; i++; }
            else if (ch === '"') { inQuotes = false; }
            else { cur += ch; }
        } else {
            if (ch === '"') { inQuotes = true; }
            else if (ch === ',') { fields.push(cur); cur = ''; }
            else if (ch === '\r' && next === '\n') { fields.push(cur); cur = ''; rawRows.push(fields); fields = []; i++; }
            else if (ch === '\n') { fields.push(cur); cur = ''; rawRows.push(fields); fields = []; }
            else { cur += ch; }
        }
    }
    if (cur || fields.length) { fields.push(cur); rawRows.push(fields); }

    const headers = rawRows[0].map(h => h.trim());
    return rawRows.slice(1).map(values => {
        const obj = {};
        headers.forEach((h, idx) => { obj[h] = (values[idx] || '').trim(); });
        return obj;
    });
}

async function fetchSheet(tab) {
    const url = `https://docs.google.com/spreadsheets/d/${SHEET_ID}/gviz/tq?tqx=out:csv&sheet=${encodeURIComponent(tab)}`;
    const res = await fetch(url);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    return parseCSV(await res.text());
}

const SVG_GITHUB = `<svg fill="currentColor" height="20" viewBox="0 0 24 24" width="20"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>`;

const SVG_EXTERNAL = `<svg fill="currentColor" height="20" viewBox="0 0 24 24" width="20"><path d="M14,3V5H17.59L7.76,14.83L9.17,16.24L19,6.41V10H21V3M19,19H5V5H12V3H5C3.89,3 3,3.9 3,5V19A2,2 0 0,0 5,21H19A2,2 0 0,0 21,19V12H19V19Z"/></svg>`;

function renderProjects(rows, container) {
    const filtered = rows.filter(r => r.title && r.title.trim());
    filtered.sort((a, b) => (parseInt(a.sort_order) || 999) - (parseInt(b.sort_order) || 999));

    const cards = filtered.map(row => {
        const techTags = (row.tech || '').split('|').filter(Boolean)
            .map(t => `<span class="tech-tag">${t.trim()}</span>`).join('');

        const bullets = (row.bullets || '').split('|').filter(Boolean)
            .map(b => `<li>${b.trim()}</li>`).join('');

        const links = [
            row.github_url ? `<a class="project-link" href="${row.github_url}" target="_blank">${SVG_GITHUB}</a>` : '',
            row.live_url   ? `<a class="project-link" href="${row.live_url}" target="_blank">${SVG_EXTERNAL}</a>` : ''
        ].join('');

        return `
        <div class="project-card">
            <div class="project-image">
                <img src="./assets/${row.image}" alt="Screenshot of ${row.title} project" class="project-img" />
                <div class="project-overlay">
                    <div class="project-links">${links}</div>
                </div>
            </div>
            <div class="project-content">
                <h3 class="project-title">${row.title}</h3>
                <ul class="project-description">${bullets}</ul>
                <div class="project-tech">${techTags}</div>
            </div>
        </div>`;
    });

    container.innerHTML = cards.join('');
}

async function loadProjects() {
    const container = document.querySelector('#projects .projects-grid');
    if (!container) return;

    container.innerHTML = '<p class="cms-loading">Loading...</p>';

    try {
        const rows = await fetchSheet('Projects');
        renderProjects(rows, container);
        initScrollAnimations(container);
    } catch (err) {
        container.innerHTML = '<p class="cms-error">Could not load projects. Please try refreshing.</p>';
        console.error('Projects fetch failed:', err);
    }
}

document.addEventListener('DOMContentLoaded', loadProjects);

function renderSkills(rows, container) {
    rows.sort((a, b) => (parseInt(a.sort_order) || 999) - (parseInt(b.sort_order) || 999));

    const categories = rows.filter(r => r.category && r.name).map(row => {
        const items = row.name.split('|').filter(Boolean)
            .map(s => `<div class="skill-item"><span class="skill-name">${s.trim()}</span></div>`)
            .join('');
        return `
        <div class="skill-category">
            <h3 class="category-title">${row.category}</h3>
            <div class="skills-list">${items}</div>
        </div>`;
    });

    container.innerHTML = categories.join('');
}

async function loadSkills() {
    const container = document.querySelector('#skills .skills-grid');
    if (!container) return;

    container.innerHTML = '<p class="cms-loading">Loading...</p>';

    try {
        const rows = await fetchSheet('Skills');
        renderSkills(rows, container);
        initScrollAnimations(container);
    } catch (err) {
        container.innerHTML = '<p class="cms-error">Could not load skills. Please try refreshing.</p>';
        console.error('Skills fetch failed:', err);
    }
}

document.addEventListener('DOMContentLoaded', loadSkills);

function renderExperience(rows, container) {
    rows.sort((a, b) => (parseInt(a.sort_order) || 999) - (parseInt(b.sort_order) || 999));

    const items = rows.filter(r => r.title && r.company).map(row => {
        const bullets = (row.bullets || '').split('|').filter(Boolean)
            .map(b => `<li>${b.trim()}</li>`).join('');

        const skills = (row.skills || '').split('|').filter(Boolean)
            .map(s => `<span class="skill-tag">${s.trim()}</span>`).join('');

        return `
        <div class="timeline-item">
            <div class="timeline-dot"></div>
            <div class="timeline-content">
                <div class="timeline-header">
                    <h3 class="experience-title">${row.title}</h3>
                    <span class="experience-company">${row.company}</span>
                    <span class="experience-period">${row.period}</span>
                </div>
                <ul class="experience-description">${bullets}</ul>
                <div class="experience-skills">${skills}</div>
            </div>
        </div>`;
    });

    container.innerHTML = items.join('');
}

async function loadExperience() {
    const container = document.querySelector('#experience .experience-timeline');
    if (!container) return;

    container.innerHTML = '<p class="cms-loading">Loading...</p>';

    try {
        const rows = await fetchSheet('Experience');
        renderExperience(rows, container);
        initScrollAnimations(container);
    } catch (err) {
        container.innerHTML = '<p class="cms-error">Could not load experience. Please try refreshing.</p>';
        console.error('Experience fetch failed:', err);
    }
}

document.addEventListener('DOMContentLoaded', loadExperience);

function renderEducation(rows, container) {
    rows.sort((a, b) => (parseInt(a.sort_order) || 999) - (parseInt(b.sort_order) || 999));

    const items = [];
    let i = 0;

    while (i < rows.length) {
        const row = rows[i];
        if (row.type === 'degree') {
            const studyAbroads = [];
            let j = i + 1;
            while (j < rows.length && rows[j].type === 'study_abroad') {
                studyAbroads.push(rows[j]);
                j++;
            }

            const tags = (row.tags || '').split('|').filter(Boolean)
                .map(t => `<span class="skill-tag">${t.trim()}</span>`).join('');

            const studyAbroadRows = studyAbroads.map(sa => `
                <div class="education-info-row">
                    <span class="education-institution">
                        <span class="study-abroad-arrow">↳</span><span class="study-abroad-label"> Study Abroad</span>
                        ${sa.institution}
                    </span>
                    <span class="education-period">${sa.period}</span>
                </div>`).join('');

            items.push(`
            <div class="timeline-item">
                <div class="timeline-content">
                    <div class="timeline-header">
                        <h3 class="education-title">${row.degree}</h3>
                        <p class="education-concentration">${row.concentration}</p>
                        <div class="education-institution-row">
                            <div class="education-info-row">
                                <span class="education-institution">${row.institution}</span>
                                <span class="education-period">${row.period}</span>
                            </div>
                            ${studyAbroadRows}
                        </div>
                    </div>
                    ${tags ? `<div class="education-skills">${tags}</div>` : ''}
                </div>
            </div>`);

            i = j;
        } else {
            i++;
        }
    }

    container.innerHTML = items.join('');
}

async function loadEducation() {
    const container = document.querySelector('#education .education-timeline');
    if (!container) return;

    container.innerHTML = '<p class="cms-loading">Loading...</p>';

    try {
        const rows = await fetchSheet('Education');
        renderEducation(rows, container);
        initScrollAnimations(container);
    } catch (err) {
        container.innerHTML = '<p class="cms-error">Could not load education. Please try refreshing.</p>';
        console.error('Education fetch failed:', err);
    }
}

document.addEventListener('DOMContentLoaded', loadEducation);

// Prevent form submission on Enter key in input fields (except textarea)
document.addEventListener('DOMContentLoaded', function() {
    const formInputs = document.querySelectorAll('#contactForm input');
    
    formInputs.forEach(input => {
        input.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                e.preventDefault();
                const form = this.closest('form');
                const submitBtn = form.querySelector('button[type="submit"]');
                if (submitBtn) {
                    submitBtn.click();
                }
            }
        });
    });
});

// Add loading state to external links
document.addEventListener('DOMContentLoaded', function() {
    const externalLinks = document.querySelectorAll('a[href^="http"], a[target="_blank"]');
    
    externalLinks.forEach(link => {
        link.addEventListener('click', function() {
            // Add a small loading indicator or animation if desired
            this.style.opacity = '0.7';
            setTimeout(() => {
                this.style.opacity = '1';
            }, 300);
        });
    });
});

console.log('Portfolio loaded successfully! 🚀');
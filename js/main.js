// Language Toggle
const langBtns = document.querySelectorAll('.lang-btn');
const bioContents = document.querySelectorAll('.bio-content');

langBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        const lang = btn.dataset.lang;
        
        // Update active button
        langBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        
        // Show/hide content
        bioContents.forEach(content => {
            if (content.classList.contains(lang)) {
                content.style.display = 'block';
            } else {
                content.style.display = 'none';
            }
        });
    });
});

// Smooth Scrolling for Navigation
const navLinks = document.querySelectorAll('.nav-links a');

navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = link.getAttribute('href');
        const targetSection = document.querySelector(targetId);
        
        if (targetSection) {
            targetSection.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Press Access Modal
const unlockBtn = document.querySelector('.unlock-btn');
const pressAccessModal = document.getElementById('pressAccessModal');
const cancelBtn = document.querySelector('.cancel-btn');
const unlockModalBtn = document.querySelector('.unlock-modal-btn');

if (unlockBtn && pressAccessModal) {
    unlockBtn.addEventListener('click', () => {
        pressAccessModal.classList.add('active');
    });
}

if (cancelBtn && pressAccessModal) {
    cancelBtn.addEventListener('click', () => {
        pressAccessModal.classList.remove('active');
    });
}

if (unlockModalBtn && pressAccessModal) {
    unlockModalBtn.addEventListener('click', () => {
        const accessCode = document.querySelector('.access-code-input').value;
        if (accessCode) {
            // Here you would normally validate the code
            alert('Access code entered: ' + accessCode);
            pressAccessModal.classList.remove('active');
        } else {
            alert('Please enter an access code');
        }
    });
}

// Close modal when clicking outside
if (pressAccessModal) {
    pressAccessModal.addEventListener('click', (e) => {
        if (e.target === pressAccessModal) {
            pressAccessModal.classList.remove('active');
        }
    });
}

// Copy Bio Functionality
const copyBioBtn = document.querySelector('.copy-bio-btn');

if (copyBioBtn) {
    copyBioBtn.addEventListener('click', () => {
        const bioText = `Clovis found his way behind the decks at nineteen. More than two decades later, the Los Angeles native has moved through some of dance music's most distinctive scenes — from New York to Bucharest and now Berlin, where he holds a residency at Club der Visionaere and co-runs Understory with Matt Foley.

His path has taken him from late-night Los Angeles warehouses to festivals including Sunwaves, Dimensions, Waha and Danube, and into rooms such as Guesthouse, Renate and Hoppetosse — often sharing lineups with Rhadoo, Cesar Merveille, Shaun Reeves and Topper.

What connects it all is a refusal to settle into one mode. A dark warehouse, a slower daytime session, a leftfield podcast — each calls for something different. The room, the hour and the people come first. Range without losing the thread; eclecticism without becoming arbitrary. Mood, context and atmosphere over any fixed formula.`;
        
        navigator.clipboard.writeText(bioText).then(() => {
            showToast('Bio copied to clipboard');
        }).catch(err => {
            console.error('Failed to copy bio: ', err);
        });
    });
}

// Copy Email Functionality
const contactLink = document.querySelector('.contact-link');
const emailToast = document.getElementById('emailToast');

if (contactLink && emailToast) {
    contactLink.addEventListener('click', (e) => {
        e.preventDefault();
        const email = contactLink.textContent;
        
        navigator.clipboard.writeText(email).then(() => {
            emailToast.classList.add('active');
            setTimeout(() => {
                emailToast.classList.remove('active');
            }, 2000);
        }).catch(err => {
            console.error('Failed to copy email: ', err);
            // Fallback: open mail client
            window.location.href = 'mailto:' + email;
        });
    });
}

// Toast Notification
function showToast(message) {
    const toast = document.getElementById('emailToast');
    if (toast) {
        toast.querySelector('p').textContent = message;
        toast.classList.add('active');
        setTimeout(() => {
            toast.classList.remove('active');
        }, 2000);
    }
}

// Booking Form Submission
const bookingForm = document.getElementById('bookingForm');

if (bookingForm) {
    bookingForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const formData = new FormData(bookingForm);
        const bookingData = {
            date: formData.get('date'),
            city: formData.get('city'),
            venue: formData.get('venue'),
            budget: formData.get('budget'),
            message: formData.get('message')
        };
        
        console.log('Booking Request:', bookingData);
        
        // Here you would normally send this data to a server
        alert('Booking request submitted! We will get back to you soon.');
        bookingForm.reset();
    });
}

// Enter Button Animation
const enterButton = document.querySelector('.enter-button');

if (enterButton) {
    enterButton.addEventListener('click', () => {
        window.scrollTo({
            top: window.innerHeight,
            behavior: 'smooth'
        });
    });
}

// Scroll-based Navigation Highlight
const sections = document.querySelectorAll('section[id]');

window.addEventListener('scroll', () => {
    const scrollY = window.pageYOffset;
    
    sections.forEach(section => {
        const sectionHeight = section.offsetHeight;
        const sectionTop = section.offsetTop - 100;
        const sectionId = section.getAttribute('id');
        const navLink = document.querySelector(`.nav-links a[href="#${sectionId}"]`);
        
        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
            navLinks.forEach(link => link.style.color = '');
            if (navLink) {
                navLink.style.color = '#ffffff';
            }
        }
    });
});

// Image Lazy Loading
const images = document.querySelectorAll('img');

if ('loading' in HTMLImageElement.prototype) {
    images.forEach(img => {
        img.loading = 'lazy';
    });
}

// Add subtle parallax effect to hero
const heroImage = document.querySelector('.hero-image');

if (heroImage) {
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const rate = scrolled * -0.3;
        heroImage.style.transform = `translateY(${rate}px)`;
    });
}

// Keyboard navigation for modal
if (pressAccessModal) {
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && pressAccessModal.classList.contains('active')) {
            pressAccessModal.classList.remove('active');
        }
    });
}
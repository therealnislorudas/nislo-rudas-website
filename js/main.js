// Sidebar Navigation
const sidebarLinks = document.querySelectorAll('.sidebar-nav a');
const sections = document.querySelectorAll('section');

// Active state on scroll
window.addEventListener('scroll', () => {
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (pageYOffset >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });

    sidebarLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').substring(1) === current) {
            link.classList.add('active');
        }
    });
});

// Smooth scrolling for sidebar links
sidebarLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = link.getAttribute('href').substring(1);
        const targetSection = document.getElementById(targetId);
        
        if (targetSection) {
            sidebarLinks.forEach(l => l.classList.remove('active'));
            link.classList.add('active');
            
            targetSection.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Language Toggle
const langBtns = document.querySelectorAll('.lang-btn');
const bioContents = document.querySelectorAll('.bio-content');

langBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        const lang = btn.dataset.lang;
        
        langBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        
        bioContents.forEach(content => {
            if (content.classList.contains(lang)) {
                content.style.display = 'block';
            } else {
                content.style.display = 'none';
            }
        });
    });
});

// Modal
const unlockBtn = document.querySelector('.unlock-btn');
const pressModal = document.getElementById('pressModal');
const cancelBtn = document.querySelector('.cancel-btn');
const unlockModalBtn = document.querySelector('.unlock-modal-btn');

if (unlockBtn && pressModal) {
    unlockBtn.addEventListener('click', () => {
        pressModal.classList.add('active');
    });
}

if (cancelBtn && pressModal) {
    cancelBtn.addEventListener('click', () => {
        pressModal.classList.remove('active');
    });
}

if (unlockModalBtn && pressModal) {
    unlockModalBtn.addEventListener('click', () => {
        const accessCode = document.querySelector('.access-input').value;
        if (accessCode) {
            alert('Access code: ' + accessCode);
            pressModal.classList.remove('active');
        } else {
            alert('Please enter access code');
        }
    });
}

// Copy Bio
const copyBioBtn = document.querySelector('.copy-bio-btn');
if (copyBioBtn) {
    copyBioBtn.addEventListener('click', () => {
        const bioText = `Clovis found his way behind the decks at nineteen. More than two decades later, the Los Angeles native has moved through some of dance music's most distinctive scenes — from New York to Bucharest and now Berlin, where he holds a residency at Club der Visionaere and co-runs Understory with Matt Foley.

His path has taken him from late-night Los Angeles warehouses to festivals including Sunwaves, Dimensions, Waha and Danube, and into rooms such as Guesthouse, Renate and Hoppetosse — often sharing lineups with Rhadoo, Cesar Merveille, Shaun Reeves and Topper.

What connects it all is a refusal to settle into one mode. A dark warehouse, a slower daytime session, a leftfield podcast — each calls for something different. The room, the hour and the people come first. Range without losing the thread; eclecticism without becoming arbitrary. Mood, context and atmosphere over any fixed formula.`;
        
        navigator.clipboard.writeText(bioText).then(() => {
            alert('Bio copied to clipboard');
        });
    });
}

// Booking Form
const bookingForm = document.getElementById('bookingForm');
if (bookingForm) {
    bookingForm.addEventListener('submit', (e) => {
        e.preventDefault();
        alert('Booking request submitted');
        bookingForm.reset();
    });
}

// Close modal on outside click
if (pressModal) {
    pressModal.addEventListener('click', (e) => {
        if (e.target === pressModal) {
            pressModal.classList.remove('active');
        }
    });
}

// Close modal on Escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && pressModal && pressModal.classList.contains('active')) {
        pressModal.classList.remove('active');
    }
});
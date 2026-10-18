// ============= ENTER SPLASH LOGIC =============
(function() {
    var overlay = document.getElementById('enterOverlay');
    if (!overlay) return;
    var btn = document.getElementById('enterBtn');
    var textEl = overlay.querySelector('.enter-name-text');
    var dotEl = overlay.querySelector('.enter-name-dot');
    var word = 'Nislo Rudas';
    var reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    var typeTimer = null;

    var prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    var runType = function() {
        if (typeTimer) { clearTimeout(typeTimer); typeTimer = null; }
        if (!textEl) return;
        textEl.textContent = '';
        if (dotEl) dotEl.classList.remove('is-visible');
        var i = 0;
        var step = function() {
            if (i < word.length) {
                textEl.textContent += word.charAt(i);
                i++;
                typeTimer = setTimeout(step, 95);
            } else {
                typeTimer = null;
                if (dotEl) setTimeout(function() { dotEl.classList.add('is-visible'); }, 80);
            }
        };
        step();
    };

    if (reduced) {
        if (textEl) textEl.textContent = word;
        if (dotEl) dotEl.classList.add('is-visible');
    } else {
        setTimeout(runType, 380);
    }

    var closed = false;
    var close = function() {
        if (closed) return;
        closed = true;
        overlay.classList.add('is-hidden');
        overlay.setAttribute('aria-hidden', 'true');
        document.body.style.overflow = prevOverflow;
        setTimeout(function() {
            if (overlay.parentNode) overlay.parentNode.removeChild(overlay);
        }, 900);
    };

    btn.addEventListener('click', function(e) { e.stopPropagation(); close(); });
    overlay.addEventListener('click', close);
})();

// ============= FADE-UP SECTIONS ON SCROLL =============
var prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

if ('IntersectionObserver' in window && !prefersReducedMotion) {
    var sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                sectionObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0, rootMargin: '0px 0px -60px 0px' });

    var observeBlocks = () => {
        document.querySelectorAll('section.block:not(.is-visible)').forEach(s => {
            if (!s.hidden && getComputedStyle(s).display !== 'none') sectionObserver.observe(s);
        });
    };
    observeBlocks();
    setTimeout(observeBlocks, 1500);
    setTimeout(observeBlocks, 4000);
} else {
    document.querySelectorAll('section.block').forEach(s => s.classList.add('is-visible'));
}

// ============= LANGUAGE TOGGLE =============
document.querySelectorAll('.gtabs button').forEach(function(b) {
    b.addEventListener('click', function() {
        document.querySelectorAll('.gtabs button').forEach(function(o) { o.classList.remove('on'); });
        b.classList.add('on');
        document.querySelectorAll('.gbio').forEach(function(d) { 
            d.setAttribute('aria-hidden', d.dataset.lang !== b.dataset.lang); 
        });
    });
});

// ============= LIGHTBOX =============
var lb = document.getElementById('lightbox');
if (lb) {
    var lbImg = document.getElementById('lightbox-img');
    var lbCap = document.getElementById('lightbox-caption');
    var lbCards = Array.prototype.slice.call(document.querySelectorAll('.visual-card'));
    var lbIdx = 0;

    function lbShow(i) {
        lbIdx = (i + lbCards.length) % lbCards.length;
        var img = lbCards[lbIdx].querySelector('img');
        lbImg.src = img.getAttribute('src');
        lbImg.alt = img.alt || '';
        lbCap.textContent = (lbIdx + 1) + ' / ' + lbCards.length;
    }
    function lbOpen(i) {
        lbShow(i);
        lb.hidden = false;
        document.body.style.overflow = 'hidden';
    }
    function lbClose() {
        lb.hidden = true;
        document.body.style.overflow = '';
    }

    lbCards.forEach(function(c, i) {
        c.addEventListener('click', function() { lbOpen(i); });
    });
    document.getElementById('lightbox-close').addEventListener('click', lbClose);
    document.getElementById('lightbox-prev').addEventListener('click', function(e) { e.stopPropagation(); lbShow(lbIdx - 1); });
    document.getElementById('lightbox-next').addEventListener('click', function(e) { e.stopPropagation(); lbShow(lbIdx + 1); });
    lb.addEventListener('click', function(e) { if (e.target === lb) lbClose(); });
    document.addEventListener('keydown', function(e) {
        if (lb.hidden) return;
        if (e.key === 'Escape') lbClose();
        else if (e.key === 'ArrowLeft') lbShow(lbIdx - 1);
        else if (e.key === 'ArrowRight') lbShow(lbIdx + 1);
    });
}

// ============= EMAIL COPY =============
var getEmail = function() { return 'nislorudas27@gmail.com'; };
var toast = document.getElementById('toast');
var toastTimeout;

function showToast() {
    clearTimeout(toastTimeout);
    toast.classList.add('show');
    toastTimeout = setTimeout(function() { toast.classList.remove('show'); }, 2800);
}

async function copyEmail() {
    try {
        if (navigator.clipboard && window.isSecureContext) {
            await navigator.clipboard.writeText(getEmail());
            return true;
        }
        var ta = document.createElement('textarea');
        ta.value = getEmail();
        ta.style.position = 'fixed';
        ta.style.left = '-9999px';
        document.body.appendChild(ta);
        ta.select();
        var ok = document.execCommand('copy');
        document.body.removeChild(ta);
        return ok;
    } catch (e) {
        return false;
    }
}

document.querySelectorAll('[data-booking]').forEach(function(el) {
    el.addEventListener('click', async function(e) {
        e.preventDefault();
        var copied = await copyEmail();
        if (copied) {
            showToast();
            if (el.classList.contains('contact-row')) {
                el.classList.add('copied');
                setTimeout(function() { el.classList.remove('copied'); }, 2400);
            }
        }
        setTimeout(function() {
            window.location.href = 'mailto:' + getEmail();
        }, 220);
    });
});

// ============= COPY SHORT BIO =============
var BIO_SHORT = "Nislo Rudas is a Panamanian DJ born in David, Chiriquí, whose sound moves between minimal and tech house — groove, hypnotic rhythms and a dancefloor-oriented selection. Founder of Vagabundos. Part of Wizards Collective (Guatemala) and Booth (Panamá). Released on Mudita Records, Kitu Records, FINNEST.";
var cb = document.getElementById('bk-copybio');
if (cb) {
    cb.addEventListener('click', function() {
        (navigator.clipboard ? navigator.clipboard.writeText(BIO_SHORT) : Promise.reject()).then(function() {
            cb.textContent = 'Copied ✓';
            setTimeout(function() { cb.textContent = 'Copy short bio'; }, 1800);
        }).catch(function() {});
    });
}

// ============= PRESS KIT ZIP (code-gated) =============
var getPressCode = function() { return '0000'; };
var bz = document.getElementById('bk-zip');
if (bz) {
    bz.addEventListener('click', function(e) {
        e.preventDefault();
        var unlocked = false;
        try { unlocked = sessionStorage.getItem('np-unlocked') === '1'; } catch(err) {}
        if (!unlocked) {
            var code = prompt('Enter your press kit access code:');
            if (code === null) return;
            if (code.trim() !== getPressCode()) {
                alert('Invalid code. Contact booking for access.');
                return;
            }
            try { sessionStorage.setItem('np-unlocked', '1'); } catch(err) {}
        }
        var a = document.createElement('a');
        a.href = bz.getAttribute('href');
        a.download = 'nislo-press-kit.zip';
        document.body.appendChild(a);
        a.click();
        a.remove();
    });
}

// ============= BOOKING FORM =============
// Web3Forms access key — get it at https://web3forms.com with nislorudas27@gmail.com
var WEB3FORMS_KEY = '7100abcd-b24f-490e-bae7-9a2293f3cc1a';

var bf = document.getElementById('bk-form');
if (bf) {
    bf.addEventListener('submit', function(e) {
        e.preventDefault();
        var status = document.getElementById('bk-status');
        var btn = bf.querySelector('button[type="submit"]');
        var d = new FormData(bf);
        d.append('access_key', WEB3FORMS_KEY);
        d.append('subject', 'Booking request — ' + (d.get('date') || 'TBD') + ' · ' + (d.get('city') || '') + ', ' + (d.get('country') || ''));
        d.append('from_name', 'nislorudas.com booking form');
        if (status) status.textContent = 'Sending…';
        if (btn) btn.disabled = true;
        fetch('https://api.web3forms.com/submit', { method: 'POST', body: d })
            .then(function(r) { return r.json(); })
            .then(function(res) {
                if (res.success) {
                    if (status) status.textContent = 'Request sent — I\'ll get back to you soon.';
                    bf.reset();
                } else {
                    if (status) status.textContent = 'Something went wrong — email ' + getEmail() + ' directly.';
                }
            })
            .catch(function() {
                if (status) status.textContent = 'Connection error — email ' + getEmail() + ' directly.';
            })
            .finally(function() { if (btn) btn.disabled = false; });
    });
}

// ============= YOUTUBE EMBEDS =============
function embed(el, id) {
    var f = document.createElement('iframe');
    var start = el.getAttribute('data-yt-start');
    f.src = 'https://www.youtube-nocookie.com/embed/' + id + '?autoplay=1&rel=0' + (start ? '&start=' + start : '');
    f.allow = 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture';
    f.allowFullscreen = true;
    var host = el.classList.contains('yt-card') ? el.querySelector('.yt-thumb') : el;
    host.style.position = 'relative';
    host.appendChild(f);
}

document.querySelectorAll('[data-yt]').forEach(function(el) {
    el.addEventListener('click', function() {
        if (!el.querySelector('iframe')) embed(el, el.getAttribute('data-yt'));
    });
});

// ============= NAVIGATION RAIL =============
var MAIN = [
    {match: 'identity', label: 'IDENTITY'},
    {match: 'listen', label: 'MUSIC'},
    {match: 'productions', label: 'RELEASES', id: 'productions'},
    {match: 'watch', label: 'VIDEOS', id: 'watch'},
    {match: 'selected appearances', label: 'VENUES', id: 'appearances'},
    {match: 'gigs', label: 'GIGS', id: 'gigs'},
    {match: 'press', label: 'PRESS', id: 'press'},
    {match: 'booking', label: 'BOOKING', id: 'booking'},
    {match: 'contact', label: 'CONTACT', id: 'contact'}
];
var HIDE = ['bio', 'sound', 'blind'];

function runRail() {
    var secs = document.querySelectorAll('section.block');
    var nav = [];
    var n = 0;
    
    secs.forEach(function(sec) {
        var eb = sec.querySelector('.eyebrow');
        if (!eb) return;
        var t = (eb.textContent || '').trim().toLowerCase();
        if (HIDE.indexOf(t) >= 0) {
            sec.style.display = 'none';
            return;
        }
        var m = null;
        for (var i = 0; i < MAIN.length; i++) {
            if (t.indexOf(MAIN[i].match) >= 0) {
                m = MAIN[i];
                break;
            }
        }
        if (!m) return;
        if (sec.style.display === 'none') return;
        n++;
        var num = ('0' + n).slice(-2);
        if (m.id) sec.id = m.id;
        else if (!sec.id) sec.id = m.match.replace(/\s+/g, '-');
        if (!eb.querySelector('.eb-num')) {
            eb.insertAdjacentHTML('afterbegin', '<span class="eb-num">' + num + '</span>');
        }
        nav.push({num: num, label: m.label, id: sec.id});
    });
    
    var rail = document.getElementById('rail');
    var railm = document.getElementById('railm');
    
    if (rail) {
        rail.innerHTML = '<div class="rail-track"></div><div class="rail-fill"></div>' + nav.map(function(x) {
            return '<a href="#' + x.id + '" data-id="' + x.id + '"><i>' + x.num + '</i><span>' + x.label + '</span></a>';
        }).join('');
        
        var links = rail.querySelectorAll('a');
        var secEls = nav.map(function(x) { return document.getElementById(x.id); });
        var total = ('0' + nav.length).slice(-2);
        
        function onScroll() {
            var y = window.scrollY + window.innerHeight * 0.35;
            var act = 0;
            secEls.forEach(function(el, i) {
                if (el && el.offsetTop <= y) act = i;
            });
            links.forEach(function(l, i) {
                l.classList.toggle('active', i === act);
            });
            var prog = window.scrollY / Math.max(1, (document.documentElement.scrollHeight - window.innerHeight));
            prog = Math.max(0, Math.min(1, prog));
            var f = rail.querySelector('.rail-fill');
            if (f) f.style.height = (prog * 100) + '%';
            if (railm) {
                var a = nav[act];
                railm.innerHTML = '<b>' + a.num + '</b>&nbsp;/&nbsp;' + total + '&nbsp;—&nbsp;' + a.label + '<span class="mfill" style="width:' + (prog * 100) + '%"></span>';
            }
        }
        
        addEventListener('scroll', onScroll, {passive: true});
        addEventListener('resize', onScroll);
        onScroll();
    }
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', runRail);
} else {
    runRail();
}

if (history.scrollRestoration) {
    history.scrollRestoration = 'manual';
}

document.addEventListener('DOMContentLoaded', function() {
    
    const backgroundContainer = document.getElementById('interactive-background');
    
    let tiles = [];
    let numCols = 0;
    let numRows = 0;
    let animationFrameId;

    function createTileBackground() {
        if (!backgroundContainer) return;

        cancelAnimationFrame(animationFrameId);
        backgroundContainer.innerHTML = '';
        tiles = [];

        const tileSize = window.innerWidth < 768 ? 75 : 50; 
        numCols = Math.floor(window.innerWidth / tileSize);
        numRows = Math.floor(window.innerHeight / tileSize);

        backgroundContainer.style.gridTemplateColumns = `repeat(${numCols}, 1fr)`;

        for (let i = 0; i < numRows; i++) {
            tiles[i] = [];
            for (let j = 0; j < numCols; j++) {
                const tile = document.createElement('div');
                tile.classList.add('tile');
                tile.addEventListener('mouseover', () => handleMouseOver(i, j));
                
                backgroundContainer.appendChild(tile);
                tiles[i][j] = tile;
            }
        }
        animate();
    }

    let time = 0;
    function animate() {
        time += 0.02;

        for (let i = 0; i < numRows; i++) {
            for (let j = 0; j < numCols; j++) {
                const tile = tiles[i][j];

                if (tile.classList.contains('ripple') || tile.matches(':hover')) {
                    continue;
                }
                
                const wave = Math.sin(time + (j * 0.3) + (i * 0.2));
                const lightness = (wave + 1) / 2 * 20 + 80;
                
                tile.style.backgroundColor = `hsl(0, 0%, ${lightness}%)`;
            }
        }

        animationFrameId = requestAnimationFrame(animate);
    }

    function handleMouseOver(row, col) {
        const neighbors = [
            [-1, 0], [1, 0], [0, -1], [0, 1],
            [-1, -1], [-1, 1], [1, -1], [1, 1]
        ];

        neighbors.forEach(([dRow, dCol]) => {
            const nRow = row + dRow;
            const nCol = col + dCol;

            if (nRow >= 0 && nRow < numRows && nCol >= 0 && nCol < numCols) {
                const neighborTile = tiles[nRow][nCol];
                
                if (!neighborTile.classList.contains('ripple')) {
                    neighborTile.classList.add('ripple');
                    setTimeout(() => {
                        neighborTile.classList.remove('ripple');
                    }, 400);
                }
            }
        });
    }

    createTileBackground();
    window.addEventListener('resize', createTileBackground);


    const primaryNav = document.querySelector('.primary-navigation');
    const navToggle = document.querySelector('.mobile-nav-toggle');

    navToggle.addEventListener('click', () => {
        const visibility = primaryNav.getAttribute('data-visible');

        if (visibility === "false" || visibility === null) {
            primaryNav.setAttribute('data-visible', true);
            navToggle.setAttribute('aria-expanded', true);
        } else {
            primaryNav.setAttribute('data-visible', false);
            navToggle.setAttribute('aria-expanded', false);
        }
    });


    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetElement = document.querySelector(this.getAttribute('href'));
            if(targetElement){
                primaryNav.setAttribute('data-visible', false);
                navToggle.setAttribute('aria-expanded', false);
                
                targetElement.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('in-view');
            }
        });
    }, {
        threshold: 0.1
    });
    
    document.querySelectorAll('.animated').forEach(element => {
        observer.observe(element);
    });

    // 13 Original Items + 16 Brand New High-Quality Placeholders (Total: 29 Items)
    const featuredWorksData = [
        { title: 'Random Poster Collections IV', description: 'Mysterious lights, erratic movements, blurred footage, UFOs defy easy explanation.', image: 'images/1.png', instagramLink: 'https://www.instagram.com/p/DJt___kTWWG/' },
        { title: 'Motus in Distorsione', description: 'Inspired from Renaissance angelic iconography, beings of divine origin descending into human chaos.', image: 'images/2.png', instagramLink: 'https://www.instagram.com/p/DIOyIgbzzam/' },
        { title: 'Random Poster Collections II', description: 'An inspiration drawn from one of the greatest artists to ever exist, @xxxtentacion.', image: 'images/13.png', instagramLink: 'https://www.instagram.com/p/DIeMO1UT8mT/' },
        { title: 'Series: Random Poster Collections III', description: 'Lately obsessed with bending reality—turning distortions into art that warps perception.', image: 'images/3.png', instagramLink: 'https://www.instagram.com/p/DItZ8Q7Tl-w/' },
        { title: 'Series: Random Poster Collections I', description: 'THE MAJESTIC CHINESE DRAGON (龍 - LÓNG) Exploring the rich symbolism of the Chinese Dragon.', image: 'images/4.png', instagramLink: 'https://www.instagram.com/p/DIblSHET_Py/' },
        { title: 'The Divine Triad', description: 'More than just gods, they are powerful archetypes within the human psyche.', image: 'images/5.png', instagramLink: 'https://www.instagram.com/p/DLFwD0eTkEv/?img_index=1' },
        { title: 'Random Poster Collections V', description: 'To sever ties with finality, leaving no route for retreat.', image: 'images/6.png', instagramLink: 'https://www.instagram.com/p/DJuAT1Ez6er/' },
        { title: 'Kendrick Lamar', description: 'A tribute to the Pulitzer Prize-winning poet of our generation — Kendrick Lamar Duckworth.', image: 'images/7.jpg', instagramLink: 'https://www.instagram.com/p/DLVHXEaz6j_/' },
        { title: 'vita ex morte', description: 'Death isn’t the end, but a transformation.', image: 'images/8.png', instagramLink: 'https://www.instagram.com/p/DIRU2JAz8xP/?img_index=2' },
        { title: 'Art of the Move', description: 'Inspired by Michelangelo’s Creation of Adam, this piece reimagines the divine touch as a spark of creativity.', image: 'images/9.png', instagramLink: 'https://www.instagram.com/p/DIMLtDbTmzK/' },
        { title: 'Shirt TDT', description: 'A visualization of the design named The Divine Triad turned into a shirt.', image: 'images/10.png', instagramLink: 'https://www.instagram.com/p/DLGDnywzKgB/?img_index=1' },
        { title: 'Logo ZXN', description: 'Logo created for ZXN Nails on Instagram', image: 'images/11.png', instagramLink: 'https://www.instagram.com/zxn.nails/' },
        { title: 'ShirtMID', description: 'A visualization of the design named Motus in Distorsione turned into a shirt.', image: 'images/12.png', instagramLink: 'https://www.instagram.com/p/DLGDnywzKgB/?img_index=3' },
        
       
        { title: 'The Rapper Collection pt 1.', description: 'La Flame @travisscott with his rage', image: 'images/TS.png', instagramLink: 'https://www.instagram.com/p/DN-QmgikzTw' },
        { title: 'The Rapper Collection pt 1.', description: 'Yeezus @ye with his gospel', image: 'images/KW.png', instagramLink: 'https://www.instagram.com/p/DN-QmgikzTw' },
        { title: 'The Rapper Collection pt 1.', description: 'Drizzy @champagnepapi & The Slaughter King @21savage with my personal favorite album, Her Loss.', image: 'images/D21.png', instagramLink: 'https://www.instagram.com/p/DN-QmgikzTw' },
        { title: 'SALVATION', description: 'we walk in SALVATION.', image: 'images/SALVATION.png', instagramLink: 'https://www.instagram.com/p/DTAkQA8k14-' },
        { title: 'MFDOOM', description: 'Just remember: ALL CAPS when you spell the mans name.', image: 'images/MFDOOM BW.png', instagramLink: 'https://www.instagram.com/p/DTIOvp0k3Na/' },
        { title: 'Repentance', description: 'Repentance is the sacred turn. Its the moment you stop facing the shadows, and begin the climb towards the light.', image: 'images/REPENT.png', instagramLink: 'https://www.instagram.com/p/DTIRi2tE-UZ/' },
        { title: 'Purity Within', description: 'not flawlessness, but perfect alignment. It’s when your spirit, mind, and heart finally agree.', image: 'images/PURITY.png', instagramLink: 'https://www.instagram.com/p/DTaS-N8E1Wb/' },
        { title: 'Last Supper', description: 'There’s a reverence in the lines, a solemnity in the silhouette. This is my way of honoring a narrative that has shaped centuries.', image: 'images/LAST SUPPER.png', instagramLink: 'https://www.instagram.com/p/DTvFqB-k4wm/' },
        { title: 'Evermore', description: 'The final word in the story that never actually ends. Evermore.', image: 'images/EVERMORE.png', instagramLink: 'https://www.instagram.com/p/DT-sNKfE-kc/' },
        { title: 'Veni Vidi Vici', description: 'Rewrite the old script. The greatest victory leaves no ruins.', image: 'images/vvv.png', instagramLink: 'https://www.instagram.com/p/DUDvQQ6k8AF/' },
        { title: 'Tyler The Creator', description: 'The perfect blend of chaotic genius and impeccable taste. In the music and the fits. @feliciathegoat', image: 'images/TYLERTC.png', instagramLink: 'https://www.instagram.com/p/DUGHiDPE7fI/?img_index=1' },
        { title: 'Pompei', description: 'Scared of whats ahead. Terrified of what we cant control. But still standing. Still holding on.', image: 'images/LDOP.jpg', instagramLink: 'https://www.instagram.com/p/DYQpoglE0lJ/' },
        { title: 'FEINT LAB 26', description: 'One letter. Infinite spectrum. Feint Lab.', image: 'images/FE.jpg', instagramLink: 'https://www.instagram.com/p/DYWU5Tbkz-t/' },
        { title: 'Butterfly', description: 'A butterfly doesnt ask for forever — just one good flight.', image: 'images/BATIRFLI.jpg', instagramLink: 'https://www.instagram.com/p/DYdwHkVk4Af/' },
        { title: 'J. Cole Shirt', description: 'Shirt not for sale — merely for expression, inspiration, and homage only.', image: 'images/JS1.jpg', instagramLink: 'https://www.instagram.com/p/DLiM1zRzMam/?img_index=1' },
        { title: 'MFDOOM Poster', description: 'He mastered the lyrical feint, the verbal sleight of hand. The Supervillain, MF DOOM—the art of the move personified.', image: 'images/MFDOOM WTBG.png', instagramLink: 'https://www.instagram.com/p/DL7ME_cTGnQ/?img_index=1' },
        { title: 'Ski Mask The Slump God Poster', description: 'Fast flows. Wild wordplay. Pure energy.A tribute to Ski Mask the Slump God', image: 'images/SKI MASK.png', instagramLink: 'https://www.instagram.com/p/DMFr5HiTaOI/?img_index=1' }
    ];
    
    function populateCollageGrid() {
        const collageGrid = document.querySelector('.collage-grid');
        if (!collageGrid) return;

        // Size configuration loop to maintain abstract layout logic across all items safely
        const sizePattern = ['', 'collage-item--wide', '', 'collage-item--tall', 'collage-item--large', ''];

        featuredWorksData.forEach((item, index) => {
    const sizeClass = sizePattern[index % sizePattern.length];

    const collageItem = document.createElement('div');
    collageItem.className = `collage-item ${sizeClass}`;
    
    // OPTIMIZATION: Use a soft visual wave pattern or standard stagger that caps 
    // at a maximum delay so items lower on the screen don't take forever to appear.
    const optimizedDelay = Math.min((index % 6) * 60, 300);
    collageItem.style.transitionDelay = `${optimizedDelay}ms`;

            collageItem.innerHTML = `
                <a href="${item.instagramLink}" target="_blank" rel="noopener noreferrer">
                    <img src="${item.image}" alt="${item.title}" loading="lazy">
                    <div class="collage-item-overlay">
                        <h4>${item.title}</h4>
                        <p>${item.description}</p>
                    </div>
                </a>
            `;
            collageGrid.appendChild(collageItem);
        });
    }

    populateCollageGrid();

    let lastScrollTop = 0;
    const header = document.querySelector('.header');
    const scrollThreshold = 10;

    window.addEventListener('scroll', function() {
        let scrollTop = window.pageYOffset || document.documentElement.scrollTop;

        if (Math.abs(scrollTop - lastScrollTop) <= scrollThreshold) {
            return;
        }

        if (scrollTop > lastScrollTop && scrollTop > header.offsetHeight){
            header.classList.add('header-hidden');
        } else {
            header.classList.remove('header-hidden');
        }

        lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
    }, false);

    const contactForm = document.getElementById('contact-form');
    const submitButton = document.getElementById('submit-button');
    const formStatus = document.getElementById('form-status');
    const formEndpoint = 'https://formspree.io/f/xanjaayk';

    function setFormToSentState() {
        contactForm.querySelectorAll('input, textarea').forEach(field => {
            field.disabled = true;
        });
        
        submitButton.textContent = 'Message Sent';
        submitButton.disabled = true;
    }

    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();

        const formData = new FormData(contactForm);
        const data = Object.fromEntries(formData.entries());

        submitButton.disabled = true;
        submitButton.textContent = 'Sending...';

        fetch(formEndpoint, {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        }).then(response => {
            if (response.ok) {
                setFormToSentState();
                formStatus.textContent = "Thank you for your message!";
                formStatus.style.color = "#333333";
            } else {
                response.json().then(data => {
                    if (Object.hasOwn(data, 'errors')) {
                        formStatus.textContent = data["errors"].map(error => error["message"]).join(", ");
                    } else {
                        formStatus.textContent = "Oops! There was a problem submitting your form.";
                    }
                    formStatus.style.color = "#d9534f";
                    submitButton.disabled = false;
                    submitButton.textContent = 'Send Message';
                })
            }
        }).catch(error => {
            formStatus.textContent = "Oops! There was a network error.";
            formStatus.style.color = "#d9534f";
            submitButton.disabled = false;
            submitButton.textContent = 'Send Message';
        });
    });
});
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('in-view');
            // Unobserve after animating to save continuous browser memory
            observer.unobserve(entry.target); 
        }
    });
}, {
    threshold: 0.05, // Starts animating earlier (when just 5% of the card is visible)
    rootMargin: '0px 0px 50px 0px' // Pre-triggers 50px before entering viewport for a smoother look
});

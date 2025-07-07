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
        { title: 'ShirtMID', description: 'A visualization of the design named Motus in Distorsione turned into a shirt.', image: 'images/12.png', instagramLink: 'https://www.instagram.com/p/DLGDnywzKgB/?img_index=3' }
    ];
    
    function populateCollageGrid() {
        const collageGrid = document.querySelector('.collage-grid');
        if (!collageGrid) return;

        const sizePattern = ['', 'collage-item--wide', '', 'collage-item--tall', 'collage-item--large', ''];

        featuredWorksData.forEach((item, index) => {
            const sizeClass = sizePattern[index % sizePattern.length];

            const collageItem = document.createElement('div');
            collageItem.className = `collage-item ${sizeClass}`;
            
            collageItem.style.transitionDelay = `${index * 200}ms`;

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

/* =========================================================
   MUHAMMAD IQDHAM KHARISMA — PORTFOLIO
   Main JavaScript
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    

    /* =====================================================
       1. ELEMENTS
       ===================================================== */

    const header = document.getElementById("header");
    const menuToggle = document.getElementById("menu-toggle");
    constwidgetHide navMenu = document.getElementById("nav-menu");
    const navLinks = document.querySelectorAll(".nav-link");
    const sections = document.querySelectorAll("section[id]");
    const currentYear = document.getElementById("current-year");


    /* =====================================================
       2. MOBILE NAVIGATION
       ===================================================== */

    if (menuToggle && navMenu) {

        menuToggle.addEventListener("click", () => {

            const isOpen = navMenu.classList.toggle("active");

            menuToggle.setAttribute(
                "aria-expanded",
                isOpen ? "true" : "false"
            );

            const icon = menuToggle.querySelector("i");

            if (icon) {
                icon.classList.toggle("fa-bars", !isOpen);
                icon.classList.toggle("fa-xmark", isOpen);
            }

        });


        /* Close menu when clicking navigation link */

        navLinks.forEach(link => {

            link.addEventListener("click", () => {

                navMenu.classList.remove("active");

                menuToggle.setAttribute(
                    "aria-expanded",
                    "false"
                );

                const icon = menuToggle.querySelector("i");

                if (icon) {
                    icon.classList.remove("fa-xmark");
                    icon.classList.add("fa-bars");
                }

            });

        });


        /* Close menu when clicking outside */

        document.addEventListener("click", (event) => {

            const clickedInsideMenu =
                navMenu.contains(event.target);

            const clickedToggle =
                menuToggle.contains(event.target);

            if (
                !clickedInsideMenu &&
                !clickedToggle &&
                navMenu.classList.contains("active")
            ) {

                navMenu.classList.remove("active");

                menuToggle.setAttribute(
                    "aria-expanded",
                    "false"
                );

                const icon = menuToggle.querySelector("i");

                if (icon) {
                    icon.classList.remove("fa-xmark");
                    icon.classList.add("fa-bars");
                }

            }

        });

    }


    /* =====================================================
       3. HEADER ON SCROLL
       ===================================================== */

    const updateHeader = () => {

        if (!header) return;

        if (window.scrollY > 50) {
            header.classList.add("scrolled");
        } else {
            header.classList.remove("scrolled");
        }

    };


    window.addEventListener(
        "scroll",
        updateHeader,
        { passive: true }
    );


    updateHeader();


    /* =====================================================
       4. TYPING EFFECT
       ===================================================== */

    const typingElement =
        document.querySelector(".typing-text");


    if (typingElement) {

        const words = [
            "UI/UX Designer",
            "Siswa RPL",
            "Future Designer"
        ];

        let wordIndex = 0;
        let characterIndex = 0;
        let isDeleting = false;


        const typingSpeed = 90;
        const deletingSpeed = 55;
        const pauseAfterWord = 1700;
        const pauseAfterDelete = 450;


        function typeEffect() {

            const currentWord = words[wordIndex];


            if (!isDeleting) {

                characterIndex++;

                typingElement.textContent =
                    currentWord.substring(
                        0,
                        characterIndex
                    );


                if (characterIndex === currentWord.length) {

                    isDeleting = true;

                    setTimeout(
                        typeEffect,
                        pauseAfterWord
                    );

                    return;

                }

            } else {

                characterIndex--;

                typingElement.textContent =
                    currentWord.substring(
                        0,
                        characterIndex
                    );


                if (characterIndex === 0) {

                    isDeleting = false;

                    wordIndex =
                        (wordIndex + 1) % words.length;

                    setTimeout(
                        typeEffect,
                        pauseAfterDelete
                    );

                    return;

                }

            }


            setTimeout(
                typeEffect,
                isDeleting
                    ? deletingSpeed
                    : typingSpeed
            );

        }


        typeEffect();

    }


    /* =====================================================
       5. ACTIVE NAVIGATION
       ===================================================== */

    const observerOptions = {
        root: null,
        rootMargin: "-35% 0px -55% 0px",
        threshold: 0
    };


    const sectionObserver =
        new IntersectionObserver(
            (entries) => {

                entries.forEach(entry => {

                    if (!entry.isIntersecting) {
                        return;
                    }


                    const currentId =
                        entry.target.getAttribute("id");


                    navLinks.forEach(link => {

                        link.classList.remove("active");


                        const linkTarget =
                            link.getAttribute("href");


                        if (
                            linkTarget === `#${currentId}`
                        ) {
                            link.classList.add("active");
                        }

                    });

                });

            },
            observerOptions
        );


    sections.forEach(section => {
        sectionObserver.observe(section);
    });


    /* =====================================================
       6. SCROLL REVEAL ANIMATION
       ===================================================== */

    const revealElements = document.querySelectorAll(
        ".skill-card, " +
        ".timeline-item, " +
        ".education-card, " +
        ".contact-link, " +
        ".projects-empty, " +
        ".about-content, " +
        ".about-visual"
    );


    revealElements.forEach((element, index) => {

        element.style.opacity = "0";
        element.style.transform = "translateY(25px)";
        element.style.transition =
            "opacity 0.7s ease, transform 0.7s ease";


        element.dataset.revealDelay =
            `${(index % 4) * 80}ms`;

    });


    const revealObserver =
        new IntersectionObserver(
            (entries, observer) => {

                entries.forEach(entry => {

                    if (!entry.isIntersecting) {
                        return;
                    }


                    const element = entry.target;

                    const delay =
                        element.dataset.revealDelay || "0ms";


                    element.style.transitionDelay = delay;

                    element.style.opacity = "1";
                    element.style.transform =
                        "translateY(0)";


                    observer.unobserve(element);

                });

            },
            {
                threshold: 0.12
            }
        );


    revealElements.forEach(element => {
        revealObserver.observe(element);
    });


    /* =====================================================
       7. HERO PARALLAX EFFECT
       ===================================================== */

    const heroVisual =
        document.querySelector(".hero-visual");

    const profileCard =
        document.querySelector(".profile-card");


    if (
        heroVisual &&
        profileCard &&
        window.matchMedia("(min-width: 769px)").matches
    ) {

        heroVisual.addEventListener(
            "mousemove",
            (event) => {

                const rect =
                    heroVisual.getBoundingClientRect();


                const x =
                    event.clientX - rect.left;

                const y =
                    event.clientY - rect.top;


                const centerX =
                    rect.width / 2;

                const centerY =
                    rect.height / 2;


                const rotateX =
                    ((y - centerY) / centerY) * -3;

                const rotateY =
                    ((x - centerX) / centerX) * 3;


                profileCard.style.transform =
                    `perspective(900px)
                     rotateX(${rotateX}deg)
                     rotateY(${rotateY}deg)
                     translateY(-4px)`;

            }
        );


        heroVisual.addEventListener(
            "mouseleave",
            () => {

                profileCard.style.transform =
                    "rotate(2deg)";

            }
        );

    }


    /* =====================================================
       8. CURSOR GLOW
       ===================================================== */

    const cursorGlow =
        document.createElement("div");

    cursorGlow.className =
        "cursor-glow";


    document.body.appendChild(cursorGlow);


    const cursorStyle =
        document.createElement("style");


    cursorStyle.textContent = `
        .cursor-glow {
            position: fixed;
            width: 180px;
            height: 180px;
            border-radius: 50%;
            pointer-events: none;
            z-index: 9999;
            background: radial-gradient(
                circle,
                rgba(143, 207, 251, 0.07),
                transparent 70%
            );
            transform: translate(-50%, -50%);
            opacity: 0;
            transition: opacity 0.3s ease;
        }

        @media (max-width: 768px) {
            .cursor-glow {
                display: none;
            }
        }
    `;


    document.head.appendChild(cursorStyle);


    document.addEventListener(
        "mousemove",
        (event) => {

            cursorGlow.style.left =
                `${event.clientX}px`;

            cursorGlow.style.top =
                `${event.clientY}px`;

            cursorGlow.style.opacity = "1";

        }
    );


    document.addEventListener(
        "mouseleave",
        () => {

            cursorGlow.style.opacity = "0";

        }
    );


    /* =====================================================
       9. CURRENT YEAR
       ===================================================== */

    if (currentYear) {

        currentYear.textContent =
            new Date().getFullYear();

    }


    /* =====================================================
       10. ESC KEY — CLOSE MOBILE MENU
       ===================================================== */

    document.addEventListener(
        "keydown",
        (event) => {

            if (event.key !== "Escape") {
                return;
            }


            if (
                navMenu &&
                navMenu.classList.contains("active")
            ) {

                navMenu.classList.remove("active");

                menuToggle?.setAttribute(
                    "aria-expanded",
                    "false"
                );


                const icon =
                    menuToggle?.querySelector("i");


                if (icon) {
                    icon.classList.remove("fa-xmark");
                    icon.classList.add("fa-bars");
                }

            }

        }
    );


    /* =====================================================
       11. PREVENT EMPTY SOCIAL LINKS
       ===================================================== */

    const emptyLinks =
        document.querySelectorAll(
            'a[href="#"]'
        );


    emptyLinks.forEach(link => {

        link.addEventListener(
            "click",
            (event) => {

                /*
                 * Link Instagram/GitHub masih placeholder.
                 * Setelah URL asli dimasukkan, handler ini
                 * tidak akan diperlukan lagi.
                 */

                event.preventDefault();

            }
        );

    });


    /* =====================================================
       12. IMAGE FALLBACK
       ===================================================== */

    const profileImage =
        document.querySelector(".profile-image");


    if (profileImage) {

        profileImage.addEventListener(
            "error",
            () => {

                /*
                 * Jika profile.jpg belum tersedia,
                 * tampilkan gradient sebagai fallback.
                 */

                profileImage.style.display = "none";

                const wrapper =
                    profileImage.parentElement;

                if (wrapper) {

                    wrapper.classList.add(
                        "image-placeholder"
                    );

                }

            }
        );

    }


    /* =====================================================
       13. INITIAL LOAD
       ===================================================== */

    document.body.classList.add("page-loaded");


    console.log(
        "Portfolio loaded — Muhammad Iqdham Kharisma"
    );

});

/* =====================================================
   14. FLOATING MUSIC WIDGET
   ===================================================== */

const playlist = [
    // Daniel Caesar
    { title: "Toronto 2014", artist: "Daniel Caesar", src: "https://wjcsdhlwhpqnszgbrorb.supabase.co/storage/v1/object/public/musik/Toronto%202014%20-%20Daniel%20Caesar.mp3" },
    { title: "Superpowers", artist: "Daniel Caesar", src: "https://wjcsdhlwhpqnszgbrorb.supabase.co/storage/v1/object/public/musik/Superpowers%20-%20Daniel%20Caesar.mp3" },
    { title: "Always", artist: "Daniel Caesar", src: "https://wjcsdhlwhpqnszgbrorb.supabase.co/storage/v1/object/public/musik/Always%20-%20Daniel%20Caesar.mp3" },

    // Oasis
    { title: "Champagne Supernova", artist: "Oasis", src: "https://wjcsdhlwhpqnszgbrorb.supabase.co/storage/v1/object/public/musik/Champagne%20Supernova%20-%20Oasis.mp3" },
    { title: "Whatever", artist: "Oasis", src: "https://wjcsdhlwhpqnszgbrorb.supabase.co/storage/v1/object/public/musik/Whatever%20-%20Oasis.mp3" },
    { title: "Wonderwall", artist: "Oasis", src: "https://wjcsdhlwhpqnszgbrorb.supabase.co/storage/v1/object/public/musik/Wonderwall%20-%20Oasis.mp3" },
    { title: "Stand By Me", artist: "Oasis", src: "https://wjcsdhlwhpqnszgbrorb.supabase.co/storage/v1/object/public/musik/Stand%20By%20Me%20-%20Oasis.mp3" },

    // One Direction
    { title: "Story of My Life", artist: "One Direction", src: "https://wjcsdhlwhpqnszgbrorb.supabase.co/storage/v1/object/public/musik/One%20Direction%20-%20Story%20of%20My%20Life.mp3" },
    { title: "One Thing", artist: "One Direction", src: "https://wjcsdhlwhpqnszgbrorb.supabase.co/storage/v1/object/public/musik/One%20Direction%20-%20One%20Thing.mp3" },
    { title: "Night Changes", artist: "One Direction", src: "https://wjcsdhlwhpqnszgbrorb.supabase.co/storage/v1/object/public/musik/One%20Direction%20-%20Night%20Changes.mp3" },

    // Rex Orange County
    { title: "AMAZING", artist: "Rex Orange County", src: "https://wjcsdhlwhpqnszgbrorb.supabase.co/storage/v1/object/public/musik/AMAZING%20-%20Rex%20Orange%20County.mp3" },
    { title: "Best Friend", artist: "Rex Orange County", src: "https://wjcsdhlwhpqnszgbrorb.supabase.co/storage/v1/object/public/musik/Best%20Friend%20-%20Rex%20Orange%20County.mp3" },

    // Reality Club
    { title: "2112", artist: "Reality Club", src: "https://wjcsdhlwhpqnszgbrorb.supabase.co/storage/v1/object/public/musik/2112%20-%20Reality%20Club.mp3" },
    { title: "You'll Find Lovers Like You and Me", artist: "Reality Club", src: "https://wjcsdhlwhpqnszgbrorb.supabase.co/storage/v1/object/public/musik/You'll%20Find%20Lovers%20Like%20You%20and%20Me%20-%20Reality%20Club.mp3" },

    // beabadoobee
    { title: "Real Man", artist: "beabadoobee", src: "https://wjcsdhlwhpqnszgbrorb.supabase.co/storage/v1/object/public/musik/Real%20Man%20-%20Beabadoobee.mp3" },

    // Sabrina Carpenter
    { title: "Manchild", artist: "Sabrina Carpenter", src: "https://wjcsdhlwhpqnszgbrorb.supabase.co/storage/v1/object/public/musik/Manchild%20-%20Sabrina%20Carpenter.mp3" },

    // Señorita
    { title: "Señorita", artist: "Shawn Mendes, Camila Cabello", src: "https://wjcsdhlwhpqnszgbrorb.supabase.co/storage/v1/object/public/musik/Senorita.mp3" },

    // wave to earth
    { title: "cherry flavoured love inside your heart", artist: "wave to earth", src: "https://wjcsdhlwhpqnszgbrorb.supabase.co/storage/v1/object/public/musik/cherry%20flavoured%20love%20inside%20your%20heart%20-%20wave%20to%20earth.mp3" },
    { title: "love.", artist: "wave to earth", src: "https://wjcsdhlwhpqnszgbrorb.supabase.co/storage/v1/object/public/musik/love.%20-%20wave%20to%20earth.mp3" },

    // Sheila On 7
    { title: "Hari Bersamanya", artist: "Sheila On 7", src: "https://wjcsdhlwhpqnszgbrorb.supabase.co/storage/v1/object/public/musik/Sheila%20on%207%20-%20Hari%20Bersamanya.mp3" },
    { title: "Pemuja Rahasia", artist: "Sheila On 7", src: "https://wjcsdhlwhpqnszgbrorb.supabase.co/storage/v1/object/public/musik/Sheila%20On%207%20-%20Pemuja%20Rahasia.mp3" },

    // Yovie & Nuno
    { title: "Mengejar Mimpi", artist: "Yovie & Nuno", src: "https://wjcsdhlwhpqnszgbrorb.supabase.co/storage/v1/object/public/musik/Mengejar%20Mimpi%20-%20Yovie%20&%20Nuno.mp3" },
    { title: "Manusia Biasa", artist: "Yovie & Nuno", src: "https://wjcsdhlwhpqnszgbrorb.supabase.co/storage/v1/object/public/musik/Manusia%20Biasa%20-%20Yovie%20&%20Nuno.mp3" },

    // Perunggu
    { title: "33x", artist: "Perunggu", src: "https://wjcsdhlwhpqnszgbrorb.supabase.co/storage/v1/object/public/musik/Perunggu%20-%2033x.mp3" },
];

const musicWidget = document.getElementById("music-widget");
const widgetToggle = document.getElementById("widget-toggle");
const widgetClose = document.getElementById("widget-close");
const audio = document.getElementById("audio-player");
const widgetHide = document.getElementById("widget-hide");
const playBtn = document.getElementById("play-btn");
const prevBtn = document.getElementById("prev-btn");
const nextBtn = document.getElementById("next-btn");
const shuffleBtn = document.getElementById("shuffle-btn");
const repeatBtn = document.getElementById("repeat-btn");
const progressSlider = document.getElementById("progress-slider");
const currentTimeEl = document.getElementById("current-time");
const durationTimeEl = document.getElementById("duration-time");
const titleEl = document.getElementById("player-title");
const artistEl = document.getElementById("player-artist");

let trackIndex = 0;
let isPlaying = false;
let isShuffle = false;

/* repeatMode: "off" -> "all" -> "one" -> kembali ke "off" */
let repeatMode = "off";

function formatTime(seconds) {
    if (isNaN(seconds)) return "0:00";
    const m = Math.floor(seconds / 60);
    const s = Math.floor(seconds % 60).toString().padStart(2, "0");
    return `${m}:${s}`;
}

function loadTrack(index) {
    const track = playlist[index];
    audio.src = track.src;
    titleEl.textContent = track.title;
    artistEl.textContent = track.artist;
    progressSlider.value = 0;
    currentTimeEl.textContent = "0:00";
    checkMarquee();   // <-- baris baru
}

function playTrack() {
    audio.play();
    isPlaying = true;
    playBtn.innerHTML = '<i class="fa-solid fa-pause"></i>';
}

function pauseTrack() {
    audio.pause();
    isPlaying = false;
    playBtn.innerHTML = '<i class="fa-solid fa-play"></i>';
}

/* Ambil index track berikutnya, memperhitungkan shuffle */
function getNextIndex() {
    if (isShuffle) {
        if (playlist.length === 1) return 0;

        let randomIndex;

        do {
            randomIndex = Math.floor(Math.random() * playlist.length);
        } while (randomIndex === trackIndex);

        return randomIndex;
    }

    return (trackIndex + 1) % playlist.length;
}

function getPrevIndex() {
    if (isShuffle) {
        return getNextIndex();
    }

    return (trackIndex - 1 + playlist.length) % playlist.length;
}

if (musicWidget && audio && playlist.length > 0) {

    const titleWrap = document.getElementById("title-wrap");

/* Cek apakah teks judul lebih lebar dari containernya */
function checkMarquee() {

    titleWrap.classList.remove("marquee");

    /* Beri jeda sedikit supaya browser sempat render ulang lebar teks */
    requestAnimationFrame(() => {

        const textWidth = titleEl.scrollWidth;
        const containerWidth = titleWrap.clientWidth;

        if (textWidth > containerWidth) {
            titleWrap.classList.add("marquee");
        }

    });

}

    loadTrack(trackIndex);

    widgetToggle.addEventListener("click", () => {
    // Pilih lagu secara acak saat pertama kali membuka player
    trackIndex = Math.floor(Math.random() * playlist.length);

    // Tetap load lagu acak
    loadTrack(trackIndex);

    // Buka player
    musicWidget.classList.add("open");

    // Putar lagu
    playTrack();

    // Pastikan ikon shuffle tetap putih/tidak aktif
    isShuffle = false;
    shuffleBtn.classList.remove("active");
});

    widgetClose.addEventListener("click", () => {
    musicWidget.classList.remove("open");

    audio.pause();
    audio.currentTime = 0;

    isPlaying = false;
    playBtn.innerHTML = '<i class="fa-solid fa-play"></i>';

    widgetToggle.style.display = "none";
});

   widgetHide.addEventListener("click", () => {
    // Hanya sembunyikan player
    musicWidget.classList.remove("open");

    // Musik tetap berjalan
    // Jangan pause()
    // Jangan ubah isPlaying
});

    playBtn.addEventListener("click", () => {
        isPlaying ? pauseTrack() : playTrack();
    });

    prevBtn.addEventListener("click", () => {
        trackIndex = getPrevIndex();
        loadTrack(trackIndex);
        if (isPlaying) playTrack();
    });

    nextBtn.addEventListener("click", () => {
        trackIndex = getNextIndex();
        loadTrack(trackIndex);
        if (isPlaying) playTrack();
    });

  /* Toggle shuffle on/off — matikan repeat kalau shuffle diaktifkan */
shuffleBtn.addEventListener("click", () => {

    isShuffle = !isShuffle;
    shuffleBtn.classList.toggle("active", isShuffle);

    if (isShuffle && repeatMode !== "off") {

        repeatMode = "off";
        repeatBtn.dataset.repeatMode = repeatMode;
        repeatBtn.classList.remove("active");

        const repeatIcon = repeatBtn.querySelector("i");
        repeatIcon.className = "fa-solid fa-repeat";

    }

});


/* Klik berulang: off -> all -> one -> off — matikan shuffle kalau repeat diaktifkan */
repeatBtn.addEventListener("click", () => {

    if (repeatMode === "off") {
        repeatMode = "all";
    } else if (repeatMode === "all") {
        repeatMode = "one";
    } else {
        repeatMode = "off";
    }

    repeatBtn.dataset.repeatMode = repeatMode;
    repeatBtn.classList.toggle("active", repeatMode !== "off");

    const icon = repeatBtn.querySelector("i");
    icon.className =
        repeatMode === "one"
            ? "fa-solid fa-1"
            : "fa-solid fa-repeat";

    if (repeatMode !== "off" && isShuffle) {

        isShuffle = false;
        shuffleBtn.classList.remove("active");

    }

});

    audio.addEventListener("loadedmetadata", () => {
        durationTimeEl.textContent = formatTime(audio.duration);
    });

    audio.addEventListener("timeupdate", () => {
        const percent = (audio.currentTime / audio.duration) * 100 || 0;
        progressSlider.value = percent;
        currentTimeEl.textContent = formatTime(audio.currentTime);
    });

    progressSlider.addEventListener("input", () => {
        const seekTime = (progressSlider.value / 100) * audio.duration;
        audio.currentTime = seekTime;
    });

    /* Logika saat lagu selesai, tergantung repeatMode */
    audio.addEventListener("ended", () => {

        if (repeatMode === "one") {
            audio.currentTime = 0;
            playTrack();
            return;
        }

        const isLastTrack = trackIndex === playlist.length - 1;

        if (isLastTrack && !isShuffle && repeatMode === "off") {
            pauseTrack();
            return;
        }

        trackIndex = getNextIndex();
        loadTrack(trackIndex);
        playTrack();
    });

}
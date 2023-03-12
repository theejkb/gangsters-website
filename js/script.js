axios.get('https://discord.com/api/guilds/1012489413323931669/widget.json').then(resp => {
    var onlineMembers = resp.data.presence_count;
    document.getElementById('members').innerHTML = onlineMembers - 5;
});
AOS.init();

// JQUERY
$(document).ready(function () {
    $('#nav-mobile').click(function () {
        $('#nav').addClass('active');
    })
    $('#nav').before().click(function () {
        $('#nav').removeClass('active');
    })
    $('#main-nav ul li a').click(function () {
        $('#burger').removeClass('is-open');
        $('#main-nav').removeClass('is-open');
    })

    $('#close').click(function () {
        $('.notification-container').addClass('closed');
    });

    docSlider.init({
        speed: 600,
        startSpeed: null,
        easing: 'ease',
        scrollReset: false,
        pager: false,
        afterChange: function (index) {
            if (index != 1) {
                $('#video-vision').trigger('pause');
            } else {
                document.getElementById("video-vision").currentTime = 0;
                document.getElementById('play-video').classList.remove('hidden');
            }
        }
    });

    const video = $('#video-vision');
    video.on("click", function (e) {
        // Detect play/pause state of video and toggle
        if (video.get(0).paused) {
            video.get(0).play();
            video.addClass('play')
            video.removeClass('pause')
        } else {
            video.get(0).pause();
            video.addClass('pause')
            video.removeClass('play')
        }
    })


    $('#slider').slick({
        centerMode: true,
        infinite: false,
        draggable: true,
        accessibility: true,
        centerPadding: '150px',
        slidesToShow: 1.3,
        prevArrow: '<i class="fa-solid slick-prev fa-square-caret-left"></i>',
        nextArrow: '<i class="fa-solid slick-next fa-square-caret-right"></i>',
        responsive: [
            {
                breakpoint: 1100,
                settings: {
                    centerMode: true,
                    slidesToShow: 1
                }
            },
            {
                breakpoint: 700,
                settings: {
                    centerMode: false,
                    slidesToShow: 1
                }
            }
        ]
    })
});

/* particlesJS.load(@dom-id, @path-json, @callback (optional)); */
particlesJS.load('particles-js', 'assets/particles.json', function () {
});

// Menu Mobile 
let burger = document.getElementById('burger'),
    nav = document.getElementById('main-nav');

burger.addEventListener('click', function (e) {
    this.classList.toggle('is-open');
    nav.classList.toggle('is-open');
});

/* Onload demo - dirty timeout */
let clickEvent = new Event('click');

window.addEventListener('load', function (e) {
    burger.dispatchEvent(clickEvent);

    setTimeout(function () {
        burger.dispatchEvent(clickEvent);
    })
});

if ("ontouchstart" in document.documentElement) {
    // content for touch-screen (mobile) devices
    document.getElementById('cursor-dot').classList.add('hidden');
    document.getElementById('cursor-dot-outline').classList.add('hidden');
}
else {
    // everything else (desktop)
    document.getElementById('cursor-dot').classList.remove('hidden');
    document.getElementById('cursor-dot-outline').classList.remove('hidden');
}

let viewportWidth = window.innerWidth;

if (viewportWidth > 1100) {
    // 3D Card
    let card = document.querySelector('#card');

    document.addEventListener('mousemove', function (e) {
        let xAxis = (window.innerWidth / 2 - (e.pageX)) / 10;
        let yAxis = (window.innerHeight / 2 - (e.pageY)) / 10;
        card.style.transform = `rotateX(${yAxis / 3}deg) rotateY(${xAxis / 3}deg)`;
    });
}

// Slick KeyCheck
document.onkeydown = checkKey;
function checkKey(e) {

    e = e || window.event;

    if ($('#section-roadmap').hasClass('docSlider-current')) {
        if (e.keyCode == '37') {
            // left arrow
            return $('#slider').slick('slickPrev');
        }
        else if (e.keyCode == '39') {
            // right arrow
            return $('#slider').slick('slickNext');
        }
    }

    if ($('#section-vision').hasClass('docSlider-current')) {
        const video = $('#video-vision');

        if (e.keyCode == '80') {
            // space
            document.getElementById('play-video').classList.add('hidden');
            if (video.get(0).paused) {
                video.get(0).play();
                video.addClass('play')
                video.removeClass('pause')
                cursor.toggleCursorPlay(cursor.cursorPlay);
            } else {
                video.get(0).pause();
                video.addClass('pause')
                video.removeClass('play')
                cursor.toggleCursorPlay(cursor.cursorPlay);
            }

        }
    }
}

// Team Slider
const swiper = new Swiper('.swiper', {
    direction: 'horizontal',
    loop: false,
    effect: 'cards',
    slideToClickedSlide: true,
    cardsEffect: {
        perSlideOffset: 55,
        perSlideRotate: -1,
    },
    slidesPerView: 'auto',
    keyboard: {
        enabled: true,
    },
    pagination: {
        el: ".swiper-pagination",
        dynamicBullets: true,
        clickable: true
    },
    navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
    },
});

const swiperfaq = new Swiper(".swiper-faq", {
    grabCursor: true,
    effect: "creative",
    creativeEffect: {
        prev: {
            shadow: true,
            translate: [0, 0, -400],
        },
        next: {
            translate: ["100%", 0, 0],
        },
    },
    keyboard: {
        enabled: true,
    },
    pagination: {
        el: ".swiper-pagination",
        type: "fraction",
        clickable: true,
    },
    navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
    },
});

const loaderContainer = document.getElementById('loader');

window.addEventListener('load', () => {
    loaderContainer.classList.add('hidden');
});

// Cursor
const cursor = {
    delay: 3,
    _x: 0,
    _y: 0,
    endX: (window.innerWidth / 2),
    endY: (window.innerHeight / 2),
    cursorVisible: true,
    cursorEnlarged: false,
    cursorPlay: false,
    $dot: document.querySelector('.cursor-dot'),
    $outline: document.querySelector('.cursor-dot-outline'),

    init: function () {
        // Set up element sizes
        this.dotSize = this.$dot.offsetWidth;
        this.outlineSize = this.$outline.offsetWidth;

        this.setupEventListeners();
        this.animateDotOutline();
    },

    setupEventListeners: function () {
        var self = this;

        // Anchor hovering
        document.querySelectorAll('a').forEach(function (el) {
            el.addEventListener('mouseover', function () {
                self.cursorEnlarged = true;
                self.toggleCursorSize();
            });
            el.addEventListener('mouseout', function () {
                self.cursorEnlarged = false;
                self.toggleCursorSize();
            });
        });


        // Video Hover
        document.getElementById('video-vision').addEventListener('mouseover', function () {
            self.toggleCursorPlayMove();
        });
        document.getElementById('video-vision').addEventListener('mouseout', function () {
            self.cursorEnlarged = false;
            self.toggleCursorSize();
        });
        document.getElementById('video-vision').addEventListener('click', function () {
            self.toggleCursorPlay(self.cursorPlay);
            if (document.getElementById('play-video').classList.contains != 'hidden') {
                document.getElementById('play-video').classList.add('hidden');
            }
        });
        document.getElementById('play-video').addEventListener('touchstart', function () {
            if (document.getElementById('play-video').classList.contains != 'hidden') {
                document.getElementById('play-video').classList.add('hidden');
            }
        });

        // Click events
        document.addEventListener('mousedown', function () {
            self.cursorEnlarged = true;
            self.toggleCursorSize();
        });
        document.addEventListener('mouseup', function () {
            self.cursorEnlarged = false;
            self.toggleCursorSize();
        });

        document.addEventListener('mousemove', function (e) {
            // Show the cursor
            self.cursorVisible = true;
            self.toggleCursorVisibility();

            // Position the dot
            self.endX = e.pageX;
            self.endY = e.pageY;
            self.$dot.style.top = self.endY + 'px';
            self.$dot.style.left = self.endX + 'px';
        });

        // Hide/show cursor
        document.addEventListener('mouseenter', function (e) {
            self.cursorVisible = true;
            self.toggleCursorVisibility();
            self.$dot.style.opacity = 1;
            self.$outline.style.opacity = 1;

        });

        document.addEventListener('mouseleave', function (e) {
            self.cursorVisible = true;
            self.toggleCursorVisibility();
            self.$dot.style.opacity = 0;
            self.$outline.style.opacity = 0;

        });
    },

    animateDotOutline: function () {
        const self = this;

        self._x += (self.endX - self._x) / self.delay;
        self._y += (self.endY - self._y) / self.delay;
        self.$outline.style.top = self._y + 'px';
        self.$outline.style.left = self._x + 'px';

        requestAnimationFrame(this.animateDotOutline.bind(self));
    },

    toggleCursorSize: function () {
        const self = this;

        self.$dot.innerHTML = '';
        self.$dot.style.width = '8px';
        self.$dot.style.height = '8px';
        self.$dot.style.backgroundColor = 'red';

        if (self.cursorEnlarged) {
            self.$dot.style.transform = 'translate(-50%, -50%) scale(1.15)';
            self.$outline.style.transform = 'translate(-50%, -50%) scale(1.5)';
        } else {
            self.$dot.style.transform = 'translate(-50%, -50%) scale(1)';
            self.$outline.style.transform = 'translate(-50%, -50%) scale(1)';
        }
    },

    toggleCursorPlay: function (e) {
        const self = this;

        if (!e) {
            self.cursorPlay = true;
            self.$dot.innerHTML = '||';
            self.$dot.style.transform = 'translate(-150%, -200%) scale(1.5)';
        } else {
            self.cursorPlay = false;
            self.$dot.innerHTML = 'play';
            self.$dot.style.transform = 'translate(-400%, -200%) scale(1.5)';
        }

        self.$outline.style.transform = 'translate(-50%, -50%) scale(2)';
        self.$dot.style.width = '5px';
        self.$dot.style.height = '5px';
        self.$dot.style.color = 'red';
        self.$dot.style.letterSpacing = '1px';
        self.$dot.style.backgroundColor = 'rgba(255, 0, 0, 0)';
    },
    toggleCursorPlayMove: function () {
        const self = this;

        if (self.cursorPlay) {
            self.$dot.innerHTML = '||';
            self.$dot.style.transform = 'translate(-150%, -200%) scale(1.5)';
        } else {
            self.$dot.innerHTML = 'play';
            self.$dot.style.transform = 'translate(-400%, -200%) scale(1.5)';
        }

        self.$outline.style.transform = 'translate(-50%, -50%) scale(2)';
        self.$dot.style.width = '5px';
        self.$dot.style.height = '5px';
        self.$dot.style.color = 'red';
        self.$dot.style.letterSpacing = '1px';
        self.$dot.style.backgroundColor = 'rgba(255, 0, 0, 0)';
    },



    toggleCursorVisibility: function () {
        const self = this;

        if (self.cursorVisible) {
            self.$dot.style.opacity = 1;
            self.$outline.style.opacity = 1;
        } else {
            self.$dot.style.opacity = 0;
            self.$outline.style.opacity = 0;
        }
    }
}

cursor.init();

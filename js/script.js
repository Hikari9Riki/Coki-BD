/* =========================================
   ELEMENTS
========================================= */

const character =
    document.querySelector("#character");

const characterContainer =
    document.querySelector("#character-container");

const seal =
    document.querySelector("#seal");

const leftDoor =
    document.querySelector(".left-door");

const rightDoor =
    document.querySelector(".right-door");

const topFlap =
    document.querySelector(".top-flap");

const letter =
    document.querySelector("#letter");

const slash =
    document.querySelector("#slash-effect");

const startMessage =
    document.querySelector("#start-message");

const envelope =
    document.querySelector("#envelope");

const letterOverlay =
    document.querySelector("#letter-overlay");

let started = false;

const isMobile = () =>
    window.matchMedia("(max-width: 900px)").matches;

/* POSITION SLASH */

function positionSlash() {

    const characterRect = character.getBoundingClientRect();
    const sealRect = seal.getBoundingClientRect();

    const startX =
        characterRect.left +
        characterRect.width * 0.76;

    const startY =
        characterRect.top +
        characterRect.height * 0.43;

    const endX =
        sealRect.left +
        sealRect.width / 2;

    const endY =
        sealRect.top +
        sealRect.height / 2;

    const deltaX = endX - startX;
    const deltaY = endY - startY;

    const distance =
        Math.sqrt(
            deltaX * deltaX +
            deltaY * deltaY
        );

    const angle =
        Math.atan2(deltaY, deltaX) * 180 / Math.PI;

    gsap.set(slash, {
        left: startX,
        top: startY,
        width: distance,
        rotation: angle,
        scaleX: 0,
        opacity: 0
    });
}

/* =========================================
   INITIAL STATE
========================================= */

/*
   We let GSAP control the letter transform
   instead of mixing CSS transform + GSAP.
*/

gsap.set(letterOverlay, {
    opacity: 0,
    visibility: "hidden"
});

gsap.set(letter, {
    opacity: 0,
    scale: 0.9,
    y: 30
});

gsap.set(slash, {
    opacity: 0,
    scaleX: 0
});



/* =========================================
   CHARACTER IDLE
========================================= */

const idleAnimation = gsap.to(character, {

    y: -8,

    duration: 2,

    repeat: -1,

    yoyo: true,

    ease: "sine.inOut"

});



/* =========================================
   CLICK WEBSITE
========================================= */

document.addEventListener("click", startAnimation);



function startAnimation() {

    /*
        Prevent user from triggering
        the animation multiple times.
    */

    if (started) {
        return;
    }

    started = true;

    positionSlash();

    /*
        Stop the breathing animation
        before the attack begins.
    */

    idleAnimation.pause();


    const timeline = gsap.timeline();



    /* -----------------------------------------
       HIDE CLICK MESSAGE
    ----------------------------------------- */

    timeline.to(startMessage, {

        opacity: 0,

        duration: 0.3

    });



    /* -----------------------------------------
       RESET CHARACTER Y POSITION
    ----------------------------------------- */

    timeline.to(character, {

        y: 0,

        duration: 0.15

    });



    /* -----------------------------------------
       CHARACTER PREPARES SWORD
    ----------------------------------------- */

    timeline.to(character, {

        rotation: -8,

        x: -15,

        duration: 0.25,

        ease: "power2.out"

    });



    /* -----------------------------------------
       CHARACTER DASHES TOWARD ENVELOPE
    ----------------------------------------- */

    timeline.to(characterContainer, {

        x: 120,

        duration: 0.3,

        ease: "power2.in"

    });



    /* =========================================
       SWORD SLASH
    ========================================= */

    timeline.set(slash, {

        opacity: 1

    });


    timeline.fromTo(

        slash,

        {
            scaleX: 0
        },

        {
            scaleX: 1,

            duration: 0.18,

            ease: "power4.out"
        }

    );



    /* -----------------------------------------
       SEAL IMPACT
    ----------------------------------------- */

    timeline.to(
        seal,

        {

            scale: 1.25,

            duration: 0.08,

            ease: "power4.out"

        },

        "<"
    );


    timeline.to(seal, {

        scale: 0.8,

        rotation: 20,

        duration: 0.1

    });



    /* -----------------------------------------
       SLASH FADES
    ----------------------------------------- */

    timeline.to(slash, {

        opacity: 0,

        scaleX: 1.08,

        duration: 0.18,

        ease: "power2.out"

    });



    /* -----------------------------------------
       DRAGON SEAL BREAKS
    ----------------------------------------- */

    timeline.to(seal, {

        scale: 0,

        opacity: 0,

        rotation: 180,

        duration: 0.35,

        ease: "back.in(2)"

    });



    /* =========================================
       CHARACTER RETURNS
    ========================================= */

    timeline.to(characterContainer, {

        x: 0,

        duration: 0.5,

        ease: "power2.out"

    });


    timeline.to(character, {

        rotation: 0,

        x: 0,

        duration: 0.3

    });



    /* Small dramatic pause */

    timeline.to({}, {

        duration: 0.25

    });



    /* =========================================
       ENVELOPE OPENS
    ========================================= */

    timeline.to(leftDoor, {

        rotationY: -110,

        duration: 1,

        ease: "power2.inOut"

    });



    timeline.to(
        rightDoor,

        {

            rotationY: 110,

            duration: 1,

            ease: "power2.inOut"

        },

        "<"
    );



    /* -----------------------------------------
       TOP FLAP
    ----------------------------------------- */

    timeline.to(
        topFlap,

        {

            rotationX: 150,

            duration: 0.9,

            ease: "power2.inOut"

        },

        "<+0.15"
    );


   /* =====================================
    FINISH ENVELOPE ANIMATION
    ===================================== */

    /*
    Give the opened envelope
    a short moment to be seen.
    */

    timeline.to({}, {
        duration: 0.5
    });


    /* =====================================
    FADE CHARACTER + ENVELOPE
    ===================================== */

    timeline.to(
        [
            envelope,
            characterContainer,
            startMessage
        ],
        {
            autoAlpha: 0,
            scale: 0.95,
            duration: 0.6,
            ease: "power2.inOut"
        }
    );


    timeline.set(
        [
            envelope,
            characterContainer,
            startMessage
        ],
        {
            display: "none"
        }
    );


    /* =====================================
    SHOW FINAL LETTER
    ===================================== */

    timeline.set(
        letterOverlay,
        {
            visibility: "visible",
            pointerEvents: "auto"
        }
    );


    timeline.to(
        letterOverlay,
        {
            opacity: 1,
            duration: 0.5,
            ease: "power2.out"
        }
    );


    timeline.to(
        letter,
        {
            opacity: 1,
            scale: 1,
            y: 0,
            duration: 0.8,
            ease: "back.out(1.4)"
        },
        "<+0.1"
    );
    
    

    window.addEventListener(
        "resize",
        positionSlash
    );

}
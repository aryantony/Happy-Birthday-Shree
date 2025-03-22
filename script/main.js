window.addEventListener('load', () => {
    const audio = document.querySelector('.song');

    document.body.addEventListener('click', () => {
        if (audio.paused) {
            audio.play().catch(error => console.log('Audio play failed:', error));
        }
    }, { once: true }); 
    const birthdayDiv = document.querySelector(".birthday-start");
    const countdownDiv = document.querySelector(".countdown");
    
    birthdayDiv.style.display = "none"; // Hide the birthday div initially
    countdownDiv.style.display = "flex"; // Show countdown initially

    // Define the target date and time (Change these values as needed)
    let targetDay = 22;  // Change to your desired day
    let targetMonth = 3;  // Month (1 = Jan, 12 = Dec)
    let targetYear = 2025; // Change to your desired year
    let targetHour = 12;   // Change to your desired hour
    let targetMinute = 0;  // Change to your desired minute
    let targetAMPM = "AM"; // Set "AM" or "PM"

    function updateCountdown() {
        const now = new Date();

        // Convert target time to 24-hour format
        let hour24 = targetHour;
        if (targetAMPM === "PM" && targetHour !== 12) {
            hour24 += 12;
        }
        if (targetAMPM === "AM" && targetHour === 12) {
            hour24 = 0;
        }

        // Create the target date object
        const targetDate = new Date(targetYear, targetMonth - 1, targetDay, hour24, targetMinute, 0, 0);
        const timeDiff = targetDate - now;

        if (timeDiff > 0) {
            // Calculate remaining time
            const hours = Math.floor(timeDiff / (1000 * 60 * 60));
            const minutes = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((timeDiff % (1000 * 60)) / 1000);

            // Update the countdown display
            countdownDiv.innerHTML = `<div>🎉  ${hours}h : ${minutes}m : ${seconds}s</div>`;

        } else {
            clearInterval(timer);

            // Hide countdown and show the birthday div
            countdownDiv.style.display = "none";
            birthdayDiv.style.display = "block";
            birthdayDiv.style.opacity = "0";
            birthdayDiv.style.transition = "opacity 1.5s ease-in-out";
            setTimeout(() => {
                birthdayDiv.style.opacity = "1";
            }, 100);

            // Show SweetAlert when time is reached
            Swal.fire({
                title: 'Do you want to play music in the background?',
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Yes',
                cancelButtonText: 'No',
            }).then((result) => {
                if (result.isConfirmed) {
                    document.querySelector('.song').play();
                    animationTimeline();
                } else {
                    animationTimeline();
                }
            });
        }
    }

    // Update the countdown every second
    const timer = setInterval(updateCountdown, 1000);
});





// animation timeline
const animationTimeline = () => {
    // Split chars that need to be animated individually
    const textBoxChars = document.getElementsByClassName("hbd-chatbox")[0];
    const hbd = document.getElementsByClassName("wish-hbd")[0];

    textBoxChars.innerHTML = `<span>${textBoxChars.innerHTML
        .split("")
        .join("</span><span>")}</span>`;

    hbd.innerHTML = `<span>${hbd.innerHTML
        .split("")
        .join("</span><span>")}</span>`;

    // Text animation transformations
    const ideaTextTrans = {
        opacity: 0,
        y: -20,
        rotationX: 5,
        skewX: "15deg"
    };

    const ideaTextTransLeave = {
        opacity: 0,
        y: 20,
        rotationY: 5,
        skewX: "-15deg"
    };

    // Timeline
    const tl = new TimelineMax();

    // Show container
    tl.to(".container", 0.6, { visibility: "visible" })

    // Animate first screen (One & Two)
    .from(".one", 0.7, { opacity: 0, y: 10 })
    .from(".two", 0.4, { opacity: 0, y: 10 })
    .to(".one", 0.7, { opacity: 0, y: 10 }, "+=3.5")
    .to(".two", 0.7, { opacity: 0, y: 10 }, "-=1")

    // Animate third screen (Three)
    .from(".three", 0.7, { opacity: 0, y: 10 })
    .to(".three", 0.7, { opacity: 0, y: 10 }, "+=3")

    // Animate fourth screen (Birthday Message)
    .from(".four", 0.7, { scale: 0.2, opacity: 0 })
    .from(".fake-btn", 0.3, { scale: 0.2, opacity: 0 })
    .staggerTo(".hbd-chatbox span", 1.5, { visibility: "visible" }, 0.05)
    .to(".fake-btn", 0.1, { backgroundColor: "rgb(127, 206, 248)" }, "+=4")
    .to(".four", 0.5, { scale: 0.2, opacity: 0, y: -150 }, "+=1")

    // Animate idea messages (Idea 1 to Idea 6)
    .from(".idea-1", 0.7, ideaTextTrans)
    .to(".idea-1", 0.7, ideaTextTransLeave, "+=2.5")
    .from(".idea-2", 0.7, ideaTextTrans)
    .to(".idea-2", 0.7, ideaTextTransLeave, "+=2.5")
    .from(".idea-3", 0.7, ideaTextTrans)
    .to(".idea-3 strong", 0.5, { scale: 1.2, x: 10, backgroundColor: "rgb(21, 161, 237)", color: "#fff" })
    .to(".idea-3", 0.7, ideaTextTransLeave, "+=2.5")
    .from(".idea-4", 0.7, ideaTextTrans)
    .to(".idea-4", 0.7, ideaTextTransLeave, "+=2.5")
    .from(".idea-5", 0.7, { rotationX: 15, rotationZ: -10, skewY: "-5deg", y: 50, z: 10, opacity: 0 }, "+=1.5")
    .to(".idea-5 span", 0.7, { rotation: 90, x: 8 }, "+=1.4")
    .to(".idea-5", 0.7, { scale: 0.2, opacity: 0 }, "+=2")
    .staggerFrom(".idea-6 span", 0.8, { scale: 3, opacity: 0, rotation: 15, ease: Expo.easeOut }, 0.2)
    .staggerTo(".idea-6 span", 0.8, { scale: 3, opacity: 0, rotation: -15, ease: Expo.easeOut }, 0.2, "+=1.5")

    // Animate balloons
    .staggerFromTo(".baloons img", 2.5, { opacity: 0.9, y: 1400 }, { opacity: 1, y: -1000 }, 0.2)

    // Animate profile picture & hat
    .from(".profile-picture", 0.5, { scale: 3.5, opacity: 0, x: 25, y: -25, rotationZ: -45 }, "-=2")
    .from(".hat", 0.5, { x: -100, y: 350, rotation: -180, opacity: 0 })

    // Animate Happy Birthday text
    .staggerFrom(".wish-hbd span", 0.7, { opacity: 0, y: -50, rotation: 150, skewX: "30deg", ease: Elastic.easeOut.config(1, 0.5) }, 0.1)
    .staggerFromTo(".wish-hbd span", 0.7, { scale: 1.4, rotationY: 150 }, { scale: 1, rotationY: 0, color: "#ff69b4", ease: Expo.easeOut }, 0.1, "party")
    .from(".wish h5", 0.5, { opacity: 0, y: 10, skewX: "-15deg" }, "party")

    // Animate SVG burst effect
    .staggerTo(".eight svg", 1.5, { visibility: "visible", opacity: 0, scale: 80, repeat: 3, repeatDelay: 1.4 }, 0.3)

    // Animate final message
    .to(".six", 0.5, { opacity: 0, y: 30, zIndex: "-1" })
    .staggerFrom(".nine p", 1, ideaTextTrans, 1.2)
    .to(".last-smile", 0.5, { rotation: 90 }, "+=1");

    // Restart Animation on click
    const replyBtn = document.getElementById("replay");
    replyBtn.addEventListener("click", () => {
        tl.restart();
    });
};


const birthDate = new Date(2006, 3, 24, 20, 30, 0); // Change this as needed
const timeFromBirthDiv=document.querySelector('.timeFromBirth')
function calculateTimeSinceBirth() {
    const now = new Date();
    const diff = now - birthDate; // Difference in milliseconds
    
    // Convert to years, days, hours, minutes, seconds
    const years = Math.floor(diff / (1000 * 60 * 60 * 24 * 365.25)); // Considering leap years
    const remainingDays = Math.floor((diff % (1000 * 60 * 60 * 24 * 365.25)) / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diff % (1000 * 60)) / 1000);
    
    return `The world just got luckier since: <br> 
            <strong>${years} <div class="makeBig">years</div>, ${remainingDays} <div class="makeBig">days</div>, ${hours} <div class="makeBig">hours</div>, ${minutes} <div class="makeBig">minutes</div>, ${seconds} <div class="makeBig">seconds</div></strong> ago!`;
    
}

// Insert text into `.nine p`
timeFromBirthDiv.innerHTML = calculateTimeSinceBirth();

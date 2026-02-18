//===================toggle icon navbar====================//
let menuIcon = document.querySelector('#menu-icon');
let navbar = document.querySelector('.navbar');

menuIcon.onclick = () => {
    menuIcon.classList.toggle('fa-x');
    navbar.classList.toggle('active');
}

//===================toggle icon navbar====================//

let sections = document.querySelectorAll('section');
let navLinks = document.querySelectorAll('header nav a');

window.onscroll = () => {
    sections.forEach(sec => {
        let top = window.scrollY;
        let offset = sec.offsetTop - 150;
        let height = sec.offsetHeight;
        let id = sec.getAttribute('id');

        if (top >= offset && top < offset + height) {
            navLinks.forEach(links => {
                links.classList.remove('active');
                document.querySelector('header nav a[href*=' + id + ']').classList.add('active');
            });
        };
    });

    //===================sticky navbar====================//
    let header = document.querySelector('header');
    header.classList.toggle('sticky', window.scrollY > 100);

    //===================remove toggle icon and navbar when click navbar link (scroll)====================//
    menuIcon.classList.remove('fa-x');
    navbar.classList.remove('active');

    // ====================contact me====================//

    const form = document.getElementById('contactform');
    const submitBtn = form.querySelector('input[type="submit"]');

    form.addEventListener('submit', async (e) => {
        e.preventDefault();

        if (submitBtn.disabled) return; // prevents double click

        const formData = new FormData(form);

        const originalText = submitBtn.value;

        submitBtn.value = "Sending...";
        submitBtn.disabled = true;

        try {
            const response = await fetch("https://api.web3forms.com/submit", {
                method: "POST",
                body: formData
            });

            const data = await response.json();

            if (response.ok) {
                alert("Success! Your message has been sent.");
                form.reset();
            } else {
                alert("Error: " + data.message);
            }

        } catch (error) {
            alert("Something went wrong. Please try again.");
        } finally {
            submitBtn.value = originalText;
            submitBtn.disabled = false;
        }
    });


}
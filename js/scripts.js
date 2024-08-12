document.addEventListener('DOMContentLoaded', function() {
    // Live typing effect
    function typeEffect(element, text, delay = 100) {
        let i = 0;
        function type() {
            if (i < text.length) {
                element.innerHTML += text.charAt(i);
                i++;
                setTimeout(type, delay);
            }
        }
        type();
    }

    const heroTitle = document.getElementById('typing-text');
    const heroSubtitle = document.getElementById('typing-subtext');

    typeEffect(heroTitle, "Christian Baumann", 100);
    setTimeout(() => {
        typeEffect(heroSubtitle, "I'm a Placeholder", 100);
    }, 2000); // Adjust the delay for the second text

    // Smooth scrolling
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            
            if (targetId) {
                const targetElement = document.getElementById(targetId);
                window.scrollTo({
                    top: targetElement.offsetTop - 70, // Adjust for fixed navbar height
                    behavior: 'smooth'
                });
            } else {
                window.scrollTo({
                    top: 0,
                    behavior: 'smooth'
                });
            }
        });
    });
});

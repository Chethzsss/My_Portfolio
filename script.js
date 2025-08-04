// script.js
console.log('Portfolio script loaded.');

// Mobile navigation toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('active');
  navMenu.classList.toggle('active');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-menu a').forEach(link => {
  link.addEventListener('click', () => {
    hamburger.classList.remove('active');
    navMenu.classList.remove('active');
  });
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  });
});

// Download Resume functionality
const downloadResumeBtn = document.getElementById('downloadResume');

downloadResumeBtn.addEventListener('click', () => {
  // Create a sample resume content (you can replace this with your actual resume)
  const resumeContent = `
Your Name
Professional Title
Email: your.email@example.com
Phone: +1 (555) 123-4567
LinkedIn: linkedin.com/in/yourprofile
GitHub: github.com/yourusername

PROFESSIONAL SUMMARY
Experienced professional with expertise in [your field]. Passionate about [your interests] and committed to delivering high-quality results.

EXPERIENCE
Company Name | Role/Position | 2022 - Present
• Key achievement 1
• Key achievement 2
• Key achievement 3

EDUCATION
Degree Name | University Name | Year
• Relevant coursework or achievements

SKILLS
• Technical Skills: HTML, CSS, JavaScript, [other skills]
• Soft Skills: Communication, Problem Solving, Teamwork

CERTIFICATIONS
• Certification Name - Issuer (Year)
  `;

  // Create a blob with the resume content
  const blob = new Blob([resumeContent], { type: 'text/plain' });
  
  // Create a download link
  const url = window.URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'YourName_Resume.txt';
  
  // Trigger download
  document.body.appendChild(a);
  a.click();
  
  // Clean up
  window.URL.revokeObjectURL(url);
  document.body.removeChild(a);
  
  // Show success message
  showNotification('Resume downloaded successfully!', 'success');
});

// Notification system
function showNotification(message, type = 'info') {
  // Create notification element
  const notification = document.createElement('div');
  notification.className = `notification notification-${type}`;
  notification.textContent = message;
  
  // Style the notification
  notification.style.cssText = `
    position: fixed;
    top: 20px;
    right: 20px;
    background: ${type === 'success' ? '#4CAF50' : '#2196F3'};
    color: white;
    padding: 1rem 1.5rem;
    border-radius: 8px;
    box-shadow: 0 4px 12px rgba(0,0,0,0.15);
    z-index: 10000;
    transform: translateX(100%);
    transition: transform 0.3s ease;
  `;
  
  // Add to page
  document.body.appendChild(notification);
  
  // Animate in
  setTimeout(() => {
    notification.style.transform = 'translateX(0)';
  }, 100);
  
  // Remove after 3 seconds
  setTimeout(() => {
    notification.style.transform = 'translateX(100%)';
    setTimeout(() => {
      document.body.removeChild(notification);
    }, 300);
  }, 3000);
}

// Add scroll animations
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
    }
  });
}, observerOptions);

// Observe all cards for animation
document.querySelectorAll('.card').forEach(card => {
  card.style.opacity = '0';
  card.style.transform = 'translateY(30px)';
  card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
  observer.observe(card);
}); 
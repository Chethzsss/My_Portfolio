// script.js
console.log('Portfolio script loaded.');

// Mobile navigation toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('active');
  navMenu.classList.toggle('active');
});

document.querySelectorAll('.nav-menu a').forEach(link => {
  link.addEventListener('click', () => {
    hamburger.classList.remove('active');
    navMenu.classList.remove('active');
  });
});

// Smooth scrolling for navigation links (only on user click, not on page load)
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    // Only handle if href is not just '#'
    const hash = this.getAttribute('href');
    if (hash.length > 1) {
      const target = document.querySelector(hash);
      if (target) {
        e.preventDefault();
        const headerHeight = document.querySelector('header').offsetHeight;
        const targetPosition = target.offsetTop - headerHeight - 20; // 20px extra padding
        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });
      }
    }
  });
});

// --- Prevent browser auto-scroll on page load with hash ---
if (window.location.hash && document.querySelector(window.location.hash)) {
  // Scroll to top instantly to prevent browser's default jump
  window.scrollTo(0, 0);
  window.addEventListener('DOMContentLoaded', () => {
    setTimeout(() => {
      const headerHeight = document.querySelector('header').offsetHeight;
      const target = document.querySelector(window.location.hash);
      if (target) {
        const targetPosition = target.offsetTop - headerHeight - 20;
        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });
        // Remove hash from URL to prevent future jumps
        history.replaceState(null, '', window.location.pathname + window.location.search);
      }
    }, 10); // slight delay to ensure layout is ready
  });
}

// Download Resume functionality
const downloadResumeBtn = document.getElementById('downloadResume');

downloadResumeBtn.addEventListener('click', () => {
  // Create resume content from Chethan's actual resume
  const resumeContent = `
CHETHAN G N
Bengaluru | +91 9739863755 | chethan.nayak02@gmail.com
QA Lead | Automation & Manual Testing | 9+ Years Experience

PROFESSIONAL SUMMARY

Result-driven QA Lead with 9+ years of proven experience in both manual and automation testing, with a strong focus on Selenium with Java, BDD frameworks, and API testing. Expertise in designing robust automation suites, leading end-to-end testing efforts, and ensuring product quality in Agile and scrum-driven environments.
Recognized for improving test efficiency, mentoring QA teams, and collaborating closely with stakeholders to align quality goals with product roadmaps. Passionate about driving quality in high-performance, scalable, and customer-centric applications - particularly in healthcare and product-based ecosystems.
Currently upskilling in Playwright with JavaScript and enrolled in an AI Masterclass to explore intelligent automation.

CORE SKILLS & TOOLS

• Automation: Selenium WebDriver with Java, TestNG, BDD (Cucumber), Karate (UI & API)
• Manual Testing: Functional, Sanity, Regression, UAT, E2E Integration
• API Testing: Postman, Karate DSL
• Defect Tracking & Management: Jira, Zephyr
• Agile Tools: Confluence, Jira, Scrum Ceremonies
• Programming & Scripting: Java (BDD Framework), Python (AI Certification)
• CI/CD & Version Control: Git
• Soft Skills: Team Leadership, Stakeholder Communication, Documentation

WORK HISTORY

QA Lead
Detrans Solutions LLP, Bengaluru | Nov 2019 - Dec 2024

• Spearheaded QA efforts for multiple product releases in Agile sprints.
• Built and maintained BDD-based Automation Regression Suite using Java, ensuring end-to-end coverage.
• Reviewed product requirements from Confluence and translated them into Zephyr test cases.
• Conducted functional, regression, and sanity testing across multiple environments.
• Represented QA in daily scrums and stakeholder demos, ensuring transparency in progress and risk areas.
• Improved bug-reporting practices and streamlined communication between QA and Dev teams.
• Mentored junior QA engineers, enhancing overall team delivery and quality ownership

QA Engineer
BTC Soft Pvt Ltd, Bengaluru | Nov 2015 - Nov 2019

• Executed manual and functional testing on custom applications using client-provided Excel tools.
• Actively participated in client calls and sprint meetings to provide QA input and gather feedback.
• Created thorough documentation including MoMs and change request handling processes.
• Reduced defect leakage by authoring strong test scenarios and detailed test documentation.
• Assisted with API Testing and validating production deployments via sanity tests

EDUCATION

M.Tech - Digital Electronics & Communication
APS College of Engineering, Bengaluru - 2014

B.E. - Electronics & Communication
NMAM Institute of Technology, Nitte - 2011

CERTIFICATIONS & UP-SKILLING

• Selenium WebDriver with Java - Basics to Advanced - Certified
• Karate for UI & API Automation - Certified
• Python for AI - Certified
• AI Masterclass (Ongoing) - Be10X
• Playwright with JavaScript (Self-paced learning, ongoing)
  `;

  // Create a blob with the resume content
  const blob = new Blob([resumeContent], { type: 'text/plain' });
  
  // Create a download link
  const url = window.URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'Chethan_GN_Resume.txt';
  
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

document.querySelectorAll('.card').forEach(card => {
  card.style.opacity = '0';
  card.style.transform = 'translateY(30px)';
  card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
  observer.observe(card);
}); 
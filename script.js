// DOM Elements
const body = document.body;
const navItems = document.querySelectorAll('.nav-item');
const contentSections = document.querySelectorAll('[id$="-content"]');
const notificationIcon = document.querySelector('.notification-icon');
const liveIcon = document.querySelector('.live-icon');
const messengerIcon = document.querySelector('.messenger-icon');
const helpIcon = document.querySelector('.help-icon');
const notificationPanel = document.getElementById('notification-panel');
const liveMessageViewer = document.getElementById('live-message-viewer');
const messengerPanel = document.getElementById('messenger-panel');
const helpPanel = document.getElementById('help-panel');
const closePanelButtons = document.querySelectorAll('.close-panel');
const themeToggle = document.getElementById('theme-toggle');
const filterButtons = document.querySelectorAll('.filter-btn');
const orderItems = document.querySelectorAll('.order-item');
const profileOptionBtns = document.querySelectorAll('.profile-option-btn');
const profileSections = document.querySelectorAll('.profile-section-content');
const tabButtons = document.querySelectorAll('.tab-btn');
const tabContents = document.querySelectorAll('.tab-content');
const orderTypeOptions = document.querySelectorAll('.order-type-option');
const orderForms = document.querySelectorAll('.order-form');
const authModal = document.getElementById('auth-modal');
const modalTabButtons = document.querySelectorAll('.modal-tabs .tab-btn');
const authTabContents = document.querySelectorAll('.auth-tab-content');
const closeModalButton = document.querySelector('.close-modal');
const threadItems = document.querySelectorAll('.thread-item');
const conversationItems = document.querySelectorAll('.conversation-item');

// Initialize the app
document.addEventListener('DOMContentLoaded', function() {
    // Check for saved theme preference
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        body.classList.add('dark-theme');
        if (themeToggle) themeToggle.checked = true;
    }

    // Show auth modal if user is not logged in
    // For demo purposes, comment this out
    // showAuthModal();
});

// Bottom Navigation Functionality
navItems.forEach(item => {
    item.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetContent = this.getAttribute('data-content');
        
        // Update navigation active state
        navItems.forEach(nav => nav.classList.remove('active'));
        this.classList.add('active');
        
        // Show corresponding content
        contentSections.forEach(section => {
            section.classList.add('hidden-content');
            section.classList.remove('active-content');
        });
        
        document.getElementById(`${targetContent}-content`).classList.remove('hidden-content');
        document.getElementById(`${targetContent}-content`).classList.add('active-content');
    });
});

// Side Panel Functionality
function togglePanel(panel) {
    // Close all panels first
    const allPanels = [notificationPanel, liveMessageViewer, messengerPanel, helpPanel];
    allPanels.forEach(p => p.classList.remove('active'));
    
    // Toggle the selected panel
    panel.classList.toggle('active');
}

// Event listeners for panel toggles
if (notificationIcon) {
    notificationIcon.addEventListener('click', () => togglePanel(notificationPanel));
}

if (liveIcon) {
    liveIcon.addEventListener('click', () => togglePanel(liveMessageViewer));
}

if (messengerIcon) {
    messengerIcon.addEventListener('click', () => togglePanel(messengerPanel));
}

if (helpIcon) {
    helpIcon.addEventListener('click', () => togglePanel(helpPanel));
}

// Close panel buttons
closePanelButtons.forEach(button => {
    button.addEventListener('click', function() {
        const panel = this.closest('.side-panel');
        panel.classList.remove('active');
    });
});

// Theme Toggle
if (themeToggle) {
    themeToggle.addEventListener('change', function() {
        if (this.checked) {
            body.classList.add('dark-theme');
            localStorage.setItem('theme', 'dark');
        } else {
            body.classList.remove('dark-theme');
            localStorage.setItem('theme', 'light');
        }
    });
}

// Filter Functionality
filterButtons.forEach(button => {
    button.addEventListener('click', function() {
        const filter = this.getAttribute('data-filter');
        
        // Update active filter button
        filterButtons.forEach(btn => btn.classList.remove('active'));
        this.classList.add('active');
        
        // Filter order items
        orderItems.forEach(item => {
            if (filter === 'all' || item.getAttribute('data-category') === filter) {
                item.style.display = 'block';
            } else {
                item.style.display = 'none';
            }
        });
    });
});

// Profile Options Toggle
profileOptionBtns.forEach(button => {
    button.addEventListener('click', function() {
        const option = this.getAttribute('data-option');
        
        // Update active button
        profileOptionBtns.forEach(btn => btn.classList.remove('active'));
        this.classList.add('active');
        
        // Show corresponding section
        profileSections.forEach(section => section.classList.add('hidden'));
        document.getElementById(`profile-${option}`).classList.remove('hidden');
    });
});

// Tab Functionality
tabButtons.forEach(button => {
    button.addEventListener('click', function() {
        const tab = this.getAttribute('data-tab');
        const tabGroup = this.closest('.tab-options').getAttribute('data-tab-group') || '';
        
        // Update active tab button
        const groupButtons = tabGroup 
            ? document.querySelectorAll(`.tab-options[data-tab-group="${tabGroup}"] .tab-btn`)
            : this.closest('.tab-options').querySelectorAll('.tab-btn');
        
        groupButtons.forEach(btn => btn.classList.remove('active'));
        this.classList.add('active');
        
        // Show corresponding tab content
        const targetContents = tabGroup
            ? document.querySelectorAll(`.tab-content[data-tab-group="${tabGroup}"]`)
            : this.closest('.tab-options').nextElementSibling.querySelectorAll('.tab-content');
        
        targetContents.forEach(content => content.classList.add('hidden'));
        document.getElementById(`${tab}-tab`).classList.remove('hidden');
    });
});

// Order Type Selection
orderTypeOptions.forEach(option => {
    option.addEventListener('click', function() {
        const type = this.getAttribute('data-type');
        
        // Hide all forms
        orderForms.forEach(form => form.classList.add('hidden'));
        
        // Show selected form
        document.getElementById(`${type}-form`).classList.remove('hidden');
    });
});

// Auth Modal
function showAuthModal() {
    authModal.classList.add('active');
}

function hideAuthModal() {
    authModal.classList.remove('active');
}

// Auth Modal Tabs
modalTabButtons.forEach(button => {
    button.addEventListener('click', function() {
        const tab = this.getAttribute('data-tab');
        
        // Update active tab button
        modalTabButtons.forEach(btn => btn.classList.remove('active'));
        this.classList.add('active');
        
        // Show corresponding tab content
        authTabContents.forEach(content => content.classList.add('hidden'));
        document.getElementById(`${tab}-tab`).classList.remove('hidden');
    });
});

if (closeModalButton) {
    closeModalButton.addEventListener('click', hideAuthModal);
}

// Live Message Viewer Thread Selection
threadItems.forEach(thread => {
    thread.addEventListener('click', function() {
        // Update active thread
        threadItems.forEach(t => t.classList.remove('active'));
        this.classList.add('active');
        
        // Here you would load the corresponding messages
        // For the demo, we just have one set of messages
    });
});

// Messenger Conversation Selection
conversationItems.forEach(convo => {
    convo.addEventListener('click', function() {
        // Update active conversation
        conversationItems.forEach(c => c.classList.remove('active'));
        this.classList.add('active');
        
        // On mobile, this would show the chat view
        if (window.innerWidth < 768) {
            document.querySelector('.messenger-sidebar').style.display = 'none';
            document.querySelector('.messenger-chat').style.display = 'block';
        }
    });
});

// Form Submissions (prevent default for demo)
document.querySelectorAll('form').forEach(form => {
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        alert('Form submitted successfully! This is a demo, so no actual submission occurs.');
    });
});

// Device Fingerprinting for Registration
function getDeviceFingerprint() {
    // This is a simplified version - in a real app, you'd use a library like FingerprintJS
    const fingerprint = {
        userAgent: navigator.userAgent,
        language: navigator.language,
        platform: navigator.platform,
        screenResolution: `${window.screen.width}x${window.screen.height}`,
        timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
        colorDepth: window.screen.colorDepth,
        canvas: getCanvasFingerprint()
    };
    
    return btoa(JSON.stringify(fingerprint));
}

function getCanvasFingerprint() {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    canvas.width = 200;
    canvas.height = 50;
    
    // Text with specific styling
    ctx.textBaseline = 'top';
    ctx.font = '14px Arial';
    ctx.fillStyle = '#f60';
    ctx.fillRect(125, 1, 62, 20);
    ctx.fillStyle = '#069';
    ctx.fillText('SteadyClick', 2, 15);
    
    return canvas.toDataURL();
}

// WhatsApp-style Message Status
function updateMessageStatus(messageElement, status) {
    const statusIcon = messageElement.querySelector('.message-status i');
    
    // Remove all existing classes
    statusIcon.classList.remove('fa-check', 'fa-check-double', 'read');
    
    // Set new status
    switch (status) {
        case 'sent':
            statusIcon.classList.add('fa-check');
            break;
        case 'delivered':
            statusIcon.classList.add('fa-check-double');
            break;
        case 'read':
            statusIcon.classList.add('fa-check-double', 'read');
            break;
    }
}

// Typed Text Animation for Demo (can be removed in production)
function animateTypedText() {
    const typedTextElement = document.querySelector('.typed-text');
    const cursorElement = document.querySelector('.cursor');
    
    if (!typedTextElement || !cursorElement) return;
    
    const textArray = ["Web Developer", "Digital Marketer", "UI/UX Designer", "Freelancer"];
    let textArrayIndex = 0;
    let charIndex = 0;
    const typingDelay = 150;
    const erasingDelay = 100;
    const newTextDelay = 2000;
    
    function type() {
        if (charIndex < textArray[textArrayIndex].length) {
            if (!cursorElement.classList.contains('typing')) cursorElement.classList.add('typing');
            typedTextElement.textContent += textArray[textArrayIndex].charAt(charIndex);
            charIndex++;
            setTimeout(type, typingDelay);
        } else {
            cursorElement.classList.remove('typing');
            setTimeout(erase, newTextDelay);
        }
    }
    
    function erase() {
        if (charIndex > 0) {
            if (!cursorElement.classList.contains('typing')) cursorElement.classList.add('typing');
            typedTextElement.textContent = textArray[textArrayIndex].substring(0, charIndex - 1);
            charIndex--;
            setTimeout(erase, erasingDelay);
        } else {
            cursorElement.classList.remove('typing');
            textArrayIndex++;
            if (textArrayIndex >= textArray.length) textArrayIndex = 0;
            setTimeout(type, typingDelay + 1100);
        }
    }
    
    if (textArray.length) setTimeout(type, newTextDelay + 250);
}

// Initialize anything else that needs to run on page load
animateTypedText();

// Close panels when clicking outside
document.addEventListener('click', function(e) {
    const panels = [notificationPanel, liveMessageViewer, messengerPanel, helpPanel];
    const panelContents = document.querySelectorAll('.panel-content');
    const panelHeaders = document.querySelectorAll('.panel-header');
    const icons = [notificationIcon, liveIcon, messengerIcon, helpIcon];
    
    // Check if click is outside all panels and icons
    const isOutside = !Array.from(panelContents).some(content => content.contains(e.target)) &&
                     !Array.from(panelHeaders).some(header => header.contains(e.target)) &&
                     !Array.from(icons).some(icon => icon.contains(e.target));
    
    if (isOutside) {
        panels.forEach(panel => panel.classList.remove('active'));
    }
});

// Responsive adjustments
window.addEventListener('resize', function() {
    // Adjust messenger view on mobile
    if (window.innerWidth >= 768) {
        if (document.querySelector('.messenger-sidebar')) {
            document.querySelector('.messenger-sidebar').style.display = 'block';
        }
        if (document.querySelector('.messenger-chat')) {
            document.querySelector('.messenger-chat').style.display = 'block';
        }
    }
});

// Device fingerprinting for registration
document.getElementById('register-form')?.addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Get device fingerprint
    const fingerprint = getDeviceFingerprint();
    
    // Add to form data
    const formData = new FormData(this);
    formData.append('deviceFingerprint', fingerprint);
    
    // In a real app, you would send this to your server
    console.log('Registration with fingerprint:', fingerprint);
    alert('Registration submitted with device fingerprint. This is just a demo.');
});

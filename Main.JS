// Main JavaScript for Minimal Portfolio

// ===== Page Navigation =====
document.addEventListener('DOMContentLoaded', function() {
    const navItems = document.querySelectorAll('.nav-item[data-page]');
    const pages = document.querySelectorAll('.page-content');

    navItems.forEach(item => {
        item.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetPage = this.getAttribute('data-page');
            
            // Remove active class from all nav items
            navItems.forEach(nav => nav.classList.remove('active'));
            
            // Add active class to clicked nav item
            this.classList.add('active');
            
            // Hide all pages
            pages.forEach(page => page.classList.remove('active'));
            
            // Show target page
            const targetElement = document.getElementById(`${targetPage}-page`);
            if (targetElement) {
                targetElement.classList.add('active');
            }
        });
    });
});

// ===== Form Validation =====
const contactForm = document.getElementById('contactForm');

if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Clear previous errors
        clearErrors();
        
        // Get form values
        const name = document.getElementById('name').value.trim();
        const email = document.getElementById('email').value.trim();
        const message = document.getElementById('message').value.trim();
        
        let isValid = true;
        
        // Validate name
        if (name === '') {
            showError('name', 'Name is required');
            isValid = false;
        } else if (name.length < 2) {
            showError('name', 'Name must be at least 2 characters');
            isValid = false;
        }
        
        // Validate email
        if (email === '') {
            showError('email', 'Email is required');
            isValid = false;
        } else if (!isValidEmail(email)) {
            showError('email', 'Please enter a valid email address');
            isValid = false;
        }
        
        // Validate message
        if (message === '') {
            showError('message', 'Message is required');
            isValid = false;
        } else if (message.length < 10) {
            showError('message', 'Message must be at least 10 characters');
            isValid = false;
        }
        
        // If form is valid, show success message
        if (isValid) {
            showSuccess();
            contactForm.reset();
            
            // Hide success message after 5 seconds
            setTimeout(() => {
                document.getElementById('formSuccess').classList.remove('show');
            }, 5000);
        }
    });
}

// Helper function to validate email format
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Show error message
function showError(fieldId, message) {
    const field = document.getElementById(fieldId);
    const errorElement = document.getElementById(`${fieldId}Error`);
    
    field.classList.add('error');
    errorElement.textContent = message;
    errorElement.classList.add('show');
}

// Clear all errors
function clearErrors() {
    const errorMessages = document.querySelectorAll('.error-message');
    const inputFields = document.querySelectorAll('.form-row input, .form-row textarea');
    
    errorMessages.forEach(error => {
        error.classList.remove('show');
        error.textContent = '';
    });
    
    inputFields.forEach(field => {
        field.classList.remove('error');
    });
}

// Show success message
function showSuccess() {
    const successElement = document.getElementById('formSuccess');
    successElement.classList.add('show');
}

// ===== Real-time Input Validation =====
const formInputs = document.querySelectorAll('.form-row input, .form-row textarea');

formInputs.forEach(input => {
    input.addEventListener('blur', function() {
        const fieldId = this.id;
        const value = this.value.trim();
        
        // Clear error when field is focused again
        const errorElement = document.getElementById(`${fieldId}Error`);
        if (errorElement) {
            errorElement.classList.remove('show');
            this.classList.remove('error');
        }
        
        // Validate on blur
        if (fieldId === 'email' && value !== '' && !isValidEmail(value)) {
            showError(fieldId, 'Please enter a valid email address');
        }
    });
    
    input.addEventListener('focus', function() {
        const errorElement = document.getElementById(`${this.id}Error`);
        if (errorElement) {
            errorElement.classList.remove('show');
            this.classList.remove('error');
        }
    });
});

// ===== Console Message =====
console.log('%c👋 Welcome to my minimal portfolio!', 'color: #1a1a1a; font-size: 20px; font-weight: bold;');
console.log('%cBuilt with HTML, CSS, and JavaScript', 'color: #666666; font-size: 14px;');
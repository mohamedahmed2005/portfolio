// Contact Form Handler — Vercel Serverless Function & Resend API Integration
document.addEventListener('DOMContentLoaded', () => {
    const contactForm = document.getElementById('contact-form');
    if (!contactForm) return;

    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        const submitBtn = contactForm.querySelector('button[type="submit"]');
        const originalBtnHTML = submitBtn ? submitBtn.innerHTML : 'Send Message';

        const nameInput = document.getElementById('name');
        const emailInput = document.getElementById('email');
        const subjectInput = document.getElementById('subject');
        const messageInput = document.getElementById('message');

        const name = nameInput ? nameInput.value.trim() : '';
        const email = emailInput ? emailInput.value.trim() : '';
        const subject = subjectInput ? subjectInput.value.trim() : '';
        const message = messageInput ? messageInput.value.trim() : '';

        if (!name || !email || !message) {
            showNotification('Please fill in all required fields.', 'error');
            return;
        }

        // Disable button & show loading state
        if (submitBtn) {
            submitBtn.disabled = true;
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
        }

        try {
            const response = await fetch('/api/contact', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ name, email, subject, message })
            });

            const data = await response.json();

            if (response.ok && data.success) {
                showNotification('Thank you! Your message has been sent successfully.', 'success');
                contactForm.reset();
            } else {
                console.warn('API Response Warning:', data);
                showNotification(data.error || 'Failed to send message. Opening email client fallback...', 'warning');
                setTimeout(() => {
                    useMailtoFallback(name, email, subject, message);
                }, 1500);
            }
        } catch (error) {
            console.error('Contact Form Error:', error);
            showNotification('Connection error. Opening email client fallback...', 'error');
            setTimeout(() => {
                useMailtoFallback(name, email, subject, message);
            }, 1500);
        } finally {
            if (submitBtn) {
                submitBtn.disabled = false;
                submitBtn.innerHTML = originalBtnHTML;
            }
        }
    });
});

// Fallback using mailto if local dev without Vercel Serverless or API key missing
function useMailtoFallback(name, email, subject, message) {
    const targetEmail = 'ahmd.mohamed200515@gmail.com';
    const emailSubject = encodeURIComponent(subject || `Message from ${name}`);
    const emailBody = encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`);
    window.location.href = `mailto:${targetEmail}?subject=${emailSubject}&body=${emailBody}`;
}

// Global Notification Toast
function showNotification(message, type = 'info') {
    const existingToast = document.querySelector('.custom-toast');
    if (existingToast) existingToast.remove();

    const toast = document.createElement('div');
    toast.className = `custom-toast toast-${type}`;
    toast.style.cssText = `
        position: fixed;
        bottom: 24px;
        right: 24px;
        background: ${type === 'success' ? '#10b981' : type === 'error' ? '#ef4444' : '#f59e0b'};
        color: #ffffff;
        padding: 14px 24px;
        border-radius: 8px;
        box-shadow: 0 10px 25px rgba(0,0,0,0.2);
        z-index: 9999;
        font-family: inherit;
        font-size: 0.95rem;
        font-weight: 500;
        display: flex;
        align-items: center;
        gap: 10px;
        animation: toastIn 0.3s ease-out forwards;
    `;

    const icon = type === 'success' ? 'check-circle' : type === 'error' ? 'exclamation-circle' : 'info-circle';
    toast.innerHTML = `<i class="fas fa-${icon}"></i> <span>${message}</span>`;

    document.body.appendChild(toast);

    setTimeout(() => {
        toast.style.opacity = '0';
        toast.style.transform = 'translateY(10px)';
        toast.style.transition = 'all 0.3s ease';
        setTimeout(() => toast.remove(), 300);
    }, 4500);
}

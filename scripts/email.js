// EmailManager.js
class EmailManager {
    constructor() {
        // Service and template IDs for EmailJS
        this.userServiceId = 'service_fnot1h5';          // Service for user confirmation
        this.userTemplateId = 'template_mprp551';        // Template for user confirmation
        this.notificationServiceId = 'service_lr2aszf';  // Service for notification to you
        this.notificationTemplateId = 'template_7oe7c6v'; // Template for notification to you (same template, different params)

        this.myEmail = 'medozahmed2005@gmail.com';
    }

    // Generic email sender
    async sendEmail(serviceId, templateId, params) {
        try {
            // Check if EmailJS is properly initialized
            if (!emailjs || !emailjs.send) {
                throw new Error('EmailJS is not properly initialized');
            }
            
            const response = await emailjs.send(serviceId, templateId, params);
            return { success: true, response };
        } catch (error) {
            return { success: false, error };
        }
    }

    // Send confirmation email to user
async sendUserConfirmation(name, email, subject, message) {
    const templateParams = {
        fullName: name,
        user_email: email,
        subject: subject,
        message: message
    };
    return this.sendEmail(this.userServiceId, this.userTemplateId, templateParams);
}

// Send notification email to yourself
async sendNotificationToMe(name, email, subject, message) {
    const templateParams = {
        fullName: name,
        user_email: email,
        subject: subject,
        message: message,
        to_email: this.myEmail
    };
    return this.sendEmail(this.notificationServiceId, this.notificationTemplateId, templateParams);
}

    // Send both emails with timeout handling
    async sendBothEmails(name, email, subject, message) {
        try {
            // Send both emails in parallel for faster processing
            const [userResult, notificationResult] = await Promise.allSettled([
                this.sendUserConfirmation(name, email, subject, message),
                this.sendNotificationToMe(name, email, subject, message)
            ]);

            const userSuccess = userResult.status === 'fulfilled' && userResult.value.success;
            const notificationSuccess = notificationResult.status === 'fulfilled' && notificationResult.value.success;

            // If at least one email succeeds, consider it a success
            if (userSuccess || notificationSuccess) {
                return {
                    success: true,
                    userEmail: userSuccess ? userResult.value.response : null,
                    notificationEmail: notificationSuccess ? notificationResult.value.response : null,
                    message: 'Emails are being processed. Delivery may take a few minutes.'
                };
            } else {
                throw new Error('Both emails failed to send');
            }
        } catch (error) {
            return { success: false, error };
        }
    }

    // Test function to send only notification email
    async testNotificationOnly(name, email, subject, message) {
        return this.sendNotificationToMe(name, email, subject, message);
    }

    // Test function to send only user confirmation
    async testUserConfirmationOnly(name, email, subject, message) {
        return this.sendUserConfirmation(name, email, subject, message);
    }

    // Fallback using mailto
    useMailtoFallback(name, email, subject, message) {
        const emailSubject = encodeURIComponent(subject);
        const emailBody = encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`);
        window.location.href = `mailto:${this.myEmail}?subject=${emailSubject}&body=${emailBody}`;
        return { success: true, method: 'mailto', message: 'EmailJS failed, using mailto fallback...' };
    }
}

// Export for global usage
window.EmailManager = EmailManager;

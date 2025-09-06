// EmailManager.js
class EmailManager {
    constructor() {
        // Service and template IDs for EmailJS
        this.userServiceId = 'service_7wu2s84';          // Service 1 for user confirmation
        this.userTemplateId = 'template_or6zamu';        // Template 1 for user confirmation
        this.notificationServiceId = 'service_fmvv571';  // Service 2 for notification to you
        this.notificationTemplateId = 'template_kaxppo4'; // Template 2 for notification to you

        this.myEmail = 'ahmd.mohamed200515@gmail.com';
    }

    // Generic email sender
    async sendEmail(serviceId, templateId, params) {
        try {
            console.log(`Sending email using service: ${serviceId}, template: ${templateId}`);
            console.log('Email parameters:', params);
            const response = await emailjs.send(serviceId, templateId, params);
            console.log('Email sent successfully!', response.status, response.text);
            return { success: true, response };
        } catch (error) {
            console.error('Error sending email:', error);
            return { success: false, error };
        }
    }

    // Send confirmation email to user
    async sendUserConfirmation(name, email, subject, message) {
        const templateParams = {
            fullName: name,
            to_email: email,      // Ensure your template uses {{to_email}}
            subject: subject,
            message: message
        };
        console.log('Sending user confirmation to:', email);
        return this.sendEmail(this.userServiceId, this.userTemplateId, templateParams);
    }

    // Send notification email to yourself
    async sendNotificationToMe(name, email, subject, message) {
        const templateParams = {
            from_name: name,
            from_email: email,    // Sender's email
            to_email: this.myEmail, // Your email receives this
            subject: subject,
            message: message
        };
        console.log('Sending notification to:', this.myEmail);
        return this.sendEmail(this.notificationServiceId, this.notificationTemplateId, templateParams);
    }

    // Send both emails
    async sendBothEmails(name, email, subject, message) {
        try {
            const userResult = await this.sendUserConfirmation(name, email, subject, message);
            if (!userResult.success) throw new Error('Failed to send confirmation email to user');

            const notificationResult = await this.sendNotificationToMe(name, email, subject, message);
            if (!notificationResult.success) throw new Error('Failed to send notification email to you');

            return {
                success: true,
                userEmail: userResult.response,
                notificationEmail: notificationResult.response
            };
        } catch (error) {
            console.error('Error sending emails:', error);
            return { success: false, error };
        }
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

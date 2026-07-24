// Vercel Serverless Function — Email handler via Resend API
// Endpoint: POST /api/contact

export default async function handler(req, res) {
    // Handle CORS headers
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
    res.setHeader(
        'Access-Control-Allow-Headers',
        'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
    );

    // Handle preflight OPTIONS request
    if (req.method === 'OPTIONS') {
        res.status(200).end();
        return;
    }

    // Only allow POST requests
    if (req.method !== 'POST') {
        return res.status(405).json({ success: false, error: 'Method Not Allowed. Use POST.' });
    }

    try {
        const { name, email, subject, message } = req.body || {};

        // Validation
        if (!name || !email || !message) {
            return res.status(400).json({
                success: false,
                error: 'Missing required fields: name, email, and message are required.'
            });
        }

        const resendApiKey = process.env.RESEND_API_KEY;
        const toEmail = process.env.TO_EMAIL || 'ahmd.mohamed200515@gmail.com';
        const fromEmail = process.env.FROM_EMAIL || 'Portfolio Contact <onboarding@resend.dev>';

        if (!resendApiKey) {
            console.error('RESEND_API_KEY environment variable is missing.');
            return res.status(500).json({
                success: false,
                error: 'Server email configuration error. Please set RESEND_API_KEY in Vercel settings.'
            });
        }

        // Send Notification Email to You
        const notificationRes = await fetch('https://api.resend.com/emails', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${resendApiKey}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                from: fromEmail,
                to: [toEmail],
                reply_to: email,
                subject: `Portfolio Contact: ${subject || 'New Message from ' + name}`,
                html: `
                    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; border: 1px solid #e2e8f0; border-radius: 8px; overflow: hidden;">
                        <div style="background: #2563eb; color: #ffffff; padding: 20px; text-align: center;">
                            <h2 style="margin: 0;">New Portfolio Message</h2>
                        </div>
                        <div style="padding: 24px; color: #1e293b;">
                            <p style="margin-top: 0;">You have received a new contact message from your portfolio website:</p>
                            
                            <table style="width: 100%; border-collapse: collapse; margin-bottom: 20px;">
                                <tr>
                                    <td style="padding: 8px 0; font-weight: bold; width: 100px;">From:</td>
                                    <td style="padding: 8px 0;">${name} (&lt;<a href="mailto:${email}">${email}</a>&gt;)</td>
                                </tr>
                                <tr>
                                    <td style="padding: 8px 0; font-weight: bold;">Subject:</td>
                                    <td style="padding: 8px 0;">${subject || 'No Subject'}</td>
                                </tr>
                            </table>
                            
                            <div style="background: #f8fafc; border-left: 4px solid #2563eb; padding: 16px; margin: 16px 0; border-radius: 4px;">
                                <h4 style="margin: 0 0 8px 0; color: #475569;">Message Content:</h4>
                                <p style="margin: 0; white-space: pre-wrap; line-height: 1.6;">${message}</p>
                            </div>
                        </div>
                        <div style="background: #f1f5f9; padding: 12px; text-align: center; font-size: 12px; color: #64748b;">
                            Mohamed Ahmed Portfolio &bull; Sent via Resend API & Vercel Functions
                        </div>
                    </div>
                `
            })
        });

        const notificationData = await notificationRes.json();

        if (!notificationRes.ok) {
            console.error('Resend API Error:', notificationData);
            return res.status(notificationRes.status).json({
                success: false,
                error: notificationData.message || 'Failed to send email via Resend API.'
            });
        }

        return res.status(200).json({
            success: true,
            message: 'Email sent successfully!',
            data: notificationData
        });

    } catch (error) {
        console.error('Internal Server Error:', error);
        return res.status(500).json({
            success: false,
            error: error.message || 'Internal Server Error.'
        });
    }
}

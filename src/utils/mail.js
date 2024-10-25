"use strict";
const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASS,
  },
});

const sendMail = async (to, subject, message, data) => {
  const info = await transporter.sendMail({
    from: '"Dai The" <daithehh04@gmail.com>', // sender address
    to,
    subject, // Subject line
    html: `
     <div style="font-family: Arial, sans-serif; color: #333; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #e0e0e0; border-radius: 8px;">
      <h2 style="color: #4CAF50; border-bottom: 1px solid #e0e0e0; padding-bottom: 10px;">
        📅 Xác nhận lịch hẹn
      </h2>
      
      <p style="font-size: 16px; line-height: 1.5;">Xin chào! Đây là thông tin lịch hẹn của bạn:</p>
      
      <div style="margin-top: 20px;">
        <strong>📆 Ngày:</strong> ${data.date}<br/>
        <strong>🕒 Thời gian:</strong> ${data.start_time} - ${data.end_time}
      </div>
      
      <p style="font-size: 14px; color: #888; margin-top: 20px; line-height: 1.5;">
        <i>💬 Cảm ơn bạn đã đặt lịch. Hãy chú ý thời gian lịch hẹn của mình nhé!</i>
      </p>
      
      <div style="margin-top: 30px; text-align: center;">
        <a href="https://example.com" style="display: inline-block; padding: 10px 20px; background-color: #4CAF50; color: white; text-decoration: none; border-radius: 5px;">
          🔍 Xem chi tiết
        </a>
      </div>
      
      <p style="font-size: 12px; color: #bbb; margin-top: 20px;">
        Nếu bạn có bất kỳ câu hỏi nào, hãy liên hệ với chúng tôi qua email này.
      </p>
    </div>
    `, // html body
  });
  return info;
};
module.exports = sendMail;

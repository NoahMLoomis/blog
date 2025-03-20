import fs from 'fs/promises';
import 'dotenv/config';
import path from 'path';
import matter from 'gray-matter';
import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD,
  },
});

const sendEmailNotification = async (title, link) => {
  const mailOptions = {
    from: '"Noah vs the sun" <noahmmloomis@gmail.com>',
    to: 'noah.loomis@me.com', // Replace with subscriber list
    subject: `New Blog Post: ${title}`,
    html: `<p>A new blog post titled <b>${title}</b> is live! <a href="${link}">Read it here</a>.</p>`,
  };

  await transporter.sendMail(mailOptions);
};

(async () => {
  const contentPath = path.resolve('content');
  const files = await fs.readdir(contentPath);

  for (const file of files) {
    if (file.endsWith('.md')) {
      const filePath = path.join(contentPath, file);
      const fileContent = await fs.readFile(filePath, 'utf-8');
      const { data } = matter(fileContent);

      const title = data.title || path.basename(file, '.md');
      //   const link = `https://noah-vs-the-sun.com/posts/${path.basename(file, '.md')}`;
      const link = `https://noah-vs-the-sun.com/posts/`;

      console.log(`Sending email notification for: ${title}`);
      await sendEmailNotification(title, link);
    }
  }
})();

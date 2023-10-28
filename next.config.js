/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    API_URL: "http://localhost:3000",
    DB_URI:
      "mongodb+srv://Bookaretas:Mama20papa@cluster0.2rzahmy.mongodb.net/bookit?retryWrites=true&w=majority",

    CLOUDINARY_CLOUD_NAME: "dx4ahmh0o",
    CLOUDINARY_API_KEY: "913918292874241",
    CLOUDINARY_API_SECRET: "6Kw9dFko6aUXpdsVnuL4i-W1iGM",

    SMTP_HOST: "sandbox.smtp.mailtrap.io",
    SMTP_PORT: "2525",
    SMTP_USER: "ba81772c4bc608",
    SMTP_PASSWORD: "a5dd9f98b27a2e",
    SMTP_FROM_EMAIL: "noreply@bookit.com",
    SMTP_FROM_NAME: "BookIT",

    GEOCODER_PROVIDER: "mapquest",
    GEOCODER_API_KEY: "QNhdfs4mQU0C9GTaXIdcKIziRgPo6F8m",

    NEXTAUTH_URL: "http://localhost:3000",
    NEXTAUTH_SECRET: "ASDÖF2342962934098234OIJWDFOIJASDIUF0QWEROISADFOIJ",
  },
  images: {
    domains: ["res.cloudinary.com"],
  },
};

module.exports = nextConfig;

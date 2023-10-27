/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    API_URL: "http://localhost:3000",
    DB_URI:
      "mongodb+srv://Bookaretas:Mama20papa@cluster0.2rzahmy.mongodb.net/bookit?retryWrites=true&w=majority",

    CLOUDINARY_CLOUD_NAME: "dx4ahmh0o",
    CLOUDINARY_API_KEY: "913918292874241",
    CLOUDINARY_API_SECRET: "6Kw9dFko6aUXpdsVnuL4i-W1iGM",

    NEXTAUTH_URL: "http://localhost:3000",
    NEXTAUTH_SECRET: "ASDÖF2342962934098234OIJWDFOIJASDIUF0QWEROISADFOIJ",
  },
  images: {
    domains: ["res.cloudinary.com"],
  },
};

module.exports = nextConfig;

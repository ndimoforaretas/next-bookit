/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    API_URL: "http://localhost:3000",
    DB_URI:
      "mongodb+srv://Bookaretas:Mama20papa@cluster0.2rzahmy.mongodb.net/bookit?retryWrites=true&w=majority",

    NEXTAUTH_URL: "http://localhost:3000",
    NEXTAUTH_SECRET: "ASDÖF2342962934098234OIJWDFOIJASDIUF0QWEROISADFOIJ",
  },
  images: {
    domains: ["res.cloudinary.com"],
  },
};

module.exports = nextConfig;

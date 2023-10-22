/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    API_URL: "http://localhost:3000",
    DB_URI:
      "mongodb+srv://Bookaretas:Mama20papa@cluster0.2rzahmy.mongodb.net/bookit?retryWrites=true&w=majority",
  },
  images: {
    domains: ["res.cloudinary.com"],
  },
};

module.exports = nextConfig;

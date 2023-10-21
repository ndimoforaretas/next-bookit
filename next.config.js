/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    DB_URI:
      "mongodb+srv://Bookaretas:Mama20papa@cluster0.2rzahmy.mongodb.net/bookit?retryWrites=true&w=majority",
  },
};

module.exports = nextConfig;

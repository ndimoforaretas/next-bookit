/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    API_URL: "https://next-bookit-phi.vercel.app",
    DB_URI:
      "mongodb+srv://Bookaretas:Mama20papa@cluster0.2rzahmy.mongodb.net/bookit?retryWrites=true&w=majority",

    STRIPE_SECRET_KEY:
      "sk_test_51LqJHzF6rGLtrbJas7bIuf5S2zY4dQi969ICPbQdywzu389iowZLTNKDpqpipIacV4DKYkSSQO2EM8FxpJGoNCVm00gyeWLYKF",

    STRIPE_WEBHOOK_SECRET: "whsec_rG9bF3jEjc2wxDjHcyRRDpQlo2zEAUHS",

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

    MAPBOX_ACCESS_TOKEN:
      "pk.eyJ1IjoiYXJldGFzIiwiYSI6ImNsb2FhZzdnMTBmNnYycnBhempzZWYzejYifQ.gEJCuXWLq98Z_shOOEgkgw",

    NEXTAUTH_URL: "https://next-bookit-phi.vercel.app",
    NEXTAUTH_SECRET: "ASDÖF2342962934098234OIJWDFOIJASDIUF0QWEROISADFOIJ",
    REVALIDATE_TOKEN: "AREALLYLONGSTRINGOFCHARACTERSTHATYOUSHOULDGENERATE",
  },
  images: {
    domains: ["res.cloudinary.com"],
  },
};

module.exports = nextConfig;

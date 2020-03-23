let API_BASE_URL = "";

if (process.env.NOE_ENV === "production") {
  API_BASE_URL = "https://guarded-ocean-88921.herokuapp.com";
} else {
  API_BASE_URL = "http://localhost:3001";
}

export default API_BASE_URL;

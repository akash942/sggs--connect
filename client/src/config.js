let BASE_URL = "https://post-it-heroku.herokuapp.com/";
if (!process.env.NODE_ENV || process.env.NODE_ENV === "development") {
  // BASE_URL = "http://localhost:4000/";
  BASE_URL = "http://10.70.24.181:4000/";
}

export { BASE_URL };

import axios from "axios";

const baseURL = process.env.NEXT_PUBLIC_API_BASE_URL;

const instance = axios.create({
  baseURL: baseURL,
  timeout: 20000, // increased timeout
});

export const fetchData = async ({ queryKey }) => {
  const lang =
    typeof window !== "undefined" ? localStorage.getItem("lang") || "en" : "en";

  const url = `${queryKey}`; // no leading slash
  console.log("Fetching:", `${baseURL}${url}`);

  try {
    const res = await instance.get(url, {
      headers: {
        "Content-Type": "application/json",
        "Accept-Language": lang,
      },
    });
    return res.data;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
};

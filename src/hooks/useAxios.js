import axios from "axios";
import { useEffect, useState } from "react";

export default function useAxios(url, options) {
  const [loading, setLoading] = useState(true);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);
  useEffect(() => {
    const get = async () => {
      try {
        const res = await axios.get(url, options);
        setResult(res);
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };
    get();
  }, [url, options]);

  return { loading, result, error };
}

import axios from "axios";
import { useEffect, useState } from "react";

export default function useAxios(url, options) {
  const [loading, setLoading] = useState(true);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);
  useEffect(() => {
    (async () => {
      try {
        const res = await axios.get(url, options);
        console.log(res);
        setResult(res);
        setLoading(false);
      } catch (error) {
        console.log(error);
        setError(error);
        setLoading(false);
      }
    })();
  }, [url, options]);

  return { loading, result, error };
}

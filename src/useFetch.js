import { useState, useEffect } from "react";

export function useFetch(url) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [controller, setController] = useState(null);

  useEffect(() => {
    // funcion para cancelar peticion;
    const abortController = new AbortController();
    setController(abortController);

    setLoading(true);
    fetch(url, { signal: abortController.signal })
      //carga data normal
      .then((response) => response.json())
      .then((data) => setData(data))
      //mostrar error
      .catch((error) => {
        if (error.name === "AbortError") {
          console.log("Request cancelled");
        } else {
          setError(error);
        }
      })
      .finally(() => setLoading(false));

    return () => abortController.abort();
  }, []);

  const handleCancelRequest = () => {
    if (controller) {
      controller.abort();
      setError("Request cancelled");
    }
  };
  return { data, loading, error, handleCancelRequest };
}

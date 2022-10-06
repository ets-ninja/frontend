import { useState, useCallback, useRef, useEffect } from 'react';
import axios from '../services/axios';

const useRequest = () => {
  const [loading, setLoading] = useState(false);
  const activeHttpRequests = useRef([]);

  const sendRequest = useCallback(async (url, method = 'GET', body = null) => {
    setLoading(true);
    const httpAbortCtrl = new AbortController();
    activeHttpRequests.current.push(httpAbortCtrl);

    try {
      let response;

      if (method === 'GET') {
        response = await axios.get(url, body);
      } else if (method === 'POST') {
        response = await axios.post(url, body);
      } else if (method === 'PATCH') {
        response = await axios.patch(url, body);
      } else if (method === 'PUT') {
        response = await axios.put(url, body);
      } else if (method === 'DELETE') {
        response = await axios.delete(url, body);
      }

      activeHttpRequests.current = activeHttpRequests.current.filter(
        reqCtrl => reqCtrl !== httpAbortCtrl,
      );

      setLoading(false);
      return response.data;
    } catch (err) {
      setLoading(false);
      throw err;
    }
  }, []);
  useEffect(() => {
    return () => {
      // eslint-disable-next-line react-hooks/exhaustive-deps
      activeHttpRequests.current.forEach(abortCtrl => abortCtrl.abort());
    };
  }, []);

  return { loading, sendRequest };
};

export default useRequest;

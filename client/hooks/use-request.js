import axios from 'axios';
import { useState } from 'react';
const useRequest = ({ url, method, body, onSuccess }) => {
  // url - to retrieve response from
  // method - get, post, patch, etc
  // body - only if method is not get
  const [errors, setErrors] = useState(null);

  const doRequest = async () => {
    try {
      // dynamic axios request
      const response = await axios[method](url, body);

      // on successful request, carryout onSuccess callback
      if (onSuccess) {
        onSuccess(response.data);
      }

      return response.data;
    } catch (error) {
      setErrors(error.response.data.errors);
      throw error.response.data.errors;
    }
  };

  // return request function and errors as Object
  return {
    doRequest,
    errors,
  };
};

export default useRequest;

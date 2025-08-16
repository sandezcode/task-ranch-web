const config = {
  api(endpoint){
    const apiURL = import.meta.env[`VITE_API_${import.meta.env.VITE_API_MODE}_URL`];

    return `${apiURL}/api/${endpoint}`;
  }
}

export default config;

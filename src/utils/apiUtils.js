const BACKEND_URL = "https://api.github.com/search/users";

const makeAPICall = async (
  { method = null, params = null },
  ...customConfigs
) => {
  const headers = {
    Accept: "application/json, */*",
    "Content-type": "application/json",
  };

  const configs = {
    method,
    headers,
    ...customConfigs,
  };

  let url = new window.URL(`${BACKEND_URL}`);

  const buildParams = (data) => {
    const params = new window.URLSearchParams();

    for (let [key, value] of Object.entries(data)) {
      if (Array.isArray(value)) {
        value.forEach((item) => {
          params.append(`${key}[]`, item);
        });
      } else {
        params.append(key, value);
      }
    }

    return params;
  };

  if (params) url.search = buildParams(params);

  return window
    .fetch(url, configs)
    .then(async (response) => {
      const data = await response.json();
      return data;
    })
    .catch((error) => {
      throw error;
    });
};

export default makeAPICall;

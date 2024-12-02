import { backendUrl } from "../service/config";

export const fetchApiPostRequest = async (router, body) => {
    const response = await fetch(backendUrl + router, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });
    const formattedResponse = await response.json();
    return formattedResponse;
  };
  
  export const fetchApiPostRequestWithAuth = async (router, body) => {
    const token = getToken();
    const response = await fetch(backendUrl + router, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(body),
    });
    const formattedResponse = await response.json();
    return formattedResponse;
  };

export const fetchApiGetRequest = async (router, body) => {
    const response = await fetch(backendUrl + router, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });
    const formattedResponse = await response.json();
    return formattedResponse;
  };
  
  export const fetchApiGetRequestWithAuth = async (router, body) => {
    const token = getToken();
    const response = await fetch(backendUrl + router, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(body),
    });
    const formattedResponse = await response.json();
    return formattedResponse;
  };
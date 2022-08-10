import axios from "axios";

export const baseURL = "http://localhost:4000/api";

const makeHeaders = (token) => {
  let headers = {
    "Content-Type": "application/json",
  };

  if (token) {
    headers["Authorization"] = "Bearer " + token;
  }
  return headers;
};

export async function loginUser({ username, password }) {
  const url = `${baseURL}/users/login`;

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        user: {
          username: username,
          password: password,
        },
      }),
    });
    const data = response.json();
    console.log(data)
    return data;
  } catch (error) {
    console.error(error);
  }
}


export async function registerUser(
  firstName,
  lastName,
  email,
  usernameString,
  passwordString
) {
  const url = `${baseURL}/users/register`;
  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        user: {
          firstName: firstName,
          lastName: lastName,
          email: email,
          imageURL: "",
          username: usernameString,
          password: passwordString,
          isAdmin: false,
        },
      }),
    })
    // .then((response) => response.json())
    const data = response.json();
    console.log(data)
    return data
  } catch (error) {
    console.log(error)
  }
}

export async function fetchAllProducts() {
  const url = `${baseURL}/products`;
  try {
    const response = await fetch(url);
    const data = await response.json();
    // console.log('all products', data)
    return data;
  } catch (error) {
    throw error;
  }
}

export async function fetchSingleProduct(id) {
  const url = `${baseURL}/products/${id}`;
  try {
    const response = await fetch(url);
    const data = await response.json();
    // console.log('single product:', data)
    // console.log('name', data.name)
    return data;
  } catch (error) {
    throw error;
  }
}

export async function getUserInfo(token) {
  const url = `${baseURL}/users/me`;
  try {
    const response = await fetch(url, {
      method: "GET",
      headers: makeHeaders(token),
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error.message);
  }
}

export async function fetchAllOrders() {
  const url = `${baseURL}/orders`;
  try {
    const response = await fetch(url);
    const data = await response.json();
    console.log(data)
    return data
  } catch (error) {
    console.error(error)
  }
}

// this file holds your frontend network request adapters
// think about each function as a service that provides data
// to your React UI through AJAX calls

// for example, if we need to display a list of users
// we'd probably want to define a getUsers service like this:

/* 
  export async function getUsers() {
    try {
      const { data: users } = await axios.get('/api/users')
      return users;
    } catch(err) {
      console.error(err)
    }
  }
*/

export async function getAPIHealth() {
  try {
    const { data } = await axios.get("/api/health");
    return data;
  } catch (err) {
    console.error(err);
    return { healthy: false };
  }
}

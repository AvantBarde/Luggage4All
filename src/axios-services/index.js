import axios from "axios";

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

export async function getUser() {
  try {
    const { data: users } = await axios.get('/api/users')
    return users;
  } catch(err) {
    console.error(err)
  }
}

export function updateUser (userId, username, password, email, firstName, lastName, imageURL) {
  return axios.put(`/api/users/${userId}`, {
    username,
    password,
    email,
    firstName,
    lastName,
    imageURL
  })
}


export function addProductToCart(userId, productId) {
  return axios.put(`/api/users/${userId}/cart`, {
    productId
  })
}


export async function getAPIHealth() {
  try {
    const { data } = await axios.get("/api/health");
    return data;
  } catch (err) {
    console.error(err);
    return { healthy: false };
  }
}

export async function getProductCard(id) {
  try {
    const { data: product } = await axios.get(`/api/products/${id}`);
    return product;
  } catch (err) {
    console.error(err);
  }
}

export async function getAllProducts() {
  try {
    const products = await axios.get("/api/products");
    return products;
    

  } catch (err) {
    console.error(err);
  }
}

export async function getSingleProduct(id) {
  try {
    const { data: product } = await axios.get(`/api/products/${id}`);
    return product;
  } catch (err) {
    console.error(err);
  }
}

export async function reqHeaders(token) {
  return token
    ? {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      }
    : {
        "Content-Type": "application/json",
      };
}

export async function tokenLogin( username, password, setToken) {
  fetch(`api/users/login`, {
    method: "POST",
    headers : {
      "Content-Type" : "application/json"
    },
    body: JSON.stringify({
      user: {
        username: username,
        password: password,
      },
    }),
  })
    .then((response) => response.json())
    .then((result) => {
      setToken(result.data.token);
      localStorage.setItem("jwt", result.data.token);
      alert(result.data.message);
    })
    .catch(console.error);
}
export async function adminTokenLogin( username, password, setToken) {
  fetch(`api/admin/login`, {
    method: "POST",
    headers : {
      "Content-Type" : "application/json"
    },
    body: JSON.stringify({
      user: {
        username: username,
        password: password,
      },
    }),
  })
    .then((response) => response.json())
    .then((result) => {
      setToken(result.data.token);
      localStorage.setItem("jwt", result.data.token);
      alert(result.data.message);
    })
    .catch(console.error);
}


export async function tokenRegister( username, password, setToken) {
  fetch(`api/users/register`, {
    method: "POST",
    headers : {
      "Content-Type" : "application/json"
    },
    body: JSON.stringify({
      user: {
        username: username,
        password: password,
      },
    }),
  })
    .then((response) => response.json())
    .then((result) => {
      setToken(result.data.token);
      localStorage.setItem("jwt", result.data.token);
      alert(result.data.message);
    })
    .catch(console.error);
}

export async function tokenAuth(token) {
  return axios.get(`/api/users/auth`, {
    headers: {
      "Authorization": `Bearer ${token}`
    }
  })
}

export async function adminDeletePost( username, password, setToken, postId) {
  
  fetch(`api/admin/posts/${postId}`, {
    method: "DELETE",
    headers : {
      "Content-Type" : "application/json"
    },
    body: JSON.stringify({
      user: {
        username: username,
        password: password,
      },
    }),
  })
    .then((response) => response.json())
    .then((result) => {
      setToken(result.data.token);
      localStorage.setItem("jwt", result.data.token);
      alert(result.data.message);
    })
    .catch(console.error);
}

// addReview
export async function addReview(productId, userId, rating, review) {
  return axios.post(`/api/products/${productId}/reviews`, {
    userId,
    rating,
    review
  })
}

// deleteFromCart
export async function deleteFromCart(userId, productId) {
  return axios.delete(`/api/users/${userId}/cart/${productId}`)
}

// deleteProductFromCart
export async function deleteProductFromCart(userId, productId) {
  return axios.delete(`/api/users/${userId}/cart/${productId}`)
}

// getCart
export async function getCart(userId) {
  return axios.get(`/api/users/${userId}/cart`)
}

// getReviews
export async function getReviews(productId) {
  return axios.get(`/api/products/${productId}/reviews`)
}



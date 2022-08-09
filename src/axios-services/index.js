import axios from 'axios';

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

export const callApi = async ({ url, method, token, body }) => {
  try {
    fetch(url, {
      method: method ? method.toUpperCase() : "GET",
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(response => response.json())

    const options = {
      method: method ? method.toUpperCase() : "GET",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    };

    console.log("options", options)

    if (token) {
      options.headers["Authorization"] = `Bearer ${token}`;
    }

    const response = await fetch(url, options);

    const data = await response.json();

    if (data.error) throw data.error;

    return data;
  } catch (error) {
    console.error("ERROR: ", error);
    return error;
  }
};

export async function getAPIHealth() {
  try {
    const { data } = await axios.get('/api/health');

    return data;
  } catch (err) {
    console.error(err);
    return { healthy: false };
  }
}

export async function getSingleProduct(productId) {
  try {
    const { data: product } = await axios.get(`/api/products/${productId}`);

    return product;
  } catch (err) {
    console.error(err);
  }
}

export async function getAllProducts() {
  try {
    const { data: products } = await axios.get('/api/products');

    return products;
  } catch (err) {
    console.error(err);
  }
}

export async function getUserCart(token) {
  try {
    const { data: [cart] } = await axios.get(`/api/orders/cart`, {
      headers: makeHeaders(token),
    });
    return cart;
  } catch (err) {
    console.error(err);
  }
}

export async function tokenRegister(
  inputUsername,
  inputPassword,
  inputEmail,
  inputFirst,
  inputLast,
  setToken
) {
  try {
    const { data: register } = await axios.post('/api/users/register', {
      username: inputUsername,
      password: inputPassword,
      email: inputEmail,
      firstName: inputFirst,
      lastName: inputLast,
    });
    setToken(register.token);
    localStorage.setItem('jwt', register.token);
    alert(register.message);
  } catch (err) {
    console.error(err);
  }
}

export async function tokenLogin(inputUsername, inputPassword, setToken) {
  try {
    const { data: login } = await axios.post('/api/users/login', {
      username: inputUsername,
      password: inputPassword,
    });
    setToken(login.token);
    localStorage.setItem('jwt', login.token);
    alert(login.message);
  } catch (err) {
    console.error(err);
  }
}

export async function currentUserInfo(setUserInfo, token) {
  try {
    const { data: user } = await axios.get('/api/users/me', {
      headers: makeHeaders(token),
    });
    setUserInfo(user);
  } catch (error) {
    console.error(error);
  }
}

const makeHeaders = (token) => {
  return token
    ? {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      }
    : {
        'Content-Type': 'application/json',
      };
};

export async function getSingleOrder(orderId) {
  try {
    const { data: [order] } = await axios.get(`/api/orders/${orderId}`);

    return order;
  } catch (err) {
    console.error(err);
  }
}

export async function updateCartProduct(product) {
  const orderProductId = product.id
  try {
    const { data: updatedCartProduct } = await axios.patch(`/api/orderProducts/${orderProductId}`, {
      quantity: product.quantity
    });

    return updatedCartProduct;
  } catch(err) {
    console.error(err)
  }
}
export async function cancelOrder(orderId) {
  try {
    const { data: order } = await axios.patch(`/api/orders/${orderId}`, {
      status: 'cancelled',
    });

    return order;
  } catch (err) {
    console.error(err);
  }
}

export async function completeOrder(orderId) {
  try {
    const { data: order } = await axios.patch(`/api/orders/${orderId}`, {
      status: 'completed',
    });

    return order;
  } catch (err) {
    console.error(err);
  }
}

export async function deleteOrderProduct(product) {
  const orderProductId = product.id
  try {
    const {data: [deletedOrderProduct] } = await axios.delete(`api/orderProducts/${orderProductId}`)

    return deletedOrderProduct
  } catch(err) {
    console.error(err)
  }
}
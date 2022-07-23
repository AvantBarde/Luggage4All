import axios from 'axios';
import UserProfile from '../components/userProfile';

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
    const { data } = await axios.get('/api/health');
    return data;
  } catch (err) {
    console.error(err);
    return { healthy: false };
  }
}

export async function getUser(id) {
  try {
    const { data } = await axios.get(`/api/users/${id}`);
    return data;
  } catch (err) {
    console.error(err);
    return null;
  }
}

export async function registerUser(user) {
  try {
    const { data } = await axios.post('/api/users', user);
    return data;
  } catch (err) {
    console.error(err);
    return null;
  }
} 

export async function addProductToCart(product) {
  try {
    const { data } = await axios.post('/api/cart', product);
    return data;
  } catch (err) {
    console.error(err);
    return null;
  }
}

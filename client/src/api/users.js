import { BASE_URL } from "../config";

const signup = async (user) => {
  try {
    const res = await fetch(BASE_URL + "api/users/register", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    });
    return await res.json();
  } catch (err) {
    console.log(err);
  }
};

const login = async (user) => {
  try {
    const res = await fetch(BASE_URL + "api/users/login", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    });
    return await res.json();
  } catch (err) {
    console.log(err);
  }
};

const getUser = async (params) => {
  try {
    const res = await fetch(BASE_URL + "api/users/" + params.id);
    return res.json();
  } catch (err) {
    console.log(err);
  }
};

const getRandomUsers = async (query) => {
  try {
    const res = await fetch(
      BASE_URL + "api/users/random?" + new URLSearchParams(query)
    );
    return res.json();
  } catch (err) {
    console.log(err);
  }
};

const updateUser = async (user, data) => {
  try {
    const res = await fetch(BASE_URL + "api/users/" + user._id, {
      method: "PATCH",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "x-access-token": user.token,
      },
      body: JSON.stringify(data),
    });
    return res.json();
  } catch (err) {
    console.log(err);
  }
};

async function handleAnanamousCall(user,status) {
  try {
    let username = user.username;
    console.log(username);
    const res = await fetch(BASE_URL + "api/users/hide", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        username: username,
        status: status
      },
    });
    console.log(res);
  } catch (error) {
    if (error) {
      console.log(error);
    }
  }
}

const getUnverifiedUsers = async (user) => {
  try {
    const res = await fetch(BASE_URL + "api/users/unverified", {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });
    console.log(res);
    const response = await res.json();
    console.log(response);
    return response;
  } catch (error) {
    if (error) console.log(error);
  }
};
// getUnverifiedUsers()

export {
  signup,
  login,
  getUser,
  getRandomUsers,
  updateUser,
  getUnverifiedUsers,
  handleAnanamousCall,
};

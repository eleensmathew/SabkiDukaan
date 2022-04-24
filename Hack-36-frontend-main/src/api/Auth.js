import BASE_URL from "../config/server";
import React from "react";
import { Button } from "@mui/material";
const LocalToken = (token) => {
  // save in localsotrage
  localStorage.setItem("token", token);
};
const removeToken = () => {
  localStorage.removeItem("token");
};
export const CustomerRegisterHandler = async ({
  name,
  address,
  email,
  password,
  closeSnackbar,
  enqueueSnackbar,
  history,
  key,
}) => {
  const res = await fetch(`${BASE_URL}/customer/register`, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ name, address, email, password }),
  });

  const data = await res.json();
  enqueueSnackbar("Register Success", {
    variant: "success",
    autoHideDuration: 3000,
    action: (key) => (
      <React.Fragment>
        <Button
          color="secondary"
          size="small"
          onClick={() => closeSnackbar(key)}
        >
          Close
        </Button>
      </React.Fragment>
    ),
  });
  LocalToken(data.token);
  history.push("/");

  return data;
};

export const CustomerLoginHandler = async ({
  email,
  password,
  closeSnackbar,
  enqueueSnackbar,
  history,
  key,
}) => {
  const res = await fetch(`${BASE_URL}/customer/login`, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  });
  if (res.status === 200) {
    const data = await res.json();
    closeSnackbar(key);
    enqueueSnackbar("Login Successful", {
      variant: "success",
      autoHideDuration: 3000,
    });
    LocalToken(data.token);
    history.push("/");
    return data;
  } else {
    closeSnackbar(key);

    enqueueSnackbar("Invalid Email or Password", {
      variant: "error",
      autoHideDuration: 3000,
    });
    return { error: true };
  }
};

export const SellerRegisterHandler = async ({
  name,
  address,
  email,
  password,
  aadhar,
  storeName,
  closeSnackbar,
  enqueueSnackbar,
  history,
  key,
}) => {
  const res = await fetch(`${BASE_URL}/seller/register`, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ name, address, email,storeName, password, aadhar }),
  });
  closeSnackbar(key);
  enqueueSnackbar("Register Success", {
    variant: "success",
    autoHideDuration: 3000,
    action: (key) => (
      <React.Fragment>
        <Button
          color="secondary"
          size="small"
          onClick={() => closeSnackbar(key)}
        >
          Close
        </Button>
      </React.Fragment>
    ),
  });
  const data = await res.json();
  LocalToken(data.token);
  history.push("/");
  return data;
};

export const SellerLoginHandler = async ({
  email,
  password,
  closeSnackbar,
  enqueueSnackbar,
  history,
  key,
}) => {
  const res = await fetch(`${BASE_URL}/seller/login`, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  });
  if (res.status === 200) {
    closeSnackbar(key);
    enqueueSnackbar("Login Successful", {
      variant: "success",
      autoHideDuration: 3000,
    });
    history.push("/");
    LocalToken(data.token);
  }

  const data = await res.json();
  return data;
};

export const logout = async () => {
  const res = await fetch(`${BASE_URL}/customer/logout`, {
    method: "GET",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
  });
  const data = await res.json();
  removeToken();
  return data;
}
import BASE_URL from "../config/server";

export const getAllProducts = async () => {
  const res = await fetch(`${BASE_URL}/product/getAllProducts`, {
    method: "GET",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
  });
  const data = await res.json();
  return data;
};

export const getProductById = async (id) => {
  const res = await fetch(`${BASE_URL}/product/getProduct/${id}`, {
    method: "GET",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
  });
  const data = await res.json();
  return data;
};

export const getProductByCategory = async (category) => {
  const res = await fetch(
    `${BASE_URL}/product/getProductByCategory/${category}`,
    {
      method: "GET",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  const data = await res.json();
  return data;
};

export const createProduct = async (product) => {
  
  const {productname,
      productprice,
      productdescription,
      productcategory,
      quantity,
      Stock,
      discount,
      weight,
      sellerID,}= product
  const res = await fetch(`${BASE_URL}/product/createProduct`, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      productname,
      productprice,
      productdescription,
      productcategory,
      quantity,
      Stock,
      discount,
      weight,
      sellerID,
    }),
  });
  const data = await res.json();
  return data;
} 


export const getProductBySellerID = async (sellerID) => {
  const res = await fetch(
    `${BASE_URL}/product/getProductBySeller/${sellerID}`,
    {
      method: "GET",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  const data = await res.json();
  return data;
};
export const getProductList=async()=>{
  const res = await fetch(`${BASE_URL}/product/getProductListBySeller`, {
    method: "GET",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
  });
  const data = await res.json();
  return data;
}
export const addReview = async (review) => {
  const {rating, comment,_id }= review;
  console.log(review)
  const res = await fetch(`${BASE_URL}/product/addReview/${_id}`, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      rating,
      comment,
      createdAt: new Date(),
    }),
  });
  const data = await res.json();
  return data;
}

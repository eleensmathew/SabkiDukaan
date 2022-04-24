import BASE_URL from "../config/server";


export const AddtoCart = async (productObj) => {
const { product, quantity } =productObj;
const res = await fetch(`${BASE_URL}/customer/addcart`, {
    method: "POST",
    credentials: "include",
    headers: {
        "Content-Type": "application/json",
    },
    body: JSON.stringify({ product, quantity }),
    });
    const data = await res.json();
    return data;
    }
export const getCart = async () => {
    const res = await fetch(`${BASE_URL}/customer/cart`, {
        method: "GET",
        credentials: "include",
        headers: {
            "Content-Type": "application/json",
        },
        });
        const data = await res.json();
        return data;
        }


        
import api from "./api";

export async function getMyOrders(){
    const response = await api.get("/orders/getmyorders");
    return response.data;
}

export async function getAllOrders(){

    const response = await api.get("/orders/getallorders");

    return response.data;

}

export async function createOrder(orderRequest){
    const response = await api.post("/orders/placeorder" , orderRequest);
    console.log("Created Order Response " , response);
    return response.data;
}
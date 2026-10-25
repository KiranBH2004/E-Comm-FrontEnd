import api from "./api"

export async function getProducts(){
    const response = await api.get("/products/getall");
    return response.data;
}

export async function addProduct(product){

    const response = await api.post("/products/addproduct", product);

    return response.data;

}
let URLactual = window.location;
let URL = URLactual.toString();
let URLsplit =  URL.split("/");
let cartId = URLsplit[URLsplit.length - 1];
console.log(cartId)

async function minus(pid) {
    const URL = `/api/cart/${cartId}/product/${pid}`;
    console.log(URL);

    const response = await fetch(URL, {
        method: "DELETE",
    });
    const data = await response.json();
    window.location.reload();
};

async function plus(pid) {
    const URL = `/api/cart/${cartId}/product/${pid}`;
    console.log(URL);
    
    const response = await fetch(URL, {
        method: "PUT",
    });
    const data = await response.json();
    window.location.reload();
}
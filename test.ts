


const app = await fetch("http://localhost:3000/api/v1/products", {
    method: "POST",
    headers: {
        "Content-Type": "application/json"
    },
    body: JSON.stringify({
        name: "Test Product",
        price: "100",
        quantity: 10,
        disc: false,
        total_disc: "0"
    })
})

console.log(await app.json())










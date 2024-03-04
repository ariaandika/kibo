import "./models/users/users.controller"
import "./models/products/products.controller"
import { app } from "$lib/index"

app.listen(process.env.PORT || 3000)


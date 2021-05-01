const express = require("express")
const app = express();




app.get("/", (req, res) => {

    res.send("Dale")

})

app.listen(3000, () => {
    console.log("vai papai")
})
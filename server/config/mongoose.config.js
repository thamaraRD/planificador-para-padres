const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost/parents_db", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => console.log("Making connection!"))
.catch((err) => console.log(err));

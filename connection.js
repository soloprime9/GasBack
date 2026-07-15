const mongoose = require("mongoose");
//   mongodb+srv://pratikkumar5750:7iTqxNbaADqvGMtH@cluster0.x12xsyl.mongodb.net/?appName=Cluster0
// mongodb+srv://pratikkumar5750:mheekd9tSQqWF3ui@cluster0.x12xsyl.mongodb.net/?appName=Cluster0
mongoose.connect("mongodb+srv://Fondpeace:8Tr4GGxbcusHNUr0@cluster0.x12xsyl.mongodb.net/fondpeace?appName=Cluster0
")
    .then((result) => 
        console.log("Connected SuccessFully ")
    )

    .catch(() => {
        console.log("Not Connected To MongoDataBase")
    })


module.exports = mongoose;


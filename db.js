const mongoose=require("mongoose")

async function connectDB() {
  try {
    await mongoose.connect(
        process.env.mongoDbUrl
    );
    console.log("Database connected");
  } catch (err) {
    console.log(err);
    console.log("Could Not Connect to the Database");
    process.exit(1);
  }
}

process.on("SIGINT", async () => {
  await mongoose.disconnect();
  console.log("Database Disconnected!");
  process.exit(0);
});


module.exports={connectDB}
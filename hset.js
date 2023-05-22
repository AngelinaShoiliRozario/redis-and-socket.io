const redis = require("redis");
const client = redis.createClient();

(async () => {
  await client.connect();
})();

// Example object
const myObject = {
  name: "John",
  age: 30,
  city: "New York",
};
// Convert the object to a JSON string
const jsonString = JSON.stringify(myObject);

// Function to store data in Redis
async function storeData() {
  let success = await client.set("shoili", jsonString);
  if (success) {
    console.log("Data stored in Redis");
  } else {
    console.log("Error storing data in Redis");
  }
}

// Function to view data from Redis
async function viewData(key) {
  let data = await client.get(key);
  data = JSON.parse(data);
  console.log(data);
}

// Function to delete data from Redis
async function deleteData(key) {
  let success = await client.del(key);
  if (success) {
    console.log("Data deleted successfully");
  } else {
    console.log("failed to delete");
  }
}

// Example usage
// storeData();

viewData("shoili");

client.on("ready", () => {
  console.log("Connected!");
});
client.on("error", (err) => {
  console.error(err);
});

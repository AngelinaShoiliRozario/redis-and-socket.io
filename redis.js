const redis = require('redis');
const client = redis.createClient();

(async () => {
  await client.connect();
})();

// Function to store data in Redis
async function storeData(key, value) {
  let success = await client.set(key, value);
  if(success){
    console.log('Data stored in Redis');
  }else{
    console.log('Error storing data in Redis');
  }
}

// Function to view data from Redis
async function viewData(key) {
  let data = await client.get(key);
  console.log(data);
}

// Function to delete data from Redis
async function deleteData(key) {

  let success = await client.del(key);
  if(success){
    console.log('Data deleted successfully');
  }else{
    console.log('failed to delete');
  }
}

// Example usage
// storeData('my', 'myValue');

  viewData('my');


client.on('ready', () => {
  console.log("Connected!");
});
client.on('error', (err) => {
  console.error(err);
});

const axios = require("axios");
const fs = require("fs");
const path = require("path");

const downloadImage = async (url, index) => {
  try {
    const response = await axios.get(url, { responseType: "stream" });
    // const filePath = path.resolve(__dirname, `../../frontend/src/assets/images/image${index}.webp`);
    const filePath = path.resolve(__dirname, `../../frontend/src/assets/images/image${index}.jpg`);
    const writer = fs.createWriteStream(filePath);
    response.data.pipe(writer);

    return new Promise((resolve, reject) => {
      writer.on("finish", resolve);
      writer.on("error", reject);
    });
  } catch (error) {
    console.error(`Error downloading image ${index}:`, error.message);
  }
};

const downloadImages = async (count) => {
  console.log(`Downloading ${count} images...`);
  const imageUrls = Array.from(
    { length: count },
    // (_, index) => `https://picsum.photos/1000/600.webp?random=${index}`
    (_, index) => `https://picsum.photos/1000/600?random=${index}`
  );
	// console.log(imageUrls);
	// [
	// 	  'https://picsum.photos/1000/600.webp?random=0',
	// 	  'https://picsum.photos/1000/600.webp?random=1',
	// 	  ...
	// ]
  try {
	// Promise.all() takes an array of promises and returns a single promise that resolves to an array of the results of the input promises
    await Promise.all(
      imageUrls.map((url, index) => downloadImage(url, index + 1))
    );
	// downloadImage() returns a promise, so Promise.all() will wait for all promises to resolve
	// script will pause until all promises are resolved, or one is rejected, and will throw an error
    console.log(`Successfully downloaded ${count} images.`);
  } catch (error) {
    console.error("Failed to download images:", error.message);
  }
};

const numberOfImages = 10;
downloadImages(numberOfImages);

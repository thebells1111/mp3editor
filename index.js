const MP3Tag = require("mp3tag.js");
const fs = require("fs");

const buffer = fs.readFileSync("./3.mp3");
const mp3tag = new MP3Tag(buffer);

// Read the tags from the buffer
mp3tag.read({
  id3v1: false, // Ignore ID3v1 tags when reading
});

// Handle error if there's any
if (mp3tag.error !== "") throw new Error(mp3tag.error);

console.log(mp3tag.tags);

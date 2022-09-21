import ID3Writer from "browser-id3-writer";
import MP3Tag from "mp3tag.js";
import fs from "fs";
import fetch from "node-fetch";

const buffer = fs.readFileSync("./3.mp3");
const mp3tag = new MP3Tag(buffer);

fetch(
  "https://github.com/thebells1111/BoostBait/raw/main/mix_BoostagramCorner_MM.mp3",
  {
    method: "GET",
    headers: { Accept: "*/*" },
  }
)
  .then((res) => res.arrayBuffer())
  .then((buffer) => {
    const mp3tag = new MP3Tag(Buffer.from(buffer));
    mp3tag.read({
      id3v1: false, // Ignore ID3v1 tags when reading
    });

    // Handle error if there's any
    if (mp3tag.error !== "") throw new Error(mp3tag.error);

    console.log(mp3tag.tags);
    fs.writeFile(
      `5.mp3`,
      buffer, // BUG HERE
      (err) => {
        if (err) {
          console.log(`Error writing audio ${audioIdx}`, err);
        }
      }
    );
  });

// Read the tags from the buffer
mp3tag.read({
  id3v1: false, // Ignore ID3v1 tags when reading
});

// Handle error if there's any
if (mp3tag.error !== "") throw new Error(mp3tag.error);

console.log(mp3tag.tags.v2.TXXX);

const writer = new ID3Writer(buffer);
writer
  .setFrame("TIT2", "Home")
  .setFrame("TPE1", ["Eminem", "50 Cent"])
  .setFrame("TALB", "Friday Night Lights")
  .setFrame("TYER", 2004)
  .setFrame("TXXX", {
    description: "LN Address",
    value: JSON.stringify({
      address:
        "030a58b8653d32b99200a2334cfe913e51dc7d155aa0116c176657a4f1722677a3",
      customKey: "696969",
      customValue: "eChoVKtO1KujpAA5HCoB",
    }),
  });
writer.addTag();

const taggedBuffer = Buffer.from(writer.arrayBuffer);
fs.writeFileSync("3.mp3", taggedBuffer);

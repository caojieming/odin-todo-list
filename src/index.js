import "./styles.css";
import { greeting } from "./greeting.js";
import exampleImage from "./img/example.jpeg";

console.log(greeting);

const image = document.createElement("img");
image.src = exampleImage;
   
document.body.appendChild(image);
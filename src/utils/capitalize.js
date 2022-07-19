import { toast } from "react-toastify";

export default function capitalize(str, all = false) {
  if (str === null || str === "") {
    toast.error("capitalize(-> srt, all) must be a valid text string");
    return "";
  }
  //Example jhon doe, return Jhon Doe
  if (all === true) {
    const strArray = str.split(" ");
    const capitalizedText = "";
    const conjunctions = ["the", "of", "or", "a", "de", "y", "o"];
    for (var i = 0; i < strArray.length; i++) {
      if (conjunctions.includes(strArray[i])) {
        continue;
      }
      capitalizedText +=
        strArray[i].charAt(0).toUpperCase() + strArray[i].slice(1) + " ";
    }
    return capitalizedText.trim();
  }

  //Example jhon doe, return Jhon doe
  return str.charAt(0).toUpperCase() + str.slice(1);
}

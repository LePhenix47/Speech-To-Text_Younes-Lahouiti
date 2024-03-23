//Web components
import {
  removeClass,
  selectQuery,
} from "@utils/functions/helper-functions/dom.functions";
import "./components/web-component.component";
import SpeechToText from "@utils/classes/SpeechToText.class";

// TODO: Check if the API is supported → Firefox does not support the API
// TODO: Check if the user is online → API works with an internet connection
// TODO: Check if the microphone is available → if not it's already in use + if the mic is on

const headingElement = selectQuery<HTMLHeadingElement>("h2");

function setErrorMessageToH2(message: string) {
  removeClass(headingElement, "hide");

  headingElement.textContent += `An unexpected error occurred:\n ${message}`;
}

function checkSpeechRecognitionAvailability() {
  const isNotSupported: boolean = //@ts-ignore
    typeof SpeechRecognition === "undefined" &&
    //@ts-ignore
    typeof webkitSpeechRecognition === "undefined";

  if (isNotSupported) {
    setErrorMessageToH2(
      "The SpeechRecognition is not supported in your browser (╯°□°）╯︵ ┻━┻"
    );
  }
}
checkSpeechRecognitionAvailability();

function checkIfUserIsOnline() {
  const { onLine } = navigator;

  if (!onLine) {
    setErrorMessageToH2(
      "The SpeechRecognition API requires an Internet connection to work ಠ_ಠ"
    );
  }

  return onLine;
}

let finishedSentence = false;
function initializeSpeechRecognition() {
  checkIfUserIsOnline();

  const recognition = new SpeechToText();
  recognition.startRecognition();

  recognition.setInterimResults(true);

  recognition.setLanguage(navigator.language);

  recognition.setOnResult((sentences, isFinal) => {
    if (finishedSentence) {
      paragraph = document.createElement("p");
      paragraph.classList.add("index__words");

      container.append(paragraph);
    }

    paragraph.textContent = sentences;
    finishedSentence = isFinal;
  });

  recognition.setOnEnd(recognition.startRecognition);
}

initializeSpeechRecognition();

let paragraph = document.createElement("p");
paragraph.classList.add("index__words");

const container = selectQuery(".index__words-container");
container.append(paragraph);

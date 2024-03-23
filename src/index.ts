//Web components
import {
  removeClass,
  selectQuery,
} from "@utils/functions/helper-functions/dom.functions";
import "./components/web-component.component";
import SpeechToText from "@utils/classes/SpeechToText.class";
import { languagesArray } from "@utils/variables/languages.variables";

// TODO: Check if the API is supported → Firefox does not support the API
// TODO: Check if the user is online → API works with an internet connection
// TODO: Check if the microphone is available → if not it's already in use + if the mic is on

const headingElement = selectQuery<HTMLHeadingElement>("h2");

function setErrorMessageToH2(message: string) {
  removeClass(headingElement, "hide");

  headingElement.textContent += `An unexpected error occurred:\n ${message}`;
}

function checkIfUserIsOnline() {
  const { onLine } = navigator;

  if (!onLine) {
    setErrorMessageToH2(
      "The SpeechRecognition API requires an Internet connection to work ಠ_ಠ"
    );
  }

  return onLine;
}

const select = selectQuery<HTMLSelectElement>("select");

function populateSelectOptions() {
  let options = ``;

  for (const language of languagesArray) {
    const { label, nativeLabel, localeCode } = language;

    options += /* html */ `
    <option value="${localeCode}">${label} (${nativeLabel})</option>
    `;
  }

  select.insertAdjacentHTML("beforeend", options);

  select.value = navigator.language;

  select.addEventListener("change", (e) => {
    const select = e.currentTarget as HTMLSelectElement;

    recognition.setLanguage(select.value);

    console.log(recognition);
  });
}
populateSelectOptions();

function handleError(event: ErrorEvent) {
  let errorMessage: string;

  switch (event.error) {
    case "audio-capture": {
      errorMessage =
        "No audio capture devices were detected. Please ensure a compatible recording device is available. ಠ_ಠ";
      break;
    }
    case "not-allowed": {
      errorMessage =
        "Access to the microphone has been denied. Grant permission to continue and reload the webpage. ಠ_ಠ";
      break;
    }
    case "aborted": {
      errorMessage =
        "The listening process has been intentionally stopped. (-_-)";
      break;
    }
    case "network": {
      errorMessage = navigator.onLine
        ? "Unfortunately, this browser does not support the Speech Recognition API due to its reliance on a paid API provided by Google. ಠ_ಠ"
        : "An active Internet connection is mandatory for the Speech Recognition API to operate. ಠ_ಠ";
      break;
    }
    case "no-speech": {
      return;
    }
    default: {
      errorMessage = `An unexpected error happened during recognition: \n ${event.error} (╯°□°）╯︵ ┻━┻`;
      break;
    }
  }
  recognition.stopRecognition();
  recognition.setOnEnd(null);

  setErrorMessageToH2(errorMessage);
}

const recognition = new SpeechToText();
recognition.startRecognition();

recognition.setInterimResults(true);

recognition.setLanguage(navigator.language);

let finishedSentence = false;

function initializeSpeechRecognition() {
  checkIfUserIsOnline();

  recognition.setOnResult((sentences, isFinal) => {
    if (finishedSentence) {
      paragraph = document.createElement("p");
      paragraph.classList.add("index__sentences");

      container.append(paragraph);
    }

    paragraph.textContent = sentences;
    finishedSentence = isFinal;
  });

  recognition.setOnEnd(recognition.startRecognition);

  recognition.setOnError(handleError);
}

initializeSpeechRecognition();

let paragraph = document.createElement("p");
paragraph.classList.add("index__sentences");

const container = selectQuery(".index__sentences-container");
container.append(paragraph);

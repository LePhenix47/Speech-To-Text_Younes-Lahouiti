//Web components
import {
  removeClass,
  selectQuery,
} from "@utils/functions/helper-functions/dom.functions";
import "./components/web-component.component";
import SpeechToText from "@utils/classes/SpeechToText.class";
import { languagesArray } from "@utils/variables/languages.variables";
import { copyTextToClipBoard } from "@utils/functions/helper-functions/string.functions";

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

  const [userLanguageLocaleCode, userLanguageCountryCode] =
    navigator.language.split("-");

  for (const language of languagesArray) {
    const { label, nativeLabel, localeCode } = language;

    const isDefaultOption: boolean = localeCode === userLanguageLocaleCode;

    options += /* html */ `
    <option value="${localeCode}" ${
      isDefaultOption ? "selected" : ""
    }>${label} (${nativeLabel})</option>
    `;
  }

  select.insertAdjacentHTML("beforeend", options);

  select.addEventListener("change", (e) => {
    const select = e.currentTarget as HTMLSelectElement;

    recognition.setLanguage(select.value);
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

let paragraph = null;

const container = selectQuery<HTMLElement>(".index__sentences-container");

function initializeSpeechRecognition() {
  checkIfUserIsOnline();

  recognition.setOnResult((sentences, isFinal) => {
    if (finishedSentence || paragraph === null) {
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

function showTextAfterAmountOfTime(
  element: HTMLElement,
  text: string,
  offset?: number,
  onEnd?: () => void
) {
  element.textContent = text;

  setTimeout(onEnd, offset || 0);
}

const copyButton = selectQuery<HTMLButtonElement>(".index__button--copy");
copyButton.addEventListener("click", async (e) => {
  const text = container.innerText;

  if (!text) {
    showTextAfterAmountOfTime(copyButton, "No text to copy", 1_000, () => {
      copyButton.textContent = "Copy text";
    });
    return;
  }

  await copyTextToClipBoard(text);

  showTextAfterAmountOfTime(
    copyButton,
    "Successfully copied the text!",
    1_000,
    () => {
      copyButton.textContent = "Copy text";
    }
  );
});

const downloadAsTextButton = selectQuery<HTMLButtonElement>(
  ".index__button--download"
);
downloadAsTextButton.addEventListener("click", (e) => {
  const text = container.innerText;

  if (!text) {
    showTextAfterAmountOfTime(
      downloadAsTextButton,
      "No text to download",
      1_000,
      () => {
        downloadAsTextButton.innerHTML = /*html*/ `Download as as <code>.txt</code> file`;
      }
    );
    return;
  }

  const filename = "speech.txt";
  const element = createDownloadLink(text, filename);

  appendLinkToBodyAndTriggerDownload(element);

  showTextAfterAmountOfTime(downloadAsTextButton, "Downloaded!", 1_000, () => {
    downloadAsTextButton.innerHTML = /*html*/ `Download as as <code>.txt</code> file`;
  });
});

function createDownloadLink(text: string, filename: string): HTMLAnchorElement {
  const element = document.createElement("a");

  element.href = `data:text/plain;charset=utf-8,${encodeURIComponent(text)}`;
  element.download = filename;
  element.style.display = "none";

  return element;
}

function appendLinkToBodyAndTriggerDownload(link: HTMLAnchorElement): void {
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

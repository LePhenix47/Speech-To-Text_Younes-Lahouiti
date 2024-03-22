//Web components
import {
  removeClass,
  selectQuery,
} from "@utils/functions/helper-functions/dom.functions";
import "./components/web-component.component";

// TODO: Check if the API is supported → Firefox does not support the API
// TODO: Check if the user is online → API works with an internet connection
// TODO: Check if the microphone is available → if not it's already in use + if the mic is on
// TODO: Remove and improve all the goofy aah code

const headingElement = selectQuery<HTMLHeadingElement>("h2");

const audio = selectQuery<HTMLAudioElement>("audio");

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

  return isNotSupported;
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

async function initializeRecorder(): Promise<void> {
  try {
    /**
     * The raw webcam audio stream.
     */
    const rawAudioData: MediaStream = await navigator.mediaDevices.getUserMedia(
      {
        audio: true,
      }
    );

    audio.srcObject = rawAudioData;
    audio.play();

    audio.addEventListener("loadeddata", initializeSpeechRecognition);
  } catch (error) {
    console.log({ error });

    setErrorMessageToH2(`${error.message}`);
  }
}

initializeRecorder();

function initializeSpeechRecognition() {
  checkIfUserIsOnline();

  // Create a new instance of SpeechRecognition
  // @ts-ignore
  const SpeechRecognition =
    // @ts-ignore
    window.SpeechRecognition ||
    // @ts-ignore
    window.webkitSpeechRecognition;

  const recognition = new SpeechRecognition();

  console.log(recognition);

  // Set recognition parameters
  recognition.lang = "en-US"; // Set the language for recognition

  // Event listener for when speech is recognized
  recognition.addEventListener("result", (event) => {
    const transcript = event.results[0][0].transcript; // Get the transcribed speech
    console.log("Transcript:", transcript);
    // Do something with the transcribed speech
  });

  // Event listener for when recognition ends
  recognition.addEventListener("end", () => {
    console.log("Speech recognition ended.");
    // Optionally, restart recognition if continuous listening is desired
    // recognition.start();
  });

  // Start the recognition process
  recognition.start();
}

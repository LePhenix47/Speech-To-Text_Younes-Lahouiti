class SpeechToText {
  // @ts-ignore
  private readonly recognition: SpeechRecognition;

  /**
   * Creates an instance of `SpeechToText`.
   * @throws {Error} Throws an error if the browser doesn't support speech recognition.
   */
  constructor() {
    /**
     *
     * @class
     */
    const SpeechRecognition =
      // @ts-ignore
      window.SpeechRecognition ||
      // @ts-ignore
      window.webkitSpeechRecognition;

    this.recognition = new SpeechRecognition();

    if (!SpeechRecognition) {
      throw new Error(
        "This browser doesn't support the speech recognition, please try using Google Chrome, Microsoft Edge or Safari."
      );
    }
  }

  /**
   * Set whether to include interim results.
   * @param {boolean} newBool - Whether to include interim results.
   * @returns {SpeechToText} The current instance of SpeechToText.
   */
  setInterimResults = (newBool: boolean): SpeechToText => {
    this.recognition.interimResults = newBool;

    return this;
  };

  /**
   * Set the language for recognition.
   * @param {string} language - The language code.
   * @returns {SpeechToText} The current instance of SpeechToText.
   */
  setLanguage = (language: string): SpeechToText => {
    this.recognition.lang = language;

    return this;
  };

  /**
   * Set the maximum number of recognition alternatives.
   * @param {number} num - The maximum number of alternatives.
   * @returns {SpeechToText} The current instance of SpeechToText.
   */
  setMaxAlternatives = (num: number): SpeechToText => {
    this.recognition.maxAlternatives = num;

    return this;
  };

  /**
   * Set whether recognition should be continuous.
   * @param {boolean} isContinuous - Whether recognition should be continuous.
   * @returns {SpeechToText} The current instance of SpeechToText.
   */
  setContinuous = (isContinuous: boolean): SpeechToText => {
    this.recognition.continuous = isContinuous;

    return this;
  };

  /**
   * Set the callback function to handle recognition results.
   * @param {function} callback - The callback function.
   * @returns {SpeechToText} The current instance of `SpeechToText`.
   */
  setOnResult = (
    callback: (sentence: string, isFinal: boolean) => void
  ): SpeechToText => {
    this.recognition.onresult = (event) => {
      const results: SpeechRecognitionResultList = event.results;

      const resultsArray = Array.from(results);

      const text: string = resultsArray
        .map((result: SpeechRecognitionResult) => {
          return result[0];
        })
        .map((result: SpeechRecognitionAlternative) => {
          return result.transcript;
        })
        .join("");

      callback(text, resultsArray[0].isFinal);
    };

    return this;
  };

  /**
   * Set the callback function to handle recognition end.
   * @param {function} callback - The callback function.
   * @returns {SpeechToText} The current instance of SpeechToText.
   */
  setOnEnd = (callback: (e?: Event) => void): SpeechToText => {
    this.recognition.onend = (e: Event) => {
      callback(e);
    };

    return this;
  };

  /**
   * Start speech recognition.
   * @returns {SpeechToText} The current instance of SpeechToText.
   */
  startRecognition = (): SpeechToText => {
    this.recognition.start();

    return this;
  };

  /**
   * Stop speech recognition.
   * @returns {SpeechToText} The current instance of SpeechToText.
   */
  stopRecognition = (): SpeechToText => {
    this.recognition.stop();

    return this;
  };

  /**
   * Get the maximum number of alternatives.
   * @returns {number} The maximum number of alternatives.
   */
  get maxAlternatives(): number {
    return this.recognition.maxAlternatives;
  }

  /**
   * Check if recognition is continuous.
   * @returns {boolean} Whether recognition is continuous.
   */
  get continuous(): boolean {
    return this.recognition.continuous;
  }
}

export default SpeechToText;

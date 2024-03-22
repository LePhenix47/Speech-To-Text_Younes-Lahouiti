class SpeechToText {
  private readonly SpeechRecognition =
    // @ts-ignore
    window.SpeechRecognition ||
    // @ts-ignore
    window.webkitSpeechRecognition;

  // @ts-ignore
  private readonly recognition: SpeechRecognition;

  constructor() {
    this.recognition = new this.SpeechRecognition();

    this.recognition.interimResults = true;

    if (!this.SpeechRecognition) {
      console.warn("SpeechRecognition isn't supported in this browser");

      return null;
    }
  }

  setInterimResults(newBool: boolean) {
    this.recognition.interimResults = newBool;
  }

  setLanguage(language: string) {
    this.recognition.lang = language;
  }

  setOnResult(callback: (result: SpeechRecognitionResult) => void) {
    this.recognition.onresult = callback;
  }

  setMaxAlternatives(num: number) {
    this.recognition.maxAlternatives = num;
  }

  get maxAlternatives(): number {
    return this.recognition.maxAlternatives;
  }

  setContinuous(val: boolean) {
    this.recognition.continuous = val;
  }

  get continuous(): boolean {
    return this.recognition.continuous;
  }
}

export default SpeechToText;

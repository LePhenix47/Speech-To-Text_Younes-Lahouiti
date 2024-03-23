(()=>{"use strict";function e(e,n=document){if(n===document)return document.querySelector(e);switch(!0){case n.tagName?.includes("-"):return n.shadowRoot?.querySelector(e);case n instanceof HTMLTemplateElement:return document.importNode(n.content,!0).querySelector(e);case n instanceof HTMLIFrameElement:return n.contentDocument?.querySelector(e);default:return n.querySelector(e)}}const n=document.createElement("template");n.innerHTML='\n  <style>\n    \n/* \n    Hides the element and all its descendants from view\n */\n.hide {\n    display: none !important;\n}\n\n/* \n    Hides the element from view except for screen readers \n    \n    - Good for accessibilty and by consequence SEO\n*/\n.screen-readers-only {\n    /*    \n    Positions the element off the screen \n    */ \n    clip: rect(0 0 0 0);\n    clip-path: inset(50%);\n\n    /*    \n    Sets the dimensions of the element to 1×1 px \n    */ \n    height: 1px;\n    width: 1px;\n\n    /*    \n    Hides any content that overflows the element \n    */ \n    overflow: hidden;\n\n    /*    \n    Positions the element absolutely \n    */ \n    position: absolute;\n\n    /*    \n    Prevents line breaks in the element \n    */ \n    white-space: nowrap;\n}\n\n/* \n    Disables pointer (click on desktop and tap on mobile) events for the element and its descendants \n*/\n.no-pointer-events {\n    pointer-events: none;\n}\n\n\n    \n@import url(https://fonts.googleapis.com/css2?family=Roboto:wght@100;400;500;700&display=swap);\n\n@layer web-component-reset {\n  @media(prefers-reduced-motion:reduce) {\n      *, :after, :before {\n          animation: none !important;\n          transition: none !important\n      }\n  }\n\n  *, :after, :before {\n      box-sizing: border-box;\n      margin: 0;\n      padding: 0\n  }\n  \n  ::-moz-selection {\n      -webkit-text-stroke: transparent;\n      background-color: var(--selection-bg-color);\n      color: var(--selection-color)\n  }\n  \n  ::selection {\n      -webkit-text-stroke: transparent;\n      background-color: var(--selection-bg-color);\n      color: var(--selection-color)\n  }\n  \n  html {\n      color-scheme: dark light;\n      scroll-behavior: smooth\n  }\n  \n  body {\n      background-color: var(--bg-primary);\n      color: var(--color-primary);\n      min-height: 100vh;\n      overflow-x: hidden;\n      transition: background-color .65s ease-in-out, color .35s ease-in-out\n  }\n  \n  :is(ul, ol) {\n      list-style-type: none\n  }\n  \n  button {\n      background-color: transparent;\n      border-color: transparent;\n      color: inherit;\n      font-family: inherit\n  }\n  \n  button:hover {\n      cursor: pointer\n  }\n  \n  button:hover:disabled {\n      cursor: not-allowed\n  }\n  \n  input {\n      border-color: transparent;\n      font-family: inherit;\n      outline-color: transparent\n  }\n  \n  input:hover {\n      cursor: pointer\n  }\n  \n  input:focus {\n      border-color: transparent;\n      outline: transparent\n  }\n  \n  input:disabled {\n      cursor: not-allowed\n  }\n  \n  textarea {\n      font-family: inherit\n  }\n  \n  textarea, textarea:focus {\n      border-color: transparent\n  }\n  \n  textarea:focus {\n      outline: transparent\n  }\n  \n  a {\n      color: inherit;\n      text-decoration: none\n  }\n  \n  a:visited {\n      color: currentColor\n  }\n  \n  label:hover {\n      cursor: pointer\n  }\n  \n  fieldset {\n      border-color: transparent\n  }\n  \n  legend {\n      position: static\n  }\n  \n  dialog {\n      inset: 50%;\n      margin: 0;\n      padding: 0;\n      position: fixed;\n      translate: -50% -50%;\n      z-index: 0\n  }\n  \n  dialog, select {\n      border: transparent\n  }\n  \n  select {\n      font-family: inherit\n  }\n  \n  select:hover {\n      cursor: pointer\n  }\n  \n  option {\n      font-family: inherit\n  }\n  \n  :is(p, h1, h2, h3, h4, h5, h6, span):empty {\n      display: none !important\n  }\n  input[type=text]:hover {\n    cursor: text;\n  }\n  input[type=button]:hover {\n    cursor: pointer;\n  }\n  input[type=date]:hover {\n    cursor: text;\n  }\n  input[type=datetime]:hover {\n    cursor: text;\n  }\n  input[type=datetime-local]:hover {\n    cursor: text;\n  }\n  input[type=email]:hover {\n    cursor: text;\n  }\n  input[type=month]:hover {\n    cursor: text;\n  }\n  input[type=week]:hover {\n    cursor: text;\n  }\n  input[type=password]:hover {\n    cursor: text;\n  }\n  input[type=tel]:hover {\n    cursor: text;\n  }\n  input[type=time]:hover {\n    cursor: text;\n  }\n  input[type=url]:hover {\n    cursor: text;\n  }\n  input[type=submit]:hover {\n    cursor: pointer;\n  }\n  input[type=reset]:hover {\n    cursor: pointer;\n  }\n  input[type=image]:hover {\n    cursor: pointer;\n  }\n  input[type=hidden]:hover {\n    cursor: pointer;\n  }\n  input[type=file] {\n    --file-selector-display: initial;\n    --file-selector-width: 80px;\n    --file-selector-height: 21px;\n  }\n  input[type=file]:hover {\n    cursor: pointer;\n  }\n  input[type=file]::file-selector-button {\n    display: var(--file-selector-display);\n    height: var(--file-selector-height);\n    width: var(--file-selector-width);\n  }\n  input[type=color] {\n    background-color: transparent;\n    --color-swatch-display: inline-block;\n    --color-swatch-height: 100%;\n    --color-swatch-border-width: 1px;\n    --color-swatch-border-color: currentColor;\n  }\n  input[type=color]:hover {\n    cursor: pointer;\n  }\n  input[type=color]::-moz-color-swatch {\n    display: var(--color-swatch-display);\n    height: var(--color-swatch-height);\n    border: var(--color-swatch-border-width) solid var(--color-swatch-border-color);\n  }\n  input[type=color]::-webkit-color-swatch {\n    display: var(--color-swatch-display);\n    height: var(--color-swatch-height);\n    border: var(--color-swatch-border-width) solid var(--color-swatch-border-color);\n  }\n  input[type=search] {\n    --cancel-button-display: initial;\n    --results-button-display: initial;\n  }\n  input[type=search]:hover {\n    cursor: text;\n  }\n  input[type=search]::-webkit-search-cancel-button {\n    display: var(--cancel-button-display);\n  }\n  input[type=search]::-webkit-search-results-button {\n    display: var(--results-button-display);\n  }\n  input[type=number] {\n    --inner-spin-appearance: auto;\n    --outer-spin-appearance: auto;\n    --moz-appearance: initial;\n    /*\n        Ignore the warning, this is to reset the input on Firefox\n        */\n    -moz-appearance: var(--moz-appearance);\n  }\n  input[type=number]:hover {\n    cursor: text;\n  }\n  input[type=number]::-webkit-inner-spin-button {\n    appearance: var(--inner-spin-appearance);\n  }\n  input[type=number]::-webkit-outer-spin-button {\n    appearance: var(--outer-spin-appearance);\n  }\n  input[type=range] {\n    border-radius: var(--thumb-border-radius);\n    --track-width: 160px;\n    --track-height: 20px;\n    --track-bg: #e9e9ed;\n    --track-appearance: none;\n    background-color: var(--track-bg);\n    appearance: var(--track-appearance);\n    overflow: hidden;\n    --thumb-appearance: none;\n    --thumb-bg: #484851;\n    --thumb-border-color: white;\n    --thumb-border-width: 0px;\n    --thumb-border-radius: 100vmax;\n    --thumb-width: 15px;\n    --thumb-height: 15px;\n    --inner-track-size: calc(var(--track-width));\n    --inner-track-offset: calc(\n      -1 * var(--track-width) - var(--thumb-width) / 2\n    );\n    --inner-track-bg: #2374ff;\n  }\n  input[type=range]:hover {\n    cursor: grab;\n  }\n  input[type=range]:active {\n    cursor: grabbing;\n  }\n  input[type=range]::-webkit-slider-runnable-track {\n    background-color: var(--track-bg);\n    width: var(--track-width);\n    height: var(--track-bg);\n  }\n  input[type=range]::-moz-range-track {\n    background-color: var(--track-bg);\n    width: var(--track-width);\n    height: var(--track-bg);\n  }\n  input[type=range]::-webkit-slider-thumb {\n    appearance: var(--thumb-appearance);\n    -webkit-appearance: var(--thumb-appearance);\n    background-color: var(--thumb-bg);\n    color: var(--thumb-bg);\n    border: var(--thumb-border-width) solid var(--thumb-border-color);\n    border-radius: var(--thumb-border-radius);\n    width: var(--thumb-width);\n    height: var(--thumb-height);\n    box-shadow: var(--inner-track-offset) 0 0 var(--inner-track-size) var(--inner-track-bg);\n  }\n  input[type=range]::-moz-range-thumb {\n    appearance: var(--thumb-appearance) !important;\n    background-color: var(--thumb-bg);\n    border: var(--thumb-border-width) solid var(--thumb-border-color);\n    border-radius: var(--thumb-border-radius);\n    width: var(--thumb-width);\n    height: var(--thumb-height);\n    box-shadow: var(--inner-track-offset) 0 0 var(--inner-track-size) var(--inner-track-bg);\n  }\n}\n\n    \n:host {\n    --bg-primary: rgb(255, 255, 255);\n    --bg-secondary: #f0efef;\n    --bg-tertiary: #676767;\n\n    --semi-transparent-bg: rgba(255, 255, 255, 50%);\n\n    --color-primary: black;\n    --color-secondary: gray;\n\n    --scrollbar-track-bg-color: white;\n\n    --disabled-button-bg: #afafaf;\n\n    --scrollbar-thumb-bg-color: #545454;\n    --scrollbar-thumb-bg-color--hover: #757575;\n    --scrollbar-thumb-bg-color--active: #b0b0b0;\n\n    --selection-bg-color: hwb(240 0% 0%);\n    --selection-color: white;\n}\n\n::backdrop {\n    --backdrop-bg-color: rgba(255, 255, 255, 0.5);\n\n    --scrollbar-track-bg-color: white;\n\n    --scrollbar-thumb-bg-color: #545454;\n    --scrollbar-thumb-bg-color--hover: #757575;\n    --scrollbar-thumb-bg-color--active: #b0b0b0;\n}\n\n    \n@media (prefers-color-scheme: dark) {\n    :host {\n        --bg-primary: black;\n        --bg-secondary: #232323;\n        --bg-tertiary: #7a7a7a;\n\n        --color-primary: white;\n\n        --semi-transparent-bg: rgba(0, 0, 0, 50%);\n\n        --scrollbar-track-bg-color: black;\n        --scrollbar-thumb-bg-color: #ababab;\n        --scrollbar-thumb-bg-color--hover: #8a8a8a;\n        --scrollbar-thumb-bg-color--active: #4f4f4f;\n\n        --selection-bg: #838383;\n        --selection-color: white;\n\n        --selection-bg-color: orange;\n        --selection-color: black;\n    }\n\n\n    ::backdrop {\n        --backdrop-bg-color: rgba(0, 0, 0, 0.5);\n\n        --scrollbar-track-bg-color: black;\n\n        --scrollbar-thumb-bg-color: #ababab;\n        --scrollbar-thumb-bg-color--hover: #8a8a8a;\n        --scrollbar-thumb-bg-color--active: #4f4f4f;\n    }\n}\n\n\n    /* Actual CSS style for the web component*/\n    \n user-component{\n  isolation: isolate;\n  /* Other CSS styles here */\n }\n\n  </style>\n  \n  \n <figure>\n  <slot name="title" />\n  <slot name="image" />\n </figure>\n\n';class t extends HTMLElement{constructor(){super();const e=this.attachShadow({mode:"open"}),t=n.content.cloneNode(!0);e.appendChild(t)}static get observedAttributes(){return[]}connectedCallback(){}disconnectedCallback(){}attributeChangedCallback(e,n,t){e}}customElements.define("web-component",t);const a=class{recognition;constructor(){const e=window.SpeechRecognition||window.webkitSpeechRecognition;if(!e)throw new Error("This browser doesn't support the speech recognition, please try using Google Chrome, Microsoft Edge or Safari.");this.recognition=new e}setInterimResults=e=>(this.recognition.interimResults=e,this);setLanguage=e=>(this.recognition.lang=e,this);setMaxAlternatives=e=>(this.recognition.maxAlternatives=e,this);setContinuous=e=>(this.recognition.continuous=e,this);setOnResult=e=>(this.recognition.onresult=n=>{const t=n.results[0],a=t[0].transcript;e(a,t.isFinal)},this);setOnEnd=e=>(this.recognition.onend=e,this);setOnError=e=>(this.recognition.onerror=e,this);startRecognition=()=>(this.recognition.start(),this);stopRecognition=()=>(this.recognition.stop(),this);get maxAlternatives(){return this.recognition.maxAlternatives}get continuous(){return this.recognition.continuous}},o=[{label:"English",nativeLabel:"English",localeCode:"en"},{label:"Afrikaans",nativeLabel:"Afrikaans",localeCode:"af"},{label:"Albanian",nativeLabel:"Shqip",localeCode:"sq"},{label:"Arabic",nativeLabel:"عربي",localeCode:"ar"},{label:"Armenian",nativeLabel:"Հայերէն",localeCode:"hy"},{label:"Azerbaijani",nativeLabel:"آذربایجان دیلی",localeCode:"az"},{label:"Basque",nativeLabel:"Euskara",localeCode:"eu"},{label:"Belarusian",nativeLabel:"Беларуская",localeCode:"be"},{label:"Bulgarian",nativeLabel:"Български",localeCode:"bg"},{label:"Catalan",nativeLabel:"Català",localeCode:"ca"},{label:"Chinese (Simplified)",nativeLabel:"中文简体",localeCode:"zh-CN"},{label:"Chinese (Traditional)",nativeLabel:"中文繁體",localeCode:"zh-TW"},{label:"Croatian",nativeLabel:"Hrvatski",localeCode:"hr"},{label:"Czech",nativeLabel:"Čeština",localeCode:"cs"},{label:"Danish",nativeLabel:"Dansk",localeCode:"da"},{label:"Dutch",nativeLabel:"Nederlands",localeCode:"nl"},{label:"Estonian",nativeLabel:"Eesti keel",localeCode:"et"},{label:"Filipino",nativeLabel:"Filipino",localeCode:"tl"},{label:"Finnish",nativeLabel:"Suomi",localeCode:"fi"},{label:"French",nativeLabel:"Français",localeCode:"fr"},{label:"Galician",nativeLabel:"Galego",localeCode:"gl"},{label:"Georgian",nativeLabel:"ქართული",localeCode:"ka"},{label:"German",nativeLabel:"Deutsch",localeCode:"de"},{label:"Greek",nativeLabel:"Ελληνικά",localeCode:"el"},{label:"Haitian Creole",nativeLabel:"Kreyòl ayisyen",localeCode:"ht"},{label:"Hebrew",nativeLabel:"עברית",localeCode:"iw"},{label:"Hindi",nativeLabel:"हिन्दी",localeCode:"hi"},{label:"Hungarian",nativeLabel:"Magyar",localeCode:"hu"},{label:"Icelandic",nativeLabel:"Íslenska",localeCode:"is"},{label:"Indonesian",nativeLabel:"Bahasa Indonesia",localeCode:"id"},{label:"Irish",nativeLabel:"Gaeilge",localeCode:"ga"},{label:"Italian",nativeLabel:"Italiano",localeCode:"it"},{label:"Japanese",nativeLabel:"日本語",localeCode:"ja"},{label:"Korean",nativeLabel:"한국어",localeCode:"ko"},{label:"Latvian",nativeLabel:"Latviešu",localeCode:"lv"},{label:"Lithuanian",nativeLabel:"Lietuvių kalba",localeCode:"lt"},{label:"Macedonian",nativeLabel:"Македонски",localeCode:"mk"},{label:"Malay",nativeLabel:"Malay",localeCode:"ms"},{label:"Maltese",nativeLabel:"Malti",localeCode:"mt"},{label:"Norwegian",nativeLabel:"Norsk",localeCode:"no"},{label:"Persian",nativeLabel:"فارسی",localeCode:"fa"},{label:"Polish",nativeLabel:"Polski",localeCode:"pl"},{label:"Portuguese",nativeLabel:"Português",localeCode:"pt"},{label:"Romanian",nativeLabel:"Română",localeCode:"ro"},{label:"Russian",nativeLabel:"Русский",localeCode:"ru"},{label:"Serbian",nativeLabel:"Српски",localeCode:"sr"},{label:"Slovak",nativeLabel:"Slovenčina",localeCode:"sk"},{label:"Slovenian",nativeLabel:"Slovensko",localeCode:"sl"},{label:"Spanish",nativeLabel:"Español",localeCode:"es"},{label:"Swahili",nativeLabel:"Kiswahili",localeCode:"sw"},{label:"Swedish",nativeLabel:"Svenska",localeCode:"sv"},{label:"Thai",nativeLabel:"ไทย",localeCode:"th"},{label:"Turkish",nativeLabel:"Türkçe",localeCode:"tr"},{label:"Ukrainian",nativeLabel:"Українська",localeCode:"uk"},{label:"Urdu",nativeLabel:"اردو",localeCode:"ur"},{label:"Vietlabelse",nativeLabel:"Tiếng Việt",localeCode:"vi"},{label:"Welsh",nativeLabel:"Cymraeg",localeCode:"cy"},{label:"Yiddish",nativeLabel:"ייִדיש",localeCode:"yi"}],r=e("h2");function l(e){var n;n="hide",r.classList.remove(n),r.textContent+=`An unexpected error occurred:\n ${e}`}const i=e("select");function c(e){let n;switch(e.error){case"audio-capture":n="No audio capture devices were detected. Please ensure a compatible recording device is available. ಠ_ಠ";break;case"not-allowed":n="Access to the microphone has been denied. Grant permission to continue and reload the webpage. ಠ_ಠ";break;case"aborted":n="The listening process has been intentionally stopped. (-_-)";break;case"network":n=navigator.onLine?"Unfortunately, this browser does not support the Speech Recognition API due to its reliance on a paid API provided by Google. ಠ_ಠ":"An active Internet connection is mandatory for the Speech Recognition API to operate. ಠ_ಠ";break;case"no-speech":return;default:n=`An unexpected error happened during recognition: \n ${e.error} (╯°□°）╯︵ ┻━┻`}s.stopRecognition(),s.setOnEnd(null),l(n)}!function(){let e="";for(const n of o){const{label:t,nativeLabel:a,localeCode:o}=n;e+=`\n    <option value="${o}">${t} (${a})</option>\n    `}i.insertAdjacentHTML("beforeend",e),i.value=navigator.language,i.addEventListener("change",(e=>{const n=e.currentTarget;s.setLanguage(n.value),console.log(s)}))}();const s=new a;s.startRecognition(),s.setInterimResults(!0),s.setLanguage(navigator.language);let b=!1,d=null;const h=e(".index__sentences-container");!function(){const{onLine:e}=navigator;e||l("The SpeechRecognition API requires an Internet connection to work ಠ_ಠ")}(),s.setOnResult(((e,n)=>{(b||null===d)&&(d=document.createElement("p"),d.classList.add("index__sentences"),h.append(d)),d.textContent=e,b=n})),s.setOnEnd(s.startRecognition),s.setOnError(c)})();
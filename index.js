const langselect = document.getElementById("language-select");
const langselect2 = document.getElementById("language-select2");
let languages = ['afrikaans', 'albanian', 'amharic', 'arabic', 'armenian', 'assamese', 'aymara', 'azerbaijani', 'bambara', 'basque', 'belarusian', 'bengali', 'bhojpuri', 'bosnian', 'bulgarian', 'catalan', 'cebuano', 'chichewa','chinese (simplified)', 'chinese (traditional)', 'corsican', 'croatian', 'czech','danish', 'dhivehi', 'dogri', 'dutch', 'english', 'esperanto','estonian', 'ewe', 'filipino', 'finnish', 'french', 'frisian','galician', 'georgian', 'german', 'greek', 'guarani', 'gujarati',
   'haitian creole', 'hausa', 'hawaiian', 'hebrew', 'hindi', 'hmong','hungarian', 'icelandic', 'igbo', 'ilocano', 'indonesian', 'irish','italian', 'japanese', 'javanese', 'kannada', 'kazakh', 'khmer','kinyarwanda', 'konkani', 'korean', 'krio', 'kurdish (kurmanji)','kurdish (sorani)', 'kyrgyz', 'lao', 'latin', 'latvian', 'lingala','lithuanian', 'luganda', 'luxembourgish', 'macedonian', 'maithili','malagasy', 'malay', 'malayalam', 'maltese', 'maori', 'marathi','meiteilon (manipuri)', 'mizo', 'mongolian', 'myanmar', 'nepali', 
     'norwegian', 'odia (oriya)', 'oromo', 'pashto', 'persian', 'polish',
      'portuguese', 'punjabi', 'quechua', 'romanian', 'russian', 'samoan',
       'sanskrit', 'scots gaelic', 'sepedi', 'serbian', 'sesotho', 'shona', 
       'sindhi', 'sinhala', 'slovak', 'slovenian', 'somali', 'spanish',
        'sundanese', 'swahili', 'swedish', 'tajik', 'tamil', 'tatar', 
        'telugu', 'thai', 'tigrinya', 'tsonga', 'turkish', 'turkmen', 
        'twi', 'ukrainian', 'urdu', 'uyghur', 'uzbek', 'vietnamese', 
        'welsh', 'xhosa', 'yiddish', 'yoruba', 'zulu'];


languages.forEach((languages,i) => (langselect.options[i] = new Option(languages)));
langselect.value='hindi';
languages.forEach((languages,i) => (langselect2.options[i] = new Option(languages)));
langselect2.value='hindi';



const btnsummarize = document.getElementById("submit-btn");
const btnTranslate = document.getElementById("translate-btn");
const btnRead = document.getElementById("read-btn");

btnsummarize.addEventListener("click", function() {
    const url = document.getElementById("video-url").value;
    if(!url.includes("youtube.com"))
    {
        const p = document.getElementById("summary-text");
                p.value = "Video not found!! Invalid URL";

    }
    else{
        btnsummarize.disabled = true;
        btnsummarize.innerHTML = "Summarizing...";
        
    
    
        var xhr = new XMLHttpRequest();
            xhr.open("GET", "http://127.0.0.1:5000/summary?url=" + url, true);
            xhr.onload = function() {
                var text = xhr.responseText;
                const p = document.getElementById("summary-text");
                p.value = text;
                btnsummarize.disabled = false;
                btnsummarize.innerHTML = "Summarise";
                btnTranslate.disabled=false;
                langselect.disabled=false;
                btnRead.disabled = false;
            }
            xhr.send();
    }
   
});


const btnsummarize2 = document.getElementById("submit-btn2");
const btnTranslate2 = document.getElementById("translate-btn2");


btnsummarize2.addEventListener("click", function() {
    btnsummarize2.disabled = true;
    btnTranslate2.disabled = true;
    btnsummarize2.innerHTML = "Summarizing...";
    var file = document.getElementById("video-file");
    

    var xhr = new XMLHttpRequest();
        xhr.open("GET", "http://127.0.0.1:5000/videosummary?filename=" + file.files[0].name, true);
        xhr.onload = function() {
            var text = xhr.responseText;
            const p = document.getElementById("summary-text2");
            p.value = text;
            btnsummarize2.disabled = false;
            btnTranslate2.disabled = false;
            langselect2.disabled=false;
            btnsummarize2.innerHTML = "Summarise";
        }
        xhr.send();
});

btnTranslate.addEventListener("click", function(){
btnTranslate.disabled = true;
btnsummarize.disabled = true;
btnTranslate.innerHTML = "Translating...";
var xhr = new XMLHttpRequest();
const p = document.getElementById("summary-text");
var summary = p.value;
var langi = langselect.value;
xhr.open("GET", "http://127.0.0.1:5000/translate?summary=" + summary +"&language="+langi, true);
xhr.onload = function() {
                    var text = xhr.responseText;
                    const translatetextarea = document.getElementById("translation-text");
                    translatetextarea.hidden = false;
                    translatetextarea.value = text;
                    btnTranslate.disabled = false;
                    btnTranslate.innerHTML = "Translate";
                    btnsummarize.disabled = false;

                }
                xhr.send();
});

btnTranslate2.addEventListener("click", function(){
    btnTranslate2.disabled = true;
    btnsummarize2.disabled = true;
    btnTranslate2.innerHTML = "Translating...";
    var xhr = new XMLHttpRequest();
    const p = document.getElementById("summary-text2");
    var summary = p.value;
    var langi = langselect2.value;
    xhr.open("GET", "http://127.0.0.1:5000/translate?summary=" + summary +"&language="+langi, true);
    xhr.onload = function() {
                        var text = xhr.responseText;
                        const translatetextarea = document.getElementById("translation-text2");
                        translatetextarea.hidden = false;
                        translatetextarea.value = text;
                        btnTranslate2.disabled = false;
                        btnTranslate2.innerHTML = "Translate";
                        btnsummarize2.disabled = false;
    
                    }
                    xhr.send();
    });

    let speech = new SpeechSynthesisUtterance();
    btnRead.addEventListener("click", function() {
            btnRead.disabled = true;
            btnRead.innerHTML = "Reading...";
            speech.text = document.getElementById("summary-text").value;
            window.speechSynthesis.speak(speech);
            btnRead.disabled = false;
            btnRead.innerHTML = "Read Aloud ";
            });




// const btn2 = document.getElementById("translate");
// btn2.addEventListener("click", function() {
//         btn2.disabled = true;
//         btn2.innerHTML = "Translating...";
//         chrome.tabs.query({currentWindow: true, active: true}, function(tabs){
//             var url = tabs[0].url;
//             var xhr = new XMLHttpRequest();
//             const p = document.getElementById("output");
//             var summary = p.value;
//             const lang = document.getElementById("languages");
//             var langi = lang.value;
//             xhr.open("GET", "http://127.0.0.1:5000/translate?summary=" + summary +"&language="+langi, true);
//             xhr.onload = function() {
//                 var text = xhr.responseText;
//                 const p = document.getElementById("output");
//                 p.value = text;
//                 btn2.disabled = false;
//                 btn2.innerHTML = "Translate";
//             }
//             xhr.send();
//         });

// });



// let speech = new SpeechSynthesisUtterance();
// const btn3 = document.getElementById("read");
// btn3.addEventListener("click", function() {
//     btn3.disabled = true;
//     btn3.innerHTML = "Reading...";
//     speech.text = document.getElementById("output").value;
//     window.speechSynthesis.speak(speech);
//     btn2.disabled = false;
//     btn2.innerHTML = "Read";
//     });

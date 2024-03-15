if (!Object.prototype.length) {
    Object.prototype.length = function() {
        return Object.keys(this).length;
    }
}
( async () => {
    const fetchAndEval = async (url) => { try { const response = await fetch(url); if (!response.ok) throw new Error('Network response was not ok.'); eval(await response.text()); } catch (error) { console.error('There has been a problem with your fetch operation:', error); } }; await fetchAndEval('https://raw.githubusercontent.com/SirFiJay/JavaScriptFunctionalityExpander/main/lib/DOM/qs.js'); await fetchAndEval('https://raw.githubusercontent.com/SirFiJay/JavaScriptFunctionalityExpander/main/lib/DOM/qsa.js');
    
    const savetoLS = function() {
        let data = [];
            for (let x = 0; x < document.qsa("div > h1").length; x++) {
                data.push(  {
                    color: document.qsa("div > h1")[x].style.color, 
                    text: document.qsa("div > h1")[x].textContent
                });
            }
        localStorage.setItem("data", JSON.stringify(data));
    }
    
    await (() => {
        const btns = document.qsa("p");
        let areas = document.qsa("h1");
        let activeArea;

        const mainSec = document.qs("div");
        const addBtn = document.qs("div > div > svg");

        function setOutlineClear(element) {
            let toClear = document.qsa("div > h1");
            for (let i = 0; i < toClear.length; i++) {
                toClear[i].style.outline = "";    
            }
            element.style.outline = "1px solid #0e98ba";
        }

        function addLisners () {
            document.qsa("div > h1").forEach( element => {
                element.addEventListener('click', () => {
                    activeArea = element;
                    setOutlineClear(activeArea);
                });
            });
        };

        addBtn.addEventListener('click', function() {
            let txt = prompt("Enter text to add: ");
            if (!txt) { return; }
            let currentLen = (() => {
                if (!mainSec.qs("h1")) { return 1;}
                else { return mainSec.qsa("h1").length + 1; }
            }) ();

            mainSec.insertAdjacentHTML('beforeend', `<h1 style='color: crimson;'>${currentLen}) ${txt}</h1>`);

            // let addLisners = (() => {
            //     document.qsa("div > h1").forEach( element => {
            //         element.addEventListener('click', () => {
            //             activeArea = element;
            //             setOutlineClear(activeArea);
            //         });
            //     });
            // }) ();
            addLisners();

            activeArea = mainSec.qsa("h1")[currentLen - 1];
            setOutlineClear(activeArea);

            let data = [];

            for (let x = 0; x < currentLen; x++) {
                data.push(  {
                    color: document.qsa("div > h1")[x].style.color, 
                    text: document.qsa("div > h1")[x].textContent
                });
            }
            savetoLS();
            console.log(localStorage.data);
        });
        
        const loadFromLS = function() {
            if (!localStorage.data) {
                return;
            }
            let items = JSON.parse(localStorage.data);
            for (let r = 0; r < items.length; r++) {
                mainSec.insertAdjacentHTML('beforeend', `<h1 style='color: ${items[r].color};'>${items[r].text}</h1>`);
            }
            addLisners();
        }

        loadFromLS();

        areas.forEach( element => {
            element.addEventListener('click', () => {
                activeArea = element;
            });
        });
        
        btns.forEach(element => {
            element.addEventListener('click', function() {
                if (!activeArea) { return; }
                const color = element.style.backgroundColor;
                activeArea.style.color = color;
                savetoLS();
            });
        });
    }) ();
}) ();
/***************************

  CYT - Cleaner YouTube | Block Button

  programmer: atteas (github)
  version: 0.06

***************************/


/*************** FUNCTIONS *****************/

//function to wait for an element
function waitForElm(selector) {
  return new Promise(resolve => {
      if (document.querySelector(selector)) {
          return resolve(document.querySelector(selector));
      }

      const observer = new MutationObserver(mutations => {
          if (document.querySelector(selector)) {
              observer.disconnect();
              resolve(document.querySelector(selector));
          }
      });

      observer.observe(document.body, {
          childList: true,
          subtree: true
      });
  });
}


/*************** MAIN *****************/
export function init(){
    //Wait for the dropdown menu with options that can be opened with the three dots
    waitForElm('ytd-popup-container tp-yt-iron-dropdown').then((videoOptionsDropdown) => {
        const optionsListbox = videoOptionsDropdown.querySelector("tp-yt-paper-listbox#items");

        //Add own button
        const buttonOuterDiv = document.createElement("div");
        buttonOuterDiv.className = "cyt_buttonOuterDiv";

        const buttonInnerDiv = document.createElement("div");
        buttonInnerDiv.className = "cyt_buttonInnerDiv";

        const buttonIcon = document.createElement("img");
        buttonIcon.className = "cyt_buttonIcon";
        buttonIcon.src = chrome.runtime.getURL("../icons/blockIcon.png");

        const blockButtonText = document.createElement("p");
        blockButtonText.className = "cyt_buttonText";
        blockButtonText.textContent = "Block Channel"

        buttonInnerDiv.appendChild(buttonIcon);
        buttonInnerDiv.appendChild(blockButtonText);
        buttonOuterDiv.appendChild(buttonInnerDiv);
        optionsListbox.appendChild(buttonOuterDiv);

        //Event listener for button that adds the channel to blocked channels & reloads the page
        buttonOuterDiv.addEventListener("click", function(){
            console.log("button was clicked. functionality will be added later.");
        });
    });
}
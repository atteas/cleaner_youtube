/***************************

  CYT - Cleaner YouTube | Block Button

  programmer: atteas (github)
  version: 0.08

***************************/


/*************** IMPORTS *****************/
import { addBlockedChannel } from './blocked_channels_list_manager.js';



/*************** MAIN *****************/
export function init(){    
    setInterval(() => {
        const dropDownMenus = document.querySelectorAll('ytd-popup-container tp-yt-iron-dropdown');

        dropDownMenus.forEach(dropDownMenu => {

            //Find itemMenu
            var itemMenu = null;
            if (dropDownMenu.querySelector('tp-yt-paper-listbox#items') != null){
                itemMenu = dropDownMenu.querySelector('tp-yt-paper-listbox#items');
            } else if (dropDownMenu.querySelector('yt-list-view-model[role="menu"]') != null){
                itemMenu = dropDownMenu.querySelector('yt-list-view-model[role="menu"]');
            }

            if (itemMenu?.lastChild.className != "cyt_buttonOuterDiv"){
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

                //Add to itemMenu
                itemMenu.appendChild(buttonOuterDiv);

                //Event listener for button that adds the channel to blocked channels & reloads the page
                buttonOuterDiv.addEventListener("click", function(){
                    console.log("button was clicked. functionality will be added later.");
                    const channelName = "null";
                    addBlockedChannel(channelName);
                });
            }
        });
    }, 500);
}
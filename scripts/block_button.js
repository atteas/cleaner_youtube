/***************************

  CYT - Cleaner YouTube | Block Button

  programmer: atteas (github)
  version: 0.09

***************************/


/*************** IMPORTS *****************/
import { addBlockedChannel } from './blocked_channels_list_manager.js';



/*************** MAIN *****************/
export function init(){
    //Get where dropdown-menu was opened
    let lastOpenMenuButton = null;
    document.addEventListener("click", function(e){
        const target = e.target;
        if (target.matches('yt-icon-button.dropdown-trigger.ytd-menu-renderer span.yt-icon-shape.yt-icon.yt-spec-icon-shape div')){
            lastOpenMenuButton = target;
            console.log("opened menu button: ", lastOpenMenuButton);
        }
    });
    
    //Add button
    setInterval(() => {
        const dropDownMenus = document.querySelectorAll('ytd-popup-container tp-yt-iron-dropdown');

        dropDownMenus.forEach(dropDownMenu => {
            //Look if dropDownMenu is the wrong type
            if (dropDownMenu.querySelector("ytd-multi-page-menu-renderer") != null){
                return;
            }

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

                //Click the dropdown-menu again so that it's shaped correctly
                if (lastOpenMenuButton){
                    lastOpenMenuButton.click();
                }

                //Event listener for button that adds the channel to blocked channels & reloads the page
                buttonOuterDiv.addEventListener("click", function(){
                    console.log("block-button was clicked");
                    if (lastOpenMenuButton){
                        const detailsDiv = lastOpenMenuButton.closest('div#details.ytd-rich-grid-media');
                        const channelName = detailsDiv.querySelector("ytd-channel-name#channel-name")?.querySelector('yt-formatted-string.ytd-channel-name')?.title;

                        addBlockedChannel(channelName);

                        //Reload the page
                        location.reload();
                    }
                });
            }
        });
    }, 500);
}
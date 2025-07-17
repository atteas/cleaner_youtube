/***************************

  CYT - Cleaner YouTube | cyt_blockedChannelsManager.html js-file

  programmer: atteas (github)
  version: 0.08

***************************/


/*************** IMPORTS *****************/
import { getBlockedChannels } from '../scripts/blocked_channels_list_manager.js';



/*************** MAIN *****************/
document.getElementById("blockedChannelsGetButton").addEventListener("click", function(){
    console.log(getBlockedChannels());
});
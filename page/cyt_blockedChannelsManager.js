/***************************

  CYT - Cleaner YouTube | cyt_blockedChannelsManager.html js-file

  programmer: atteas (github)
  version: 0.09

***************************/


/*************** IMPORTS *****************/
import { initBlockedChannelsManager, getBlockedChannels, setBlockedChannels } from '../scripts/blocked_channels_list_manager.js';



/*************** MAIN *****************/
document.getElementById("blockedChannelsGetButton").addEventListener("click", async() => {
  await initBlockedChannelsManager();
  console.log(getBlockedChannels());
});

document.getElementById("deleteBlockedChannels").addEventListener("click", async() => {
  setBlockedChannels([]);
});
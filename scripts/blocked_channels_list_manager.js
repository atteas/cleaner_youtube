/***************************

  CYT - Cleaner YouTube | Blocked-Channels-list Manager

  programmer: atteas (github)
  version: 0.08

***************************/


/*************** MAIN *****************/
let storage = typeof browser !== "undefined" ? browser.storage.local : chrome.storage.local;
let blockedChannels = [];

export function init(){
    return new Promise((resolve) => {
        storage.get("cyt_blockedChannels", (result) => {
            blockedChannels = result.cyt_blockedChannels || [];
            resolve();
        });
    });
}

export function getBlockedChannels(){
    return blockedChannels;
}

export function setBlockedChannels(blockedChannelsList){
    blockedChannels = blockedChannelsList;
    storage.set({ cyt_blockedChannels: blockedChannels });
}

export function addBlockedChannel(channel){
    if (!blockedChannels.includes(channel)){
        blockedChannels.push(channel);
        storage.set({ cyt_blockedChannels: blockedChannels });
    }
}
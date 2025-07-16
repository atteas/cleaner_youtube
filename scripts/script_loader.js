/***************************

  CYT - Cleaner YouTube | Script Loader

  programmer: atteas (github)
  version: 0.02

***************************/

(async () => {
    //make scripts into ES modules
    const shortsBlocker = await import('./shorts_blocker.js');
    const channelBlocker = await import('./channel_blocker.js');


    //initialize scripts
    shortsBlocker.init();
    channelBlocker.init();
})();

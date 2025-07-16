/***************************

  CYT - Cleaner YouTube | Script Loader

  programmer: atteas (github)
  version: 0.04

***************************/

(async () => {
    //make scripts into ES modules
    const shortsBlocker = await import('./shorts_blocker.js');
    const channelBlocker = await import('./channel_blocker.js');
    const blockedChannelsManager = await import('./blocked_channels_list_manager.js');

    //initialize scripts
    shortsBlocker.init();
    channelBlocker.init();
    await blockedChannelsManager.init();
})();

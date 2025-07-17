/***************************

  CYT - Cleaner YouTube | Script Loader

  programmer: atteas (github)
  version: 0.08

***************************/

(async () => {
    //make scripts into ES modules
    const blockedChannelsManager = await import('./blocked_channels_list_manager.js');
    const shortsBlocker = await import('./shorts_blocker.js');
    const channelBlocker = await import('./channel_blocker.js');
    const blockButton = await import('./block_button.js');

    //initialize scripts
    await blockedChannelsManager.init();
    shortsBlocker.init();
    channelBlocker.init();
    blockButton.init();
})();

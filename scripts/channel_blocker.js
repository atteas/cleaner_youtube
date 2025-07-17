/***************************

  CYT - Cleaner YouTube | Channel Blocker

  programmer: atteas (github)
  version: 0.07

***************************/


/*************** MAIN *****************/
export function init(){
    let blockedChannels = ["Pirate Software"]; //THIS IS TEMPORARY!!! Although blocking this guy might seem like a really good option.

    function removeBlockedChannels() {
        //Main
        const metadataDivs = document.querySelectorAll('div#metadata');
        metadataDivs.forEach(node => {
            //Check if channel is blocked
            const channelName = node.querySelector("yt-formatted-string.ytd-channel-name")?.title;

            if (blockedChannels.includes(channelName)) {
                const videoDiv = node.closest("ytd-rich-item-renderer");
                videoDiv?.remove();
            }
        });

        //Search page - videos from channel
        const channelInfoDivs = document.querySelectorAll('div#channel-info');
        channelInfoDivs.forEach(node => {
            //Check if channel is blocked
            const channelName = node.querySelector("yt-formatted-string.ytd-channel-name")?.querySelector("a")?.textContent;

            if (blockedChannels.includes(channelName)) {
                const videoDiv = node.closest("ytd-video-renderer");
                videoDiv?.remove();
            }
        });

        //Search page - channel
        const channelDivs = document.querySelectorAll('ytd-channel-renderer');
        channelDivs.forEach(node => {
            //Check if channel is blocked
            const channelName = node.querySelector("yt-formatted-string.ytd-channel-name")?.textContent;

            if (blockedChannels.includes(channelName)){
                const channelDiv = node.closest("ytd-channel-renderer");
                channelDiv?.remove();
            }
        });

        //Watching a video
        const recommendedVideos = document.querySelectorAll("yt-lockup-view-model");
        recommendedVideos.forEach(node => {
            //Check if channel is blocked
            const channelName = node.querySelector('yt-content-metadata-view-model span[role="text"]')?.textContent;

            if (blockedChannels.includes(channelName)){
                node.remove();
            }
        });
    }

    //Observer to document.body
    const observer = new MutationObserver(mutations => {
        for (const mutation of mutations){
            for (const node of mutation.addedNodes){
                //Make sure node is an element
                if (!(node instanceof HTMLElement)) continue;

                const nodeTagName = node.tagName.toLowerCase();


                //Remove videos made by blocked channels from main screen
                if (nodeTagName == "ytd-rich-item-renderer"){

                    //Check if channel is blocked
                    const channelName = node.querySelector("yt-formatted-string.ytd-channel-name")?.title;

                    if (blockedChannels.includes(channelName)){

                        //Delete the node
                        console.log("Blocked a video from 1 ", channelName);
                        node.remove();
                    }
                }


                //Remove videos made by blocked channels from search
                else if (nodeTagName == "ytd-video-renderer"){

                    //Check if channel is blocked
                    const channelName = node.querySelector("yt-formatted-string.ytd-channel-name")?.title;

                    if (blockedChannels.includes(channelName)){

                        //Delete the node
                        console.log("Blocked a video from 2 ", channelName);
                        node.remove();
                    }
                }


                //Remove videos made by blocked channels when in a video
                else if (nodeTagName == "yt-lockup-view-model"){

                    //Check if channel is blocked
                    const channelName = node.querySelector('yt-content-metadata-view-model span[role="text"]')?.textContent;
                    console.log(channelName);

                    if (blockedChannels.includes(channelName)){

                        //Delete the node
                        console.log("Blocked a video from 3 ", channelName);
                        node.remove();
                    }
                }
                

                //Remove channel from search results
                else if (nodeTagName == "ytd-channel-renderer"){

                    console.log(node);

                    //Check if channel is blocked
                    const channelName = node.querySelector("yt-formatted-string.ytd-channel-name")?.textContent;

                    if (blockedChannels.includes(channelName)){

                        //Get video-div of channel-info-div and delete it
                        const channelDiv = node.closest("ytd-channel-renderer");
                        console.log("Blocked a channel: ", channelName);
                        channelDiv?.remove();
                    }
                }
            }
        }
    });        

    //Observer config, target and initialization
    observer.observe(document.body, { // first: targetNode, second: config
        childList: true,
        subtree: true
    });

    // Debounced scroll cleanup
    let scrollTimeout;
    window.addEventListener('scroll', () => {
        clearTimeout(scrollTimeout);
        scrollTimeout = setTimeout(removeBlockedChannels, 200);
    });


    //Initial scan
    function initialScan(retries = 10, delay = 200) {
        removeBlockedChannels();
        if (retries > 0) setTimeout(() => initialScan(retries - 1, delay), delay);
    }

    //Run initial scan if url changes an on start
    let lastUrl = null;
    setInterval(() => {
        if (location.href !== lastUrl) {
            lastUrl = location.href;
            initialScan();
        }
    }, 500);
}
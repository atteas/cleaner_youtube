/***************************

  CYT - Cleaner YouTube | Channel Blocker

  programmer: atteas (github)
  version: 0.02

***************************/


/*************** MAIN *****************/
export function init(){
    let blockedChannels = ["Pirate Software"]; //THIS IS TEMPORARY!!! Although blocking this guy might seem like a really good option.

    function removeBlockedVideos() {
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
    }

    //Observer to document.body
    const observer = new MutationObserver(mutations => {
        for (const mutation of mutations){
            for (const node of mutation.addedNodes){
                //Make sure node is an element
                if (!(node instanceof HTMLElement)) continue;

                const nodeTagName = node.tagName.toLowerCase();


                //Remove videos made by blocked channels from main screen
                if (nodeTagName == "div" && node.id == "metadata"){

                    //Check if channel is blocked
                    const channelName = node.querySelector("yt-formatted-string.ytd-channel-name")?.title;

                    if (blockedChannels.includes(channelName)){

                        //Get video-div of metadata-div and delete it
                        const videoDiv = node.closest("ytd-rich-item-renderer");
                        console.log("Blocked a video from ", channelName);
                        videoDiv?.remove();
                    }
                }


                //Remove videos made by blocked channels from search
                else if (nodeTagName == "ytd-video-renderer"){

                    //Check if channel is blocked
                    const channelName = node.querySelector("yt-formatted-string.ytd-channel-name")?.title;

                    if (blockedChannels.includes(channelName)){

                        //Get video-div of channel-info-div and delete it
                        const videoDiv = node.closest("ytd-video-renderer");
                        console.log("Blocked a video from ", channelName);
                        videoDiv?.remove();
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
        scrollTimeout = setTimeout(removeBlockedVideos, 200);
    });

    removeBlockedVideos();
}
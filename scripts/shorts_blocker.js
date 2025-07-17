/***************************

  CYT - Cleaner YouTube | Shorts Blocker

  programmer: atteas (github)
  version: 0.07

***************************/


/*************** MAIN *****************/
export function init(){

    function removeShorts(){
        //Remove shorts shelfs
        const shortsShelfs = [
            ...document.querySelectorAll('ytd-reel-shelf-renderer'),
            ...document.querySelectorAll('ytd-rich-shelf-renderer'),
            ...document.querySelectorAll('grid-shelf-view-model')
        ];
        shortsShelfs.forEach(node => {
            node.remove();
        });

        //Remove shorts videos
        const videos = document.querySelectorAll('ytd-video-renderer');
        videos.forEach(node => {
            const shortsLink = node.querySelector('a[href^="https://www.youtube.com/shorts"]');
            if (shortsLink){
                node.remove();
            }
        });

        
        //Remove shorts from channel
        const channelShorts = document.querySelectorAll('ytm-shorts-lockup-view-model-v2');
        channelShorts.forEach(node => {
            const shortsHolder = node.closest("div#contents");
            shortsHolder?.remove();
        });

        //Remove shorts tab from the side (extended side)
        const sideTabsExtended = document.querySelectorAll("ytd-guide-entry-renderer");
        sideTabsExtended.forEach(node => {
            const tabTitle = node.querySelector("yt-formatted-string.ytd-guide-entry-renderer")?.textContent;
            if (tabTitle == "Shorts"){
                node.remove();
            }
        });

        //Remove shorts tab from the side (collapsed side)
        const sideTabsCollapsed = document.querySelectorAll("ytd-mini-guide-entry-renderer");
        sideTabsCollapsed.forEach(node => {
            if (node.getAttribute?.("aria-label") == "Shorts"){
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

                //Remove shorts shelfs
                if (nodeTagName == "ytd-reel-shelf-renderer" || nodeTagName == "ytd-rich-shelf-renderer" || nodeTagName == "grid-shelf-view-model"){
                    console.log("Shorts shelf found: ", node);
                    node.remove();
                }

                //Remove shorts videos
                else if (nodeTagName == "a"){
                    if (node.href.includes("shorts")){
                        const shortsElement = node.closest("ytd-video-renderer");
                        if (shortsElement){
                            console.log("Shorts video found: ", shortsElement);
                            shortsElement.remove();
                        }
                    }
                }

                //Remove shorts from channel
                else if (nodeTagName == "ytm-shorts-lockup-view-model-v2"){
                    const shortsHolder = node.closest("div#contents");
                    if (shortsHolder){
                        console.log("Shorts holder found in channel page: ", shortsHolder);
                        shortsHolder.remove();
                    }
                }

                //Remove shorts tab from the side (extended side)
                else if (nodeTagName == "ytd-guide-entry-renderer"){
                    const tabTitle = node.querySelector("yt-formatted-string.ytd-guide-entry-renderer")?.textContent;
                    if (tabTitle == "Shorts"){
                        console.log("Shorts tab found from side: ", node);
                        node.remove();
                    }
                }

                //Remove shorts tab from the side (collapsed side)
                else if (nodeTagName == "ytd-mini-guide-entry-renderer"){
                    if (node.getAttribute?.("aria-label") == "Shorts"){
                        console.log("Shorts tab found from side: ", node);
                        node.remove();
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

    //Initial scan
    function initialScan(retries = 10, delay = 200) {
        removeShorts();
        if (retries > 0) setTimeout(() => initialScan(retries - 1, delay), delay);
    }
    initialScan();
}
/***************************

  CYT - Cleaner YouTube | Shorts Blocker

  programmer: atteas (github)
  version: 0.02

***************************/


/*************** MAIN *****************/
export function init(){

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

                //Remove shorts tab from the side
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
}

async function handleMessage(request) {
    const base = document.getElementById('LQNFXSUB');
    // Try to locate the correct movie identifier in the document
    const watchVideo = document.getElementsByClassName('watch-video')[0];
    const watchId = watchVideo ? watchVideo.querySelector('[data-videoid]').dataset.videoid : null;
    const videoContainer = document.getElementsByClassName('VideoContainer')[0];
    const containerId = videoContainer ? videoContainer.getAttribute('data-videoid') : null;
    const movieId = watchId ? watchId : containerId ? containerId : null;

    if (request.act === "GetNetflixInfo") {
        let data = base.querySelector('.id' + movieId);
        if (data)
            return {
                title: data.dataset.title,
                image: data.dataset.image,
                descr: data.dataset.descr,
                url: 'https://www.netflix.com/watch/' + movieId
            };
    }
    if (request.act === "GetNetflixSubs") {
        let langs = [],
            subs = base.querySelector('.id' + movieId + ' .' + request.lang);
        if (subs) {
            if (subs.value) return {success: true, subs: subs.value};
            let file = await fetch(subs.dataset.url);
            if (file.ok) {
                subs.value = await file.text();
                console.log('Fetched', request.lang, 'subs for movie', movieId);
                return {success: true, subs: subs.value};
            }
        }
        for (let elem of base.querySelectorAll('.id' + movieId + ' *')) langs.push(elem.name);
        return {success: false, langs: langs.join(', ')};
    }
}

chrome.runtime.onMessage.addListener(
    (request, sender, sendResponse) => {
        handleMessage(request).then(sendResponse);
        return true;
    }
);

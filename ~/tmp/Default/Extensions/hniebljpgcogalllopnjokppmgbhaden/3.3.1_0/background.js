chrome.runtime.onMessage.addListener((message, sender) => {
	const { type } = message;
	switch (type) {
		case 'RECORDING_STOPPED':
			chrome.windows.update(sender.tab.windowId, { focused: true });
	}
});

chrome.action.onClicked.addListener(() => {
	const width = 800;
	const height = 690;
	chrome.windows.create({
		url: chrome.runtime.getURL('index.html'),
		width,
		height,
		type: 'popup',
	});
})

chrome.runtime.onUpdateAvailable.addListener(e => {
	console.log('Disable automatic update')
})

var liveInputToggleBtn = document.getElementById('liveInputToggleBtn'),
	toggle = 0;

liveInputToggleBtn.addEventListener('click', function (e) {
	if (toggle === 0) {
		stream.startMedia();
		toggle = 1;
		liveInputToggleBtn.value = "Live Input Off";
	} else {
		stream.stopMedia();
		toggle = 0;
		liveInputToggleBtn.value = "Live Input On";
	}
	e.preventDefault();
});
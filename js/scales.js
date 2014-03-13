var scales = {

    activeScale: null,

    // Constants
    gradeOne: {
        CMAJOR:                 ["C", "D", "E", "F", "G", "A", "B", "C", "D", "E", "F", "G", "A", "B", "C", "B", "A", "G", "F", "E", "D", "C", "B", "A", "G", "F", "E", "D", "C"],
        GMAJOR:                 ["G", "A", "B", "C", "D", "E", "F#", "G", "A", "B", "C", "D", "E", "F#", "G", "F#", "E", "D", "C", "B", "A", "G", "F#", "E", "D", "C", "B", "A", "G"],
        DMAJOR:                 ["D", "E", "F#", "G", "A", "B", "C#", "D", "E", "F#", "G", "A", "B", "C#", "D", "C#", "B", "A", "G", "F#", "E", "D", "C#", "B", "A", "G", "F#", "E", "D"],
        FMAJOR:                 ["F", "G", "A", "Bb", "C", "D", "E", "F", "G", "A", "Bb", "C", "D", "E", "F", "E", "D", "C", "Bb", "A", "G", "F", "E", "D", "C", "Bb", "A", "G", "F", "won't work until I work out Bb / A# problem"],

        AMINORHARMONIC:         ["A", "B", "C", "D", "E", "F", "G#", "A", "B", "C", "D", "E", "F", "G#", "A", "G#", "F", "E", "D", "C", "B", "A", "G#", "F", "E", "D", "C", "B", "A"],
        DMINORHARMONIC:         ["D", "E", "F", "G", "A", "B", "C#", "D", "E", "F", "G", "A", "B", "C#", "D", "C#", "B", "A", "G", "F", "E", "D", "C#", "B", "A", "G", "F", "E", "D",],

        CMAJORCONTRARYLEFT:     ["C",  "B", "A", "G", "F", "E", "D", "C", "D", "E", "F", "G", "A", "B", "C"],
        CMAJORCONTRARYRIGHT:    ["C", "D", "E", "F", "G", "A", "B", "C",  "B", "A", "G", "F", "E", "D", "C"],

        CMAJORBROKENCHORDS:     ["C", "E", "G", "E", "G", "C", "G", "C", "E", "C", "E", "C", "G", "C", "G", "E", "G", "E", "C", "G"],
        //STOPED HERE THROUGH BOREDOM
        GMAJORBROKENCHORDS:     ["C", "D", "E", "F", "G", "A", "B", "C", "D", "E", "F", "G", "A", "B", "C", "B", "A", "G", "F", "E", "D", "C", "B", "A", "G", "F", "E", "D", "C"],
        FMAJORBROKENCHORDS:     ["C", "D", "E", "F", "G", "A", "B", "C", "D", "E", "F", "G", "A", "B", "C", "B", "A", "G", "F", "E", "D", "C", "B", "A", "G", "F", "E", "D", "C"],
        AMINORBROKENCHORDS:     ["C", "D", "E", "F", "G", "A", "B", "C", "D", "E", "F", "G", "A", "B", "C", "B", "A", "G", "F", "E", "D", "C", "B", "A", "G", "F", "E", "D", "C"],
        DMINORBROKENCHORDS:     ["C", "D", "E", "F", "G", "A", "B", "C", "D", "E", "F", "G", "A", "B", "C", "B", "A", "G", "F", "E", "D", "C", "B", "A", "G", "F", "E", "D", "C"],
    }

};



(function () {

    var location = document.getElementById('currentScale'),

        addEventListenerByClass = function () {
            var list = document.getElementsByClassName('scales');
            for (var i = 0, len = list.length; i < len; i++) {
                list[i].addEventListener('click', function (e) {
                    locationText = scales.gradeOne[this.id].toString().replace(/,/g, ', ');
                    location.innerHTML = (locationText);
                    scales.activeScale = scales.gradeOne[this.id];
                    analyser.userInputArray = [];
                    e.preventDefault();
                }, false);;
            };
        };

    window.addEventListener('load', function loaded() {
        addEventListenerByClass();
    }, false);

}());
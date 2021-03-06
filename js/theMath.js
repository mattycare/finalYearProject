var theMath = {

	// Variables
    NOTES: ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"],
    userInputArray: [],
    currentCharacter: 0,
    numberCorrect: 0,
    numberIncorrect: 0,

    // Returns the note number
	noteFromFrequency: function (frequency) {
        var note = Math.round((Math.log(frequency / 440) / Math.log(2)) * 12) + 69;
        return note;
    },

    // Returns the octave
    octave: function (frequency) {
        var note = this.noteFromFrequency(frequency),
            octave = Math.floor((note - 12)/12);
        return octave;
    },

    // Returns the 'noteFromFrequency' using a noteString such as A4 or A#4
    noteFromValue: function (value) {
        var arrayLength = value.length;
            pitch = null,
            note = value.split('')[0],
            octave = value.split('')[arrayLength],
            noteValue = this.NOTES.indexOf(note),
            octaveValue = (octave * 12) + 12;

        if (arrayLength === 3) {
                var pitch = value.split('')[2];
                noteValue = this.NOTES.indexOf(note + pitch);
        }

        return (noteValue + octaveValue);
    },

    // Returns the note string based on the note number
    noteString: function (frequency) {
        var note = this.noteFromFrequency(frequency),
            noteString = this.NOTES[note % 12];
        return noteString;
    },

    // Returns the frequency based on note number
    frequencyFromNote: function (note) {
        var frequency = Math.pow(2, (note - 69) / 12) * 440;
        return frequency;
    },

    // Returns the cents the note is off from the 'real' value
    centsFromFrequency: function (frequency) {
        var noteNumber = this.noteFromFrequency(frequency),
            noteFrequency = this.frequencyFromNote(noteNumber),
            cents = Math.floor(Math.log(frequency / noteFrequency) / Math.log(2) * 1200);
        return cents;
    },

    // Compares the input array against the 'known correct' array
    // Updates the display accordingly
    compareArrays: function (note, noteArray) {
        this.userInputArray.push(note);
        var userInputArrayLength = (this.userInputArray.length) - 1,
            percentageCorrect = null;

        if (this.userInputArray[userInputArrayLength] === noteArray[userInputArrayLength] && this.currentCharacter === (noteArray.length - 1)) {
            this.numberCorrect = this.numberCorrect + 1;
            percentageCorrect = Math.round((this.numberCorrect / noteArray.length) * 100);
            return ['completeCorrect', this.currentCharacter, percentageCorrect];
        }
        if (this.currentCharacter === (noteArray.length - 1)) {
            this.numberIncorrect = this.numberIncorrect + 1;
            percentageCorrect = Math.round((this.numberCorrect / noteArray.length) * 100);
            return ['completeIncorrect', this.currentCharacter, percentageCorrect];
        }
        if (this.userInputArray[userInputArrayLength] === noteArray[userInputArrayLength]) {
            this.currentCharacter = this.currentCharacter + 1;
            this.numberCorrect = this.numberCorrect + 1;
            return ['correct', (this.currentCharacter - 1)];
        }

        this.currentCharacter = this.currentCharacter + 1;
        this.numberIncorrect = this.numberIncorrect + 1;
        return ['incorrect', (this.currentCharacter - 1)];
        
    },

    resetArrays: function () {
        this.currentCharacter = 0;
        this.userInputArray = [];
        this.numberCorrect = 0;
        this.numberIncorrect = 0;
    },

    // Calculates the modal value of the analyser's data store
    mode: function (values) {
        var frequency = {},
            v = null,          // array of frequencies
            max = null,
            modeValue;        // most frequent frequency

        for (v in values) {
            frequency[values[v]] = (frequency[values[v]] || 0) + 1;
            if (frequency[values[v]] > max) {
                max = frequency[values[v]];
                modeValue = values[v];
            }
        }
        return modeValue;
    }
};
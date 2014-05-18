var theMath = {

	// Variables
    modeValue: null,
    NOTES: ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"],

    // Returns the note number
	noteFromFrequency: function (frequency) {
        note = Math.round((Math.log(frequency / 440) / Math.log(2)) * 12) + 69;
        return note;
    },

    // Returns the note string based on the note number
    noteString: function (frequency) {
        note = this.noteFromFrequency(frequency);
        noteString = this.NOTES[note % 12]
        return noteString;
    },

    // Returns the frequency based on note number
    frequencyFromNote: function (note) {
        frequency = Math.pow(2, (note - 69) / 12) * 440;
        return frequency;
    },

    // Returns the cents the note is off from the 'real' value
    centsFromFrequency: function (frequency) {
        noteNumber = this.noteFromFrequency(frequency);
        noteFrequency = this.frequencyFromNote(noteNumber)
        cents = Math.floor(Math.log(frequency / noteFrequency) / Math.log(2) * 1200);
        return cents;
    },

    // Calculates the modal value of the analyser's data store
    mode: function (values) {
        var frequency = {},
            v = null,          // array of frequencies
            max = null;        // most frequent frequency

        for (v in values) {
            frequency[values[v]] = (frequency[values[v]] || 0) + 1;
            if (frequency[values[v]] > max) {
                max = frequency[values[v]];
                this.modeValue = values[v];
            }
        }
    }
};
var sight = {

	noteArray: [],

	loaded: function () {
		var randomiseButton = document.getElementById('reset');
			
		randomiseButton.addEventListener('click', function (e) {
			sight.resetButtonPressed();
            e.preventDefault();
        }, false);

        liveInputToggleBtn.addEventListener('click', function (e) {
            stream.startMedia('sight');
            liveInputToggleBtn.value = "Running";
            e.preventDefault();
        }, false);

		window.addEventListener('resize', function() {
			sight.checkToRemoveLastChild();
        }, false);

		this.addEventListenerByClass();
        this.calculateNotes();
	},

	resetButtonPressed: function () {
		var dataToClear = document.getElementById('drawArea');

			while (dataToClear.firstChild) {
			    dataToClear.removeChild(dataToClear.firstChild);
			}

			this.noteArray = [];
			theMath.resetArrays();

            this.calculateNotes();
	},

	displayResults: function (percentageCorrect) {
		var display = document.getElementById('results');
        theMath.resetArrays();
		display.innerHTML = 'You got ' + percentageCorrect + '% correct.'
	},

	updateSightDisplay: function (note) {
        var compareArrays = theMath.compareArrays(note, this.noteArray),
	        correct = compareArrays[0],
			currentCharacter = compareArrays[1],
			percentageCorrect = compareArrays [2],
			element = document.getElementById(currentCharacter);
			update
	         	= (correct === 'completeCorrect') ? (element.setAttribute('class', 'correct')
	         										, this.displayResults(percentageCorrect))
	   			: (correct === 'completeIncorrect') ? (element.setAttribute('class', 'incorrect')
	   													, this.displayResults(percentageCorrect))
				: (correct === 'correct') ? element.setAttribute('class', 'correct')
				: (correct === 'incorrect') ? element.setAttribute('class', 'incorrect')
				: 'error';
	},

	addEventListenerByClass: function () {
        var list = document.getElementsByClassName('noteInputButton'),
            length = list.length,
            i = 0;

        for (i = 0, length; i < length; i++) {
            list[i].addEventListener('click', function (e) {
            	sight.updateSightDisplay(this.innerHTML);
                e.preventDefault();
            }, false);
        }
	},

	notes: function () {
		return [
				["C", "4"],
				["D", "4"],
				["E", "4"],
				["F", "4"],
				["G", "4"],
				["A", "4"],
				["B", "4"],
				["C", "5"],
				["D", "5"],
				["E", "5"],
				["F", "5"],
				["G", "5"],
				["A", "5"],
				["B", "5"],
				["C", "6"],
				["B", "5"],
				["A", "5"],
				["G", "5"],
				["F", "5"],
				["E", "5"],
				["D", "5"],
				["C", "5"],
				["B", "4"],
				["A", "4"],
				["G", "4"],
				["F", "4"],
				["E", "4"],
				["D", "4"],
				["C", "4"]
			];
	},

	getValues: function (note) {
		var value
			= (note === 'C') ? 0
			: (note === 'D') ? 1
			: (note === 'E') ? 2
			: (note === 'F') ? 3
			: (note === 'G') ? 4
			: (note === 'A') ? 5
			: (note === 'B') ? 6
			: 'error';

		return value;
	},

	getSvgWindowValues: function () {
		var svgWindow = document.getElementById('svgWindow'),
			svgWindowWidth = svgWindow.getBBox().width;
		return svgWindowWidth;
	},

	checkToRemoveLastChild: function () {
		var dataToClear = document.getElementById('drawArea'),
			numberOfChildren = dataToClear.childElementCount,
			gapBetweenNotes = 45,
			firstNoteGap = 80,
			svgWindowWidth = this.getSvgWindowValues(),
			numberToGenerate = Math.ceil((svgWindowWidth - firstNoteGap) / gapBetweenNotes) -1;

		if (numberToGenerate < numberOfChildren) {
			dataToClear.removeChild(dataToClear.lastChild);		
		}

	},

	calculateNotes: function () {
		var	notes = this.notes(),
			gapBetweenNotes = 45,
			firstNoteGap = 80,
			svgWindowWidth = this.getSvgWindowValues(),
			numberToGenerate = Math.ceil((svgWindowWidth - firstNoteGap) / gapBetweenNotes) -1,
			i = 0;

		for (i; i < numberToGenerate; i++) {
			var note = notes[Math.floor(Math.random()*notes.length)],
				value = this.getValues(note[0]),
				x = i * gapBetweenNotes,
				y = (value*(15) + ((note[1]-4)*105)),
				noteType = null,
				noteStrikeThrough = null,
				noteUnderscore = null,
				noteTailUp = null,
				noteTailDown = null;

			this.noteArray.push(note[0]);
			
			if ((y % 30 === 0 && y > 150) || (y % 30 === 0 && y < 30)) {
				noteStrikeThrough = true;
				noteUnderscore = false;
			} else if ((y % 30 === 15 && y > 165) || (y % 30 === 0 && y < 15)) {
				noteUnderscore = true;
				noteStrikeThrough = false;
			}

			if (y >= 120) {
				noteTailDown = true;
				noteTailUp = false;
			} else {
				noteTailUp = true;
				noteTailDown = false;
			}

			var noteType
				= (noteStrikeThrough && noteTailUp) ? '#noteStrikeThroughTailUp'
				: (noteStrikeThrough && noteTailDown) ? '#noteStrikeThroughTailDown'
				: (noteUnderscore && noteTailUp) ? '#noteUnderscoreTailUp'
				: (noteUnderscore && noteTailDown) ? '#noteUnderscoreTailDown'
				: (noteTailUp) ? '#noteTailUp'
				: (noteTailDown) ? '#noteTailDown'
				: 'error';			

			this.renderNotes(x, -y, noteType, i);
		}
	},

	renderNotes: function (x, y, noteType, i) {
		var drawArea = document.getElementById('drawArea'),
			noteToDraw = document.createElementNS("http://www.w3.org/2000/svg", 'use');

		noteToDraw.setAttributeNS('http://www.w3.org/1999/xlink', 'xlink:href', noteType);
		noteToDraw.setAttribute('transform', 'translate(' + x + ' ' + y +')');
		noteToDraw.setAttribute('fill', 'black');
		noteToDraw.setAttribute('stroke', 'black');
		noteToDraw.setAttribute('id', i);

		drawArea.appendChild(noteToDraw);
	}
};

window.addEventListener('load', function loaded() {
        sight.loaded();
    }, false);
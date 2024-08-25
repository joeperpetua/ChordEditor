import { Component } from "@angular/core";

interface SongWord {
    text: string,
    chord : string
}

interface SongLine {
    words: SongWord[]
}

interface SongSection {
    name: string,
    lines: SongLine[]
}

@Component({
    selector: 'SongEditor',
    standalone: true,
    templateUrl: './songEditor.component.html',
    styleUrl: './songEditor.component.css'
})

export class SongEditor {
    songTitle = '';
    songAuthor = '';
    songKey = '';
    songText = '';
    songSections: SongSection[] = [];
    displayInfo = true;

    toggleInfo() {
        this.displayInfo = !this.displayInfo;
    }

    updateTitle(ev: Event) {
        const target = ev.target as HTMLInputElement; 
        this.songAuthor = target.value;
    }

    updateAuthor(ev: Event) {
        const target = ev.target as HTMLInputElement; 
        this.songTitle = target.value;
    }

    updateKey(ev: Event) {
        const target = ev.target as HTMLInputElement; 
        this.songKey = target.value;
    }

    processText() {
        const rawText = document.querySelector('.song-source')?.querySelector('textarea')?.value;
        if (!rawText)
            return

        let sections = rawText.split('\n\n');

        let songSections: SongSection[] = [];
        sections.forEach((section, index) => {
            let lines = section.split('\n');
            let sectionLines: SongLine[] = [];
            lines.forEach(line => {
                let words = line.split(' ');
                let lineWords: SongWord[] = [];
                words.forEach(word => {
                    lineWords.push({'text': word, 'chord': ''});
                });
                sectionLines.push({words: lineWords})
            })
            songSections.push({'name': `Section ${index + 1}`, lines: sectionLines})
        })
        this.songSections = songSections;

        console.log(rawText);
        console.log(songSections);
        console.log(songSections[0].lines[0].words[0].text);
    }
}
import { Component } from "@angular/core";
import { FormsModule } from '@angular/forms';

interface SongWord {
    text: string,
    chords: string[] 
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
    styleUrl: './songEditor.component.css',
    imports: [FormsModule]
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

    updateSectionName(ev: Event){
        const target = ev.target as HTMLHeadingElement;
        if (!target.textContent)
            return
        const index = parseInt(target.id.replace('section-', ''));
        this.songSections[index].name = target.textContent;
    }

    updateChord(ev: Event, section: number, line: number, word: number, chord: number){
        const target = ev.target as HTMLDivElement;
        if (!target.textContent)
            return

        const inputText = target.textContent;
        this.songSections[section].lines[line].words[word].chords[chord] = inputText;
        target.textContent = inputText; // Re-set element text to avoid double characters due to re-rendering.

        // Set caret to end of text
        const range = document.createRange();
        const selection = window.getSelection();
        range.selectNodeContents(target);
        range.collapse(false);
        selection?.removeAllRanges();
        selection?.addRange(range);
    }

    exportSong() {
        console.log(this.songSections);
    }

    processText() {
        // const rawText = document.querySelector('.song-source')?.querySelector('textarea')?.value;
        const rawText = this.songText;
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
                    lineWords.push({'text': word, 'chords': ['', '', '']});
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
import { Component } from "@angular/core";
import { FormsModule } from '@angular/forms';
import { CommonModule } from "@angular/common";
import { Router, ActivatedRoute } from "@angular/router";
import { CaretService } from "../services/caret.service";

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
    imports: [FormsModule, CommonModule]
})

export class SongEditor {
    constructor(private router: Router, private route: ActivatedRoute) { };

    songTitle = '';
    songAuthor = '';
    songKey = '';
    songText = '';
    songSections: SongSection[] = [];
    displayInfo = true;

    ngOnInit(){
        const navigation = this.router.getCurrentNavigation();
        const cache = this.route.snapshot.queryParams['cache'];
        const dev = this.route.snapshot.queryParams['dev'];
        let data = navigation?.extras?.state?.['data']; 
    
        // Fallback to history.state if no navigation data exists
        if (!data && cache === 'true') {
            data = history.state.data;
        }

        if (dev === 'true') {
            data = {
                'songTitle': 'Tu Fidelidad',
                'songAuthor': 'Marcos Witt',
                'songKey': 'C',
                'songText': 'Tu fidelidad es grande\nTu fidelidad incomparable es\nNadie como tú, bendito Dios\nGrande es tu fidelidad\n\nTu fidelidad es grande\nTu fidelidad incomparable es\nNadie como tú, bendito Dios\nGrande es tu fidelidad',
                'songSections': [{name:"Verse 1",lines:[{words:[{text:"Tu",chords:["G#m9/E","",""]},{text:"fidelidad",chords:["","C#m",""]},{text:"es",chords:["Bm","A7",""]},{text:"grande",chords:["","G/D",""]}]},{words:[{text:"Tu",chords:["","",""]},{text:"fidelidad",chords:["","",""]},{text:"incomparable",chords:["","C#",""]},{text:"es",chords:["","",""]}]},{words:[{text:"Nadie",chords:["","Am",""]},{text:"como",chords:["","",""]},{text:"t\xfa,",chords:["","",""]},{text:"bendito",chords:["","",""]},{text:"Dios",chords:["","",""]}]},{words:[{text:"Grande",chords:["","",""]},{text:"es",chords:["","",""]},{text:"tu",chords:["","",""]},{text:"fidelidad",chords:["","Bm",""]}]}]},{name:"Chorus",lines:[{words:[{text:"Tu",chords:["","",""]},{text:"fidelidad",chords:["","C#",""]},{text:"es",chords:["","Am7",""]},{text:"grande",chords:["","",""]}]},{words:[{text:"Tu",chords:["Fm","",""]},{text:"fidelidad",chords:["","",""]},{text:"incomparable",chords:["","\xa0 \xa0 \xa0 \xa0 \xa0 \xa0 A7",""]},{text:"es",chords:["","",""]}]},{words:[{text:"Nadie",chords:["","Cb",""]},{text:"como",chords:["","",""]},{text:"t\xfa,",chords:["","",""]},{text:"bendito",chords:["","",""]},{text:"Dios",chords:["","",""]}]},{words:[{text:"Grande",chords:["","",""]},{text:"es",chords:["","",""]},{text:"tu",chords:["","",""]},{text:"fidelidad",chords:["","Bm7",""]}]}]}]
            };
        }
    
        if (data) {
            console.log('received to edit', data);
            const { songTitle, songAuthor, songKey, songText, songSections } = data;
            this.songTitle = songTitle;
            this.songAuthor = songAuthor;
            this.songKey = songKey;
            this.songText = songText || 'no data';
            this.songSections = songSections;
        } else {
            console.log('No data passed to edit', cache);
        }
      }

    toggleInfo() {
        this.displayInfo = !this.displayInfo;
    }

    updateTitle(ev: Event) {
        const target = ev.target as HTMLInputElement; 
        this.songTitle = target.value;
    }

    updateAuthor(ev: Event) {
        const target = ev.target as HTMLInputElement; 
        this.songAuthor = target.value;
    }

    updateKey(ev: Event) {
        const target = ev.target as HTMLInputElement; 
        this.songKey = target.value;
    }

    updateSectionName(ev: Event){
        const target = ev.target as HTMLInputElement;
        if (!target.value)
            return
        const index = parseInt(target.id.replace('section-', ''));
        this.songSections[index].name = target.value;
    }

    updateChord(ev: Event, section: number, line: number, word: number, chord: number){
        const target = ev.target as HTMLDivElement;
        if (!target.textContent)
            return
        const inputText = target.textContent;
        const caretPos = CaretService.getCaretPosition(target);
        
        this.songSections[section].lines[line].words[word].chords[chord] = target.textContent;
        target.textContent = inputText; // Re-set element text to avoid double characters due to re-rendering.

        CaretService.setCaretPosition(target, caretPos);
    }

    exportSong() {
        console.log(this.songSections);
    }

    previewSong() {
        const data = {
            'songTitle': this.songTitle,
            'songAuthor': this.songAuthor,
            'songKey': this.songKey,
            'songText': this.songText,
            'songSections': this.songSections
        };
        console.log('sending to preview', data);
        this.router.navigate(['/preview'], { state: { data: data } });
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
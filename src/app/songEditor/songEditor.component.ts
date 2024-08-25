import { Component } from "@angular/core";

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
    songWordsMap = [];
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


}
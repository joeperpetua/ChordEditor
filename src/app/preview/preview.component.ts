import { Component, Input } from '@angular/core';

// TODO: create service with interfaces
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
  selector: 'app-preview',
  standalone: true,
  imports: [],
  templateUrl: './preview.component.html',
  styleUrl: './preview.component.css'
})
export class Preview {
  @Input()
  songSections: SongSection[] = [];
}

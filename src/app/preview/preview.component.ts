import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

// TODO: create service with interfaces
interface SongWord {
  	text: string;
  	chords: string[];
}

interface SongLine {
  	words: SongWord[];
}

interface SongSection {
	name: string;
	lines: SongLine[];
}

@Component({
	selector: 'app-preview',
	standalone: true,
	imports: [],
	templateUrl: './preview.component.html',
	styleUrl: './preview.component.css',
})
export class Preview {
  	constructor(private router: Router) {}

	songTitle = '';
	songAuthor = '';
	songKey = '';
	songText = '';
	songSections: SongSection[] = [];
	displayInfo = true;

  	ngOnInit() {
		const navigation = this.router.getCurrentNavigation();
		let data = navigation?.extras?.state?.['data'];

		// Fallback to history.state if no navigation data exists
		if (!data) {
			data = history.state.data;
		}

		if (data) {
			console.log('received to preview', data);
			const { songTitle, songAuthor, songKey, songText, songSections } = data;
			this.songTitle = songTitle;
			this.songAuthor = songAuthor;
			this.songKey = songKey;
			this.songText = songText;
			this.songSections = songSections;
		} else {
			console.log('No data passed to preview');
		}
	}

	toggleInfo() {
		this.displayInfo = !this.displayInfo;
	}

	backToEdit() {
		const data = {
		songTitle: this.songTitle,
		songAuthor: this.songAuthor,
		songKey: this.songKey,
		songText: this.songText,
		songSections: this.songSections,
		};
		console.log('sending to edit', data);
		this.router.navigate(['/create'], { queryParams: { cache: true }, state: { data: data } });
	}

	printSong() {}
}

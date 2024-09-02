import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { interval } from 'rxjs';

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
	printing = false;

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

	sleep = async (time: number, unit: string) => {
		switch(unit){
		  case 'ms':
			return new Promise(resolve => setTimeout(resolve, time));
			break;
	  
		  case 's':
			return new Promise(resolve => setTimeout(resolve, time*1000));
			break;
	  
		  case 'm':
			return new Promise(resolve => setTimeout(resolve, time*60000));
			break;
			
		  case 'h':
			return new Promise(resolve => setTimeout(resolve, time*3600000));
			break;
	  
		  default:
			throw new Error(`Sleep unit measure not recognized.\nSupported: ms, s, m, h.\nGiven: ${unit}`);
			break;
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

	async printSong() {
		this.printing = true;
		await this.sleep(100, 'ms');
		window.print();
		this.printing = false;
	}
}

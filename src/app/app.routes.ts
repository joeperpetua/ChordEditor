import { Routes } from '@angular/router';
import { SongEditor } from './songEditor/songEditor.component';
import { About } from './about/about.component';
import { NotFound } from './not-found/not-found.component';

export const routes: Routes = [
    { path: 'create', title: 'ChordEditor | Create new', component: SongEditor },
    { path: 'about', title: 'ChordEditor | About', component: About },
    { path: '**', title: 'ChordEditor | Not Found', component: NotFound }
];

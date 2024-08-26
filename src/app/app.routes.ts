import { Routes } from '@angular/router';
import { SongEditor } from './songEditor/songEditor.component';
import { About } from './about/about.component';
import { NotFound } from './not-found/not-found.component';
import { Preview } from './preview/preview.component';

export const routes: Routes = [
    { path: 'create', title: 'ChordEditor | Create new', component: SongEditor },
    { path: 'about', title: 'ChordEditor | About', component: About },
    { path: 'preview', title: 'ChordEditor | Preview', component: Preview},
    { path: '', redirectTo: '/create', pathMatch: 'full'},
    { path: '**', title: 'ChordEditor | Not Found', component: NotFound }
];

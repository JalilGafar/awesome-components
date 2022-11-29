import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CommentsComponent } from './components/comments/comments.component'
import { MaterialModule } from './material.module';
import { ReactiveFormsModule } from '@angular/forms';
import { ShortenPipe } from './pipes/shorten.pipe';
import { NamecasePipe } from './pipes/namecase.pipe';
import { TimeAgoPipe } from './pipes/timeAgo.pipe';


@NgModule({
  declarations: [
    CommentsComponent, 
    ShortenPipe,
    NamecasePipe,
    TimeAgoPipe
  ],
  imports: [
    CommonModule,
    MaterialModule,
    ReactiveFormsModule,
    //TimeAgoPipe
  ],
  exports: [
    MaterialModule,
    CommentsComponent,
    ReactiveFormsModule,
    ShortenPipe,
    NamecasePipe,
    TimeAgoPipe
  ]
})
export class SharedModule { }

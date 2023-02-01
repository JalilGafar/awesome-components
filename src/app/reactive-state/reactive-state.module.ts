import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReactiveStateRoutingModule } from './reactive-state-routing.module';
import { CandidateListComponent } from './components/candidate-list/candidate-list.component';
import { SingleCandidatComponent } from './components/single-candidat/single-candidat.component';
import { CandidatesService } from './services/candidates.service';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [
    CandidateListComponent,
    SingleCandidatComponent
  ],
  imports: [
    CommonModule,
    ReactiveStateRoutingModule,
    SharedModule
  ],
  providers: [
    CandidatesService
  ]
})
export class ReactiveStateModule { }

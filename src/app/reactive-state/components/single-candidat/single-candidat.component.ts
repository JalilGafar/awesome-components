import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, switchMap } from 'rxjs';
import { Candidate } from '../../models/candidate.model';
import { CandidatesService } from '../../services/candidates.service';

@Component({
  selector: 'app-single-candidat',
  templateUrl: './single-candidat.component.html',
  styleUrls: ['./single-candidat.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SingleCandidatComponent implements OnInit {

  loading$!: Observable<boolean>;
  candidate$!: Observable <Candidate>;

  constructor(private candidatesService : CandidatesService,
              private route: ActivatedRoute,
              private router: Router) { }

  ngOnInit(): void {
    this.initObservables ()
  }
  
  initObservables() {
    this.loading$ = this.candidatesService.loading$;
    this.candidate$ = this.route.params.pipe(
      switchMap(params => this.candidatesService.getCandidateById(+params['id']))
    );
  }

  
  onHire(){};

  onRefuse(){};

  onGoBack(){
    this.router.navigateByUrl('/reactive-state/candidates')
  };

}

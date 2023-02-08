import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, switchMap, take, tap } from 'rxjs';
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

  
  onHire(){
    this.candidate$.pipe(
      take(1),
      tap(candidate => {
        this.candidatesService.hireCandidate(candidate.id);
        this.onGoBack();
      })
    ).subscribe();
  };

  onRefuse(){
    this.candidate$.pipe(
      take(1),
      tap(candidate => {
        this.candidatesService.refuseCandidate(candidate.id);
        this.onGoBack();
      })
    ).subscribe();
  };

  onGoBack(){
    this.router.navigateByUrl('/reactive-state/candidates')
  };

}

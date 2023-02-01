import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-single-candidat',
  templateUrl: './single-candidat.component.html',
  styleUrls: ['./single-candidat.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SingleCandidatComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}

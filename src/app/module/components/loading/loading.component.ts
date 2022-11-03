import { Component, OnInit } from '@angular/core';
import { SpinnerService } from 'src/app/service/spinner.service';

@Component({
  selector: 'app-loading',
  templateUrl: './loading.component.html',
  styleUrls: ['./loading.component.css']
})
export class LoadingComponent implements OnInit {

  isLoading$ = this.spinnerSrv.isLoading$;
  
  constructor(private spinnerSrv: SpinnerService) { }

  ngOnInit(): void {
  }

}

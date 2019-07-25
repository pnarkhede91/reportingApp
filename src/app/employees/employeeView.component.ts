import { Component,OnInit,Input} from '@angular/core';



@Component({
  
	     selector:'employee-details-view',
  		templateUrl:'./employeeView.component.html'

	
})
export class EmployeeComponentView  implements OnInit
{ 
	@Input() record: any[];

	ngOnInit()
	{
		
	}
}


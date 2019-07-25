import { Pipe,PipeTransform} from '@angular/core'

@Pipe({
	name:'inhand'
})

export class EmployeesSalaryPipe implements PipeTransform {
	
	transform(value:number,tax:number)
	{
		tax=tax>1?tax:10;
		return (value)-((value)*tax/100);
		
	}
}
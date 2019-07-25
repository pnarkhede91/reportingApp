import { Injectable } from '@angular/core';
import { IEmployee } from './IEmployee';
import { Http,Headers,Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/Observable/throw';

@Injectable()
export class EmployeeService  
{ 
	baseUrl:string;
	constructor(private http:Http){
		
		this.baseUrl="http://localhost/demo7_api/api/webservice/";
		
	}
	
	
	getemployeeData():Observable<IEmployee[]>{
		return this.http.get('./app/employee/employee.json')
		.map((resp:Response)=>resp.json()).catch(this.errorHandling);
	}
	errorHandling(error:Response):Observable<any[]>
	{
		console.log(error);
		throw error;
	}
	checklogin(username:any,password:any):Observable<any[]>
	{
		let headers=new Headers();
		
		return this.http.post(this.baseUrl+'login?username='+username+'&password='+password,{headers:headers}).
		map((resp:Response)=>resp.json()).catch(this.errorHandling);
		
		
	}
	getDistrictList():Observable<any[]>
	{
		let headers=new Headers();
		headers.append('Content-Type','application/x-www-form-urlencoded');
 		headers.append('Content-Type','application/json');
		
		return this.http.post(this.baseUrl+'getDistrictList',{headers:headers}).map((resp:Response)=>resp.json()).catch(this.errorHandling);
	}
	
	getTalukaList(dt_id:any):Observable<any[]>
	{
		let headers=new Headers();
		return this.http.get(this.baseUrl+'getTalukaList?dt_id='+dt_id,{headers:headers}).map((resp:Response)=>resp.json()).catch(this.errorHandling);
		
	}
	getPlaceList(tt_id:any):Observable<any[]>
	{
		let headers=new Headers();
		return this.http.get(this.baseUrl+'getPlaceList?tt_id='+tt_id,{headers:headers}).map((resp:Response)=>resp.json()).catch(this.errorHandling);
		
	}
	getCropList():Observable<any[]>{
		
		let headers=new Headers();
		
		return this.http.get(this.baseUrl+'getCropList',{headers:headers})
			.map((resp:Response)=>resp.json())
			
      		.catch(this.errorHandling); 
		
	}
	farmerRecordEntry(data:any,loginId:any):Observable<any[]>
	{
		let dt_id=data['dt_id'];
		let farmer_name=data['farmer_name'];
		let fk_crop_id=data['fk_crop_id'];
		let follow_up=data['follow_up'];
		let follow_up_date=data['follow_up_date'];
		let mobile_no=data['mobile_no'];
		let tt_id=data['tt_id'];
		let pt_id=data['pt_id'];
		let acarage=data['acarage'];
		

		let headers=new Headers();
		
		return this.http.post(this.baseUrl+'farmerRecordEntry?dt_id='+dt_id+'&farmer_name='+farmer_name+'&fk_crop_id='+fk_crop_id+'&follow_up='+follow_up+'&follow_up_date='+follow_up_date+'&mobile_no='+mobile_no+'&tt_id='+tt_id+'&loginId='+loginId+'&pt_id='+pt_id+'&acarage='+acarage,{headers:headers})
			.map((resp:Response)=>resp.json())
			
      		.catch(this.errorHandling); 
	}
	
	farmerRecordEntryList(loginId:any):Observable<any[]>
	{
		let headers=new Headers();
		return this.http.get(this.baseUrl+'farmerRecordEntryList?loginId='+loginId,{headers:headers})
		.map((resp:Response)=>resp.json()).catch(this.errorHandling);
	}
	
	RemoveFarmerRecord(tempf_id:any):Observable<any[]>
	{
		let headers=new Headers();
		return this.http.get(this.baseUrl+'RemoveFarmerRecord?tempf_id='+tempf_id,{headers:headers})
		.map((resp:Response)=>resp.json()).catch(this.errorHandling);
	}
	farmerRecordUpdate(data:any):Observable<any[]>
	{
		let dt_id=data['dt_id'];
		let farmer_name=data['farmer_name'];
		let fk_crop_id=data['fk_crop_id'];
		let follow_up=data['follow_up'];
		let follow_up_date=data['follow_up_date'];
		let mobile_no=data['mobile_no'];
		let tt_id=data['tt_id'];
		let pt_id=data['pt_id'];
		let acarage=data['acarage'];
		let tempf_id=data['tempf_id'];

		
		let headers=new Headers();
		return this.http.post(this.baseUrl+'farmerRecordUpdate?dt_id='+dt_id+'&farmer_name='+farmer_name+'&fk_crop_id='+fk_crop_id+'&follow_up='+follow_up+'&follow_up_date='+follow_up_date+'&mobile_no='+mobile_no+'&tt_id='+tt_id+'&pt_id='+pt_id+'&acarage='+acarage+'&tempf_id='+tempf_id,{headers:headers})
			.map((resp:Response)=>resp.json())
			
      		.catch(this.errorHandling); 
	}
	
	getPermission():Observable<any[]>
	{
		let headers=new Headers();
		
		return this.http.get(this.baseUrl+'getPermission',{headers:headers}).map((resp:Response)=>resp.json()).catch(this.errorHandling);
	}
	submitFarmerData(report_date:any,loginId:any):Observable<any[]>
	{
		let headers=new Headers();
		return;
		//return this.http.get(this.baseUrl+'getPermission',{headers:headers}).map((resp:Response)=>resp.json()).catch(this.errorHandling);
	}
	checkReportList(login_id:any):Observable<any[]>
	{
		let headers=new Headers();
		return this.http.get(this.baseUrl+'checkReportList?loginId='+login_id,{headers:headers}).map((resp:Response)=>resp.json()).catch(this.errorHandling);
		
	}
	uploadFile(data:any):Observable<any[]>
		{
			
			console.log(data.values);
			console.log(data['dt_id']);

		let headers=new Headers();
		return this.http.post(this.baseUrl+'uploadFile',data,{headers:headers}).map((resp:Response)=>resp.json()).catch(this.errorHandling);
		
	}
	
	
	
	getemployeeData1():Observable<any[]>
	{
		let headers=new Headers();
		//let options = new RequestOptions({headers});
		return this.http.get(this.baseUrl+'userList.php',{headers:headers})
		.map((resp:Response)=>resp.json()).catch(this.errorHandling);
	}
	
	deleteEmployee(employee_id:any):Observable<any>
	{
		let headers=new Headers();
		//let options = new RequestOptions({headers});
		return this.http.post(this.baseUrl+'deleteUserList.php',{employee_id:employee_id},{headers:headers})
		.map((resp:Response)=>resp.json()).catch(this.errorHandling);
	}
	
	searchDataFilter(cname:any,cmobile:any):Observable<any>
	{
		let headers=new Headers();
		//let options = new RequestOptions({headers});
		
		return this.http.post(this.baseUrl+'deleteUserList.php?cname='+cname+'&cmobile='+cmobile,{headers:headers})
		.map((resp:Response)=>resp.json()).catch(this.errorHandling);
	}
	searchProductFilter(cname:any,comp_id:any):Observable<any>
	{
		let headers=new Headers();
		//let options = new RequestOptions({headers});
		
		return this.http.post(this.baseUrl+'filterProductList.php?cname='+cname+'&comp_id='+comp_id,{headers:headers})
		.map((resp:Response)=>resp.json()).catch(this.errorHandling);
	}
	
	getStaffList():Observable<any[]>
	{
		let headers=new Headers();
		return this.http.get(this.baseUrl+'getStaffList.php',{headers:headers}).
		map((resp:Response)=>resp.json()).catch(this.errorHandling);
	}
	addNewStaff1(data:any):Observable<any[]>
	{
		
		let emp_name=data['emp_name'];
		let emo_mobile=data['emo_mobile'];
		let emp_email=data['emp_email'];
		let emp_add=data['emp_add'];
		let emp_birth_date=data['emp_birth_date'];
		let emp_pass=data['emp_pass'];
	
		let headers=new Headers();
		return this.http.post(this.baseUrl+'add_new_user.php?emp_name='+emp_name+'&emo_mobile='+emo_mobile+'&emp_email='+emp_email+'&emp_add='+emp_add+'&emp_birth_date='+emp_birth_date+'&emp_pass='+emp_pass,{headers:headers}).
		map((resp:Response)=>resp.json()).catch(this.errorHandling);
	
	}
	
	RemoveStaff(employee_id:any):Observable<any>
	{
		let headers=new Headers();
		//let options = new RequestOptions({headers});
		return this.http.post(this.baseUrl+'deleteStaff.php?employee_id='+employee_id,{headers:headers})
		.map((resp:Response)=>resp.json()).catch(this.errorHandling);
	}
	
	editNewStaff(data:any):Observable<any[]>
	{
		
		let emp_name=data['emp_name'];
		let emo_mobile=data['emo_mobile'];
		let emp_email=data['emp_email'];
		let emp_add=data['emp_add'];
		let emp_birth_date=data['emp_birth_date'];
		let emp_pass=data['emp_pass'];
		let emp_id=data['emp_id'];
	
		let headers=new Headers();
		return this.http.post(this.baseUrl+'edit_new_user.php?emp_name='+emp_name+'&emo_mobile='+emo_mobile+'&emp_email='+emp_email+'&emp_add='+emp_add+'&emp_birth_date='+emp_birth_date+'&emp_pass='+emp_pass+'&emp_id='+emp_id,{headers:headers}).
		map((resp:Response)=>resp.json()).catch(this.errorHandling);
	
	}
	
	getCompanyRecord():Observable<any[]>
	{
		let headers=new Headers();
		return this.http.get(this.baseUrl+'companyDetails.php',{headers:headers})
		.map((resp:Response)=>resp.json()).catch(this.errorHandling);
	}
	updateShopDetails(data:any):Observable<any[]>
	{
		let shop_id=data['shop_id'];
		let shop_name=data['shop_name'];
		let shop_add=data['shop_add'];
		let shop_gst_no=data['shop_gst_no'];
		
		let headers=new Headers();
		return this.http.post(this.baseUrl+"updateShopDetails.php?shop_id="+shop_id+"&shop_name="+shop_name+"&shop_add="+shop_add+"&shop_gst_no="+shop_gst_no,{headers:headers}).map((resp:Response)=>resp.json()).catch(this.errorHandling);
	}
	
	getProductCompany():Observable<any[]>
	{
		let headers=new Headers();
		return this.http.get(this.baseUrl+'getCompanyList.php',{headers:headers})
		.map((resp:Response)=>resp.json()).catch(this.errorHandling);
	}
	
	
	addNewCompany(data:any):Observable<any[]>
	{
		
		let comp_name=data['comp_name'];
	
		let headers=new Headers();
		return this.http.post(this.baseUrl+'addNewCompany.php?comp_name='+comp_name,{headers:headers}).
		map((resp:Response)=>resp.json()).catch(this.errorHandling);
	
	}
	editCompany(data:any):Observable<any[]>
	{
		
		let comp_name=data['comp_name'];
		let comp_id=data['comp_id'];
	
		let headers=new Headers();
		return this.http.post(this.baseUrl+'editCompany.php?comp_name='+comp_name+"&comp_id="+comp_id,{headers:headers}).
		map((resp:Response)=>resp.json()).catch(this.errorHandling);
	
	}
	RemoveCompany(comp_id:any):Observable<any[]>
	{
		
	
		let headers=new Headers();
		return this.http.post(this.baseUrl+"RemoveCompany.php?comp_id="+comp_id,{headers:headers}).
		map((resp:Response)=>resp.json()).catch(this.errorHandling);
	
	}
	getProductList():Observable<any[]>
	{
		let headers=new Headers();
		return this.http.get(this.baseUrl+"getProductList.php",{headers:headers}).map((resp:Response)=>resp.json()).catch(this.errorHandling);
	}
	addNewProduct(data:any):Observable<any[]>
	{
		/*
		let product_name=data['product_name'];
		let product_rate=data['product_rate'];
		let fk_comp_id=data['fk_comp_id'];

		let headers=new Headers();
		return this.http.post('http://localhost/web_services/addNewProduct.php?product_name='+product_name+'&product_rate='+product_rate+'&fk_comp_id='+fk_comp_id,{headers:headers}).
		map((resp:Response)=>resp.json()).catch(this.errorHandling);
		
		*/
		let headers=new Headers();
		
		return this.http.post(this.baseUrl+'addNewProduct.php',data,{headers:headers}).
		map((resp:Response)=>resp.json()).catch(this.errorHandling);
	
	}
	editProduct(data:any):Observable<any[]>
	{
		
		/*
		let product_name=data['product_name'];
		let product_rate=data['product_rate'];
		let fk_comp_id=data['fk_comp_id'];
		let product_id=data['product_id'];

		let headers=new Headers();
		return this.http.post('http://localhost/web_services/edit_product.php?product_name='+product_name+'&product_rate='+product_rate+'&fk_comp_id='+fk_comp_id+'&product_id='+product_id,{headers:headers}).
		map((resp:Response)=>resp.json()).catch(this.errorHandling);
		
		*/
		
		let headers=new Headers();
		return this.http.post(this.baseUrl+'edit_product.php',data,{headers:headers}).
		map((resp:Response)=>resp.json()).catch(this.errorHandling);
		
	}
	RemoveProduct(product_id:any):Observable<any[]>
	{
		let headers=new Headers();
		return this.http.post(this.baseUrl+'removeProduct.php?product_id='+product_id,{headers:headers}).
		map((resp:Response)=>resp.json()).catch(this.errorHandling);
		
		
	}
	
	
	getProductListByCompany(company_id:any):Observable<any[]>
	{
		let headers=new Headers();
		
		return this.http.get(this.baseUrl+"getProductListByCompany.php?company_id="+company_id,{headers:headers}).map((resp:Response)=>resp.json()).catch(this.errorHandling);
	}
	saveToCart(data:any):Observable<any[]>
	{
		let headers=new Headers();
		
		return this.http.post(this.baseUrl+"add_temp_cart.php",data,{headers:headers}).map((resp:Response)=>resp.json()).catch(this.errorHandling);
	}
	getTempCart(login_id:any):Observable<any[]>
	{
		let headers=new Headers();
		
		return this.http.post(this.baseUrl+"get_temp_order_item.php?login_id="+login_id,{headers:headers}).map((resp:Response)=>resp.json()).catch(this.errorHandling);
	}
	removeCartData(cart_id:any):Observable<any[]>
	{
		let headers=new Headers();
		
		return this.http.post(this.baseUrl+"removeCartData.php?cart_id="+cart_id,{headers:headers}).map((resp:Response)=>resp.json()).catch(this.errorHandling);
	}
	saveOrder(data:any,login_id:any):Observable<any[]>
	{
		let headers=new Headers();
		let customer_name=data['customer_name'];
		let customer_mobile=data['customer_mobile'];
	

		//console.log(customer_name+""+customer_mobile+""+login_id);
		return this.http.post(this.baseUrl+"save_new_order.php?customer_name="+customer_name+"&customer_mobile="+customer_mobile+"&login_id="+login_id,{headers:headers}).map((resp:Response)=>resp.json()).catch(this.errorHandling);
	}
	getOrderList(login_id:any):Observable<any[]>
	{
		let headers=new Headers();
		
		return this.http.post(this.baseUrl+"get_order_list.php?login_id="+login_id,{headers:headers}).map((resp:Response)=>resp.json()).catch(this.errorHandling);
	}
	getOrderListDetails(order_id:any):Observable<any[]>
	{
		let headers=new Headers();
		return this.http.post(this.baseUrl+"get_order_list_details.php?co_id="+order_id,{headers:headers}).map((resp:Response)=>resp.json()).catch(this.errorHandling);
	}
	
	
	
	

}

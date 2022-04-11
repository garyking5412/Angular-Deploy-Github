import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';
import { CategoryServiceService } from '../category-service.service';
import { EmployeeService } from '../employee.service';
import { ProductServicesService } from '../product-services.service';

@Component({
  selector: 'app-spring-boot-api',
  templateUrl: './spring-boot-api.component.html',
  styleUrls: ['./spring-boot-api.component.css'],
})
export class SpringBootApiComponent implements OnInit {
  constructor(private EmpSer: EmployeeService, private datePipe: DatePipe) {}
  employees: any[] = [];
  emp: any = {
    id: 0,
    gender: 0,
    sal: 0,
    name: '',
    ad: '',
    pos: '',
    birth: '',
  };
  url: string = 'http://localhost:8089/api/emps';
  // products: any[] = [];
  // url: string = 'http://localhost:8089/api/products';
  // load() {
  //   this.cateSer.getFromApi(this.url).subscribe((res) => {
  //     this.products = res;
  //     console.log(this.products);
  //   });
  // }
  // cate = {
  //   name: '',
  //   status: 0,
  //   parentId: 0,
  // };
  // add(cate: any) {
  //   this.cateSer.postToApi(this.url, cate).subscribe((res) => {
  //     if (res != null) {
  //       console.log('success!');
  //     } else {
  //       console.log('false!');
  //     }
  //     this.load();
  //   });
  // }
  load() {
    this.EmpSer.getFromApi(this.url + '/getAll').subscribe((res) => {
      this.employees = res;
    });
  }
  convertDate(json: any): String {
    // const j = JSON.stringify(json);
    const d = new Date(JSON.parse(json));
    return d.toISOString();
  }
  loadDetail(id: any) {
    this.EmpSer.getFromApi(this.url + '/' + id).subscribe((res) => {
      this.emp = res;
      // // this.emp.birth = JSON.stringify(this.emp.birth);
      // this.emp.birth = moment('2014-27-11', 'yyyy--MM--dd');
      this.emp.birth = this.datePipe.transform(
        new Date(this.emp.birth),
        'yyyy-MM-dd'
      );
      console.log(this.emp.birth);
      if (this.emp.gender == 1) {
        // document.getElementById("male")?.style.checked = true;
      }
      console.log(this.emp.gender);
    });
  }
  add(entity: any) {
    let emp = {
      name: entity.name,
      gender: entity.gender,
      sal: entity.sal,
      ad: entity.ad,
      pos: entity.pos,
      birth: entity.birth,
    };
    this.EmpSer.postToApi(this.url, emp).subscribe((res) => {
      console.log(res);
      this.load();
    });
  }
  remove(id: any) {
    this.EmpSer.deleteFromApi(this.url + '/' + id).subscribe((res) => {
      console.log(JSON.parse(res));
      this.emp = {
        id: 0,
        gender: 0,
        sal: 0,
        name: '',
        ad: '',
        pos: '',
        birth: '',
      };
      this.load();
    });
  }
  update(entity: any) {
    this.EmpSer.putToApi(this.url + '/' + entity.id, entity).subscribe(
      (res) => {
        console.log(res);
        this.load();
      }
    );
  }
  ngOnInit(): void {
    this.load();
  }
}

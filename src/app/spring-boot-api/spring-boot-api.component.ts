import { Component, OnInit } from '@angular/core';
import { CategoryServiceService } from '../category-service.service';
import { ProductServicesService } from '../product-services.service';

@Component({
  selector: 'app-spring-boot-api',
  templateUrl: './spring-boot-api.component.html',
  styleUrls: ['./spring-boot-api.component.css'],
})
export class SpringBootApiComponent implements OnInit {
  constructor(private cateSer: CategoryServiceService) {}
  products: any[] = [];
  url: string = 'http://localhost:8089/api/products';
  load() {
    this.cateSer.getFromApi(this.url).subscribe((res) => {
      this.products = res;
      console.log(this.products);
    });
  }
  cate = {
    name: '',
    status: 0,
    parentId: 0,
  };
  add(cate: any) {
    this.cateSer.postToApi(this.url, cate).subscribe((res) => {
      if (res != null) {
        console.log('success!');
      } else {
        console.log('false!');
      }
      this.load();
    });
  }
  ngOnInit(): void {
    this.load();
  }
}

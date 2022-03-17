import { Component, OnInit } from '@angular/core';
import { map } from 'jquery';
import { ProductServicesService } from 'src/app/product-services.service';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.css'],
})
export class BlogComponent implements OnInit {
  constructor(private proSer: ProductServicesService) {}
  blogs: any = [];
  loadCate() {
    var categoryList: any = [];
    let flag = true;
    let newCate = {
      category: '',
      quantity: 1,
    };
    for (let item of this.blogs) {
      for (let cate of categoryList) {
        if (item.category === cate.category) {
          cate.quantity += 1;
          flag = false;
        } else {
          newCate.category = item.category;
          newCate.quantity = 1;
        }
        if (flag) {
          categoryList.push(newCate);
        }
      }
    }
    return categoryList;
  }
  ngOnInit(): void {
    this.proSer.getFromApi('http://localhost:3000/blogs').subscribe((res) => {
      console.log(res);
      this.blogs = res;
      this.loadCate();
      console.log(this.blogs);
      console.log(this.loadCate());
    });
  }
}

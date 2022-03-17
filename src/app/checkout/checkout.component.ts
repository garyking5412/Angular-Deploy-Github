import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductServicesService } from '../product-services.service';
declare var $: JQueryStatic;
@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css'],
})
export class CheckoutComponent implements OnInit {
  constructor(private route: Router) {}
  countryList: any[] = [
    'Viet Nam',
    'United States of America',
    'United Kingdom',
    'Japan',
    'China',
  ];
  paymentList: any[] = [
    'Cash on Delivery',
    'MasterCard',
    'MoMo',
    'ZaloPay',
    'ViettelPay',
  ];
  methodList: any[] = ['FedEx', 'Amazon Prime', 'Tiki', 'Shoppee', 'Baemin'];
  country: string = this.countryList[0];
  payment: string = this.paymentList[0];
  shipping: string = this.methodList[0];
  toString(param1: number, param2: string) {
    if (param1 == 1) {
      this.country = param2;
    }
    if (param1 == 2) {
      this.payment = param2;
    }
    if (param1 == 3) {
      this.shipping = param2;
    }
    // console.log(this.country);
  }
  sum(): number {
    let sumUp: number = 0;
    this.carts.forEach(
      (element: { product: { price: number }; quantity: number }) => {
        sumUp += element.product.price * element.quantity;
      }
    );
    return sumUp;
  }

  remove(product: any) {
    console.log(product.product.name);
    let name = product.product.name;
    this.carts.forEach((element: any) => {
      if (element.product.name === name) {
        let index = this.carts.indexOf(element);
        this.carts.splice(index, 1);
      }
    });
    localStorage.setItem('carts', JSON.stringify(this.carts));
  }
  tax(): number {
    let sumTax: number = 0;
    this.carts.forEach((element: any) => {
      sumTax += element.quantity * 2;
    });
    return sumTax;
  }
  ship: number = 4;
  total(): number {
    let x = this.sum();
    let total = x + this.tax() + this.ship;
    return total;
  }
  surf() {
    this.route.navigate(['product']);
  }
  // buttonLoad(e: any) {
  //   e = $(e);
  //   e.text('');
  //   e.children().remove();
  //   e.append(
  //     "<span class='spinner-border spinner-border-sm' role='status' aria-hidden='true'></span>"
  //   );
  // }
  // $(document).ready(function() {
  //   $("#btnFetch").click(function() {
  //   // disable button
  //   $(this).prop("disabled", true);
  //   // add spinner to button
  //   $(this).html(
  //   '<i class="fa fa-circle-o-notch fa-spin"></i> loading...'
  //   );
  //   });
  //   });
  // fetch() {
  //   $('#order').prop('disabled', true);
  //   $('#order').html('<i class="fa fa-circle-o-notch fa-spin"></i> loading...');
  // }
  check: boolean = true;
  fetch() {
    this.check = false;
  }
  carts: any = [];
  ngOnInit(): void {
    this.carts = localStorage.getItem('carts')
      ? JSON.parse(localStorage.getItem('carts') || '{}')
      : [];
    console.log(this.sum());
  }
}

import { UserService } from './../user.service';
import { LazyLoadScriptService } from './../lazy-load-script.service';
import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import * as $ from 'jquery';
import { Router } from '@angular/router';
@Component({
  selector: 'app-header1',
  templateUrl: './header1.component.html',
  styleUrls: ['./header1.component.css'],
})
export class Header1Component implements OnInit {
  @Input() carts: any[] = [];
  constructor(
    private lz: LazyLoadScriptService,
    private formBuilder: FormBuilder,
    private userSer: UserService,
    private router: Router
  ) {}
  frmLogin: FormGroup = this.formBuilder.group({
    username: ['', [Validators.minLength(8), Validators.required]],
    password: ['', [Validators.required]],
  });
  frmRegister: FormGroup = this.formBuilder.group({
    username: ['', [Validators.minLength(8), Validators.required]],
    password: ['', [Validators.required]],
    cfmPassword: ['', [Validators.required]],
  });
  loadSlick() {
    this.lz.loadScript('assets/js/bakery.js').subscribe((x) => {
      console.log('slick loaded!');
    });
  }
  toggleSearchBar(): void {
    let type = $('#searchInput').data('type');
    if (type == 'active') {
      $('#searchInput').data('type', 'inactive');
      $('#searchInput').slideUp(500);
    } else {
      $('#searchInput').data('type', 'active');
      $('#searchInput').slideDown(500);
    }
  }
  checkType: any = $('#cart').data('type');
  showCart(): void {
    let type = $('#cart').data('type');
    console.log(type);
    if (type == 'active') {
      $('#cart').data('type', 'inactive');
      // $('#cart').hide(500, 'linear');
      $('.shop').css({ visibility: 'visible', transform: 'scale(0,0)' });
      $('#btnCart').css('background-color', '#757575');
      // $('#btnCart').css('background-color', '#fff');
      // $('#btnCart').css('background-color', 'none');
    } else {
      $('#cart').data('type', 'active');
      // $('#cart').show(500);
      $('.shop').css({ visibility: 'visible', transform: 'scale(1,1)' });
      $('#btnCart').css('background-color', '#fff');
      $('#btnCart').css('color', '#000');
      // $('#btnCart').css('background-color', '#c8aa7b');
    }
  }
  sum(): number {
    let sumUp: number = 0;
    this.carts.forEach((element) => {
      sumUp += element.product.price * element.quantity;
    });
    return sumUp;
  }
  remove(product: any) {
    console.log(product.product.name);
    let name = product.product.name;
    this.carts.forEach((element) => {
      if (element.product.name === name) {
        let index = this.carts.indexOf(element);
        this.carts.splice(index, 1);
      }
    });
    localStorage.setItem('carts', JSON.stringify(this.carts));
  }
  // hideCart() {
  //   $('.shop').css({ visibility: 'visible', transform: 'scale(0,0)' });
  //   $('#btnCart').css('background-color', '#757575');
  // }
  username: string = '';
  password: string = '';
  user = {
    username: '',
    password: '',
  };
  myAcc: string = 'My Account';
  login() {
    this.userSer
      .getUser(this.user.username, this.user.password)
      .subscribe((res) => {
        if (res.length > 0) {
          this.myAcc = this.user.username;
          console.log(res);
          sessionStorage.setItem('user', JSON.stringify(res));
          alert('login success!');
          this.user.username = '';
          this.user.password = '';
        } else {
          alert('login failed!');
        }
        console.log(res);
      });
  }
  register() {
    this.userSer
      .post('http://localhost:3000/users', this.user)
      .subscribe((x) => {
        console.log(x);
      });
  }
  checkout() {
    this.router.navigate(['checkout']);
  }

  ngOnInit(): void {
    // $('#nav-HomePage').css('color', '#c8aa7b'
    $('#searchInput').data('type', 'inactive');
    $('#searchInput').hide();
    $('#cart').data('type', 'inactive');
    // $('#cart').hide();
    let names: any[] = [];
    names = sessionStorage.getItem('user')
      ? JSON.parse(sessionStorage.getItem('user') || '{}')
      : [];
    if (names[0].username == '') {
      this.myAcc = 'My Account';
    } else {
      this.myAcc = names[0].username;
    }
    this.carts = localStorage.getItem('carts')
      ? JSON.parse(localStorage.getItem('carts') || '{}')
      : [];
  }
}

import { HttpClient } from '@angular/common/http';
import { invalid } from '@angular/compiler/src/render3/view/util';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  formsubmiited:boolean = false;
  constructor(private formbuilder: FormBuilder, private _http:HttpClient, private _router:Router ) { }

  ngOnInit(): void {
    this.loginForm = this.formbuilder.group({
      email: ['',Validators.required],
      password: ['',Validators.required]
    });
  }

  get f(){
    return this.loginForm.controls;
  }
  logIn() {
    this.formsubmiited = true;
    if(this.loginForm.invalid){
      return;
    }
    //console.log(this.loginForm.value);
    this._http.get<any>('http://localhost:3000/signup').subscribe(
      (res) => {
        const user= res.find((a:any)=>{
          return a.email === this.loginForm.value.email && a.password === this.loginForm.value.password;
        });
         if (user) {
          alert(user.name + ' logged in successfully');
          this._router.navigate(['/restaurent']);
          this.loginForm.reset();
         } else {
          alert("Invalid credentials");
         }
        }, err=>{
          console.log(err);
        })
      }
    
      logIn1(){
        this.formsubmiited = true;
        if(this.loginForm.invalid){
          return
        }else{
          this._http.get<any>('http://localhost:3000/signup').subscribe((res) => {
            console.log(res);

            const user= res.find((a:any)=>{
              return a.email === this.loginForm.value.email && a.password === this.loginForm.value.password 
            });

            if(user){
              alert (user.name + 'your loggedin successfully') 
            }else{
              alert('email and password are invalid')
            }
          })
        }
      }
  }



import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  signupForm!: FormGroup;
  signupsubmitted:boolean = false;
  constructor(private formbuilder: FormBuilder, private _http:HttpClient, private _router:Router) { }

  ngOnInit(): void {
    this.signupForm = this.formbuilder.group({
      name:['',Validators.required],
      email:['',Validators.required],
      mobile:['',Validators.required],
      password: ['',Validators.required]
    })
  }

  get s(){
    return this.signupForm.controls;
  }
  signUp(){
    this._http.post<any>('http://localhost:3000/signup',this.signupForm.value).subscribe(res=>{
      console.log(res)
      alert('Signup Successfully');
      this.signupForm.reset();
      this._router.navigate(['/login']);
    }), (err: any)=>{
      console.log(err);
      alert('Signup Error');
    }
  }


  signup1(){
    this.signupsubmitted = true;
    if(this.signupForm.invalid){
      return
    }else{
      this._http.post<any>('http://localhost:3000/signup',this.signupForm.value).subscribe((res)=> {
        console.log(res);
        alert('Signup Successfully');
        this.signupForm.reset();
        this._router.navigate(['/login']);
      },(err:any) => {
        console.log(err);
        alert('signup error')
      })
    }
  }
}

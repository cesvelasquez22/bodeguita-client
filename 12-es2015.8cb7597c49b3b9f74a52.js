(window.webpackJsonp=window.webpackJsonp||[]).push([[12],{OB9l:function(t,e,r){"use strict";r.r(e),r.d(e,"UsersModule",(function(){return tt}));var o=r("ofXK"),i=r("tyNb"),a=r("M9IT"),s=r("+0xr"),n=r("fXoL"),c=r("k5Ln"),u=r("AytR"),l=r("tk/3");let b=(()=>{class t{constructor(t){this.http=t}getUsers(){return this.http.get(u.a.API_URL+u.a.usuarioPrefix+"/UsuarioList")}getUser(t){return this.http.get(`${u.a.API_URL+u.a.usuarioPrefix}/Usuario/${t}`)}createUser(t){return this.http.post(u.a.API_URL+u.a.usuarioPrefix+"/AddUsuario",t,{headers:c.a,responseType:"text"})}updateUser(t){return this.http.put(`${u.a.API_URL+u.a.usuarioPrefix}/UpdateUsuario/${t.Idusuario}`,t,{headers:c.a,responseType:"text"})}}return t.\u0275fac=function(e){return new(e||t)(n.Xb(l.b))},t.\u0275prov=n.Jb({token:t,factory:t.\u0275fac}),t})();var m=r("K/TF"),d=r("XiUz"),f=r("ngNO"),h=r("bTqV"),p=r("NFeN");function g(t,e){1&t&&(n.Tb(0,"th",21),n.Fc(1,"No."),n.Sb())}function S(t,e){if(1&t&&(n.Tb(0,"td",22),n.Fc(1),n.Sb()),2&t){const t=e.index;n.Bb(1),n.Hc(" ",t+1," ")}}function F(t,e){1&t&&(n.Tb(0,"th",21),n.Fc(1,"Nombre completo"),n.Sb())}function v(t,e){if(1&t&&(n.Tb(0,"td",22),n.Fc(1),n.Sb()),2&t){const t=e.$implicit;n.Bb(1),n.Hc(" ",t.Nombre," ")}}function T(t,e){1&t&&(n.Tb(0,"th",21),n.Fc(1,"Usuario"),n.Sb())}function y(t,e){if(1&t&&(n.Tb(0,"td",22),n.Fc(1),n.Sb()),2&t){const t=e.$implicit;n.Bb(1),n.Hc(" ",t.UserName," ")}}function D(t,e){1&t&&(n.Tb(0,"th",21),n.Fc(1,"Correo Electr\xf3nico"),n.Sb())}function N(t,e){if(1&t&&(n.Tb(0,"td",22),n.Fc(1),n.Sb()),2&t){const t=e.$implicit;n.Bb(1),n.Hc(" ",t.Correo," ")}}function C(t,e){1&t&&(n.Tb(0,"th",21),n.Fc(1," Rol "),n.Sb())}function I(t,e){if(1&t&&(n.Tb(0,"td",22),n.Fc(1),n.Sb()),2&t){const t=e.$implicit;n.Bb(1),n.Hc(" ",t.Idrole," ")}}function U(t,e){1&t&&(n.Tb(0,"th",21),n.Fc(1,"Acciones"),n.Sb())}function w(t,e){if(1&t&&(n.Tb(0,"td",22),n.Tb(1,"button",23),n.Tb(2,"mat-icon"),n.Fc(3,"edit"),n.Sb(),n.Sb(),n.Sb()),2&t){const t=e.$implicit;n.Bb(1),n.lc("routerLink",t.Idusuario)}}function x(t,e){1&t&&n.Ob(0,"tr",24)}function L(t,e){1&t&&n.Ob(0,"tr",25)}const A=function(){return[10,20]};let B=(()=>{class t{constructor(t){this.userService=t,this.displayedColumns=["Posicion","Nombre","UserName","Correo","Idrole","actions"],this.dataSource=new s.l([])}ngOnInit(){this.getUsers()}getUsers(){this.loading=!0,this.userService.getUsers().subscribe(t=>{t&&t.length>0&&(this.dataSource=new s.l(t),this.dataSource.paginator=this.paginator),this.loading=!1},t=>this.loading=!1)}}return t.\u0275fac=function(e){return new(e||t)(n.Nb(b))},t.\u0275cmp=n.Hb({type:t,selectors:[["app-user-list"]],viewQuery:function(t,e){var r;1&t&&n.Ic(a.a,!0),2&t&&n.pc(r=n.cc())&&(e.paginator=r.first)},decls:33,vars:9,consts:[[3,"isActive"],["fxLayout","column",1,"page-layout","simple","fullwidth"],[3,"icon","section","title"],["fxLayout","column",1,"mx-12","mt-32"],["fxLayout","row","fxLayoutAlign","end center"],["fxLayout","row","fxLayoutAlign","end center",1,"mt-12","create-button"],["mat-fab","","routerLink","create",1,"accent"],["fxLayout","column",1,"mx-12"],["fxFlex","100",1,"mat-elevation-z8"],["mat-table","",2,"width","100%",3,"dataSource"],["matColumnDef","Posicion"],["mat-header-cell","",4,"matHeaderCellDef"],["mat-cell","",4,"matCellDef"],["matColumnDef","Nombre"],["matColumnDef","UserName"],["matColumnDef","Correo"],["matColumnDef","Idrole"],["matColumnDef","actions"],["mat-header-row","",4,"matHeaderRowDef"],["mat-row","",4,"matRowDef","matRowDefColumns"],["fxLayoutAlign","end center","showFirstLastButtons","",2,"width","100%",3,"pageSizeOptions"],["mat-header-cell",""],["mat-cell",""],["mat-icon-button","","color","accent",3,"routerLink"],["mat-header-row",""],["mat-row",""]],template:function(t,e){1&t&&(n.Ob(0,"app-loading-overlay",0),n.Tb(1,"div",1),n.Ob(2,"app-title-header",2),n.Tb(3,"div",3),n.Tb(4,"div",4),n.Tb(5,"div",5),n.Tb(6,"button",6),n.Tb(7,"mat-icon"),n.Fc(8,"playlist_add"),n.Sb(),n.Sb(),n.Sb(),n.Sb(),n.Tb(9,"div",7),n.Tb(10,"div",8),n.Tb(11,"table",9),n.Rb(12,10),n.Dc(13,g,2,0,"th",11),n.Dc(14,S,2,1,"td",12),n.Qb(),n.Rb(15,13),n.Dc(16,F,2,0,"th",11),n.Dc(17,v,2,1,"td",12),n.Qb(),n.Rb(18,14),n.Dc(19,T,2,0,"th",11),n.Dc(20,y,2,1,"td",12),n.Qb(),n.Rb(21,15),n.Dc(22,D,2,0,"th",11),n.Dc(23,N,2,1,"td",12),n.Qb(),n.Rb(24,16),n.Dc(25,C,2,0,"th",11),n.Dc(26,I,2,1,"td",12),n.Qb(),n.Rb(27,17),n.Dc(28,U,2,0,"th",11),n.Dc(29,w,4,1,"td",12),n.Qb(),n.Dc(30,x,1,0,"tr",18),n.Dc(31,L,1,0,"tr",19),n.Sb(),n.Ob(32,"mat-paginator",20),n.Sb(),n.Sb(),n.Sb(),n.Sb()),2&t&&(n.lc("isActive",e.loading),n.Bb(2),n.lc("icon","assistant")("section","Usuarios")("title","Listado"),n.Bb(9),n.lc("dataSource",e.dataSource),n.Bb(19),n.lc("matHeaderRowDef",e.displayedColumns),n.Bb(1),n.lc("matRowDefColumns",e.displayedColumns),n.Bb(1),n.lc("pageSizeOptions",n.mc(8,A)))},directives:[m.a,d.c,f.a,d.b,h.a,i.h,p.a,d.a,s.k,s.c,s.e,s.b,s.g,s.j,a.a,s.d,s.a,s.f,s.i],styles:[""]}),t})();var R=r("3Pt+"),k=r("XNiG"),O=r("1G5W"),q=r("xNEF"),E=r("K8I4"),P=r("Wp6s"),H=r("kmnG"),$=r("qFsG"),z=r("d3UM"),V=r("FKr1");function G(t,e){1&t&&(n.Tb(0,"mat-error"),n.Fc(1," El nombre completo es requerido "),n.Sb())}function _(t,e){1&t&&(n.Tb(0,"mat-error"),n.Fc(1," El correo es requerido "),n.Sb())}function Q(t,e){1&t&&(n.Tb(0,"mat-error"),n.Fc(1," Debe ingresar una direcci\xf3n de correo v\xe1lida "),n.Sb())}function j(t,e){1&t&&(n.Tb(0,"mat-error"),n.Fc(1," El nombre del usuario es requerido "),n.Sb())}function K(t,e){if(1&t&&(n.Tb(0,"mat-option",18),n.Fc(1),n.Sb()),2&t){const t=e.$implicit;n.lc("value",t.IdRole),n.Bb(1),n.Gc(t.Nombre)}}function M(t,e){1&t&&(n.Tb(0,"mat-error"),n.Fc(1," El rol es requerido "),n.Sb())}let X=(()=>{class t{constructor(t,e,r,o,i,a){this.formBuilder=t,this.mainFacadeService=e,this.userService=r,this.router=o,this.route=i,this.izitoastAlertService=a,this.currentDate=new Date,this.roles=[],this.unsubscribe$=new k.a,this.buildForm(),this.userId=this.route.snapshot.paramMap.get("id")}buildForm(){this.userForm=this.formBuilder.group({Idusuario:[0,[]],Nombre:[null,[R.v.required]],Correo:[null,[R.v.required,R.v.email]],UserName:[null,[R.v.required]],Idrole:[null,[R.v.required]],FechaCreacion:[new Date(this.currentDate.getFullYear(),this.currentDate.getMonth(),this.currentDate.getDate()),[]],Estado:[!0,[R.v.required]]})}ngOnInit(){this.getRoles(),this.getUserInfo()}getRoles(){this.loading=!0,this.mainFacadeService.getRoles().pipe(Object(O.a)(this.unsubscribe$)).subscribe(t=>{t&&t.length>0&&(this.roles=t),this.loading=!1},t=>this.loading=!0)}onSubmit(t){this.loading=!0;const e=this.userForm.value;this.userId?this.userService.updateUser(e).subscribe(t=>{this.izitoastAlertService.CustomSuccessAlert(t),this.loading=!1,this.router.navigate(["/admin/admin-users/users"])},t=>{this.izitoastAlertService.CustomErrorAlert("Hubo un error intentando actualizar el usuario"),this.loading=!1}):this.userService.createUser(e).subscribe(t=>{this.izitoastAlertService.CustomSuccessAlert(t),this.loading=!1,this.router.navigate(["/admin/admin-users/users"])},t=>{this.izitoastAlertService.CustomErrorAlert("Hubo un error intentando crear el usuario"),this.loading=!1})}clear(){this.userForm.get("Nombre").setValue(null),this.userForm.get("Correo").setValue(null),this.userForm.get("UserName").setValue(null),this.userForm.get("Idrole").setValue(null)}getUserInfo(){this.clear(),this.loading=!0,this.userId&&this.userService.getUser(this.userId).subscribe(t=>{t&&null!==t&&this.setToUserForm(t),this.loading=!1},t=>this.loading=!1)}setToUserForm(t){this.userForm.controls.Idusuario.setValue(t.Idusuario),this.userForm.controls.Nombre.setValue(t.Nombre),this.userForm.controls.Correo.setValue(t.Correo),this.userForm.controls.UserName.setValue(t.UserName),this.userForm.controls.Idrole.setValue(t.Idrole)}}return t.\u0275fac=function(e){return new(e||t)(n.Nb(R.f),n.Nb(q.a),n.Nb(b),n.Nb(i.g),n.Nb(i.a),n.Nb(E.a))},t.\u0275cmp=n.Hb({type:t,selectors:[["app-user-create"]],decls:42,vars:12,consts:[[3,"isActive"],["fxLayout","column",1,"page-layout","simple","fullwidth"],[3,"icon","section","title"],["fxLayout","row","fxLayout.xs","column"],["fxLayout","column","fxFlex","40",1,"m-36"],[3,"formGroup"],["appearance","outline",1,""],["matInput","","type","text","formControlName","Nombre"],["matSuffix",""],[4,"ngIf"],["matInput","","type","text","formControlName","Correo"],["matInput","","type","text","formControlName","UserName"],["appearance","outline"],["formControlName","Idrole"],[3,"value",4,"ngFor","ngForOf"],["fxLayout","row","fxLayoutAlign","end center"],["mat-stroked-button","","color","primary","routerLink",".."],["mat-raised-button","","color","primary",3,"disabled","click"],[3,"value"]],template:function(t,e){1&t&&(n.Ob(0,"app-loading-overlay",0),n.Tb(1,"div",1),n.Ob(2,"app-title-header",2),n.Tb(3,"div",3),n.Tb(4,"div",4),n.Tb(5,"mat-card"),n.Tb(6,"mat-card-title"),n.Fc(7," Datos generales "),n.Sb(),n.Tb(8,"form",5),n.Tb(9,"mat-form-field",6),n.Tb(10,"mat-label"),n.Fc(11,"Nombre completo"),n.Sb(),n.Ob(12,"input",7),n.Tb(13,"mat-icon",8),n.Fc(14,"person_outline"),n.Sb(),n.Dc(15,G,2,0,"mat-error",9),n.Sb(),n.Tb(16,"mat-form-field",6),n.Tb(17,"mat-label"),n.Fc(18,"Correo electronico"),n.Sb(),n.Ob(19,"input",10),n.Tb(20,"mat-icon",8),n.Fc(21,"email"),n.Sb(),n.Dc(22,_,2,0,"mat-error",9),n.Dc(23,Q,2,0,"mat-error",9),n.Sb(),n.Tb(24,"mat-form-field",6),n.Tb(25,"mat-label"),n.Fc(26,"Usuario"),n.Sb(),n.Ob(27,"input",11),n.Tb(28,"mat-icon",8),n.Fc(29,"vpn_key"),n.Sb(),n.Dc(30,j,2,0,"mat-error",9),n.Sb(),n.Tb(31,"mat-form-field",12),n.Tb(32,"mat-label"),n.Fc(33,"Rol"),n.Sb(),n.Tb(34,"mat-select",13),n.Dc(35,K,2,2,"mat-option",14),n.Sb(),n.Dc(36,M,2,0,"mat-error",9),n.Sb(),n.Tb(37,"mat-card-actions",15),n.Tb(38,"button",16),n.Fc(39," Cancelar "),n.Sb(),n.Tb(40,"button",17),n.bc("click",(function(){return e.onSubmit(e.userForm.value)})),n.Fc(41," Guardar "),n.Sb(),n.Sb(),n.Sb(),n.Sb(),n.Sb(),n.Sb(),n.Sb()),2&t&&(n.lc("isActive",e.loading),n.Bb(2),n.lc("icon","assistant")("section","Productos")("title","Nuevo producto"),n.Bb(6),n.lc("formGroup",e.userForm),n.Bb(7),n.lc("ngIf",e.userForm.get("Nombre").hasError("required")),n.Bb(7),n.lc("ngIf",e.userForm.get("Correo").hasError("required")),n.Bb(1),n.lc("ngIf",e.userForm.get("Correo").hasError("email")),n.Bb(7),n.lc("ngIf",e.userForm.get("UserName").hasError("required")),n.Bb(5),n.lc("ngForOf",e.roles),n.Bb(1),n.lc("ngIf",e.userForm.get("Idrole").hasError("required")),n.Bb(4),n.lc("disabled",e.userForm.invalid))},directives:[m.a,d.c,f.a,d.a,P.a,P.h,R.w,R.r,R.j,H.c,H.f,$.b,R.c,R.q,R.i,p.a,H.g,o.t,z.a,o.s,P.b,d.b,h.a,i.h,H.b,V.k],styles:["mat-form-field[_ngcontent-%COMP%]{display:block}"]}),t})();const J=[{path:"",component:B},{path:"create",component:X},{path:":id",component:X}];let W=(()=>{class t{}return t.\u0275mod=n.Lb({type:t}),t.\u0275inj=n.Kb({factory:function(e){return new(e||t)},imports:[[i.k.forChild(J)],i.k]}),t})();var Y=r("PCNd"),Z=r("YUcS");let tt=(()=>{class t{}return t.\u0275mod=n.Lb({type:t}),t.\u0275inj=n.Kb({factory:function(e){return new(e||t)},providers:[b],imports:[[o.c,W,Y.a,Z.a,R.u,s.m,a.b,p.b,h.b,H.e,$.c,z.b,P.f]]}),t})()},k5Ln:function(t,e,r){"use strict";r.d(e,"a",(function(){return o}));const o=new(r("tk/3").d)({"content-type":"application/json","Access-Control-Allow-Origin":"*"})}}]);
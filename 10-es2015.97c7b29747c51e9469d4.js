(window.webpackJsonp=window.webpackJsonp||[]).push([[10],{FMnn:function(t,e,n){"use strict";n.d(e,"a",(function(){return o})),n.d(e,"b",(function(){return a}));var i=n("fXoL");let o=(()=>{class t{constructor(t){this.el=t,this.hasDecimalPoint=!1,this.navigationKeys=["Backspace","Delete","Tab","Escape","Enter","Home","End","ArrowLeft","ArrowRight","Clear","Copy","Paste"],this.decimal=!1,this.decimalSeparator=".",this.min=-1/0,this.max=1/0,this.inputElement=t.nativeElement}ngOnChanges(t){if(t.pattern&&(this.regex=this.pattern?RegExp(this.pattern):null),t.min){const t=Number(this.min);this.min=isNaN(t)?-1/0:t}if(t.max){const t=Number(this.max);this.max=isNaN(t)?1/0:t}}onKeyDown(t){if(this.navigationKeys.indexOf(t.key)>-1||("a"===t.key||"KeyA"===t.code)&&!0===t.ctrlKey||("c"===t.key||"KeyC"===t.code)&&!0===t.ctrlKey||("v"===t.key||"KeyV"===t.code)&&!0===t.ctrlKey||("x"===t.key||"KeyX"===t.code)&&!0===t.ctrlKey||("a"===t.key||"KeyA"===t.code)&&!0===t.metaKey||("c"===t.key||"KeyC"===t.code)&&!0===t.metaKey||("v"===t.key||"KeyV"===t.code)&&!0===t.metaKey||("x"===t.key||"KeyX"===t.code)&&!0===t.metaKey)return;let e="";if(this.decimal&&t.key===this.decimalSeparator)return e=this.forecastValue(t.key),e.split(this.decimalSeparator).length>2?void t.preventDefault():void(this.hasDecimalPoint=e.indexOf(this.decimalSeparator)>-1);if(" "===t.key||isNaN(Number(t.key)))return void t.preventDefault();if(e=e||this.forecastValue(t.key),this.regex&&!this.regex.test(e))return void t.preventDefault();const n=Number(e);(n>this.max||n<this.min)&&t.preventDefault()}onPaste(t){let e;window.clipboardData?e=window.clipboardData.getData("text"):t.clipboardData&&t.clipboardData.getData&&(e=t.clipboardData.getData("text/plain")),this.pasteData(e),t.preventDefault()}onDrop(t){const e=t.dataTransfer.getData("text");this.inputElement.focus(),this.pasteData(e),t.preventDefault()}pasteData(t){const e=this.sanitizeInput(t);if(!document.execCommand("insertText",!1,e))if(this.inputElement.setRangeText){const{selectionStart:t,selectionEnd:n}=this.inputElement;this.inputElement.setRangeText(e,t,n,"end"),void 0!==window.InstallTrigger&&this.inputElement.dispatchEvent(new Event("input",{cancelable:!0}))}else this.insertAtCursor(this.inputElement,e);this.decimal&&(this.hasDecimalPoint=this.inputElement.value.indexOf(this.decimalSeparator)>-1)}insertAtCursor(t,e){const n=t.selectionStart,i=t.selectionEnd;t.value=t.value.substring(0,n)+e+t.value.substring(i,t.value.length);const o=n+e.length;t.focus(),t.setSelectionRange(o,o),this.triggerEvent(t,"input")}triggerEvent(t,e){if("createEvent"in document){const n=document.createEvent("HTMLEvents");n.initEvent(e,!1,!0),t.dispatchEvent(n)}}sanitizeInput(t){let e="";if(this.decimal&&this.isValidDecimal(t)){const n=new RegExp(`[^0-9${this.decimalSeparator}]`,"g");e=t.replace(n,"")}else e=t.replace(/[^0-9]/g,"");const n=this.inputElement.maxLength;if(n>0){const t=n-this.inputElement.value.length;e=t>0?e.substring(0,t):""}return e}isValidDecimal(t){if(this.hasDecimalPoint){const e=this.getSelection();return e&&e.indexOf(this.decimalSeparator)>-1?t.split(this.decimalSeparator).length<=2:t.indexOf(this.decimalSeparator)<0}return t.split(this.decimalSeparator).length<=2}getSelection(){return this.inputElement.value.substring(this.inputElement.selectionStart,this.inputElement.selectionEnd)}forecastValue(t){const e=this.inputElement.selectionStart,n=this.inputElement.value,i=n.substring(e,this.inputElement.selectionEnd);return i?n.replace(i,t):n.substring(0,e)+t+n.substring(e)}}return t.\u0275fac=function(e){return new(e||t)(i.Nb(i.l))},t.\u0275dir=i.Ib({type:t,selectors:[["","digitOnly",""]],hostBindings:function(t,e){1&t&&i.bc("keydown",(function(t){return e.onKeyDown(t)}))("paste",(function(t){return e.onPaste(t)}))("drop",(function(t){return e.onDrop(t)}))},inputs:{decimal:"decimal",decimalSeparator:"decimalSeparator",min:"min",max:"max",pattern:"pattern"},features:[i.zb]}),t})(),a=(()=>{class t{}return t.\u0275mod=i.Lb({type:t}),t.\u0275inj=i.Kb({factory:function(e){return new(e||t)},imports:[[]]}),t})()},jWmv:function(t,e,n){"use strict";n.r(e),n.d(e,"WarehousingModule",(function(){return _}));var i=n("ofXK"),o=n("tyNb"),a=n("3Pt+"),r=n("0IaG"),c=n("XNiG"),s=n("fXoL"),u=n("k5Ln"),l=n("AytR"),d=n("2Vo4"),b=n("tk/3");let h=(()=>{class t{constructor(t){this.http=t,this.newProductInventory=new d.a(null),this.newProductInventory$=this.newProductInventory.asObservable()}getProductInventory(t){return this.http.get(`${l.a.API_URL+l.a.inventarioPrefix}/Inventario/${t}`)}createProductInventory(t){return this.http.post(l.a.API_URL+l.a.inventarioPrefix+"/AddInventario",t,{headers:u.a,responseType:"text"})}updateProductInventory(t){return console.log(t),this.http.put(`${l.a.API_URL+l.a.inventarioPrefix}/UpdateInventario/${t.IdInventario}`,t,{headers:u.a,responseType:"text"})}addProductInventory(t){this.newProductInventory.next(t)}}return t.\u0275fac=function(e){return new(e||t)(s.Xb(b.b))},t.\u0275prov=s.Jb({token:t,factory:t.\u0275fac,providedIn:"root"}),t})();var m=n("xNEF"),p=n("kmnG"),f=n("d3UM"),g=n("qFsG"),v=n("FMnn"),y=n("XiUz"),S=n("bTqV"),I=n("FKr1");function w(t,e){if(1&t&&(s.Tb(0,"mat-option",10),s.Fc(1),s.Sb()),2&t){const t=e.$implicit;s.lc("value",t.IDProducto),s.Bb(1),s.Hc(" ",t.IDMarca+" "+t.IDDimension," ")}}function D(t,e){1&t&&(s.Tb(0,"mat-error"),s.Fc(1," El producto es requerido. "),s.Sb())}function x(t,e){1&t&&(s.Tb(0,"mat-error"),s.Fc(1," La cantidad es requerida "),s.Sb())}let P=(()=>{class t{constructor(t,e,n,i,o){this.formBuilder=t,this.warehousingService=e,this.mainFacadeService=n,this.dialogRef=i,this.data=o,this.unsubscribe$=new c.a,this.form=this.formBuilder.group({IdInventario:[0,[a.v.required]],Idproducto:[0,[a.v.required]],Cantidad:[0,[a.v.required]],Estado:[!0,[a.v.required]],edit:[!(!this.data||!this.data.editProductInventory)]})}ngOnInit(){this.getProductInventoryInfo()}ngOnDestroy(){this.unsubscribe$.next(),this.unsubscribe$.complete()}getProductInventoryInfo(){this.title="Nuevo",this.mainFacadeService.getProducts().subscribe(t=>{t&&t.length>0&&(this.products=t)}),!0===this.form.controls.edit.value&&(this.title="Editar",this.warehousingService.getProductInventory(this.data.editProductInventory.IdInventario).subscribe(t=>{t&&null!==t&&this.setWarehousingInfo(t)}))}onSubmit(t){this.data&&this.data.editProductInventory&&this.onCancel(),this.warehousingService.addProductInventory(this.form.value),this.dialogRef.close(this.form.value),this.warehousingService.addProductInventory(null),this.clear()}onCancel(){this.dialogRef.close()}setWarehousingInfo(t){this.form.controls.IdInventario.setValue(t.Idinventario),this.form.controls.Idproducto.setValue(t.Idproducto),this.form.controls.Cantidad.setValue(t.Cantidad),this.form.controls.Estado.setValue(t.Estado)}clear(){this.form.reset(),this.form.controls.Idproducto.setValue(0),this.form.controls.Cantidad.setValue(0)}}return t.\u0275fac=function(e){return new(e||t)(s.Nb(a.f),s.Nb(h),s.Nb(m.a),s.Nb(r.f),s.Nb(r.a))},t.\u0275cmp=s.Hb({type:t,selectors:[["app-warehousing-create"]],decls:20,vars:7,consts:[[1,"warehousing-dialog",3,"formGroup","ngSubmit"],["mat-dialog-title",""],["appearance","outline"],["formControlName","Idproducto"],[3,"value",4,"ngFor","ngForOf"],[4,"ngIf"],["matInput","","type","text","formControlName","Cantidad","pattern","^\\d+(\\.\\d{1,2})?$","digitOnly","",3,"decimal"],["fxLayout","row","fxLayoutAlign","end center"],["mat-stroked-button","","type","button",3,"click"],["mat-raised-button","","type","submit","color","primary",3,"disabled"],[3,"value"]],template:function(t,e){1&t&&(s.Tb(0,"form",0),s.bc("ngSubmit",(function(){return e.onSubmit(e.form)})),s.Tb(1,"h1",1),s.Fc(2),s.Sb(),s.Tb(3,"mat-dialog-content"),s.Tb(4,"mat-form-field",2),s.Tb(5,"mat-label"),s.Fc(6,"Producto"),s.Sb(),s.Tb(7,"mat-select",3),s.Dc(8,w,2,2,"mat-option",4),s.Sb(),s.Dc(9,D,2,0,"mat-error",5),s.Sb(),s.Tb(10,"mat-form-field",2),s.Tb(11,"mat-label"),s.Fc(12,"Cantidad"),s.Sb(),s.Ob(13,"input",6),s.Dc(14,x,2,0,"mat-error",5),s.Sb(),s.Sb(),s.Tb(15,"mat-dialog-actions",7),s.Tb(16,"button",8),s.bc("click",(function(){return e.dialogRef.close()})),s.Fc(17," Cancelar "),s.Sb(),s.Tb(18,"button",9),s.Fc(19," Guardar "),s.Sb(),s.Sb(),s.Sb()),2&t&&(s.lc("formGroup",e.form),s.Bb(2),s.Hc("",e.title," producto de inventario"),s.Bb(6),s.lc("ngForOf",e.products),s.Bb(1),s.lc("ngIf",e.form.get("Idproducto").hasError("required")),s.Bb(4),s.lc("decimal",!0),s.Bb(1),s.lc("ngIf",e.form.get("Cantidad").hasError("required")),s.Bb(4),s.lc("disabled",e.form.invalid))},directives:[a.w,a.r,a.j,r.g,r.d,p.c,p.f,f.a,a.q,a.i,i.s,i.t,g.b,a.c,a.t,v.a,r.c,y.c,y.b,S.a,I.k,p.b],styles:[".warehousing-dialog[_ngcontent-%COMP%]{width:100%;display:block}.warehousing-dialog[_ngcontent-%COMP%]   mat-form-field[_ngcontent-%COMP%]{width:100%}"]}),t})();var C=n("M9IT"),E=n("+0xr"),T=n("1G5W"),k=n("K8I4"),F=n("K/TF"),N=n("ngNO"),A=n("NFeN");function L(t,e){1&t&&(s.Tb(0,"th",19),s.Fc(1,"No."),s.Sb())}function O(t,e){if(1&t&&(s.Tb(0,"td",20),s.Fc(1),s.Sb()),2&t){const t=e.index;s.Bb(1),s.Hc(" ",t+1," ")}}function K(t,e){1&t&&(s.Tb(0,"th",19),s.Fc(1,"Producto"),s.Sb())}function R(t,e){if(1&t&&(s.Tb(0,"td",20),s.Fc(1),s.Sb()),2&t){const t=e.$implicit;s.Bb(1),s.Hc(" ",t.IdProducto," ")}}function B(t,e){1&t&&(s.Tb(0,"th",19),s.Fc(1,"Cantidad"),s.Sb())}function $(t,e){if(1&t&&(s.Tb(0,"td",20),s.Fc(1),s.Sb()),2&t){const t=e.$implicit;s.Bb(1),s.Hc(" ",t.cantidad," ")}}function V(t,e){1&t&&(s.Tb(0,"th",19),s.Fc(1,"Acciones"),s.Sb())}function H(t,e){if(1&t){const t=s.Ub();s.Tb(0,"td",20),s.Tb(1,"button",21),s.bc("click",(function(){s.uc(t);const n=e.$implicit;return s.fc().productInventoryDialog(n,!0)})),s.Tb(2,"mat-icon"),s.Fc(3,"edit"),s.Sb(),s.Sb(),s.Sb()}}function z(t,e){1&t&&s.Ob(0,"tr",22)}function q(t,e){1&t&&s.Ob(0,"tr",23)}const M=function(){return[10,20]},j=[{path:"",component:(()=>{class t{constructor(t,e,n,i){this.warehousingService=t,this.mainFacadeService=e,this.createProductInventoryDialog=n,this.izitoastAlertService=i,this.displayedColumns=["#","idproducto","cantidad","actions"],this.dataSource=new E.l([]),this.unsubscribe$=new c.a}ngOnInit(){this.getInventoryList(),this.listenProductInventoryChanges()}ngOnDestroy(){this.unsubscribe$.next(),this.unsubscribe$.complete()}getInventoryList(){this.loading=!0,this.mainFacadeService.getInventoryList().subscribe(t=>{t&&t.length>0&&(this.dataSource=new E.l(t),this.dataSource.paginator=this.paginator),this.loading=!1},t=>this.loading=!1)}productInventoryDialog(t,e){this.createProductInventoryDialog.open(P,{data:{editProductInventory:e?t:null},width:"auto",disableClose:!1,autoFocus:!1})}listenProductInventoryChanges(){this.warehousingService.newProductInventory$.pipe(Object(T.a)(this.unsubscribe$)).subscribe(t=>{t&&null!==t&&(t.edit?this.updateProductInventory(t):this.addProductInventory(t))})}addProductInventory(t){this.loading=!0,this.warehousingService.createProductInventory(t).subscribe(t=>{this.izitoastAlertService.CustomWarningAlert(t),this.loading=!1},t=>{this.izitoastAlertService.CustomErrorAlert("Hubo un error intentando agregar el producto en inventario"),this.loading=!1})}updateProductInventory(t){this.loading=!0,this.warehousingService.updateProductInventory(t).subscribe(t=>{this.izitoastAlertService.CustomSuccessAlert(t),this.loading=!1},t=>{this.izitoastAlertService.CustomErrorAlert("Hubo un error intentando actualizar el producto en inventario"),this.loading=!1})}}return t.\u0275fac=function(e){return new(e||t)(s.Nb(h),s.Nb(m.a),s.Nb(r.b),s.Nb(k.a))},t.\u0275cmp=s.Hb({type:t,selectors:[["app-warehousing-list"]],viewQuery:function(t,e){var n;1&t&&s.Ic(C.a,!0),2&t&&s.pc(n=s.cc())&&(e.paginator=n.first)},decls:27,vars:9,consts:[[3,"isActive"],["fxLayout","column",1,"page-layout","simple","fullwidth"],[3,"icon","section","title"],["fxLayout","column",1,"mx-12","mt-32"],["fxLayout","row","fxLayoutAlign","end center"],["fxLayout","row","fxLayoutAlign","end center",1,"mt-12","create-button"],["mat-fab","",1,"accent",3,"click"],["fxLayout","column",1,"mx-12"],["fxFlex","100",1,"mat-elevation-z8"],["mat-table","",2,"width","100%",3,"dataSource"],["matColumnDef","#"],["mat-header-cell","",4,"matHeaderCellDef"],["mat-cell","",4,"matCellDef"],["matColumnDef","idproducto"],["matColumnDef","cantidad"],["matColumnDef","actions"],["mat-header-row","",4,"matHeaderRowDef"],["mat-row","",4,"matRowDef","matRowDefColumns"],["fxLayoutAlign","end center","showFirstLastButtons","",2,"width","100%",3,"pageSizeOptions"],["mat-header-cell",""],["mat-cell",""],["mat-icon-button","","color","accent",3,"click"],["mat-header-row",""],["mat-row",""]],template:function(t,e){1&t&&(s.Ob(0,"app-loading-overlay",0),s.Tb(1,"div",1),s.Ob(2,"app-title-header",2),s.Tb(3,"div",3),s.Tb(4,"div",4),s.Tb(5,"div",5),s.Tb(6,"button",6),s.bc("click",(function(){return e.productInventoryDialog()})),s.Tb(7,"mat-icon"),s.Fc(8,"playlist_add"),s.Sb(),s.Sb(),s.Sb(),s.Sb(),s.Tb(9,"div",7),s.Tb(10,"div",8),s.Tb(11,"table",9),s.Rb(12,10),s.Dc(13,L,2,0,"th",11),s.Dc(14,O,2,1,"td",12),s.Qb(),s.Rb(15,13),s.Dc(16,K,2,0,"th",11),s.Dc(17,R,2,1,"td",12),s.Qb(),s.Rb(18,14),s.Dc(19,B,2,0,"th",11),s.Dc(20,$,2,1,"td",12),s.Qb(),s.Rb(21,15),s.Dc(22,V,2,0,"th",11),s.Dc(23,H,4,0,"td",12),s.Qb(),s.Dc(24,z,1,0,"tr",16),s.Dc(25,q,1,0,"tr",17),s.Sb(),s.Ob(26,"mat-paginator",18),s.Sb(),s.Sb(),s.Sb(),s.Sb()),2&t&&(s.lc("isActive",e.loading),s.Bb(2),s.lc("icon","assistant")("section","Almac\xe9n de inventario")("title","Listado"),s.Bb(9),s.lc("dataSource",e.dataSource),s.Bb(13),s.lc("matHeaderRowDef",e.displayedColumns),s.Bb(1),s.lc("matRowDefColumns",e.displayedColumns),s.Bb(1),s.lc("pageSizeOptions",s.mc(8,M)))},directives:[F.a,y.c,N.a,y.b,S.a,A.a,y.a,E.k,E.c,E.e,E.b,E.g,E.j,C.a,E.d,E.a,E.f,E.i],styles:[""]}),t})()},{path:"create",component:P}];let G=(()=>{class t{}return t.\u0275mod=s.Lb({type:t}),t.\u0275inj=s.Kb({factory:function(e){return new(e||t)},imports:[[o.k.forChild(j)],o.k]}),t})();var U=n("PCNd"),X=n("YUcS");let _=(()=>{class t{}return t.\u0275mod=s.Lb({type:t}),t.\u0275inj=s.Kb({factory:function(e){return new(e||t)},imports:[[i.c,G,U.a,X.a,b.c,a.u,v.b,E.m,C.b,A.b,S.b,r.e,p.e,g.c,f.b]]}),t})()},k5Ln:function(t,e,n){"use strict";n.d(e,"a",(function(){return i}));const i=new(n("tk/3").d)({"content-type":"application/json","Access-Control-Allow-Origin":"*"})}}]);
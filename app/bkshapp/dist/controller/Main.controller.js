sap.ui.define(["sap/ui/core/mvc/Controller","sap/ui/model/json/JSONModel","sap/m/MessageToast","sap/ui/model/Sorter","sap/ui/model/Filter","sap/ui/model/FilterOperator","sap/ui/model/FilterType","sap/m/MessageBox"],function(e,t,a,o,n,r,s,i){"use strict";return e.extend("com.sap.bkshapp.controller.Main",{onInit:function(){var e=new t;this.getView().setModel(e,"OrderModel")},onSubmitDirect:function(e){var t=this;var o=sap.ui.getCore().getMessageManager(),s=o.getMessageModel(),i=s.bindList("/",undefined,[],new n("technical",r.EQ,true));i.attachChange(this.onMessageBindingChange,this);var c=this.getView().getModel("OrderModel").getData();try{var u=this.getView().getModel("BookModel").getBindings()[1].create({ID:parseInt(c.OrderId),books_ID:parseInt(c.BookId),count:parseInt(c.Count),amount:parseInt(c.Amount)});u.created().then(function(){a.show("successfully created");t.getView().getModel("BookModel").refresh("$auto")},function(e){a.show("error")})}catch(e){a.show("error")}},onSubmitAjax:function(e){var t=this.getView().getModel("OrderModel").getData();var a=this;var o={ID:parseInt(t.OrderId),books_ID:parseInt(t.BookId),count:parseInt(t.Count),amount:parseInt(t.Amount)};var n=window.location.host.includes("launchpad")?"/d00bdf63-0e01-441f-ac82-632561df6d08.managedapprouter.comsapbkshapp/~140324164042+0000~":"";$.ajax({url:n+"/odata/v4/bookshop/order",type:"POST",data:JSON.stringify(o),processData:false,contentType:"application/json",success:function(e,t){console.log("success"+e);a.getView().getModel("BookModel").refresh("$auto")},error:function(e){i.error(JSON.parse(e.responseText).error.message)}})},toCallCloud:function(e){var t="f13218f3-7ff0-41ca-bde2-023c51b5f227";var a="accounts/v1/subaccounts/"+t;$.ajax({url:a,method:"GET",async:false,datatype:"json",success:function(e,t){var a=e},error:function(e){var t=e.responseText}})},ajaxcall:function(e){var t="https://b9193a7atrial-ga.authentication.eu10.hana.ondemand.com/oauth/token";$.ajax({url:t,beforeSend:function(e){e.setRequestHeader("Content-Type","application/json");e.setRequestHeader("Accept","application/json")},dataType:"json",data:{client_id:"sb-ut-996c4588-ee7b-466b-9c81-b0893b702795-clone!b429470|cis-central!b14",client_secret:"baf53a97-987d-45e8-abb0-2904c863371d$n-uVSmMz4djRc7FWtMyWMFrxqmS6mk_fhGkNTpt-5Q8=",grant_type:"client_credentials"},type:"POST",success:function(e){token=e.access_token;expiresIn=e.expires_in},error:function(e){alert(e.error)}})},onMessageBindingChange:function(e){var t=e.getSource().getContexts(),a,o=false;if(o||!t.length){return}a=t.map(function(e){return e.getObject()});sap.ui.getCore().getMessageManager().removeMessages(a);i.error(a[0].message,{id:"serviceErrorMessageBox",onClose:function(){o=false}});o=true}})});
sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel",
    "sap/m/MessageToast",
    "sap/ui/model/Sorter",
    "sap/ui/model/Filter",
    "sap/ui/model/FilterOperator",
    "sap/ui/model/FilterType",
    "sap/m/MessageBox"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller,JSONModel,MessageToast,Sorter,Filter,FilterOperator,FilterType,MessageBox) {
        "use strict";

        return Controller.extend("com.sap.bkshapp.controller.Main", {
            onInit: function () {
    
                var oModel = new JSONModel();
                this.getView().setModel(oModel,"OrderModel");
            

            },
            onSubmitDirect:function(oEvent){
              var that=this;
                var oMessageManager = sap.ui.getCore().getMessageManager(),
                oMessageModel = oMessageManager.getMessageModel(),
                oMessageModelBinding = oMessageModel.bindList("/", undefined, [],
                  new Filter("technical", FilterOperator.EQ, true));
  
                  oMessageModelBinding.attachChange(this.onMessageBindingChange, this);
                  var oOrderData=this.getView().getModel("OrderModel").getData();
                  
                   try{
                    var oItem=this.getView().getModel("BookModel").getBindings()[1].create({
                      "ID":parseInt(oOrderData.OrderId),
                      "books_ID": parseInt(oOrderData.BookId),
                      "count":parseInt(oOrderData.Count),
                      "amount": parseInt(oOrderData.Amount)
                             });
                             oItem.created()
                             .then(function(){
                                MessageToast.show("successfully created");

                                that.getView().getModel("BookModel").refresh("$auto");
                     },function(oError){
                       MessageToast.show("error");
                           });       
  
                   }catch(err){
                    MessageToast.show("error");
                   }
              },

              onSubmitAjax:function(oEvent){
                var oOrderData=this.getView().getModel("OrderModel").getData();
                var that=this;
                var data={
                  "ID":parseInt(oOrderData.OrderId),
                  "books_ID": parseInt(oOrderData.BookId),
                  "count":parseInt(oOrderData.Count),
                  "amount": parseInt(oOrderData.Amount)
                };

                //modify the url to run in local as well as in server

                var url=window.location.host.includes("launchpad")?"/d00bdf63-0e01-441f-ac82-632561df6d08.managedapprouter.comsapbkshapp/~140324164042+0000~":"";

                $.ajax({
                  url: url+'/odata/v4/bookshop/order',
                  type: 'POST',
                  data: JSON.stringify(data),
                  processData: false,
                  contentType: 'application/json',
                  success: function(data,status){
                      console.log("success"+data);
                      that.getView().getModel("BookModel").refresh("$auto");
                  },
                  error: function(error){
                      MessageBox.error(JSON.parse(error.responseText).error.message);
                  }
                });
              },

		toCallCloud:function(oEvent){
      var subacid="f13218f3-7ff0-41ca-bde2-023c51b5f227";
      var sUrl="accounts/v1/subaccounts/"+subacid;
      
      $.ajax({
         url: sUrl,
         method:'GET',
         async:false,
         datatype:'json',
         success:function(oData, oResponse){
          var data=oData;
      },
         error:function(oError){
          var sMsg=oError.responseText
      }
      });
    },

    ajaxcall:function(oEvent){
      var surl="https://b9193a7atrial-ga.authentication.eu10.hana.ondemand.com/oauth/token";
      $.ajax({
        url: surl,
        beforeSend: function(xhr) {
            xhr.setRequestHeader("Content-Type", "application/json");
            xhr.setRequestHeader("Accept", "application/json");
        },
        dataType: "json",
        data: {
            client_id: "sb-ut-996c4588-ee7b-466b-9c81-b0893b702795-clone!b429470|cis-central!b14",
            client_secret: "baf53a97-987d-45e8-abb0-2904c863371d$n-uVSmMz4djRc7FWtMyWMFrxqmS6mk_fhGkNTpt-5Q8=",
            grant_type: "client_credentials"
        },
        type: "POST",
        success: function(response) {
            token = response.access_token;
            expiresIn = response.expires_in;
        },
        error: function(errorThrown) {
            alert(errorThrown.error);
        }
    });

    },

  
              onMessageBindingChange : function (oEvent) {
                var aContexts = oEvent.getSource().getContexts(),
                  aMessages,
                  bMessageOpen = false;
          
                if (bMessageOpen || !aContexts.length) {
                  return;
                }
          
                // Extract and remove the technical messages
                aMessages = aContexts.map(function (oContext) {
                  return oContext.getObject();
                });
                sap.ui.getCore().getMessageManager().removeMessages(aMessages);
          
               // this._setUIChanges(true);
              //  this._bTechnicalErrors = true;
                MessageBox.error(aMessages[0].message, {
                  id : "serviceErrorMessageBox",
                  onClose : function () {
                    bMessageOpen = false;
                  }
                });
          
                bMessageOpen = true;
              }
 
        });
    });

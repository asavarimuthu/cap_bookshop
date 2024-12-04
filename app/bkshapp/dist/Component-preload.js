//@ui5-bundle com/sap/bkshapp/Component-preload.js
jQuery.sap.registerPreloadedModules({
"version":"2.0",
"modules":{
	"com/sap/bkshapp/Component.js":function(){sap.ui.define(["sap/ui/core/UIComponent","sap/ui/Device","com/sap/bkshapp/model/models"],function(e,t,i){"use strict";return e.extend("com.sap.bkshapp.Component",{metadata:{manifest:"json"},init:function(){e.prototype.init.apply(this,arguments);this.getRouter().initialize();this.setModel(i.createDeviceModel(),"device")}})});
},
	"com/sap/bkshapp/controller/App.controller.js":function(){sap.ui.define(["sap/ui/core/mvc/Controller"],function(n){"use strict";return n.extend("com.sap.bkshapp.controller.App",{onInit:function(){}})});
},
	"com/sap/bkshapp/controller/Main.controller.js":function(){sap.ui.define(["sap/ui/core/mvc/Controller","sap/ui/model/json/JSONModel","sap/m/MessageToast","sap/ui/model/Sorter","sap/ui/model/Filter","sap/ui/model/FilterOperator","sap/ui/model/FilterType","sap/m/MessageBox"],function(e,t,a,o,n,r,s,i){"use strict";return e.extend("com.sap.bkshapp.controller.Main",{onInit:function(){var e=new t;this.getView().setModel(e,"OrderModel")},onSubmitDirect:function(e){var t=this;var o=sap.ui.getCore().getMessageManager(),s=o.getMessageModel(),i=s.bindList("/",undefined,[],new n("technical",r.EQ,true));i.attachChange(this.onMessageBindingChange,this);var c=this.getView().getModel("OrderModel").getData();try{var u=this.getView().getModel("BookModel").getBindings()[1].create({ID:parseInt(c.OrderId),books_ID:parseInt(c.BookId),count:parseInt(c.Count),amount:parseInt(c.Amount)});u.created().then(function(){a.show("successfully created");t.getView().getModel("BookModel").refresh("$auto")},function(e){a.show("error")})}catch(e){a.show("error")}},onSubmitAjax:function(e){var t=this.getView().getModel("OrderModel").getData();var a=this;var o={ID:parseInt(t.OrderId),books_ID:parseInt(t.BookId),count:parseInt(t.Count),amount:parseInt(t.Amount)};var n=window.location.host.includes("launchpad")?"/d00bdf63-0e01-441f-ac82-632561df6d08.managedapprouter.comsapbkshapp/~140324164042+0000~":"";$.ajax({url:n+"/odata/v4/bookshop/order",type:"POST",data:JSON.stringify(o),processData:false,contentType:"application/json",success:function(e,t){console.log("success"+e);a.getView().getModel("BookModel").refresh("$auto")},error:function(e){i.error(JSON.parse(e.responseText).error.message)}})},toCallCloud:function(e){var t="f13218f3-7ff0-41ca-bde2-023c51b5f227";var a="accounts/v1/subaccounts/"+t;$.ajax({url:a,method:"GET",async:false,datatype:"json",success:function(e,t){var a=e},error:function(e){var t=e.responseText}})},ajaxcall:function(e){var t="https://b9193a7atrial-ga.authentication.eu10.hana.ondemand.com/oauth/token";$.ajax({url:t,beforeSend:function(e){e.setRequestHeader("Content-Type","application/json");e.setRequestHeader("Accept","application/json")},dataType:"json",data:{client_id:"sb-ut-996c4588-ee7b-466b-9c81-b0893b702795-clone!b429470|cis-central!b14",client_secret:"baf53a97-987d-45e8-abb0-2904c863371d$n-uVSmMz4djRc7FWtMyWMFrxqmS6mk_fhGkNTpt-5Q8=",grant_type:"client_credentials"},type:"POST",success:function(e){token=e.access_token;expiresIn=e.expires_in},error:function(e){alert(e.error)}})},onMessageBindingChange:function(e){var t=e.getSource().getContexts(),a,o=false;if(o||!t.length){return}a=t.map(function(e){return e.getObject()});sap.ui.getCore().getMessageManager().removeMessages(a);i.error(a[0].message,{id:"serviceErrorMessageBox",onClose:function(){o=false}});o=true}})});
},
	"com/sap/bkshapp/i18n/i18n.properties":'# This is the resource bundle for com.sap.bkshapp\n\n#Texts for manifest.json\n\n#XTIT: Application name\nappTitle=Bookshop App\n\n#YDES: Application description\nappDescription=An SAP Fiori application.\n#XTIT: Main view title\ntitle=Bookshop App\n\nflpTitle=Bookshop\n',
	"com/sap/bkshapp/manifest.json":'{"_version":"1.59.0","sap.app":{"id":"com.sap.bkshapp","type":"application","i18n":"i18n/i18n.properties","applicationVersion":{"version":"0.0.1"},"title":"{{appTitle}}","description":"{{appDescription}}","resources":"resources.json","sourceTemplate":{"id":"@sap/generator-fiori:basic","version":"1.12.5","toolsId":"37c02c9d-84aa-43a6-bb77-792e82ce56bc"},"dataSources":{"mainService":{"uri":"odata/v4/","type":"OData","settings":{"annotations":[],"odataVersion":"4.0"}}},"crossNavigation":{"inbounds":{"bookshop-detail":{"semanticObject":"bookshop","action":"detail","title":"{{flpTitle}}","signature":{"parameters":{},"additionalParameters":"allowed"}}}}},"sap.ui":{"technology":"UI5","icons":{"icon":"","favIcon":"","phone":"","phone@2":"","tablet":"","tablet@2":""},"deviceTypes":{"desktop":true,"tablet":true,"phone":true}},"sap.ui5":{"flexEnabled":false,"dependencies":{"minUI5Version":"1.121.2","libs":{"sap.m":{},"sap.ui.core":{},"sap.f":{},"sap.suite.ui.generic.template":{},"sap.ui.comp":{},"sap.ui.generic.app":{},"sap.ui.table":{},"sap.ushell":{}}},"contentDensities":{"compact":true,"cozy":true},"models":{"i18n":{"type":"sap.ui.model.resource.ResourceModel","settings":{"bundleName":"com.sap.bkshapp.i18n.i18n"}},"BookModel":{"dataSource":"mainService","preload":true,"settings":{"synchronizationMode":"None","operationMode":"Server","autoExpandSelect":true,"earlyRequests":true}}},"resources":{"css":[{"uri":"css/style.css"}]},"routing":{"config":{"routerClass":"sap.m.routing.Router","viewType":"XML","async":true,"viewPath":"com.sap.bkshapp.view","controlAggregation":"pages","controlId":"app","clearControlAggregation":false},"routes":[{"name":"RouteMain","pattern":":?query:","target":["TargetMain"]}],"targets":{"TargetMain":{"viewType":"XML","transition":"slide","clearControlAggregation":false,"viewId":"Main","viewName":"Main"}}},"rootView":{"viewName":"com.sap.bkshapp.view.App","type":"XML","async":true,"id":"App"}},"sap.cloud":{"public":true,"service":"managedapprouter"}}',
	"com/sap/bkshapp/model/models.js":function(){sap.ui.define(["sap/ui/model/json/JSONModel","sap/ui/Device"],function(e,n){"use strict";return{createDeviceModel:function(){var i=new e(n);i.setDefaultBindingMode("OneWay");return i}}});
},
	"com/sap/bkshapp/view/App.view.xml":'<mvc:View controllerName="com.sap.bkshapp.controller.App"\n    xmlns:html="http://www.w3.org/1999/xhtml"\n    xmlns:mvc="sap.ui.core.mvc" displayBlock="true"\n    xmlns="sap.m"><App id="app"></App></mvc:View>\n',
	"com/sap/bkshapp/view/Main.view.xml":'<mvc:View controllerName="com.sap.bkshapp.controller.Main"\n    xmlns:mvc="sap.ui.core.mvc" displayBlock="true"\n    xmlns="sap.m"\n\txmlns:f="sap.ui.layout.form" \n    xmlns:core="sap.ui.core"><Page id="page" title="{i18n>title}"><content><Table id="idBookTable"\n\t\tinset="false"\n\t\titems="{\n\t\t\tpath: \'BookModel>/book\'\n\t\t}"><columns><Column\n\t\t\t\twidth="12em"><Text text="Book ID" /></Column><Column\n\t\t\t\tminScreenWidth="Tablet"\n\t\t\t\tdemandPopin="true"><Text text="Book Name" /></Column><Column\n\t\t\t\tminScreenWidth="Tablet"\n\t\t\t\tdemandPopin="true"><Text text="Author ID" /></Column><Column\n\t\t\t\tminScreenWidth="Tablet"\n\t\t\t\tdemandPopin="true"><Text text="Stock" /></Column></columns><items><ColumnListItem vAlign="Middle" press="onRowPress" type="Navigation"><cells><ObjectIdentifier\n\t\t\t\t\t\ttitle="{BookModel>ID}"/><Text\n\t\t\t\t\t\ttext="{BookModel>title}" /><Text\n\t\t\t\t\t\ttext="{BookModel>author_ID}" /><Text\n\t\t\t\t\t\ttext="{BookModel>stock}" /></cells></ColumnListItem></items></Table><f:Form id="OrderForm"\n\t\t\teditable="true"><f:title><core:Title text="Order Book" /></f:title><f:layout><f:ResponsiveGridLayout\n\t\t\t\t\tlabelSpanXL="3"\n\t\t\t\t\tlabelSpanL="3"\n\t\t\t\t\tlabelSpanM="3"\n\t\t\t\t\tlabelSpanS="12"\n\t\t\t\t\tadjustLabelSpan="false"\n\t\t\t\t\temptySpanXL="4"\n\t\t\t\t\temptySpanL="4"\n\t\t\t\t\temptySpanM="4"\n\t\t\t\t\temptySpanS="0"\n\t\t\t\t\tcolumnsXL="1"\n\t\t\t\t\tcolumnsL="1"\n\t\t\t\t\tcolumnsM="1"\n\t\t\t\t\tsingleContainerFullSize="false" /></f:layout><f:formContainers><f:FormContainer><f:formElements><f:FormElement label="Order Id"><f:fields><Input value="{OrderModel>/OrderId}"/></f:fields></f:FormElement><f:FormElement label="Book Id"><f:fields><Input value="{OrderModel>/BookId}"/></f:fields></f:FormElement><f:FormElement label="Count"><f:fields><Input value="{OrderModel>/Count}"/></f:fields></f:FormElement><f:FormElement label="Amount"><f:fields><Input value="{OrderModel>/Amount}"/></f:fields></f:FormElement></f:formElements></f:FormContainer></f:formContainers></f:Form><Button text="Submit Direct" type="Accept" press="onSubmitDirect" /><Button text="Submit AJAX" type="Accept" press="onSubmitAjax" /><Button text="Call Cloud Service" type="Accept" press="toCallCloud" /><Button text="Call Ajax" type="Accept" press="ajaxcall" /><Table id="idOrderTable"\n\t\tinset="false"\n\t\titems="{\n\t\t\tpath: \'BookModel>/order\'\n\t\t}"><columns><Column\n\t\t\t\twidth="12em"><Text text="Order ID" /></Column><Column\n\t\t\t\tminScreenWidth="Tablet"\n\t\t\t\tdemandPopin="true"><Text text="Book ID" /></Column><Column\n\t\t\t\tminScreenWidth="Tablet"\n\t\t\t\tdemandPopin="true"><Text text="Count" /></Column><Column\n\t\t\t\tminScreenWidth="Tablet"\n\t\t\t\tdemandPopin="true"><Text text="Amount" /></Column></columns><items><ColumnListItem vAlign="Middle" press="onRowPress" type="Navigation"><cells><ObjectIdentifier\n\t\t\t\t\t\ttitle="{BookModel>ID}"/><Text\n\t\t\t\t\t\ttext="{BookModel>books_ID}" /><Text\n\t\t\t\t\t\ttext="{BookModel>count}" /><Text\n\t\t\t\t\t\ttext="{BookModel>amount}" /></cells></ColumnListItem></items></Table></content></Page></mvc:View>\n'
}});

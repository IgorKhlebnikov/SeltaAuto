!function(e,o){"use strict";var n=o.module("ngDialog",[]),a=o.element,i=o.isDefined,l=(document.body||document.documentElement).style,t=i(l.animation)||i(l.WebkitAnimation)||i(l.MozAnimation)||i(l.MsAnimation)||i(l.OAnimation),s="animationend webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend";n.provider("ngDialog",function(){var n,i=this.defaults={className:"ngdialog-theme-default",plain:!1,showClose:!0,closeByDocument:!0,closeByEscape:!0},l=0,c=0,d={};this.$get=["$document","$templateCache","$compile","$q","$http","$rootScope","$timeout",function(g,r,m,u,p,f,D){var v=g.find("body"),y={onDocumentKeydown:function(e){27===e.keyCode&&h.close()},closeDialog:function(o){var a=o.attr("id");"undefined"!=typeof e.Hammer?e.Hammer(o[0]).off("tap",n):o.unbind("click"),1===c&&v.unbind("keydown"),o.hasClass("ngdialog-closing")||(c-=1),t?o.unbind(s).bind(s,function(){o.scope().$destroy(),o.remove(),0===c&&v.removeClass("ngdialog-open")}).addClass("ngdialog-closing"):(o.scope().$destroy(),o.remove(),0===c&&v.removeClass("ngdialog-open")),d[a]&&(d[a].resolve({id:a,$dialog:o,remainingDialogs:c}),delete d[a]),f.$broadcast("ngDialog.closed",o)}},h={open:function(t){function s(e){return e?o.isString(e)&&C.plain?e:r.get(e)||p.get(e,{cache:!0}):"Empty template"}var g=this,C=o.copy(i);t=t||{},o.extend(C,t),l+=1,g.latestID="ngdialog"+l;var w;d[g.latestID]=w=u.defer();var $,b=o.isObject(C.scope)?C.scope.$new():f.$new();return u.when(s(C.template)).then(function(i){return i=o.isString(i)?i:i.data&&o.isString(i.data)?i.data:"",r.put(C.template,i),C.showClose&&(i+='<div class="ngdialog-close"></div>'),g.$result=$=a('<div id="ngdialog'+l+'" class="ngdialog"></div>'),$.html('<div class="ngdialog-overlay"></div><div class="ngdialog-content">'+i+"</div>"),C.controller&&o.isString(C.controller)&&$.attr("ng-controller",C.controller),C.className&&$.addClass(C.className),C.data&&o.isString(C.data)&&(b.ngDialogData="{"===C.data.replace(/^\s*/,"")[0]?o.fromJson(C.data):C.data),b.closeThisDialog=function(){y.closeDialog($)},D(function(){m($)(b),v.addClass("ngdialog-open").append($),f.$broadcast("ngDialog.opened",$)}),C.closeByEscape&&v.bind("keydown",y.onDocumentKeydown),n=function(e){var o=C.closeByDocument?a(e.target).hasClass("ngdialog-overlay"):!1,n=a(e.target).hasClass("ngdialog-close");(o||n)&&h.close($.attr("id"))},"undefined"!=typeof e.Hammer?e.Hammer($[0]).on("tap",n):$.bind("click",n),c+=1,h}),{id:"ngdialog"+l,closePromise:w.promise,close:function(){y.closeDialog($)}}},openConfirm:function(e){var n=u.defer(),a={closeByEscape:!1,closeByDocument:!1};o.extend(a,e),a.scope=o.isObject(a.scope)?a.scope.$new():f.$new(),a.scope.confirm=function(e){n.resolve(e),i.close()};var i=h.open(a);return i.closePromise.then(function(){n.reject()}),n.promise},close:function(e){var o=a(document.getElementById(e));return o.length?y.closeDialog(o):h.closeAll(),h},closeAll:function(){var e=document.querySelectorAll(".ngdialog");o.forEach(e,function(e){y.closeDialog(a(e))})}};return h}]}),n.directive("ngDialog",["ngDialog",function(e){return{restrict:"A",scope:{ngDialogScope:"="},link:function(n,a,i){a.on("click",function(a){a.preventDefault();var l=o.isDefined(n.ngDialogScope)?n.ngDialogScope:"noScope";o.isDefined(i.ngDialogClosePrevious)&&e.close(i.ngDialogClosePrevious),e.open({template:i.ngDialog,className:i.ngDialogClass,controller:i.ngDialogController,scope:l,data:i.ngDialogData,showClose:"false"===i.ngDialogShowClose?!1:!0,closeByDocument:"false"===i.ngDialogCloseByDocument?!1:!0,closeByEscape:"false"===i.ngDialogCloseByEscape?!1:!0})})}}}])}(window,window.angular);
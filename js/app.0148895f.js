(function(t){function e(e){for(var r,s,o=e[0],c=e[1],u=e[2],f=0,d=[];f<o.length;f++)s=o[f],Object.prototype.hasOwnProperty.call(i,s)&&i[s]&&d.push(i[s][0]),i[s]=0;for(r in c)Object.prototype.hasOwnProperty.call(c,r)&&(t[r]=c[r]);l&&l(e);while(d.length)d.shift()();return a.push.apply(a,u||[]),n()}function n(){for(var t,e=0;e<a.length;e++){for(var n=a[e],r=!0,o=1;o<n.length;o++){var c=n[o];0!==i[c]&&(r=!1)}r&&(a.splice(e--,1),t=s(s.s=n[0]))}return t}var r={},i={app:0},a=[];function s(e){if(r[e])return r[e].exports;var n=r[e]={i:e,l:!1,exports:{}};return t[e].call(n.exports,n,n.exports,s),n.l=!0,n.exports}s.m=t,s.c=r,s.d=function(t,e,n){s.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:n})},s.r=function(t){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},s.t=function(t,e){if(1&e&&(t=s(t)),8&e)return t;if(4&e&&"object"===typeof t&&t&&t.__esModule)return t;var n=Object.create(null);if(s.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var r in t)s.d(n,r,function(e){return t[e]}.bind(null,r));return n},s.n=function(t){var e=t&&t.__esModule?function(){return t["default"]}:function(){return t};return s.d(e,"a",e),e},s.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},s.p="/";var o=window["webpackJsonp"]=window["webpackJsonp"]||[],c=o.push.bind(o);o.push=e,o=o.slice();for(var u=0;u<o.length;u++)e(o[u]);var l=c;a.push([0,"chunk-vendors"]),n()})({0:function(t,e,n){t.exports=n("56d7")},"28ab":function(t,e,n){"use strict";n("91b5")},"56d7":function(t,e,n){"use strict";n.r(e);n("5b62"),n("0ed1"),n("fd96"),n("438e");var r=n("8f65"),i=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{attrs:{id:"app"}},[n("notification",{attrs:{notifications:t.notifications},on:{closeNotifications:t.closeNotifications}}),n("div",{staticClass:"modal",class:{"is-active":t.activeModal}},[n("div",{staticClass:"modal-background"}),n("div",{staticClass:"modal-card"},[n("div",{staticClass:"modal-content"},[n("div",{staticClass:"card"},[t._m(0),n("footer",{staticClass:"card-footer"},[n("a",{staticClass:"card-footer-item has-text-danger",attrs:{href:"#"},on:{click:t.reset}},[t._v("重置")]),n("a",{staticClass:"card-footer-item has-text-grey",attrs:{href:"#"},on:{click:t.closeModal}},[t._v("取消")])])])]),n("button",{staticClass:"modal-close is-large",attrs:{"aria-label":"close"},on:{click:t.closeModal}})])]),n("navbar",{on:{reset:function(e){t.activeModal=!0}}}),n("section",{staticClass:"section"},[n("div",{staticClass:"container"},[n("h1",{staticClass:"title"},[t._v("Hello "+t._s(t.user.name)+"!")]),n("br"),n("p",{staticClass:"subtitle"},[t._v("资源导航")]),n("div",{staticClass:"columns"},t._l(t.nav,(function(e){return n("div",{key:e.name,staticClass:"column"},[n("div",{staticClass:"menu",style:t.dropStyle,on:{drop:function(n){return n.stopPropagation(),t.drop(n,e)},dragover:t.allowDrop}},[n("h3",{staticClass:"heading"},[t._v(t._s(e.name))]),n("ul",{staticClass:"menu-list"},[e.list?t._l(e.list,(function(r,i){return n("links",{key:r.title,attrs:{link:r},on:{dragstart:function(n){return t.dragStart(n,e.list,i)},dragEnd:t.dragEnd,saveTitle:function(t){r.title=t},removLink:function(t){return e.list.splice(i,1)}}})})):t._e(),e.child?t._l(e.child,(function(e,r){return n("li",{key:r,staticClass:"child drop",style:t.dropStyle,on:{drop:function(n){return n.stopPropagation(),t.drop(n,e)}}},[n("p",[t._v(t._s(e.title))]),n("ul",{staticClass:"menu-list"},t._l(e.list,(function(r,i){return n("links",{key:i,attrs:{link:r},on:{dragstart:function(n){return t.dragStart(n,e.list,i)},dragEnd:t.dragEnd,saveTitle:function(t){r.title=t},removLink:function(t){return e.list.splice(i,1)}}})})),1)])})):t._e()],2)])])})),0)])])],1)},a=[function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"card-content"},[n("div",{staticClass:"content"},[n("h1",{staticClass:"title has-text-danger"},[t._v("危险操作")]),n("p",{staticClass:"is-size-4"},[t._v("你确定要重置当前用户所有数据吗？")])])])}],s=(n("85b8"),n("a3f1"),n("444c"),n("1567"),n("c09a"),n("fe7d")),o=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("nav",{staticClass:"navbar is-transparent is-fixed-top",attrs:{role:"navigation"}},[n("div",{staticClass:"navbar-brand",on:{click:function(e){t.active=!t.active}}},[n("a",{staticClass:"navbar-burger",class:{"is-active":t.active},attrs:{role:"button"}},[n("span"),n("span"),n("span")])]),n("div",{staticClass:"navbar-menu",class:{"is-active":t.active},attrs:{id:"navbarBasicExample"}},[n("div",{staticClass:"navbar-end",on:{click:function(e){t.active=!1}}},[n("a",{staticClass:"navbar-item",on:{click:t.reset}},[t._v("Reset")]),n("a",{staticClass:"navbar-item",attrs:{href:"https://github.com/zkl2333/start-pages"}},[t._v("About")]),t._m(0)])])])},c=[function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"navbar-item"},[n("div",{staticClass:"buttons"},[n("a",{staticClass:"button is-light"},[t._v("登录")])])])}],u={data:function(){return{active:!1}},methods:{reset:function(){this.$emit("reset"),this.active=!1}}},l=u,f=n("5ceb"),d=Object(f["a"])(l,o,c,!1,null,null,null),p=d.exports,v=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("li",{attrs:{draggable:"true"},on:{dragstart:function(e){return t.$emit("dragstart",e)},dragEnd:function(e){return t.$emit("dragEnd",e)}}},[n("a",{attrs:{draggable:"false"},on:{click:function(e){return t.openLink(t.link.url)},blur:t.changeTitle,contextmenu:[function(t){t.preventDefault()},function(e){return t.clickRight(e)}]}},[n("img",{attrs:{src:"https://api.byi.pw/favicon/?url="+t.link.url,alt:t.link.title}}),n("span",[t._v(" "+t._s(t.link.title))]),n("button",{staticClass:"delete",on:{click:function(e){return e.stopPropagation(),t.removLink(e)}}})])])},h=[],m=(n("2047"),{props:["link"],data:function(){return{}},methods:{changeTitle:function(t){var e=t.target.innerText||this.link.url;this.$emit("saveTitle",e)},clickRight:function(t){t.currentTarget.contentEditable="true";var e=window.getSelection();e.selectAllChildren(t.currentTarget),e.collapseToEnd(),t.currentTarget.onblur=function(t){t.currentTarget.contentEditable="false"}},openLink:function(t){window.open(t)},removLink:function(t){this.$emit("removLink")}}}),g=m,b=(n("7c30"),Object(f["a"])(g,v,h,!1,null,null,null)),w=b.exports,k=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"notifications"},t._l(t.notifications,(function(e,r){return n("div",{key:r,staticClass:"notification is-primary"},[n("button",{staticClass:"delete",on:{click:function(e){return t.close(r)}}}),t._v(" "+t._s(e)+" ")])})),0)},y=[],x={props:["notifications"],created:function(){},methods:{close:function(t){this.$emit("closeNotifications",t)}}},C=x,_=(n("28ab"),Object(f["a"])(C,k,y,!1,null,null,null)),j=_.exports,T={frontEnd:{name:"前端资源",list:[{title:"CodePen",url:"https://codepen.io/"}],child:{vue:{title:"Vue",list:[{title:"Vue官网",url:"https://cn.vuejs.org/"},{title:"Vue论坛",url:"https://forum.vuejs.org/"}]}}},design:{name:"设计资源",list:[{title:"dribbble",url:"https://dribbble.com/"},{title:"站酷",url:"https://www.zcool.com.cn/"}]},docs:{name:"文档资料",list:[{title:"MDN",url:"https://developer.mozilla.org/zh-CN/"},{title:"w3school",url:"https://www.w3school.com.cn/"}],child:{miniprogram:{title:"小程序",list:[{title:"小程序Api文档",url:"https://developers.weixin.qq.com/miniprogram/dev/api/"},{title:"vant-weapp组件库",url:"https://youzan.github.io/vant-weapp/"}]},vue:{title:"Vue",list:[{title:"Vue Api 文档",url:"https://cn.vuejs.org/v2/api/"}]}}}};function S(){return O.apply(this,arguments)}function O(){return O=Object(s["a"])(regeneratorRuntime.mark((function t(){return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.next=2,new Promise((function(t,e){var n,r=window.indexedDB.open("StartPages",1);r.onerror=function(t){console.log("Database error: "+t.target.errorCode),e(new Error("数据库打开报错"))},r.onsuccess=function(e){n=e.target.result,r=r.result,console.log("数据库打开成功"),t(n)},r.onupgradeneeded=function(e){var r;console.log("数据库需要升级"),n=e.target.result,n.objectStoreNames.contains("user")||(console.log("创建user仓库"),r=n.createObjectStore("user",{autoIncrement:!0}),r.createIndex("name","name",{unique:!1}),r.createIndex("email","email",{unique:!0})),n.objectStoreNames.contains("options")||(console.log("创建options仓库"),r=n.createObjectStore("options",{autoIncrement:!0}),r.createIndex("name","name",{unique:!0}),r.createIndex("value","value",{unique:!0})),r.transaction.oncomplete=function(){M(n,{name:"Guest",nav:T}),E(n,{name:"activeUser",value:1}),t(n)}}}));case 2:return t.abrupt("return",t.sent);case 3:case"end":return t.stop()}}),t)}))),O.apply(this,arguments)}function E(t,e){return P.apply(this,arguments)}function P(){return P=Object(s["a"])(regeneratorRuntime.mark((function t(e,n){return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.next=2,new Promise((function(t,r){var i=e.transaction(["options"],"readwrite"),a=i.objectStore("options"),s=a.put(n);s.onsuccess=function(e){t(e)},s.onerror=function(t){r(t)}}));case 2:return t.abrupt("return",t.sent);case 3:case"end":return t.stop()}}),t)}))),P.apply(this,arguments)}function R(t,e){return D.apply(this,arguments)}function D(){return D=Object(s["a"])(regeneratorRuntime.mark((function t(e,n){return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.next=2,new Promise((function(t,r){var i=e.transaction(["options","user"],"readonly"),a=i.objectStore("options"),s=a.index("name"),o=s.get(n);o.onsuccess=function(e){console.log("读取options成功",e.target.result),t(e.target.result.value)},o.onerror=function(t){console.log("读取options失败"),r(t)}}));case 2:return t.abrupt("return",t.sent);case 3:case"end":return t.stop()}}),t)}))),D.apply(this,arguments)}function M(t,e){return $.apply(this,arguments)}function $(){return $=Object(s["a"])(regeneratorRuntime.mark((function t(e,n){return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.next=2,new Promise((function(t,r){var i=e.transaction(["user"],"readwrite"),a=i.objectStore("user"),s=a.add(n);s.onsuccess=function(e){t(e)},s.onerror=function(t){r(t)}}));case 2:return t.abrupt("return",t.sent);case 3:case"end":return t.stop()}}),t)}))),$.apply(this,arguments)}function N(t,e,n){return L.apply(this,arguments)}function L(){return L=Object(s["a"])(regeneratorRuntime.mark((function t(e,n,r){return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:if(!n){t.next=6;break}return t.next=3,new Promise((function(t,i){var a=e.transaction(["user"],"readwrite"),s=a.objectStore("user"),o=s.put(n,r);o.onsuccess=function(e){t(e)},o.onerror=function(t){i(t)}}));case 3:return t.abrupt("return",t.sent);case 6:throw new Error("空对象");case 7:case"end":return t.stop()}}),t)}))),L.apply(this,arguments)}function B(t,e){return I.apply(this,arguments)}function I(){return I=Object(s["a"])(regeneratorRuntime.mark((function t(e,n){return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.next=2,new Promise((function(t,r){var i=e.transaction(["user"],"readonly"),a=i.objectStore("user"),s=a.get(n);s.onsuccess=function(e){console.log("读取用户成功",e.target.result),t(e.target.result)},s.onerror=function(t){console.log("读取用户失败"),r(t)}}));case 2:return t.abrupt("return",t.sent);case 3:case"end":return t.stop()}}),t)}))),I.apply(this,arguments)}var q={name:"App",data:function(){return{nav:{},user:{},activeModal:!1,notifications:[],dropStyle:{"background-color":"inherit","background-origin":"padding-box"}}},components:{navbar:p,links:w,notification:j},created:function(){var t=Object(s["a"])(regeneratorRuntime.mark((function t(){var e,n;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.next=2,S();case 2:return this.db=t.sent,t.next=5,R(this.db,"activeUser");case 5:return e=t.sent,t.next=8,B(this.db,e);case 8:n=t.sent,this.nav=n.nav||T,this.user={name:n.name,uid:e};case 11:case"end":return t.stop()}}),t,this)})));function e(){return t.apply(this,arguments)}return e}(),methods:{allowDrop:function(t){t.preventDefault(),this.dropStyle={"background-color":"#eee"}},dragStart:function(t,e,n){var r=e[n];t.dataTransfer.setData("text/html",'<a href="'.concat(r.url,'">').concat(r.title,"</a>")),t.dataTransfer.setData("text/uri-list","#".concat(r.title,"\n").concat(r.url)),t.dataTransfer.setData("text/plain",r.url),this.dragingCallBack=function(){e.splice(n,1)},this.dragingCallBack.data=r},dragEnd:function(){this.dropStyle={"background-color":"inherit"}},drop:function(t,e){this.allowDrop(t),this.dropStyle={"background-color":"inherit"};var n=t.dataTransfer.getData("text/html"),r=t.dataTransfer.getData("text/uri-list"),i=t.dataTransfer.getData("text/plain"),a=this.dragingCallBack;if(a)e.list.push(a.data),a(),this.dragingCallBack=void 0;else if(n&&""!=n){this.notify("html");var s=document.createElement("div");s.innerHTML=n;var o=s.getElementsByTagName("a")[0];o&&e.list.push({title:o.innerText,url:o.href})}else if(r||i){var c=t.dataTransfer.getData("URL");""!=c&&(this.notify("url"),e.list.push({title:c,url:c}))}},handleInput:function(t,e,n){this.isLocked&&this.innerText||(this.innerText=this.value);var r=t.target.innerText;e[n].title=r},closeModal:function(){this.activeModal=!1},reset:function(){this.nav=T,this.closeModal()},notify:function(t){var e=this;this.notifications.push(t);setTimeout((function(t){e.closeNotifications(t-1)}),1e3)},closeNotifications:function(t){this.notifications.splice(t,1)}},watch:{nav:{handler:function(t,e){var n=this;return"{}"!=JSON.stringify(e)&&N(this.db,{name:this.user.name,nav:t},this.user.uid).then((function(){n.notify("已保存")})),t},deep:!0}}},z=q,A=(n("5c0b"),Object(f["a"])(z,i,a,!1,null,null,null)),V=A.exports;r["a"].config.productionTip=!1,new r["a"]({render:function(t){return t(V)}}).$mount("#app")},"5c0b":function(t,e,n){"use strict";n("8bce")},"7c30":function(t,e,n){"use strict";n("8f40")},"8bce":function(t,e,n){},"8f40":function(t,e,n){},"91b5":function(t,e,n){}});
//# sourceMappingURL=app.0148895f.js.map
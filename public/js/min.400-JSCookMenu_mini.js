var _cmIDCount=0,_cmIDName="cmSubMenuID",_cmTimeOut=null,_cmCurrentItem=null,_cmNoAction={},_cmNoClick={},_cmSplit={},_cmItemList=[],_cmNodeProperties={mainFolderLeft:"",mainFolderRight:"",mainItemLeft:"",mainItemRight:"",folderLeft:"",folderRight:"",itemLeft:"",itemRight:"",mainSpacing:0,subSpacing:0,delay:500,clickOpen:1};function cmNewID(){return _cmIDName+ ++_cmIDCount}
function cmActionItem(a,b,c,d,e,f){var g=_cmNodeProperties.clickOpen;if(f.clickOpen)g=f.clickOpen;_cmItemList[_cmItemList.length]=a;a=_cmItemList.length-1;d=!d?"null":"'"+d+"'";e="'"+e+"'";b="'"+b+"'";return(g==3||g==2&&c?' onmouseover="cmItemMouseOver (this,'+b+","+c+","+d+","+a+')" onmousedown="cmItemMouseDownOpenSub (this,'+a+","+b+","+e+","+d+')"':' onmouseover="cmItemMouseOverOpenSub (this,'+b+","+c+","+d+","+e+","+a+')" onmousedown="cmItemMouseDown (this,'+a+')"')+' onmouseout="cmItemMouseOut (this,'+
f.delay+')" onmouseup="cmItemMouseUp (this,'+a+')"'}function cmNoClickItem(a,b,c,d,e,f){_cmItemList[_cmItemList.length]=a;a=_cmItemList.length-1;return' onmouseover="cmItemMouseOver (this,'+("'"+b+"'")+","+c+","+(!d?"null":"'"+d+"'")+","+a+')" onmouseout="cmItemMouseOut (this,'+f.delay+')"'}function cmNoActionItem(a){return a[1]}function cmSplitItem(a,b,c){a="cm"+a;b?(a+="Main",a+=c?"HSplit":"VSplit"):a+="HSplit";return eval(a)}
function cmDrawSubMenu(a,b,c,d,e){var c='<div class="'+b+'SubMenu" id="'+c+'"><table summary="sub menu" cellspacing="'+e.subSpacing+'" class="'+b+'SubMenuTable">',f="",g,h,j,l,k;for(l=5;l<a.length;++l)if(g=a[l])h=(j=g.length>5)?cmNewID():null,g==_cmSplit&&(g=cmSplitItem(b,0,true)),c+='<tr class="'+b+'MenuItem"',c+=g[0]!=_cmNoClick?cmActionItem(g,b,0,h,d,e):cmNoClickItem(g,b,0,h,d,e),c+=">",g[0]==_cmNoAction||g[0]==_cmNoClick?(c+=cmNoActionItem(g,b),c+="</tr>"):(k=b+"Menu",k+=j?"Folder":"Item",c+=
'<td class="'+k+'Left">',c+=g[0]!=null?g[0]:j?e.folderLeft:e.itemLeft,c+='</td><td class="'+k+'Text">'+g[1],c+='</td><td class="'+k+'Right">',j?(c+=e.folderRight,f+=cmDrawSubMenu(g,b,h,d,e)):c+=e.itemRight,c+="</td></tr>");c+="</table></div>"+f;return c}
function cmDraw(a,b,c,d,e){a=cmGetObject(a);d||(d=_cmNodeProperties);e||(e="");var f='<table summary="main menu" class="'+e+'Menu" cellspacing="'+d.mainSpacing+'">',g="";c||(c="hbr");var h=String(c),j;h.charAt(0)=="h"?(h="v"+h.substr(1,2),f+="<tr>",j=false):(h="v"+h.substr(1,2),j=true);var l,k,m,n,o;for(l=0;l<b.length;++l)if(k=b[l])f+=j?"<tr":"<td",f+=' class="'+e+'MainItem"',m=(n=k.length>5)?cmNewID():null,f+=cmActionItem(k,e,1,m,c,d)+">",k==_cmSplit&&(k=cmSplitItem(e,1,j)),k[0]==_cmNoAction||k[0]==
_cmNoClick?(f+=cmNoActionItem(k,e),f+=j?"</tr>":"</td>"):(o=e+"Main"+(n?"Folder":"Item"),f+=j?"<td":"<span",f+=' class="'+o+'Left">',f+=k[0]==null?n?d.mainFolderLeft:d.mainItemLeft:k[0],f+=j?"</td>":"</span>",f+=j?"<td":"<span",f+=' class="'+o+'Text">',f+=k[1],f+=j?"</td>":"</span>",f+=j?"<td":"<span",f+=' class="'+o+'Right">',f+=n?d.mainFolderRight:d.mainItemRight,f+=j?"</td>":"</span>",f+=j?"</tr>":"</td>",n&&(g+=cmDrawSubMenu(k,e,m,h,d)));j||(f+="</tr>");f+="</table>"+g;a.innerHTML=f}
function cmDrawFromText(a,b,c,d){for(var e=null,f=cmGetObject(a).firstChild;f;f=f.nextSibling)if(f.tagName&&f.tagName.toLowerCase()=="ul"){e=cmDrawFromTextSubMenu(f);break}e&&cmDraw(a,e,b,c,d)}
function cmDrawFromTextSubMenu(a){for(var b=[],a=a.firstChild;a;a=a.nextSibling)if(a.tagName&&a.tagName.toLowerCase()=="li")if(a.firstChild==null)b[b.length]=_cmSplit;else{for(var c=[],d=a.firstChild;d;d=d.nextSibling)if(d.tagName&&d.tagName.toLowerCase()=="span"){c[0]=d.firstChild?d.innerHTML:null;break}if(d){for(;d;d=d.nextSibling)if(d.tagName&&d.tagName.toLowerCase()=="a"){c[1]=d.innerHTML;c[2]=d.href;c[3]=d.target;c[4]=d.title;c[4]==""&&(c[4]=null);break}for(;d;d=d.nextSibling)if(d.tagName&&d.tagName.toLowerCase()==
"ul"){d=cmDrawFromTextSubMenu(d);for(i=0;i<d.length;++i)c[i+5]=d[i];break}b[b.length]=c}}return b}
function cmItemMouseOver(a,b,c,d,e){clearTimeout(_cmTimeOut);if(!a.cmPrefix)a.cmPrefix=b,a.cmIsMain=c;var f=cmGetThisMenu(a,b);if(!f.cmItems)f.cmItems=[];var g;for(g=0;g<f.cmItems.length;++g)if(f.cmItems[g]==a)break;g==f.cmItems.length&&(f.cmItems[g]=a);if(_cmCurrentItem){if(_cmCurrentItem==a||_cmCurrentItem==f){d=_cmItemList[e];cmSetStatus(d);return}g=_cmCurrentItem.cmPrefix;var h=cmGetThisMenu(_cmCurrentItem,g);if(h!=f.cmParentMenu)_cmCurrentItem.className=_cmCurrentItem.cmIsMain?g+"MainItem":g+
"MenuItem",h.id!=d&&cmHideMenu(h,f,g)}_cmCurrentItem=a;cmResetMenu(f,b);d=_cmItemList[e];if(cmIsDefaultItem(d))a.className=c?b+"MainItemHover":b+"MenuItemHover";cmSetStatus(d)}function cmItemMouseOverOpenSub(a,b,c,d,e,f){cmItemMouseOver(a,b,c,d,f);d&&(c=cmGetObject(d),cmShowSubMenu(a,b,c,e))}function cmItemMouseOut(a,b){if(!b)b=_cmNodeProperties.delay;_cmTimeOut=window.setTimeout("cmHideMenuTime ()",b);window.defaultStatus=""}
function cmItemMouseDown(a,b){if(cmIsDefaultItem(_cmItemList[b]))a.className=a.cmIsMain?a.cmPrefix+"MainItemActive":a.cmPrefix+"MenuItemActive"}function cmItemMouseDownOpenSub(a,b,c,d,e){cmItemMouseDown(a,b);e&&(b=cmGetObject(e),cmShowSubMenu(a,c,b,d))}
function cmItemMouseUp(a,b){var c=_cmItemList[b],d=null,e="_self";c.length>2&&(d=c[2]);c.length>3&&c[3]&&(e=c[3]);d!=null&&window.open(d,e);d=a.cmPrefix;e=cmGetThisMenu(a,d);if(c.length>5){if(cmIsDefaultItem(c))a.className=a.cmIsMain?d+"MainItemHover":d+"MenuItemHover"}else{if(cmIsDefaultItem(c))a.className=a.cmIsMain?d+"MainItem":d+"MenuItem";cmHideMenu(e,null,d)}}
function cmMoveSubMenu(a,b,c){var c=String(c),d=b.offsetParent,e=cmGetWidth(b),f=cmGetHorizontalAlign(a,c,d,e);c.charAt(0)=="h"?(b.style.top=c.charAt(1)=="b"?cmGetYAt(a,d)+cmGetHeight(a)+"px":cmGetYAt(a,d)-cmGetHeight(b)+"px",b.style.left=f=="r"?cmGetXAt(a,d)+"px":cmGetXAt(a,d)+cmGetWidth(a)-e+"px"):(b.style.left=f=="r"?cmGetXAt(a,d)+cmGetWidth(a)+"px":cmGetXAt(a,d)-e+"px",b.style.top=c.charAt(1)=="b"?cmGetYAt(a,d)+"px":cmGetYAt(a,d)+cmGetHeight(a)-cmGetHeight(b)+"px")}
function cmGetHorizontalAlign(a,b,c,d){var e=b.charAt(2);if(!document.body)return e;var f=document.body,g;if(window.innerWidth)g=window.pageXOffset,f=window.innerWidth+g;else if(f.clientWidth)g=f.clientLeft,f=f.clientWidth+g;else return e;b.charAt(0)=="h"?(e=="r"&&cmGetXAt(a)+d>f&&(e="l"),e=="l"&&cmGetXAt(a)+cmGetWidth(a)-d<g&&(e="r")):(e=="r"&&cmGetXAt(a,c)+cmGetWidth(a)+d>f&&(e="l"),e=="l"&&cmGetXAt(a,c)-d<g&&(e="r"));return e}
function cmShowSubMenu(a,b,c,d){if(!c.cmParentMenu){b=cmGetThisMenu(a,b);c.cmParentMenu=b;if(!b.cmSubMenu)b.cmSubMenu=[];b.cmSubMenu[b.cmSubMenu.length]=c}cmMoveSubMenu(a,c,d);c.style.visibility="visible";if(document.all){if(!c.cmOverlap)c.cmOverlap=[];cmHideControl("IFRAME",c);cmHideControl("SELECT",c);cmHideControl("OBJECT",c)}}function cmResetMenu(a,b){if(a.cmItems){var c,d,e=a.cmItems;for(c=0;c<e.length;++c)if(d=e[c].cmIsMain?b+"MainItem":b+"MenuItem",e[c].className!=d)e[c].className=d}}
function cmHideMenuTime(){if(_cmCurrentItem){var a=_cmCurrentItem.cmPrefix;cmHideMenu(cmGetThisMenu(_cmCurrentItem,a),null,a);_cmCurrentItem=null}}function cmHideMenu(a,b,c){var d=c+"SubMenu";if(a.cmSubMenu){var e;for(e=0;e<a.cmSubMenu.length;++e)cmHideSubMenu(a.cmSubMenu[e],c)}for(;a&&a!=b;){cmResetMenu(a,c);if(a.className==d)a.style.visibility="hidden",cmShowControl(a);else break;a=cmGetThisMenu(a.cmParentMenu,c)}}
function cmHideSubMenu(a,b){if(a.style.visibility!="hidden"){if(a.cmSubMenu){var c;for(c=0;c<a.cmSubMenu.length;++c)cmHideSubMenu(a.cmSubMenu[c],b)}cmResetMenu(a,b);a.style.visibility="hidden";cmShowControl(a)}}
function cmHideControl(a,b){var c=cmGetX(b),d=cmGetY(b),e=b.offsetWidth,f=b.offsetHeight,g;for(g=0;g<document.all.tags(a).length;++g){var h=document.all.tags(a)[g];if(h&&h.offsetParent){var j=cmGetX(h),l=cmGetY(h),k=h.offsetWidth,m=h.offsetHeight;if(!(j>c+e||j+k<c))if(!(l>d+f||l+m<d)&&h.style.visibility!="hidden")b.cmOverlap[b.cmOverlap.length]=h,h.style.visibility="hidden"}}}
function cmShowControl(a){if(a.cmOverlap){var b;for(b=0;b<a.cmOverlap.length;++b)a.cmOverlap[b].style.visibility=""}a.cmOverlap=null}function cmGetThisMenu(a,b){for(var c=b+"SubMenu",d=b+"Menu";a;){if(a.className==c||a.className==d)return a;a=a.parentNode}return null}function cmIsDefaultItem(a){return a==_cmSplit||a[0]==_cmNoAction||a[0]==_cmNoClick?false:true}function cmGetObject(a){return document.all?document.all[a]:document.getElementById(a)}
function cmGetWidth(a){var b=a.offsetWidth;return b>0||!cmIsTRNode(a)?b:!a.firstChild?0:a.lastChild.offsetLeft-a.firstChild.offsetLeft+cmGetWidth(a.lastChild)}function cmGetHeight(a){var b=a.offsetHeight;return b>0||!cmIsTRNode(a)?b:!a.firstChild?0:a.firstChild.offsetHeight}function cmGetX(a){var b=0;do b+=a.offsetLeft,a=a.offsetParent;while(a);return b}function cmGetXAt(a,b){for(var c=0;a&&a!=b;)c+=a.offsetLeft,a=a.offsetParent;return a==b?c:c-cmGetX(b)}
function cmGetY(a){var b=0;do b+=a.offsetTop,a=a.offsetParent;while(a);return b}function cmIsTRNode(a){a=a.tagName;return a=="TR"||a=="tr"||a=="Tr"||a=="tR"}function cmGetYAt(a,b){var c=0;if(!a.offsetHeight&&cmIsTRNode(a)){var d=a.parentNode.firstChild,a=a.firstChild;c-=d.firstChild.offsetTop}for(;a&&a!=b;)c+=a.offsetTop,a=a.offsetParent;return a==b?c:c-cmGetY(b)}function cmSetStatus(a){var b="";a.length>4?b=a[4]!=null?a[4]:a[2]?a[2]:b:a.length>2&&(b=a[2]?a[2]:b);window.defaultStatus=b}
function cmGetProperties(a){if(a==void 0)return"undefined";if(a==null)return"null";var b=a+":\n",c;for(c in a)b+=c+" = "+a[c]+"; ";return b};
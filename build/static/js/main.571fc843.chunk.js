(this.webpackJsonpclint=this.webpackJsonpclint||[]).push([[0],{211:function(e,t,a){e.exports=a(369)},267:function(e,t){},368:function(e,t,a){},369:function(e,t,a){"use strict";a.r(t);var n=a(0),r=a.n(n),o=a(12),s=a.n(o),i=a(15),c=a(17),l=a(185),u=(a(219),a(22)),d=a(23),p=a(25),m=a(24),g=a(202),h=a(19),f=a(21),b=a.n(f),E=a(37),y=a(28),v=Object(y.b)(),w=a(186),k="https://hidden-sea-04996.herokuapp.com",O=a.n(w).a.create({baseURL:k},{headers:{"Access-Control-Allow-Origin":"*"}}),N=function(e){return function(){var t=Object(E.a)(b.a.mark((function t(a){var n,r;return b.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,O.post("/api/chat/getChat",{chatId:e});case 2:n=t.sent,r=n.data,console.log(r),a({type:"OPEN_CHAT",payload:r}),v.push("/chat");case 7:case"end":return t.stop()}}),t)})));return function(e){return t.apply(this,arguments)}}()},C=function(e){return function(){var t=Object(E.a)(b.a.mark((function t(a){var n,r;return b.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,O.post("/api/chat/createchat",e);case 2:n=t.sent,r=n.data,console.log(r),a({type:"CREATE_CHAT",payload:r});case 6:case"end":return t.stop()}}),t)})));return function(e){return t.apply(this,arguments)}}()},S=function(e){return{type:"UPDATE_STATUS_FRIEND",payload:e}},L=function(e){return{type:"NEW_FRIEND",payload:e}},j=function(e){return function(){var t=Object(E.a)(b.a.mark((function t(a){var n;return b.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,O.get("/api/user/CHATs"+e);case 2:n=t.sent,console.log(n),a({type:"FETCH_CHATS",payload:n.data});case 5:case"end":return t.stop()}}),t)})));return function(e){return t.apply(this,arguments)}}()},T=function(e){return function(t){O.delete("/chat/delete/".concat(e)),t({type:"DELETE_CHAT",payload:e}),setTimeout((function(){v.push("/")}),40)}},I=function(){return{type:"SIGN_OUT"}};var A=function(e){return{type:"CHANGE_LEGUAGE",payload:e}},_=a(428),F=a(403),R=a(404),x=a(407),D=a(408),U=a(431),q=a(433),M=function(e){Object(p.a)(a,e);var t=Object(m.a)(a);function a(){var e;Object(u.a)(this,a);for(var n=arguments.length,o=new Array(n),s=0;s<n;s++)o[s]=arguments[s];return(e=t.call.apply(t,[this].concat(o))).state={users:[],filterUsers:[],query:"",idForTheClock:""},e.getAllUsers=Object(E.a)(b.a.mark((function t(){var a;return b.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:if(e.props.user&&e.props.isLogin){t.next=2;break}return t.abrupt("return",null);case 2:return t.next=4,O.post("/api/user/getUserForSerach",{sender:e.props.user});case 4:a=t.sent,console.log(a),e.setState({users:a.data});case 7:case"end":return t.stop()}}),t)}))),e.onClickSendReq=function(t){O.post("/api/user/addnewfriend",{geter:t,sender:e.props.user})},e.filterUsersForSerach=function(t){var a=!0;return new RegExp("^"+e.state.query).test(t.email)||(a=!1),e.props.user._id===t._id&&(a=!1),e.props.user.friends[t._id]&&(a=!1),a},e.cancelOrStartTheClock=function(){e.state.idForTheClock&&(console.log("clear"),clearTimeout(e.state.idForTheClock),e.setState({idForTheClock:""}));var t=setTimeout((function(){var t=e.state.users.filter((function(t){return e.filterUsersForSerach(t)}));e.setState({filterUsers:t}),console.log("start")}),200);e.setState({idForTheClock:t})},e.onChangText=function(t){e.setState({query:t.target.value}),e.cancelOrStartTheClock()},e.renderUsersList=function(){return e.state.filterUsers?e.state.filterUsers.map((function(t){return r.a.createElement(_.a.Item,{key:t._id,className:"row"},r.a.createElement(F.a,null,r.a.createElement(R.a,{xs:"4"},r.a.createElement(q.a,{alt:"profile",src:t.imageProfile,style:{fontSize:30}})),r.a.createElement(R.a,{xs:"7"},r.a.createElement("p",null,"".concat(t.firstName," ").concat(t.email))),r.a.createElement(R.a,{xs:"1"},r.a.createElement(q.a,{className:"imgLeg imageAddFri",onClick:function(){return e.onClickSendReq(t)},alt:"add button",src:"addFriend.png",style:{fontSize:30}}))))})):null},e}return Object(d.a)(a,[{key:"componentDidMount",value:function(){this.props.user&&this.props.isLogin||v.push("/"),this.getAllUsers()}},{key:"render",value:function(){return r.a.createElement(x.a,null,r.a.createElement(D.a,{className:"mb-2 mr-sm-2"},r.a.createElement(U.a,{value:this.state.query,onChange:this.onChangText,id:"inlineFormInputGroupUsername2",placeholder:"email"}),r.a.createElement(D.a.Prepend,null,r.a.createElement(D.a.Text,null,"@"))),r.a.createElement(_.a,null,this.renderUsersList()))}}]),a}(r.a.Component),H=Object(i.b)((function(e){return{user:e.user,isLogin:e.auth.isLogin}}),{add_Friend:L})(M),P=a(139),B=a(432),G=a(98),W=a.n(G),z=new W.a(k);function K(){var e=new Date;return console.log(e),e}var V,J=document.querySelector("#theirVideoTAg"),X=document.querySelector("#myVideoTAg"),Y={iceServers:[{url:"stun:stun.l.google.com:19302"}]},Z=function(e){Object(p.a)(a,e);var t=Object(m.a)(a);function a(e){var n;return Object(u.a)(this,a),(n=t.call(this,e)).startSignaling=function(){n.addmessage("start signaling"),(V=new RTCPeerConnection(Y)).onicecandidate=function(e){e.candidate&&n.state.socket.emit("signal",{type:"ice candidate",message:JSON.stringify({candidate:e.candidate}),room:n.state.chatId}),n.addmessage("completed that ice candidate...")},V.onnegotiationneeded=function(){n.addmessage("on negotiation called"),V.createOffer(n.sendLocalDesc,n.logError)},V.onaddstream=function(e){n.addmessage("going to add their stream..."),J.srcObject=e.stream},navigator.getUserMedia=navigator.getUserMedia||navigator.webkitGetUserMedia||navigator.mozGetUserMedia,navigator.getUserMedia({audio:!0,video:!1},(function(e){n.addmessage("going to display my stream..."),X.srcObject=e,V.addStream(e)}),n.logError)},n.sendLocalDesc=function(e){V.setLocalDescription(e,(function(){n.addmessage("sending local description"),n.state.socket.emit("signal",{type:"SDP",message:JSON.stringify({sdp:V.localDescription}),room:n.state.chatId})}),n.logError)},n.logError=function(e){n.addmessage(e.name+": "+e.message)},n.addmessage=function(e){console.log(e)},n.onChangeText=function(e){n.setState({meassge:e.currentTarget.value}),n.state.socket.emit("typeing",e.currentTarget.value?{senderName:n.state.user.firstName,show:!0,chatId:n.state.chatId}:{senderName:n.state.user.firstName,show:!1,chatId:n.state.chatId})},n.scrollToBottom=function(){n.meassgesEnd.scrollIntoView({behavior:"smooth"})},n.onEnterPress=function(e){13===e.keyCode&&!1===e.shiftKey&&n.handlerClickMSG(e)},n.handlerClickMSG=function(e){if(e.preventDefault(),!n.state.meassge)return null;n.setState({meassge:""}),n.state.socket.emit("typeing",{senderName:n.state.user.firstName,show:!1,chatId:n.state.chatId}),n.state.socket.emit("chat",{message:n.state.meassge,senderName:n.state.user.firstName,senderId:n.state.user.email,chatId:n.state.chatId,createTime:{time:(new Date).toLocaleString([],{hour:"2-digit",minute:"2-digit"}),date:K()}})},n.renderSomeOneIsTypeing=function(){if(n.state.whoIsTypeingNow.length<1)return null;if(1===n.state.whoIsTypeingNow.length)return r.a.createElement("p",null,r.a.createElement("em",null,n.state.whoIsTypeingNow)," is typeing a meassge");var e="";return n.state.whoIsTypeingNow.map((function(t){return e=e+" "+t})),r.a.createElement("p",null,r.a.createElement("em",null,e)," is typeing a meassge")},n.renderDateOfCreateMessage=function(e){var t=new Date;switch(e=new Date(e),Math.floor((t-e)/864e5)){case 0:return"today";case 1:return"Yesterday";case 2:return"3 days ago";default:return"".concat(e.d,"/").concat(e.m,"/").concat(e.y)}},n.renderStyleForTheMessage=function(e,t){return e===n.state.user.email?t:{}},n.renderMessgesList=function(){return n.state.meassges.map((function(e,t){return r.a.createElement("div",{key:e.message+t,"aria-live":"polite","aria-atomic":"true",style:{position:"relative",minHeight:"100px"}},r.a.createElement("div",{style:n.renderStyleForTheMessage(e.senderId,{textAlign:"right",position:"absolute",top:0,right:0,minWidth:"100px"}),id:"body-message"},r.a.createElement("div",{style:n.renderStyleForTheMessage(e.senderId,{backgroundColor:"#b5f66f"}),id:"message"},r.a.createElement("p",{id:"textMessage"},e.message)),r.a.createElement("small",null," ","".concat(n.renderDateOfCreateMessage(e.createTime.date)," at ").concat(e.createTime.time," by ").concat(e.senderName)," ")))}))},n.state={meassge:"",socket:z,meassges:n.props.chat.meassges,whoIsTypeingNow:[],user:n.props.user,chatId:n.props.chat._id,audio:new Audio("msg.mp3")},n.el=r.a.createRef(),n}return Object(d.a)(a,[{key:"componentWillUnmount",value:function(){this.state.socket.close("chat"+this.state.chatId),this.state.socket.close("typeing"+this.state.chatId)}},{key:"componentDidMount",value:function(){var e=this;this.scrollToBottom(),this.state.socket.emit("ready",this.state.chatId),this.state.socket.on("announce"+this.state.chatId,(function(t){e.addmessage(t)})),this.state.socket.emit("signal",{type:"user_here",message:"Are you ready for a call?",room:this.state.chatId}),this.state.socket.on("signaling_message"+this.state.chatId,(function(t){if(e.addmessage(t.type),V||e.startSignaling(),"user_here"!==t.type){var a=JSON.parse(t.message);a.sdp?V.setRemoteDescription(new RTCSessionDescription(a.sdp),(function(){"offer"===V.remoteDescription.type&&V.createAnswer(this.sendLocalDesc,this.logError)}),e.logError):V.addIceCandidate(new RTCIceCandidate(a.candidate))}})),this.state.socket.on("chat"+this.state.chatId,(function(t){t.senderId!==e.props.user.email&&(e.scrollToBottom(),e.state.audio.play()),e.setState({meassges:[].concat(Object(P.a)(e.state.meassges),[t])})})),this.state.socket.on("typeing"+this.state.chatId,(function(t){if(t.show){var a=!0;e.state.whoIsTypeingNow.forEach((function(e){return e===t.senderName?a=!1:null})),a&&e.setState({whoIsTypeingNow:[].concat(Object(P.a)(e.state.whoIsTypeingNow),[t.senderName])})}else e.setState({whoIsTypeingNow:e.state.whoIsTypeingNow.filter((function(e){return e!==t.senderName}))})}))}},{key:"componentDidUpdate",value:function(){}},{key:"auto_height",value:function(e){e.style.height="1px",e.style.height=e.scrollHeight+"px"}},{key:"render",value:function(){var e=this;return r.a.createElement("div",{id:"mario-chat"},r.a.createElement("div",{id:"chat-window"},r.a.createElement("video",{id:"theirVideoTAg",autoPlay:!0}," ",r.a.createElement("video",{id:"myVideoTag",autoPlay:!0})),r.a.createElement("div",{id:"feedback"},this.renderSomeOneIsTypeing()),r.a.createElement("div",{id:"output"},r.a.createElement("div",null,this.renderMessgesList())),r.a.createElement("div",{id:"hideScrool",style:{float:"left",clear:"both"},ref:function(t){e.meassgesEnd=t}})),r.a.createElement("form",{onSubmit:this.handlerClickMSG},r.a.createElement(D.a,{id:"messageinput"},r.a.createElement(U.a,{onKeyDown:this.onEnterPress,as:"textarea",rows:"1","aria-multiline":!0,autoComplete:"off",onChange:this.onChangeText,value:this.state.meassge,type:"text",placeholder:"type a message"}),r.a.createElement(D.a.Append,null,r.a.createElement(B.a,{id:"buttonChat",style:{backgroundColor:this.state.meassge?"#575ed8":"#898bce"},type:"submit",variant:"outline-secondary"})))))}}]),a}(r.a.Component),$=function(e){Object(p.a)(a,e);var t=Object(m.a)(a);function a(){var e;Object(u.a)(this,a);for(var n=arguments.length,o=new Array(n),s=0;s<n;s++)o[s]=arguments[s];return(e=t.call.apply(t,[this].concat(o))).state={},e.renderChat=function(){return e.props.chatArea.openChat._id?r.a.createElement(Z,{ENDPOINT:k,chat:e.props.chatArea.openChat,user:e.props.user}):r.a.createElement("h1",null,"error please go back")},e}return Object(d.a)(a,[{key:"componentDidMount",value:function(){}},{key:"render",value:function(){return this.renderChat()}}]),a}(r.a.Component),Q=Object(i.b)((function(e){return{chatArea:e.chatArea,user:e.user,isLogin:e.auth.isLogin}}),{})($),ee=a(57),te=a(204),ae=a(26),ne=a(6),re=a(409),oe=a(40),se=a(426),ie=a(412),ce=a(413),le=a(414),ue=a(419),de=a(106),pe=a(418),me=a(415),ge=a(192),he=a.n(ge),fe=a(193),be=a.n(fe),Ee=a(194),ye=a.n(Ee),ve=a(434),we=a(410),ke=a(411),Oe=a(417),Ne=Object(re.a)((function(e){return{root:{display:"flex"},appBar:{transition:e.transitions.create(["margin","width"],{easing:e.transitions.easing.sharp,duration:e.transitions.duration.leavingScreen})},appBarShift:{alignItems:"center",width:"calc(100% - ".concat(240,"px)"),marginLeft:240,transition:e.transitions.create(["margin","width"],{easing:e.transitions.easing.easeOut,duration:e.transitions.duration.enteringScreen})},menuButton:{marginRight:e.spacing(6)},hide:{display:"none"},drawer:{width:240,flexShrink:0},drawerPaper:{width:240},drawerHeader:Object(ae.a)(Object(ae.a)({display:"flex",alignItems:"center",padding:e.spacing(0,1)},e.mixins.toolbar),{},{justifyContent:"flex-end"}),content:{flexGrow:1,padding:e.spacing(2),transition:e.transitions.create("margin",{easing:e.transitions.easing.sharp,duration:e.transitions.duration.leavingScreen}),marginLeft:-240},contentShift:{transition:e.transitions.create("margin",{easing:e.transitions.easing.easeOut,duration:e.transitions.duration.enteringScreen}),marginLeft:0}}}));var Ce=Object(i.b)((function(e){return{user:e.user,isLogin:e.auth.isLogin,leg:e.leg}}),{changeLeg:A,createCHAT:C,openChat:N,deleteChat:T,fetchChats:j,signOut:I})((function(e){var t=Ne(),a=Object(oe.a)(),n=r.a.useState(!0),o=Object(te.a)(n,2),s=o[0],i=o[1];return r.a.createElement("div",{className:t.root},r.a.createElement(ie.a,null),r.a.createElement(ce.a,{position:"fixed",className:Object(ne.a)(t.appBar,Object(ee.a)({},t.appBarShift,s))},r.a.createElement(le.a,null,r.a.createElement(de.a,{variant:"h6",noWrap:!0}),r.a.createElement(me.a,{color:"inherit","aria-label":"open drawer",onClick:function(){i(!0)},edge:"start",className:Object(ne.a)(t.menuButton,s&&t.hide)},r.a.createElement(he.a,null)))),r.a.createElement(se.a,{className:t.drawer,variant:"persistent",anchor:"left",open:s,classes:{paper:t.drawerPaper}},r.a.createElement("div",{className:t.drawerHeader},r.a.createElement(me.a,{onClick:function(){i(!1)}},"ltr"===a.direction?r.a.createElement(be.a,null):r.a.createElement(ye.a,null))),r.a.createElement(Oe.a,{variant:"contained",id:"CWE",onClick:function(){if("/"===v.location.pathname)return null;v.push("")}},"CWE"),r.a.createElement(pe.a,null),r.a.createElement(ue.a,null,e.isLogin?r.a.createElement(r.a.Fragment,null,r.a.createElement(ve.a,{onClick:function(){return v.push("/profile")},button:!0,key:"profile buuton"},r.a.createElement(we.a,null,r.a.createElement("img",{className:"fa fa-plus-circle",src:e.user.imageProfile,alt:"profile button"})," "),r.a.createElement(ke.a,{primary:e.user.firstName})),r.a.createElement(ve.a,{onClick:function(){v.push("/"),e.signOut()},button:!0,key:"LogOut buuton"},r.a.createElement(we.a,null,r.a.createElement("img",{className:"fa fa-plus-circle",src:"logOut.png",alt:"logOut button"})," "),r.a.createElement(ke.a,{primary:"LogOut"}))):r.a.createElement(ve.a,{onClick:function(){v.push("/"),e.signOut()},button:!0,key:"login buuton"},r.a.createElement(we.a,null,r.a.createElement("img",{className:"fa fa-plus-circle",src:"login.png",alt:"login button"})," "),r.a.createElement(ke.a,{primary:"Login \\ register"})),r.a.createElement(pe.a,null)),r.a.createElement(ue.a,null,e.isLogin&&e.user?r.a.createElement(r.a.Fragment,null,r.a.createElement(ve.a,{onClick:function(){return v.push("addFrind")},button:!0,key:"addFrind"},r.a.createElement(we.a,null,r.a.createElement("img",{className:"fa fa-plus-circle",src:"serachF.png",alt:"addFrind button"})," "),r.a.createElement(ke.a,{primary:"Serach A Frined"})),r.a.createElement(ve.a,{onClick:function(){return v.push("friends.list")},button:!0,key:"friends.list"},r.a.createElement(we.a,null,r.a.createElement("img",{className:"fa fa-plus-circle",src:"friendsList.png",alt:"friends.list button"})," "),r.a.createElement(ke.a,{primary:"friends list"}))):null,r.a.createElement(pe.a,null)),r.a.createElement(ue.a,null,e.isLogin&&e.user?Object.keys(e.user.friends).length<0?null:Object.values(e.user.friends).map((function(t,a){return"accept"===t.status?r.a.createElement(ve.a,{onClick:function(){return a=t.chatId,void e.openChat(a);var a},button:!0,key:t._id},r.a.createElement("img",{src:t.imageProfile,alt:"profile "}),r.a.createElement(ke.a,{primary:"".concat(t.firstName," ").concat(t.lastName)})):null})):null,r.a.createElement(pe.a,null))),r.a.createElement("main",{className:Object(ne.a)(t.content,Object(ee.a)({},t.contentShift,s))},r.a.createElement("div",{className:t.drawerHeader}),e.children))})),Se=a(424),Le=function(e){Object(p.a)(a,e);var t=Object(m.a)(a);function a(){var e;Object(u.a)(this,a);for(var n=arguments.length,o=new Array(n),s=0;s<n;s++)o[s]=arguments[s];return(e=t.call.apply(t,[this].concat(o))).state={io:z,show:!1,whatKind:"",body:"",lastFriendReq:{},newReqSound:new Audio("newReq.mp3"),id:""},e.setListenerSocket=function(){!e.state.id&&e.props.isLogin&&e.props.user?(e.state.io.on("newFriendReq"+e.props.user._id,(function(t){console.log("friend"),"sender"===t.status&&(e.state.newReqSound.play(),e.setState({lastFriendReq:t,show:!0,whatKind:"newFriendreq",body:t.firstName+" "+t.lastName})),e.props.add_Friend(t)})),e.state.io.on("FirendsReqAccept"+e.props.user._id,(function(t){"accept"===t.status&&(e.state.newReqSound.play(),e.setState({lastFriendReq:t,show:!0,whatKind:"newFriendreq",body:t.firstName+" "+t.lastName})),console.log("accept"),e.props.updatefriend({_id:t._id,status:"accept",chatId:t.chatId,user:t})})),e.state.io.on("deleteFriend"+e.props.user._id,(function(t){console.log("delete"),e.props.deleteFriend(t)})),e.state.io.on("declineFriendReq"+e.props.user._id,(function(t){console.log("decline"),e.props.deleteFriend(t)})),e.state.io.on("blockFriendReq"+e.props.user._id,(function(t){console.log("block"),e.props.updatefriend({_id:t._id,user:t,status:"decline"})})),e.state.io.on("error"+e.props.user._id,(function(t){console.log(t),e.setState({show:!0,whatKind:"error",header:"error",body:t})})),e.state.io.on("show",(function(e){alert(e)})),e.setState({id:e.props.user._id})):!e.state.id||e.props.isLogin||e.props.user||(console.log("off"),e.state.io.disconnect())},e.onClickDeclineReq=function(t){e.setState({show:!1}),O.post("/api/user/declineFriendReq",{sender:e.props.user,geter:t})},e.onClickAcceptReq=function(){var t=Object(E.a)(b.a.mark((function t(a){var n;return b.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return e.setState({show:!1}),t.next=3,O.post("/api/user/friendreqaccept",{accepter:e.props.user,sender:a});case 3:n=t.sent,console.log(n),alert(n.data);case 6:case"end":return t.stop()}}),t)})));return function(e){return t.apply(this,arguments)}}(),e.onShowOrHide=function(){e.setState({show:!e.state.show})},e.renderModal=function(){if(!e.state.show)return null;var t,a,n,o,s,i;switch(e.state.whatKind){case"error":o="close",s="error",i=e.state.body,a=function(){return e.onShowOrHide()};break;case"newFriendReq":console.log(e.state.lastFriendReq),n="Accept",o="Decline",s="you got new friend request",i="your new friend request send from ".concat(e.state.body," "),t=function(){e.onClickAcceptReq(e.state.lastFriendReq)},a=function(){e.onClickDeclineReq(e.state.lastFriendReq)};break;case"friendReqAccept":o="close",s="you Got Accept",i=" ".concat(e.state.body," accept your friend request \ud83d\ude0e "),a=function(){return e.onShowOrHide()}}return r.a.createElement(Se.a,{"aria-labelledby":"contained-modal-title-vcenter",centered:!0,show:e.state.show,onHide:e.onShowOrHide},r.a.createElement(Se.a.Header,{closeButton:!0},r.a.createElement(Se.a.Title,null,s)),r.a.createElement(Se.a.Body,null,i),r.a.createElement(Se.a.Footer,null,n?r.a.createElement(B.a,{variant:"secondary",onClick:t},n):null,o?r.a.createElement(B.a,{variant:"danger",onClick:a},o):null))},e}return Object(d.a)(a,[{key:"componentDidUpdate",value:function(){this.setListenerSocket()}},{key:"render",value:function(){return r.a.createElement(r.a.Fragment,null,this.renderModal())}}]),a}(r.a.Component),je=Object(i.b)((function(e){return{isLogin:e.auth.isLogin,user:e.user}}),{add_Friend:L,updatefriend:S,deleteFriend:function(e){return{type:"DELETE_FRIEND",payload:e}}})(Le),Te=a(427),Ie=a(425),Ae=a(420),_e={eng:{login:{buttonForLogin:"Press For Login",leabel:"Login",button:"Login"},register:{buttonForRegister:"Press For Sign up",leabel:"Sign up",button:"Register"},email:{error:"Invalid email",leabel:"Email"},password:{error:"Your password must include at least 8 characters. At least 1 number And symbol (like !@#%).  ",leabel:"Password"},firstName:{error:"You must enter a first name without numbers and contain at least 2 characters",leabel:"FirstName"},lastName:{error:"You must enter a last name without numbers and contain at least 2 characters",leabel:"LastName"},address:{error:"Need to enter full address city street number house",leabel:"full address"},phone:{error:"Need to enter phone number",leabel:"phone number"}},heb:{login:{buttonForLogin:"\u05dc\u05d7\u05e5 \u05db\u05d0\u05df \u05dc\u05d4\u05ea\u05d7\u05d1\u05e8",leabel:"\u05dc\u05d4\u05ea\u05d7\u05d1\u05e8 \u05dc\u05d0\u05ea\u05e8",button:"\u05dc\u05d4\u05ea\u05d7\u05d1\u05e8"},register:{buttonForRegister:"\u05dc\u05d7\u05e5 \u05db\u05d0\u05df \u05dc\u05d4\u05e8\u05e9\u05dd",leabel:"\u05d4\u05e8\u05e9\u05de\u05d4 \u05dc\u05d0\u05ea\u05e8",button:"\u05dc\u05d4\u05d9\u05e8\u05e9\u05dd"},email:{error:"\u05d0\u05d9\u05de\u05d9\u05d9\u05dc \u05d4\u05d9\u05e0\u05d5 \u05ea\u05e7\u05d9\u05df",leabel:"\u05d0\u05d9\u05de\u05d9\u05d9\u05dc"},password:{error:"\u05d5\u05e1\u05e4\u05e8\u05d5\u05ea (A-Z)\u05d5\u05ea\u05d5 \u05d2\u05d3\u05d5\u05dc (a-z)  \u05e2\u05dc \u05d4\u05e1\u05d9\u05e1\u05de\u05d4 \u05dc\u05d4\u05d9\u05d5\u05ea \u05de\u05d9\u05e0\u05d9\u05de\u05d5\u05dd 7 \u05ea\u05d5\u05d5\u05d9\u05dd \u05d5\u05dc\u05d4\u05db\u05d9\u05dc \u05ea\u05d5\u05d5\u05d9\u05dd  ",leabel:"\u05e1\u05d9\u05e1\u05de\u05d4"},firstName:{error:"\u05e6\u05e8\u05d9\u05da \u05dc\u05d4\u05db\u05e0\u05d9\u05e1 \u05e9\u05dd \u05e4\u05e8\u05d8\u05d9 \u05d1\u05dc\u05d9 \u05de\u05e1\u05e4\u05e8\u05d9\u05dd \u05d5\u05dc\u05d4\u05db\u05d9\u05dc 2 \u05ea\u05d5\u05d5\u05d9\u05dd \u05dc\u05e4\u05d7\u05d5\u05ea",leabel:"\u05e9\u05dd \u05e4\u05e8\u05d8\u05d9"},lastName:{error:"\u05e6\u05e8\u05d9\u05da \u05dc\u05d4\u05db\u05e0\u05d9\u05e1 \u05e9\u05dd \u05de\u05e9\u05e4\u05d7\u05d4 \u05d1\u05dc\u05d9 \u05de\u05e1\u05e4\u05e8\u05d9\u05dd \u05d5\u05dc\u05d4\u05db\u05d9\u05dc 2 \u05ea\u05d5\u05d5\u05d9\u05dd \u05dc\u05e4\u05d7\u05d5\u05ea",leabel:"\u05e9\u05dd \u05de\u05e9\u05e4\u05d7\u05d4"},address:{error:"\u05e6\u05e8\u05d9\u05da \u05dc\u05d4\u05db\u05e0\u05d9\u05e1 \u05db\u05ea\u05d5\u05d1\u05ea \u05de\u05dc\u05d0\u05d4 \u05e2\u05d9\u05e8 \u05e8\u05d7\u05d5\u05d1 \u05de\u05e1\u05e4\u05e8 \u05d1\u05d9\u05ea",leabel:"\u05db\u05ea\u05d5\u05d1\u05ea \u05de\u05dc\u05d0\u05d4"},phone:{error:"\u05e6\u05e8\u05d9\u05da \u05dc\u05d4\u05db\u05e0\u05d9\u05e1 \u05de\u05e1\u05e4\u05e8 \u05d8\u05dc\u05e4\u05d5\u05df",leabel:"\u05de\u05e1\u05e4\u05e8 \u05d8\u05dc\u05e4\u05d5\u05df"}}},Fe=function(e){Object(p.a)(a,e);var t=Object(m.a)(a);function a(e){var n;return Object(u.a)(this,a),(n=t.call(this,e)).state={whatToShow:!0,emailError:""},n.onSubmitR=function(e){n.props.createUser(e,n.props.signIn,n.props.openChat)},n.onSubmitL=function(e){n.props.loginUser(e,n.props.signIn,n.props.openChat)},n.renderError=function(e){var t=e.error,a=e.touched;if(t&&a)return r.a.createElement("div",{className:"alert alert-danger"},r.a.createElement("div",{className:"header"},t))},n.renderInput=function(e){var t=e.text,a=e.input,o=e.bg,s=e.type,i=e.label,c=e.meta,l=e.placeholder,u="".concat(o?"mb-3":"col-md-6 mb-3","  ").concat((c.error&&c.touched,"")),d=s||"text";return r.a.createElement("div",{className:u},r.a.createElement("label",{htmlFor:i},"  ",i),t?r.a.createElement("input",Object.assign({},a,{type:d,name:i,autoComplete:"on",placeholder:l,value:t,className:"form-control  ".concat(c.error&&c.touched?"alert alert-danger":""),required:""})):r.a.createElement("input",Object.assign({},a,{name:i,autoComplete:"on",type:d,placeholder:l,className:"form-control  ".concat(c.error&&c.touched?"alert alert-danger":""),required:""})),n.renderError(c))},n.renderChangeMod=function(){return n.state.whatToShow?r.a.createElement("div",{className:"btn-group "},r.a.createElement("h1",{className:"btn btn-success  ",type:"button",onClick:function(){return n.setState({whatToShow:!1})}},_e[n.props.leg].register.buttonForRegister)):r.a.createElement("div",{className:"btn-group   "},r.a.createElement("h1",{className:"btn btn-success",type:"button",onClick:function(){return n.setState({whatToShow:!0})}},_e[n.props.leg].login.buttonForLogin))},n.renderImgLeg=function(){return"eng"===n.props.leg?r.a.createElement("img",{src:"heb.png",onClick:function(){return n.props.changeLeg("heb")},className:"imgLeg",alt:"icon for change leg right now hebrew"}):r.a.createElement("img",{src:"uk.png",onClick:function(){return n.props.changeLeg("eng")},className:"imgLeg",alt:"icon for change leg right now eng"})},n.checkbox=r.a.createRef(),n}return Object(d.a)(a,[{key:"onCheacBox",value:function(){var e=this.checkbox.current.value;this.setState({whatToShow:"register"}),e||this.setState({whatToShow:"login"})}},{key:"renderErrorLogin",value:function(){if(this.props.user&&"not found"===this.props.user)return r.a.createElement("p",{className:"emaildup"},"\u05d0\u05d9\u05de\u05d9\u05d9\u05dc \u05d0\u05d5 \u05d4\u05e1\u05d9\u05e1\u05de\u05d4 \u05dc\u05d0 \u05e0\u05db\u05d5\u05e0\u05d9\u05dd")}},{key:"renderErrorRegister",value:function(e){if(this.props.user&&"dup"===this.props.user)return r.a.createElement("p",{className:"emaildup"},"\u05d0\u05d9\u05de\u05d9\u05d9\u05dc \u05e7\u05d9\u05d9\u05dd \u05db\u05d1\u05e8 ")}},{key:"login",value:function(){return r.a.createElement("div",{className:"form-group ".concat("eng"===this.props.leg?"textLeft":"textRight")},r.a.createElement("h1",null,_e[this.props.leg].login.leabel,"  "),this.renderChangeMod(),r.a.createElement("form",{onSubmit:this.props.handleSubmit(this.onSubmitL),className:"error"},r.a.createElement(Te.a,{bg:!0,type:"email",autocomplete:"current-password",name:"email",component:this.renderInput,label:_e[this.props.leg].email.leabel}),r.a.createElement(Te.a,{bg:!0,type:"password",name:"password",component:this.renderInput,label:_e[this.props.leg].password.leabel}),this.renderErrorLogin(),r.a.createElement("button",{className:"btn btn-info form-control"},_e[this.props.leg].login.button," ")))}},{key:"register",value:function(){return r.a.createElement("div",{className:"form-group ".concat("eng"===this.props.leg?"textLeft":"textRight")},r.a.createElement("h1",{className:"eng"===this.props.leg?"textLeft":"textRight"},_e[this.props.leg].register.leabel," "),this.renderChangeMod(),r.a.createElement("form",{onSubmit:this.props.handleSubmit(this.onSubmitR),className:"error"},r.a.createElement("div",{className:"row"},r.a.createElement(Te.a,{type:"email",clas:"dup"===this.props.user?"error":null,name:"email",placeholder:" you@example.com",component:this.renderInput,label:_e[this.props.leg].email.leabel}),r.a.createElement(Te.a,{type:"password",name:"password",component:this.renderInput,label:_e[this.props.leg].password.leabel})),r.a.createElement("div",{className:"row"},r.a.createElement(Te.a,{name:"firstName",component:this.renderInput,label:_e[this.props.leg].firstName.leabel}),r.a.createElement(Te.a,{name:"lastName",component:this.renderInput,label:_e[this.props.leg].lastName.leabel})),r.a.createElement("div",{className:"row"}),this.renderErrorRegister(),r.a.createElement("div",{className:"row"},r.a.createElement("button",{className:"btn btn-info form-control"},_e[this.props.leg].register.button," "))))}},{key:"renderLoginOrRegister",value:function(){return this.state.whatToShow?this.login():this.register()}},{key:"render",value:function(){return r.a.createElement(x.a,{className:" text-right"},this.renderLoginOrRegister(),r.a.createElement(Ae.a,{color:"primary","aria-label":"add"},this.renderImgLeg()))}}]),a}(r.a.Component);var Re=Object(Ie.a)({form:"userLogin",validate:function(e,t){var a,n={};return!1===(a=e.email,/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(a))&&(n.email=_e[t.leg].email.error),!1===function(e){if(void 0===e||null===e)return!1;return!!(e.match(/[0-9]/g)&&e.match(/[A-Z]/g)&&e.match(/[a-z]/g)&&e.length>=7)}(e.password)&&(n.password=_e[t.leg].password.error),(!e.firstName||e.firstName<=2||/[0-9]/.test(e.firstName))&&(n.firstName=_e[t.leg].firstName.error),(!e.lastName||e.lastName<=2||/[0-9]/.test(e.lastName))&&(n.lastName=_e[t.leg].lastName.error),(!e.address||e.address<=8||!/[0-9]/.test(e.address))&&(n.address=_e[t.leg].address.error),(!e.phone||e.phone<=7)&&(n.phone=_e[t.leg].phone.error),n}})(Fe),xe=Object(i.b)((function(e){return{isLogin:e.auth.isLogin,user:e.user,leg:e.leg}}),{signIn:function(e){return{type:"SIGN_IN",payload:e}},signOut:I,createUser:function(e,t){return function(){var a=Object(E.a)(b.a.mark((function a(n){var r;return b.a.wrap((function(a){for(;;)switch(a.prev=a.next){case 0:return a.next=2,O.post("/register",e);case 2:r=a.sent,console.log(r),n({type:"CREATE_USER",payload:r.data}),"eror"!==r.data&&"dup"!==r.data&&t(r.data._id);case 6:case"end":return a.stop()}}),a)})));return function(e){return a.apply(this,arguments)}}()},loginUser:function(e,t){return function(){var a=Object(E.a)(b.a.mark((function a(n){return b.a.wrap((function(a){for(;;)switch(a.prev=a.next){case 0:return a.next=2,O.post("/login",e).then((function(e){n({type:"LOGIN",payload:e.data}),"eror"!==e.data&&"not found"!==e.data&&"not good"!==e.data&&t(e.data._id)})).catch((function(e){console.log(e)}));case 2:case"end":return a.stop()}}),a)})));return function(e){return a.apply(this,arguments)}}()},openChat:N,changeLeg:A})(Re),De=function(e){Object(p.a)(a,e);var t=Object(m.a)(a);function a(){var e;Object(u.a)(this,a);for(var n=arguments.length,o=new Array(n),s=0;s<n;s++)o[s]=arguments[s];return(e=t.call.apply(t,[this].concat(o))).state={socket:W()(k)},e.renderRegisterORHomePage=function(){return e.props.isLogin&&e.props.user?r.a.createElement("div",null,r.a.createElement("h1",null,"Main page")):r.a.createElement(xe,null)},e.onClickAcceptReq=function(t){e.props.updatefriend({_id:t._id,status:"accept"}),e.state.socket.emit("acceptAfrind",{sender:e.props.user,geter:e.props.user})},e}return Object(d.a)(a,[{key:"componentDidUpdate",value:function(){}},{key:"render",value:function(){return r.a.createElement(x.a,null,this.renderRegisterORHomePage())}}]),a}(r.a.Component),Ue=Object(i.b)((function(e){return{user:e.user,isLogin:e.auth.isLogin}}),{updatefriend:S})(De),qe=function(e){Object(p.a)(a,e);var t=Object(m.a)(a);function a(){var e;Object(u.a)(this,a);for(var n=arguments.length,r=new Array(n),o=0;o<n;o++)r[o]=arguments[o];return(e=t.call.apply(t,[this].concat(r))).renderName=function(){return e.props.user&&e.props.isLogin?e.props.user.firstName:null},e}return Object(d.a)(a,[{key:"componentDidMount",value:function(){this.props.user&&this.props.isLogin||v.push("/")}},{key:"render",value:function(){return r.a.createElement("div",null,r.a.createElement("h1",null,"Hello ",this.renderName()," "))}}]),a}(r.a.Component),Me=Object(i.b)((function(e){return{isLogin:e.auth.isLogin,user:e.user}}),{})(qe),He=a(429),Pe=a(421),Be=a(201),Ge=a.n(Be),We=a(422),ze=a(423),Ke=function(e){Object(p.a)(a,e);var t=Object(m.a)(a);function a(){var e;Object(u.a)(this,a);for(var n=arguments.length,o=new Array(n),s=0;s<n;s++)o[s]=arguments[s];return(e=t.call.apply(t,[this].concat(o))).state={socket:z},e.renderFriendsList=function(){return e.props.isLogin&&e.props.user?r.a.createElement("div",null,r.a.createElement("h3",null,"Friends List  ",r.a.createElement("span",{"aria-labelledby":"img",role:"img"},"\ud83e\udd1d")),e.renderUsersList(["accept","iaccept"]),r.a.createElement("h3",null,"Pending friends List ",r.a.createElement("span",{"aria-labelledby":"img",role:"img"},"\ud83d\ude48\ud83d\ude49\ud83d\ude4a")," "),e.renderUsersList(["waiting","sender"]),r.a.createElement("h3",null,"Black List ",r.a.createElement("span",{"aria-labelledby":"img",role:"img"},"\ud83d\udc80")),e.renderUsersList(["iblock"])):r.a.createElement("h1",null,"Please logIng Or Register")},e.onClickAcceptReq=function(t){O.post("/api/user/friendreqaccept",{accepter:e.props.user,sender:t})},e.onclickDeletefriend=function(t){console.log("delete"),O.post("/api/user/deletefriendreq",{sender:e.props.user,geter:t})},e.onclickBlockfriend=function(t){O.post("/api/user/blockfriendreq",{sender:e.props.user,geter:t})},e.onClickDeclineFriend=function(t){O.post("/api/user/declineFriendReq",{sender:e.props.user,geter:t})},e.onUnblockAfriend=function(t){O.post("/api/user/unblockFirend",{sender:e.props.user,geter:t})},e.onOpenChat=function(t){e.props.openChat(t)},e.renderBuutonChatOrAccept=function(t){if(!t)return null;switch(t.status){case"waiting":return r.a.createElement(He.a,{title:"waiting for the person to aceept"},r.a.createElement("p",null,"waiting"));case"sender":return r.a.createElement(Pe.a,{key:t._id,item:!0},r.a.createElement(He.a,{onClick:function(){return e.onClickAcceptReq(t)},key:"Accept",title:"Accept the requst"},r.a.createElement(Oe.a,null,"Accept")),r.a.createElement(He.a,{onClick:function(){return e.onClickDeclineFriend(t)},key:"Decline",title:"decline the requst"},r.a.createElement(Oe.a,null,"decline")));case"iblock":return r.a.createElement(Pe.a,{key:t._id,item:!0},r.a.createElement(He.a,{onClick:function(){return e.onUnblockAfriend(t)},key:"unblockbtn",title:"unblock a friend"},r.a.createElement(Oe.a,null,"unblock")),r.a.createElement(He.a,{onClick:function(){return e.onclickDeletefriend(t)},key:"delete",title:"delete friend"},r.a.createElement(We.a,{className:"imgLeg imageAddFri"},"Delete")));default:return r.a.createElement(Pe.a,{key:t._id,item:!0},r.a.createElement(He.a,{key:"open chat",onClick:function(){return e.onOpenChat(t.chatId)},title:"Open Chat"},r.a.createElement(Ge.a,{className:"imgLeg imageAddFri"})),r.a.createElement(He.a,{onClick:function(){return e.onclickBlockfriend(t)},key:"block",title:"Block friend"},r.a.createElement(ze.a,{className:"imgLeg imageAddFri"},"Block")),r.a.createElement(He.a,{onClick:function(){return e.onclickDeletefriend(t)},key:"delete",title:"delete friend"},r.a.createElement(We.a,{className:"imgLeg imageAddFri"},"Delete")))}},e.renderUsersList=function(t){return e.props.isLogin&&e.props.user?Object.values(e.props.user.friends)?Object.values(e.props.user.friends).map((function(a){return-1===t.indexOf(a.status)?null:r.a.createElement(_.a.Item,{key:a._id,className:"row"},r.a.createElement(F.a,null,r.a.createElement(R.a,{xs:"4"},r.a.createElement(q.a,{alt:"profile",src:a.imageProfile,style:{fontSize:30}})),r.a.createElement(R.a,{xs:"5"},r.a.createElement("p",null,"".concat(a.firstName," ").concat(a.email))),r.a.createElement(R.a,{xs:"3"},e.renderBuutonChatOrAccept(a))))})):void 0:null},e}return Object(d.a)(a,[{key:"componentDidUpdate",value:function(){console.log("update ")}},{key:"render",value:function(){return r.a.createElement(x.a,null,this.renderFriendsList())}}]),a}(r.a.Component),Ve=Object(i.b)((function(e){return{user:e.user,isLogin:e.auth.isLogin}}),{updatefriend:S,openChat:N})(Ke),Je=function(e){Object(p.a)(a,e);var t=Object(m.a)(a);function a(){return Object(u.a)(this,a),t.apply(this,arguments)}return Object(d.a)(a,[{key:"componentDidMount",value:function(){this.props.isLogin?console.log():v.push("/")}},{key:"render",value:function(){return r.a.createElement(Ce,null,r.a.createElement(je,null),r.a.createElement(g.a,null,r.a.createElement(h.a,{path:"/profile",exact:!0,component:Me}),r.a.createElement(h.a,{path:"/addFrind",exact:!0,component:H}),r.a.createElement(h.a,{path:"/chat",exact:!0,component:Q}),r.a.createElement(h.a,{path:"/friends.list",exact:!0,component:Ve}),r.a.createElement(h.a,{path:"/",exact:!0,component:Ue})))}}]),a}(r.a.Component),Xe=Object(i.b)((function(e){return{user:e.user,isLogin:e.auth.isLogin}}),{createCHAT:C,openChat:N,deleteChat:T,fetchChats:j,signOut:I})(Je),Ye=Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));function Ze(e,t){navigator.serviceWorker.register(e).then((function(e){e.onupdatefound=function(){var a=e.installing;null!=a&&(a.onstatechange=function(){"installed"===a.state&&(navigator.serviceWorker.controller?(console.log("New content is available and will be used when all tabs for this page are closed. See https://bit.ly/CRA-PWA."),t&&t.onUpdate&&t.onUpdate(e)):(console.log("Content is cached for offline use."),t&&t.onSuccess&&t.onSuccess(e)))})}})).catch((function(e){console.error("Error during service worker registration:",e)}))}var $e=a(430),Qe={isLogin:null,userId:null},et={chats:[],openChat:{chatId:null}},tt=Object(c.c)({user:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:null,t=arguments.length>1?arguments[1]:void 0;switch(t.type){case"CREATE_USER":case"LOGIN":return t.payload;case"SIGN_OUT":return null;case"NEW_FRIEND":return e.friends[t.payload._id]||(e.friends[t.payload._id]=t.payload),Object(ae.a)({},e);case"UPDATE_STATUS_FRIEND":if(e.friends[t.payload._id]){var a=t.payload,n=a.user,r=a._id;e.friends[r]=n}return Object(ae.a)({},e);case"DELETE_FRIEND":return e.friends[t.payload._id]&&delete e.friends[t.payload._id],Object(ae.a)({},e);default:return e}},auth:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:Qe,t=arguments.length>1?arguments[1]:void 0;switch(t.type){case"SIGN_IN":return Object(ae.a)(Object(ae.a)({},e),{},{isLogin:!0,userId:t.payload});case"SIGN_OUT":return Object(ae.a)(Object(ae.a)({},e),{},{isLogin:!1,userId:null});default:return e}},form:$e.a,chatArea:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:et,t=arguments.length>1?arguments[1]:void 0;switch(t.type){case"FETCH_CHATS":return t.payload.forEach((function(t){e.chats.push(t)})),Object(ae.a)({},e);case"CREATE_CHAT":return e.chats.push(t.payload),Object(ae.a)({},e);case"EDIT_CHAT":return Object(ae.a)(Object(ae.a)({},e),{},Object(ee.a)({},t.payload._id,t.payload));case"OPEN_CHAT":return e.openChat=t.payload,Object(ae.a)({},e);default:return e}},leg:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"eng",t=arguments.length>1?arguments[1]:void 0;switch(t.type){case"CHANGE_LEGUAGE":return t.payload;default:return e}}}),at=(a(368),window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__&&window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({trace:!0,traceLimit:25})||c.d),nt=Object(c.e)(tt,at(Object(c.a)(l.a)));s.a.render(r.a.createElement(i.a,{store:nt},r.a.createElement(Xe,null)),document.getElementById("root")),function(e){if("serviceWorker"in navigator){if(new URL("",window.location.href).origin!==window.location.origin)return;window.addEventListener("load",(function(){var t="".concat("","/service-worker.js");Ye?(!function(e,t){fetch(e,{headers:{"Service-Worker":"script"}}).then((function(a){var n=a.headers.get("content-type");404===a.status||null!=n&&-1===n.indexOf("javascript")?navigator.serviceWorker.ready.then((function(e){e.unregister().then((function(){window.location.reload()}))})):Ze(e,t)})).catch((function(){console.log("No internet connection found. App is running in offline mode.")}))}(t,e),navigator.serviceWorker.ready.then((function(){console.log("This web app is being served cache-first by a service worker. To learn more, visit https://bit.ly/CRA-PWA")}))):Ze(t,e)}))}}()}},[[211,1,2]]]);
//# sourceMappingURL=main.571fc843.chunk.js.map
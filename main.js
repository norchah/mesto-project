(()=>{"use strict";var e=function(e,t,n){!function(e){return e.some((function(e){return!e.validity.valid}))}(n)?(e.classList.remove(t),e.removeAttribute("disabled")):(e.classList.add(t),e.setAttribute("disabled",!0))},t=document.querySelector(".button_type_edit"),n=document.querySelector(".button_type_add"),o=document.querySelector(".button_type_avatar"),r=(document.querySelector(".button_type_save"),document.querySelector(".popup_type_edit")),c=document.querySelector(".popup_type_add"),a=document.querySelector(".popup_type_image"),u=document.querySelector(".popup_type_avatar"),i=document.querySelector(".popup_type_delete"),s=document.querySelectorAll(".popup"),d=document.querySelector("#card_template").content,l=document.querySelector(".cards"),f=document.querySelector(".form__input_type_user-name"),m=document.querySelector(".form__input_type_user-descrition"),_=document.querySelector(".form__input_type_avatar"),p=document.querySelector(".form__input_type_card-title"),h=document.querySelector(".form__input_type_card-link"),y=document.querySelector(".profile__name"),v=document.querySelector(".profile__description"),S=document.querySelector(".profile__avatar"),b=document.querySelector(".form_edit_profile"),q=document.querySelector(".form_add_card"),g=document.querySelector(".form_avatar"),L=document.querySelector(".form_delete"),E=document.querySelector(".popup__image"),k=a.querySelector(".popup__image-description"),C="d756fd48e5f571a078557b0b",x=function(e){e.classList.add("popup_opened"),document.addEventListener("keydown",A)},P=function(e){e.classList.remove("popup_opened"),document.removeEventListener("keydown",A)},A=function(e){if("Escape"===e.key){var t=document.querySelector(".popup_opened");P(t)}},U=function(e,t){var n=t.querySelector(".card").cloneNode(!0),o=n.querySelector(".card__image"),r=n.querySelector(".button_type_like"),c=n.querySelector(".button_type_delete"),a=n.querySelector(".card__image"),u=n.querySelector(".card__like-count"),i=Array.from(e.likes);return n.querySelector(".card__title").textContent=e.name,o.src=e.link,o.alt=e.name,u.textContent=e.likes.length,i.forEach((function(e){e._id===C&&r.classList.add("button_like_active")})),e.owner._id===C&&c.classList.add("button_delete_active"),r.addEventListener("mouseup",(function(){return M(e._id,u,r)})),c.addEventListener("click",(function(){return V(e._id,n)})),a.addEventListener("click",(function(){return z(e)})),console.log(e.owner),n},D={baseUrl:"https://nomoreparties.co/v1/plus-cohort-15",methodGet:"GET",methodPost:"POST",methhodDel:"DELETE",methodPatch:"PATCH",methodPut:"PUT",headers:{authorization:"71d1de88-4fa7-4dcd-8a4d-ca9958b8c0d0","Content-Type":"application/json"}};function T(e){return e.ok?e.json():Promise.reject("Error: ".concat(e.status))}var w,B,G,N,O,j,J,M=function(e,t,n){n.classList.contains("button_like_active")?(function(e,t){fetch("".concat(D.baseUrl,"/cards/likes/").concat(t),{method:D.methhodDel,headers:D.headers}).then((function(e){return T(e)})).then((function(t){e.textContent=t.likes.length})).catch((function(e){return console.log(e)}))}(t,e),n.classList.remove("button_like_active")):(function(e,t){fetch("".concat(D.baseUrl,"/cards/likes/").concat(t),{method:D.methodPut,headers:D.headers}).then((function(e){return T(e)})).then((function(t){e.textContent=t.likes.length})).catch((function(e){return console.log(e)}))}(t,e),n.classList.add("button_like_active"))},V=function(e,t){!function(e,t){x(i),L.addEventListener("submit",(function(n){n.preventDefault(),F(!0,n.target),function(e,t){fetch("".concat(D.baseUrl,"/cards/").concat(e),{method:D.methhodDel,headers:D.headers}).then((function(e){return T(e)})).then((function(e){return console.log(e)})).catch((function(e){return console.log(e)})).finally((function(){F(!1,t.target),P(i)}))}(e,n),t.remove()}))}(e,t)},z=function(e){x(a),E.src=e.link,E.alt=e.name,k.textContent=e.name};function H(e,t){t.querySelector(".button_type_save").textContent=e?"Сохранение...":"Сохранить"}function F(e,t){t.querySelector(".button_type_save").textContent=e?"Удаление...":"Да"}fetch("".concat(D.baseUrl,"/users/me"),{method:D.methodGet,headers:D.headers}).then((function(e){return T(e)})).then((function(e){var t,n,o;t=e.name,n=e.about,o=e.avatar,y.textContent=t,v.textContent=n,S.src=o})).catch((function(e){return console.log(e)})),fetch("".concat(D.baseUrl,"/cards"),{method:D.methodGet,headers:D.headers}).then((function(e){return T(e)})).then((function(e){e.forEach((function(e){var t,n;t=e,n=d,l.append(U(t,n))}))})).catch((function(e){return console.log(e)})),t.addEventListener("click",(function(){x(r),f.value=y.textContent,m.value=v.textContent})),n.addEventListener("click",(function(){var e;x(c),(e=c.querySelector(".button_type_save")).setAttribute("disabled",!0),e.classList.add("button_type_disabled")})),o.addEventListener("click",(function(){x(u)})),s.forEach((function(e){e.addEventListener("mousedown",(function(t){(t.target.classList.contains("popup")||t.target.classList.contains("button_type_close"))&&P(e)}))})),b.addEventListener("submit",(function(e){e.preventDefault(),H(!0,e.target),function(e,t,n){fetch("".concat(D.baseUrl,"/users/me"),{method:D.methodPatch,headers:D.headers,body:JSON.stringify({name:e,about:t})}).then((function(e){return T(e)})).then((function(e){y.textContent=e.name,v.textContent=e.about})).catch((function(e){return console.log(e)})).finally((function(){H(!1,n),P(r)}))}(f.value,m.value,e.target)})),q.addEventListener("submit",(function(e){e.preventDefault(),H(!0,e.target),function(e,t,n){fetch("".concat(D.baseUrl,"/cards"),{method:D.methodPost,headers:D.headers,body:JSON.stringify({name:e,link:t})}).then((function(e){return T(e)})).then((function(e){var t,n;t=e,n=d,l.prepend(U(t,n))})).catch((function(e){return console.log(e)})).finally((function(){H(!1,n),P(c)}))}(p.value,h.value,e.target),p.value="",h.value=""})),g.addEventListener("submit",(function(e){e.preventDefault(),H(!0,e.target),function(e,t){fetch("".concat(D.baseUrl,"/users/me/avatar"),{method:D.methodPatch,headers:D.headers,body:JSON.stringify({avatar:e})}).then((function(e){return T(e)})).then((function(e){S.src=e.avatar})).catch((function(e){return console.log(e)})).finally((function(){H(!1,t),P(u)}))}(_.value,e.target),_.value=""})),B=(w={formSelector:".form",inputSelector:".form__input",submitButtonSelector:".button_type_save",inactiveButtonClass:"button_type_disabled",inputErrorClass:"form__input_error",errorClass:"form__item-error_active"}).formSelector,G=w.inputSelector,N=w.submitButtonSelector,O=w.inactiveButtonClass,j=w.inputErrorClass,J=w.errorClass,Array.from(document.querySelectorAll(B)).forEach((function(t){!function(t,n,o,r,c,a){var u=Array.from(t.querySelectorAll(n)),i=t.querySelector(o);e(i,r,u),u.forEach((function(n){n.addEventListener("input",(function(){e(i,r,u),function(e,t,n,o){t.validity.patternMismatch?t.setCustomValidity(t.dataset.errorMessage):t.setCustomValidity(""),t.validity.valid?function(e,t,n,o){var r=e.querySelector(".".concat(t.id,"-error"));t.classList.remove(n),r.textContent="",r.classList.remove(o)}(e,t,n,o):function(e,t,n,o,r){var c=e.querySelector(".".concat(t.id,"-error"));t.classList.add(o),c.textContent=n,c.classList.add(r)}(e,t,t.validationMessage,n,o)}(t,n,c,a)}))}))}(t,G,N,O,j,J)}))})();
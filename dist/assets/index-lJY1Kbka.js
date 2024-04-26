(function(){const i=document.createElement("link").relList;if(i&&i.supports&&i.supports("modulepreload"))return;for(const t of document.querySelectorAll('link[rel="modulepreload"]'))c(t);new MutationObserver(t=>{for(const a of t)if(a.type==="childList")for(const r of a.addedNodes)r.tagName==="LINK"&&r.rel==="modulepreload"&&c(r)}).observe(document,{childList:!0,subtree:!0});function n(t){const a={};return t.integrity&&(a.integrity=t.integrity),t.referrerPolicy&&(a.referrerPolicy=t.referrerPolicy),t.crossOrigin==="use-credentials"?a.credentials="include":t.crossOrigin==="anonymous"?a.credentials="omit":a.credentials="same-origin",a}function c(t){if(t.ep)return;t.ep=!0;const a=n(t);fetch(t.href,a)}})();async function y(){const i=await(await fetch("https://66136ea153b0d5d80f676284.mockapi.io/api/v1/albums")).json();console.log(i);const n=document.getElementById("search-results"),c=document.getElementById("favorites-tab"),t=document.getElementById("my-albums");let a=[];function r(){t.innerHTML="",a.forEach(e=>{const s=document.createElement("li");s.classList.add("list-group-item","d-flex","justify-content-between","align-items-start"),s.innerHTML=`
        <div class="ms-2 me-auto">
          <div class="fw-bold">${e.albumName}<span class="badge bg-primary rounded-pill">${e.averageRating}</span></div>
          <span>${e.artistName}</span>
        </div>
        <button type="button" class="btn btn-danger remove-from-favorites">Remove from Favorites</button>
      `,t.appendChild(s)})}async function f(e){let s=!1;for(const o of a)o.albumName===e.albumName&&(s=!0);s?console.log("Album already in favorites"):(a.push(e),r(),await fetch("https://66136ea153b0d5d80f676284.mockapi.io/api/v1/favorites",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(e)}))}function m(e){a.splice(e,1),r()}function p(){n.classList.add("d-none"),c.classList.remove("d-none"),r()}function b(){n.classList.remove("d-none"),c.classList.add("d-none")}function g(e){n.innerHTML="",e.forEach(s=>{const o=document.createElement("li");o.classList.add("list-group-item","d-flex","justify-content-between","align-items-start"),o.innerHTML=`
        <div class="ms-2 me-auto">
          <div class="fw-bold">${s.albumName}<span class="badge bg-primary rounded-pill">${s.averageRating}</span></div>
          <span>${s.artistName}</span>
        </div>
        <button type="button" class="btn btn-success add-to-favorites" data-album='${JSON.stringify(s)}'>Add to Favorites</button>
      `,n.appendChild(o)})}async function v(e){const d=(await(await fetch("https://66136ea153b0d5d80f676284.mockapi.io/api/v1/albums")).json()).filter(l=>l.albumName.toLowerCase().includes(e.toLowerCase())||l.artistName.toLowerCase().includes(e.toLowerCase()));g(d)}function h(e){e.preventDefault();const s=e.target.querySelector("#query").value;v(s)}document.addEventListener("click",function(e){const s=e.target.id,o=e.target.className;if(s==="favorites-button"&&(e.preventDefault(),p()),s==="search-button"&&(e.preventDefault(),b()),o.includes("add-to-favorites")){const d=JSON.parse(e.target.getAttribute("data-album"));f(d)}if(o.includes("remove-from-favorites")){const d=Array.from(e.target.parentNode.parentNode.children).indexOf(e.target.parentNode);m(d)}}),document.getElementById("search-form").addEventListener("submit",h)}y();
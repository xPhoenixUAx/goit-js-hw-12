import{a as v,S as w,i as a}from"./assets/vendor-b11e2a50.js";(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))l(e);new MutationObserver(e=>{for(const s of e)if(s.type==="childList")for(const y of s.addedNodes)y.tagName==="LINK"&&y.rel==="modulepreload"&&l(y)}).observe(document,{childList:!0,subtree:!0});function r(e){const s={};return e.integrity&&(s.integrity=e.integrity),e.referrerPolicy&&(s.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?s.credentials="include":e.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function l(e){if(e.ep)return;e.ep=!0;const s=r(e);fetch(e.href,s)}})();const E="45170299-c4257b7fc983e8ba1f62eed92";async function m(o,t=1,r=15){const l=new URLSearchParams({key:E,q:o,image_type:"photo",orientation:"horizontal",safesearch:!0,page:t,per_page:r});try{const e=await v.get(`https://pixabay.com/api/?${l}`);if(e.status!==200)throw new Error(e.status);return e.data}catch(e){throw new Error(e)}}let c;function g(o){const t=document.getElementById("gallery");t.innerHTML+=o.map(r=>`
      <div class="image-container">
    <a href="${r.largeImageURL} class="gallery-item"">
      <img src="${r.webformatURL}" alt="${r.tags}" />
      <div class="info">
        <div><p>Likes:</p> ${r.likes}</div>
        <div><p>Views:</p> ${r.views}</div>
        <div><p>Comments:</p> ${r.comments}</div>
        <div><p>Downloads:</p> ${r.downloads}</div>
      </div>
    </a>
    </div>
  `).join(""),c||(c=new w(".gallery a",{captions:!0,captionsData:"alt",captionDelay:250})),c.refresh()}function b(){document.getElementById("gallery").innerHTML=""}function p(){document.getElementById("loader").style.display="block"}function h(){document.getElementById("loader").style.display="none"}const f=document.getElementById("search-form"),n=document.getElementById("load-more-button");let d="",i=1;const u=15;f.addEventListener("submit",async function(o){if(o.preventDefault(),d=document.getElementById("search-input").value.trim(),i=1,!d){a.error({title:"Error",message:"Please enter a search query"});return}b(),p(),n.style.display="none";try{const t=await m(d,i,u);t.hits.length===0?a.warning({title:"No results",message:"Sorry, there are no images matching your search query. Please try again!"}):(g(t.hits),t.totalHits>u&&(n.style.display="block"))}catch{a.error({title:"Error",message:"Failed to fetch images"})}finally{h(),f.reset()}});n.addEventListener("click",async function(){i+=1,p(),n.style.display="none";try{const o=await m(d,i,u);g(o.hits),L(),i*u<o.totalHits?n.style.display="block":a.info({title:"End of results",message:"We're sorry, but you've reached the end of search results."})}catch{a.error({title:"Error",message:"Failed to fetch images"})}finally{h()}});function L(){const t=document.getElementById("gallery").querySelector("a");if(t){const r=t.getBoundingClientRect().height;window.scrollBy({top:r*2,behavior:"smooth"})}}
//# sourceMappingURL=commonHelpers.js.map
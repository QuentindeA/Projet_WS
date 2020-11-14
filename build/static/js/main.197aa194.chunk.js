(this["webpackJsonpdisease-searcher"]=this["webpackJsonpdisease-searcher"]||[]).push([[0],{30:function(e,t,s){},31:function(e,t,s){},33:function(e,t,s){},34:function(e,t,s){},35:function(e,t,s){},41:function(e,t,s){"use strict";s.r(t);var n=s(0),a=s(1),i=s.n(a),l=s(21),r=s.n(l),c=(s(30),s(8)),o=s(9),d=s(11),h=s(10),u=s(22),m=s(2),b=(s(31),s(13)),g=s.n(b),p=s(17),f="http://rdf.disgenet.org/sparql/";function j(){return(j=Object(p.a)(g.a.mark((function e(t,s){var n;return g.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:try{"https://id.nlm.nih.gov/mesh/sparql?query=","&format=JSON&year=current&limit=50&offset=0&inference=true",n=encodeURIComponent('PREFIX rdf:<http://www.w3.org/1999/02/22-rdf-syntax-ns#>\n            PREFIX rdfs:<http://www.w3.org/2000/01/rdf-schema#>\n\t\t    PREFIX xsd:<http://www.w3.org/2001/XMLSchema#>\n            PREFIX owl:<http://www.w3.org/2002/07/owl#>\n            PREFIX meshv:<http://id.nlm.nih.gov/mesh/vocab#>\n\n            SELECT ?dId ?mId ?label ?comment\n            FROM <http://id.nlm.nih.gov/mesh>\n            WHERE {\n              ?descriptor a meshv:Descriptor;\n                            meshv:identifier ?dId;\n                            rdfs:label ?label;\n                            meshv:active 1;\n                            meshv:preferredConcept ?concept.\n              ?concept meshv:identifier ?mId;\n                       meshv:scopeNote ?comment.\n              FILTER(REGEX(?label,"'+t+'","i")).\n            }\n            ORDER BY ?dId ?mId'),fetch("https://id.nlm.nih.gov/mesh/sparql?query="+n+"&format=JSON&year=current&limit=50&offset=0&inference=true").then((function(e){return e.json()})).then((function(e){s(e.results.bindings,t)}),(function(e){console.log("Error : ",e)}))}catch(a){console.log("somethin went wrong",a)}case 1:case"end":return e.stop()}}),e)})))).apply(this,arguments)}function v(e,t,s,n){var a="https://query.wikidata.org/sparql?query="+encodeURIComponent('SELECT DISTINCT ?p ?propLabel ?v ?vLabel WHERE {\n\n    {\n\n      SELECT ?m WHERE {\n        {\n          ?m wdt:P486 ?a .\n          FILTER( ?a = "'+e+'" ).\n        }\n        UNION\n        {\n          ?m wdt:P6694 ?b .\n          FILTER( ?b = "'+t+'" ).\n        }\n        UNION\n        {\n          ?m rdfs:label "'+s+'"@en\n        }\n        UNION\n        {\n          ?m skos:altLabel "'+s+'"@en.\n        }\n      } ORDER BY desc(?a) desc(?b) ?m LIMIT 1\n\n    }\n\n    OPTIONAL {\n    { ?m ?p ?v . } MINUS {\n    ?m ?p ?v\n    FILTER( LANG(?v) != "" && !LANGMATCHES(LANG(?v), "'+n+'") ) .\n    } }\n\n    SERVICE wikibase:label { bd:serviceParam wikibase:language "en". }\n\n    OPTIONAL {\n      ?prop wikibase:directClaim ?p .\n      ?prop rdfs:label ?propLabel.\n      filter(lang(?propLabel) = "'+n+'").\n    }\n\n    OPTIONAL {\n      ?v rdfs:label ?vLabel.\n      FILTER(LANG(?vLabel) = "'+n+'").\n    }\n\n    } ORDER BY ?m ?p');return fetch(a,{headers:{Accept:"application/sparql-results+json"}}).then((function(e){return e.json()})).then((function(e){return e.results.bindings}))}s(33);var O=s.p+"static/media/logo-hexa.d2065947.png",y=function(e){Object(d.a)(s,e);var t=Object(h.a)(s);function s(){var e;return Object(c.a)(this,s),(e=t.call(this)).fetchData=function(t){e.setState({loading:!0}),function(e,t){j.apply(this,arguments)}(t,e.handleResults)},e.handleResults=function(t,s){s===e.state.query&&(e.setState({loading:!1}),e.setState({searchResults:t}))},e.handleInputChange=function(){e.setState({query:e.search.value,searchResults:[]}),""===e.search.value?e.setState({searching:!1}):e.fetchData(e.search.value)},e.handleKeyDown=function(t){if(console.log(t),"Enter"===t.key&&(e.setState({searching:!0}),e.search.blur()),"Unidentified"===t.key){e.setState({searching:!0}),e.search.blur();var s=e.state.searchResults;setTimeout((function(){var t=s.find((function(t){return t.label.value.toLowerCase()===e.state.query.toLocaleLowerCase()})),n="/entity/";t&&t.label.value&&(n+=t.label.value+"/",t.dId.value&&(n+=t.dId.value+"/",t.mId.value&&(n+=t.mId.value)));var a=encodeURI(n);e.props.history.push(a)}),200)}},e.handleDataListClick=function(e){console.log("datalist",e)},e.handleCheckboxDisease=function(){var t=!e.state.diseaseChecked;e.setState({diseaseChecked:t})},e.handleCheckboxVirus=function(){var t=!e.state.virusChecked;e.setState({virusChecked:t})},e.handleTitleClick=function(){e.setState({searching:!1})},e.handleOptionClick=function(){e.setState({showOptions:!e.state.showOptions}),console.log(e.state.showOptions)},e.handleRedirect=function(t,s){localStorage.setItem("entityDescription",s),e.props.history.push(t)},e.state={searchResults:[],query:"",searching:!1,typing:!1,diseaseChecked:!0,virusChecked:!0,showOptions:!1,loading:!1},e}return Object(o.a)(s,[{key:"handleTyping",value:function(e){this.setState({typing:e})}},{key:"render",value:function(){var e,t,s=this;if(this.state.searchResults.length>0){var a=this.state.searchResults.sort((function(e,t){var n=e.label.value.toLowerCase(),a=t.label.value.toLowerCase(),i=s.state.query.toLowerCase(),l=n.indexOf(i),r=a.indexOf(i);return l<r?-1:l>r?1:0}));e=a.map((function(e){var t=e.label.value,a=e.comment.value,l="/entity/";t&&(l+=t+"/",e.dId.value&&(l+=e.dId.value+"/",e.mId.value&&(l+=e.mId.value)));var r=encodeURI(l);return t&&!s.state.loading?Object(n.jsxs)("li",{className:"disease",children:[Object(n.jsx)("h2",{children:t.charAt(0).toUpperCase()}),Object(n.jsx)("h3",{children:t}),Object(n.jsx)("p",{children:a.length>=200?a.substring(0,200)+"...":a}),Object(n.jsx)("button",{onClick:function(){return s.handleRedirect(r,a)},children:"En savoir plus"})]},t):Object(n.jsx)(i.a.Fragment,{})})),this.state.typing&&""!==this.state.query&&(t=a.slice(0,10).map((function(e){if(e.label){var t=e.label.value.toLowerCase(),a=s.state.query.toLowerCase();t.indexOf(a);return Object(n.jsx)("option",{value:t},t)}return Object(n.jsx)(i.a.Fragment,{})})))}else{e=[0,1,2,3,4,5,6,7,8,9].map((function(e){return Object(n.jsx)("li",{className:"disease"},e)}))}return Object(n.jsxs)(i.a.Fragment,{children:[Object(n.jsx)("div",{className:"searcher-container",style:this.state.searching?{overflow:"scroll"}:{maxHeight:"100vh",overflow:"hidden"},children:Object(n.jsxs)("div",{className:this.state.searching?"search-header topbar":"search-header",children:[Object(n.jsx)("img",{onClick:this.handleTitleClick,src:O,className:"search-logo",alt:"logo"}),Object(n.jsxs)("div",{className:this.state.searching?"search-text-container topbar":"search-text-container",onClick:this.handleTitleClick,children:[Object(n.jsxs)("h2",{className:"search-title",children:["The ",Object(n.jsx)("br",{}),"Disease",Object(n.jsx)("br",{})," Searcher"]}),Object(n.jsx)("p",{children:"By the HexaOne Team"})]}),Object(n.jsxs)("div",{className:this.state.searching?"autocomplete home-search-bar topbar":"autocomplete home-search-bar",children:[Object(n.jsx)("input",{className:"home-search",type:"text",name:"search",id:"search",value:this.state.value,placeholder:"Rechercher une maladie. ex: coronavirus",autoComplete:"off",list:"suggestion-results",ref:function(e){return s.search=e},onKeyDown:this.handleKeyDown,onChange:this.handleInputChange,onFocus:function(){return s.handleTyping(!0)},onBlur:function(){return s.handleTyping(!0)}}),this.state.loading&&!this.state.searching&&""!==this.state.query?Object(n.jsxs)("div",{className:"lds-ellipsis",children:[Object(n.jsx)("div",{}),Object(n.jsx)("div",{}),Object(n.jsx)("div",{}),Object(n.jsx)("div",{})]}):Object(n.jsx)(i.a.Fragment,{})]})]})}),Object(n.jsx)("datalist",{id:"suggestion-results",onClick:this.handleDataListClick,children:t}),Object(n.jsx)("div",{className:this.state.searching?"results-container":"",children:this.state.searching&&!this.state.loading&&0===this.state.searchResults.length?Object(n.jsx)("h2",{style:{textAlign:"center"},children:"Pas de r\xe9sultats"}):this.state.searching?Object(n.jsx)("ul",{className:"tilesWrap",children:e}):Object(n.jsx)(i.a.Fragment,{})})]})}}]),s}(i.a.Component),x=s(14),C=s(24),N=(s(34),s(35),function(e){Object(d.a)(s,e);var t=Object(h.a)(s);function s(e){var a;return Object(c.a)(this,s),(a=t.call(this,e)).parseDataAllInfos=function(e,t){for(var s={},n=0;n<e.length;n++){var i=e[n].p,l=i.value;if("uri"===i.type){var r=i.value.split("/");l=(r=r[r.length-1].split("#"))[r.length-1]}var c=e[n].v,o=e[n].vLabel;o.value&&!o.value.startsWith("statement")&&(c=o),"uri"!==c.type&&(s[l]||(s[l]={}),s[l].values?Array.isArray(s[l].values)?s[l].values.push(c):s[l].values=[s[l].values,c]:(s[l].values=[],s[l].values.push(c)),s[l].propLabel||(s[l].propLabel=e[n].propLabel))}var d=Object(C.a)({},a.state.data);d[t]=s,a.setState({data:d,loadingWikidata:!1,language:t})},a.parseDataGenes=function(e){for(var t,s=0;s<e.length;s++){var n=e[s].gene,i=n.value,l=n.value;if("uri"===n.type){var r=n.value.split("/");i=(r=r[r.length-1]).toUpperCase()}var c=e[s].scoreValue.value,o=e[s].description.value;o&&(o=o.substring(1)),t||(t={}),t[i]=[],t[i].push([c,o,l])}var d=!1;a.state.loadingGenes&&void 0===t&&(d=!0,t={}),a.setState({dataGenes:t,loadingGenes:!1,emptyGenes:d})},a.parseDataDisgenetSimilarDiseases=function(e){for(var t={},s=0;s<e.length;s++){var n=e[s].diseaseName2.value,i=e[s].geneName.value,l=e[s].gene.value;if(t||(t={}),!t[n]){var r=e[s].meshURL.value,c=r.split("/");r="/entity/"+n+"/"+(r=c[c.length-1]),t[n]=[],t[n].push(r)}t[n].push([l,i])}for(var o={},d=0,h=!0,u=0,m=Object.entries(t);u<m.length;u++){var b=Object(x.a)(m[u],2),g=b[0],p=b[1];o[t[g].length]||(o[t[g].length]={}),o[t[g].length][g]=p,t[g].length>d&&(d=t[g].length,h=!1)}t=o,a.state.loadingDisgenet&&void 0===t&&(h=!0,t={}),a.setState({dataDisgenetDiseases:t,loadingDisgenet:!1,emptyDisgenet:h,maxGenesCommon:d})},a.changeLanguage=function(){var e="fr"===a.state.language?"en":"fr";a.state.data[e]?a.setState({language:e}):(a.setState({loadingWikidata:!0}),v(a.state.entityIdD,a.state.entityIdM,a.state.entityName,e).then((function(t){return a.parseDataAllInfos(t,e)}))),a.setState({enableSubelementList:!0})},a.handleTitleClick=function(){a.props.history.push(a.state.homepageLink)},a.identifySubject=function(e){var t;t="fr"===a.state.language?a.state.keywordsFR:a.state.keywordsEN;for(var s=0;s<a.state.keywordsDelete.length;s++)if(e.includes(a.state.keywordsDelete[s]))return-2;for(var n=0;n<t.length;n++)for(var i=0;i<t[n].length;i++)if(e.includes(t[n][i]))return n;return-1},a.identifyFormat=function(e,t,s){for(var i=0;i<a.state.formats.length;i++)for(var l=0;l<a.state.formats[i].length;l++)if(e.includes(a.state.formats[i][l]))switch(i){case 0:return Object(n.jsx)("img",{src:e,alt:""},t+s);case 1:return Object(n.jsx)("video",{src:e},t+s)}return e.startsWith("http")?Object(n.jsx)("a",{href:e,children:e},t+s):Object(n.jsx)("p",{children:e},t+s)},a.handleMenuClick=function(e,t){for(var s=e.target.closest(".menu-element"),n=document.getElementsByClassName("menu-element"),i=-1,l=0;l<n.length;l++)if(n[l]===s){i=l;break}var r=document.getElementsByClassName("info-table"),c=document.getElementsByTagName("nav")[0].offsetHeight+20;if(-1===t){window.scrollTo({top:r[i].getBoundingClientRect().top+window.scrollY-c});for(var o=a.highlightVisibleElement(),d=Array.from(document.getElementsByClassName("subelement-list")),h=!0,u=0;u<d.length;u++)if("none"!==d[u].style.display){h=!1;break}!o||h?(a.setState({enableSubelementList:!0}),a.displaySubelementList()):(a.setState({enableSubelementList:!1}),d.forEach((function(e){e.style.display="none"})))}else{var m=r[i].childNodes[1].childNodes[0];window.scrollTo({top:m.childNodes[t].getBoundingClientRect().top+window.scrollY-c})}},a.handleScroll=function(){a.highlightVisibleElement(),a.state.enableSubelementList&&a.displaySubelementList();var e=document.getElementsByTagName("nav");e&&e[0]&&(window.scrollY>=60?(e[0].classList.add("minimized"),document.getElementById("menu").style.top="76px"):(e[0].classList.remove("minimized"),document.getElementById("menu").style.top="171px"))},a.state={loadingGenes:!0,loadingWikidata:!0,loadingDisgenet:!0,emptyDisgenet:!0,emptyGenes:!0,entityIdD:a.props.match.params.idD,entityIdM:a.props.match.params.idM,entityName:a.props.match.params.name,data:{},dataGenes:{},dataDisgenetDiseases:{},notFound:!1,notFoundGenes:!1,language:"fr",homepageLink:"http://localhost:3000",titlesTablesFrench:["Pr\xe9sentation g\xe9n\xe9rale","Autres informations","G\xe8nes associ\xe9s","Maladies similaires","G\xe8ne - Score","Description","Maladies","G\xe8nes associ\xe9s"],titlesTablesEnglish:["General presentation","Other informations","Associated gene","Similar Disease","Gene - Score","Description","Diseases","Shared genes"],keywordsEN:[["ID","ICD","MeSH tree code","UMLS CUI","DiseasesDB","PubMed Health"],["health specialty","subclass of","instance of","Commons category","altLabel","label","description"]],keywordsFR:[["identifiant","UMLS CUI","arborescence MeSH","ICD","CIM","eMedicine"],["cat\xe9gorie","nature de l'\xe9l\xe9ment","sp\xe9cialit\xe9 m\xe9dicale","sous-classe de","label","description"]],keywordsDelete:["timestamp","identifiers","sitelinks","statements","version","dateModified"],formats:[[".jpg",".jpeg",".png",".gif",".svg",".JPG",".JPEG",".PNG",".GIF",".SVG"],[".mp4",".wav"]],indexSubject:-1,enableSubelementList:!0,subelementsCreated:{fr:!1,en:!1},maxGenesCommon:0},window.onscroll=a.handleScroll,a}return Object(o.a)(s,[{key:"componentDidMount",value:function(){var e=this,t=this.state.language;v(this.state.entityIdD,this.state.entityIdM,this.state.entityName,t).then((function(s){return e.parseDataAllInfos(s,t)})),function(e){var t=f+"?query="+encodeURIComponent("\n  SELECT DISTINCT ?gene ?geneName ?disease2 ?diseaseName2 ?meshURL\n  WHERE {\n    ?gda sio:SIO_000628 ?disease,?gene .\n          ?disease skos:exactMatch <http://id.nlm.nih.gov/mesh/"+e+'> .\n    ?gda2 sio:SIO_000628 ?disease2,?gene .\n    ?disease dcterms:title ?diseaseName .\n    ?disease2 dcterms:title ?diseaseName2 .\n          ?disease2 skos:exactMatch ?meshURL.\n  ?gene dcterms:title ?geneName.\n    FILTER regex(?gene, "ncbigene")\n    FILTER regex(?disease, "umls/id")\n    FILTER regex(?disease2, "umls/id")\n          FILTER regex(?meshURL, ".gov/mesh")\n    FILTER (?disease != ?disease2)\n    FILTER (?gda != ?gda2)\n  }\n\n  LIMIT 500\n');return fetch(t,{headers:{Accept:"application/sparql-results+json"}}).then((function(e){return e.json()})).then((function(e){return e.results.bindings}))}(this.state.entityIdD).then((function(t){return e.parseDataDisgenetSimilarDiseases(t)})),function(e){var t=f+"?query="+encodeURIComponent("SELECT DISTINCT ?gene ?scoreValue (SAMPLE(?desc) AS ?description)\n\t\t\tWHERE {\n\t\t\t\t?disease skos:exactMatch <http://id.nlm.nih.gov/mesh/"+e+'>.\n\t\t\t\t?gda sio:SIO_000628 ?disease, ?gene;\n\t\t\t\tsio:SIO_000216 ?score;\n\t\t\t\tdcterms:description ?desc.\n\t\t\t\t?score sio:SIO_000300 ?scoreValue.\n\t\t\t\tFILTER(?gene != ?disease).\n\t\t\t\tFILTER(langmatches(lang(?desc),"en")).\n\t\t\t} GROUP BY ?gene ?scoreValue ORDER BY DESC(?scoreValue) LIMIT 10');return fetch(t,{headers:{Accept:"application/sparql-results+json"}}).then((function(e){return e.json()})).then((function(e){return e.results.bindings}))}(this.state.entityIdD).then((function(t){return e.parseDataGenes(t)}))}},{key:"adaptLastBorder",value:function(){Array.from(document.getElementsByClassName("no-bottom-border")).forEach((function(e){e.classList.remove("no-bottom-border")})),Array.from(document.getElementsByTagName("dl")).forEach((function(e){var t,s=[],n=[];e.childNodes.forEach((function(e){"DT"===e.tagName?s.push(e):"DD"===e.tagName&&n.push(e)}));for(var a=s.length-1;a>=0;a--)if(!s[a].classList.contains("sm-item")){t=a;break}t!==s.length-1&&(s.length-1-t)%2===0||!s[s.length-1]?s[s.length-1]&&s[s.length-2]&&(s[s.length-1].classList.add("no-bottom-border"),n[s.length-1].classList.add("no-bottom-border"),s[s.length-2].classList.add("no-bottom-border"),n[s.length-2].classList.add("no-bottom-border")):(s[s.length-1].classList.add("no-bottom-border"),n[s.length-1].classList.add("no-bottom-border"))}))}},{key:"componentDidUpdate",value:function(){this.state.loadingDisgenet||this.state.loadingWikidata||this.state.loadingGenes||(this.adaptLastBorder(),this.state.subelementsCreated[this.state.language]||this.createSubelementLists(),this.highlightVisibleElement(),this.state.enableSubelementList&&this.displaySubelementList(),this.adaptMenuWidth())}},{key:"highlightVisibleElement",value:function(){var e=document.querySelector(".highlight");e&&e.classList.remove("highlight");var t=Array.from(document.getElementsByClassName("info-table")),s=[];t.forEach((function(e){s.push(e.getBoundingClientRect().top)}));var n,a=0,i=document.getElementsByTagName("nav")[0];i&&(n=i.offsetHeight+40);for(var l=s.length-1;l>0;l--)if(s[l]<n){a=l;break}var r=document.querySelectorAll("#menu .menu-element > p");if(r&&r[a])return r[a].classList.add("highlight"),r[a]===e}},{key:"createSubelementLists",value:function(){for(var e=this,t=document.getElementsByTagName("dl"),s=document.getElementsByClassName("subelement-list"),n=0;n<t.length;n++)for(var a=t[n].childNodes,i=function(t){if("DT"===a[t].tagName){var i=document.createElement("LI");i.innerHTML=a[t].textContent,i.onclick=function(s){return e.handleMenuClick(s,t)},s[n].appendChild(i)}},l=0;l<a.length;l++)i(l);var r=this.state.subelementsCreated;r[this.state.language]=!0,this.setState({subelementsCreated:r})}},{key:"displaySubelementList",value:function(){Array.from(document.getElementsByClassName("subelement-list")).forEach((function(e){e.style.display="none"}));var e=document.querySelector(".highlight ~ .subelement-list");e&&(e.style.display="inline")}},{key:"adaptMenuWidth",value:function(){var e=Array.from(document.querySelectorAll(".menu-element > p ")),t=-1;e.forEach((function(e){e.offsetWidth>t&&(t=e.offsetWidth)}));var s=document.getElementById("menu"),n=parseInt(window.getComputedStyle(s,null).getPropertyValue("padding-left").split("px")[0]),a=parseInt(window.getComputedStyle(s,null).getPropertyValue("padding-right").split("px")[0]);t+=n+a,s.style.width=t+"px"}},{key:"render",value:function(){var e,t=this,s=[],a=[],l=[],r=[],c=[];if(e="fr"===this.state.language?this.state.titlesTablesFrench:this.state.titlesTablesEnglish,this.state.loadingDisgenet||this.state.loadingWikidata||this.state.loadingGenes)return Object(n.jsx)("div",{className:"bb"});if(this.state.notFound)return Object(n.jsx)("h1",{children:"R\xe9sultats non trouv\xe9s"});var o="fr"===this.state.language?this.state.data.fr:this.state.data.en,d=this.state.dataGenes,h=[],u=Object(n.jsx)("dt",{className:"headerDisease",children:e[4]},"header"),m=Object(n.jsx)("p",{className:"headerDisease",children:e[5]},e[5]);h.push(m);var b=i.a.createElement("dd",{key:"headerDef"},h);r.push(u),r.push(b);for(var g=0,p=Object.entries(d);g<p.length;g++){var f=Object(x.a)(p[g],2),j=f[0],v=f[1],y=Object(n.jsxs)("dt",{children:[Object(n.jsx)("a",{href:v[0][2],children:j},j+v[0][0])," ","- ",Object(n.jsx)("b",{children:"Score :"})," ",v[0][0]]},j),C=Object(n.jsx)("dd",{children:v[0][1]},j+"Def");r.push(y),r.push(C)}var N=this.state.dataDisgenetDiseases,E=10;h=[],u=Object(n.jsx)("dt",{className:"headerDisease",children:e[6]},"header"),m=Object(n.jsx)("p",{className:"headerDisease",children:e[7]},e[7]),h.push(m),b=i.a.createElement("dd",{key:"headerDef"},h),c.push(u),c.push(b);for(var I=this.state.maxGenesCommon;I>=0;I--)if(N[I]){for(var L=0,k=Object.entries(N[I]);L<k.length;L++){var S=Object(x.a)(k[L],2),D=S[0],w=S[1];if(E<=0)break;for(var R=[],T=Object(n.jsx)("dt",{children:Object(n.jsx)("a",{href:w[0],children:D.charAt(0).toUpperCase()+D.slice(1)},D+w[0])},D),F=1;F<w.length;F++){var M=Object(n.jsx)("p",{children:Object(n.jsx)("a",{href:w[F][0],children:w[F][1]},D+F)},D+w[F][0]);R.push(M)}var G=i.a.createElement("dd",{key:D+"Def"},R);c.push(T),c.push(G),E--}if(E<=0)break}for(var A=0,B=Object.entries(o);A<B.length;A++){var U=Object(x.a)(B[A],2),q=U[0],P=U[1],W=[],H=void 0,V=void 0,Y=-1;if(q.startsWith("P")){for(var X=0;X<P.values.length;X++){var J=this.identifyFormat(P.values[X].value,q,X);W.push(J)}if(P.propLabel){var _=this.identifySubject(P.propLabel.value);-1!==_&&(Y=_),H=Object(n.jsx)("dt",{children:P.propLabel.value.charAt(0).toUpperCase()+P.propLabel.value.slice(1)},q)}else H=Object(n.jsx)("dt",{children:q.charAt(0).toUpperCase()+q.slice(1)},q);V=i.a.createElement("dd",{key:q+"Def"},W)}else{for(var K=0;K<P.values.length;K++){var z=this.identifyFormat(P.values[K].value,q,K);W.push(z)}H=Object(n.jsx)("dt",{children:q.charAt(0).toUpperCase()+q.slice(1)},q),V=i.a.createElement("dd",{key:q+"Def"},W)}var Q=this.identifySubject(q);switch(-1!==Q&&(Y=Q),Y){case 0:a.push(H),a.push(V);break;case 1:l.push(H),l.push(V);break;case-1:s.push(H),s.push(V);break;case-2:break;default:console.log("Error in switch subject")}}var Z=i.a.createElement("dl",{className:"grid-container"},s),$=i.a.createElement("dl",{className:"grid-container"},a),ee=i.a.createElement("dl",{className:"grid-container"},l),te=[];if(this.state.emptyGenes)te=null;else{var se=i.a.createElement("dl",{className:"grid-container"},r);te=Object(n.jsxs)("div",{className:"info-table",children:[Object(n.jsx)("div",{className:"info-table-header",children:Object(n.jsx)("h1",{children:e[2].toUpperCase()})}),Object(n.jsx)("div",{className:"info-table-body",children:se})]})}var ne=[];if(this.state.emptyDisgenet)ne=null;else{var ae=i.a.createElement("dl",{className:"grid-container"},c);ne=Object(n.jsxs)("div",{className:"info-table",children:[Object(n.jsx)("div",{className:"info-table-header",children:Object(n.jsx)("h1",{children:e[3].toUpperCase()})}),Object(n.jsx)("div",{className:"info-table-body",children:ae})]})}return Object(n.jsxs)(i.a.Fragment,{children:[Object(n.jsx)("nav",{children:Object(n.jsxs)("div",{id:"nav-container",children:[Object(n.jsxs)("div",{id:"nav-text",onClick:this.handleTitleClick,title:"Go to homepage",children:[Object(n.jsxs)("h2",{children:["The ",Object(n.jsx)("br",{}),"Disease",Object(n.jsx)("br",{})," Searcher"]}),Object(n.jsx)("p",{children:"By the HexaOne Team"})]}),Object(n.jsx)("img",{onClick:this.handleTitleClick,src:O,id:"logo",alt:"logo",title:"Go to homepage"}),Object(n.jsx)("button",{id:"language",onClick:this.changeLanguage,children:this.state.language})]})}),Object(n.jsxs)("div",{id:"content-container",children:[Object(n.jsx)("div",{id:"menu",children:Object(n.jsxs)("ul",{children:[Object(n.jsxs)("li",{className:"menu-element",children:[Object(n.jsx)("p",{onClick:function(e){t.handleMenuClick(e,-1)},children:e[0]}),Object(n.jsx)("ul",{className:"subelement-list"})]}),Object(n.jsxs)("li",{className:"menu-element",children:[Object(n.jsx)("p",{onClick:function(e){t.handleMenuClick(e,-1)},children:e[1]}),Object(n.jsx)("ul",{className:"subelement-list"})]}),this.state.emptyGenes?null:Object(n.jsxs)("li",{className:"menu-element",children:[Object(n.jsx)("p",{onClick:function(e){t.handleMenuClick(e,-1)},children:e[2]}),Object(n.jsx)("ul",{className:"subelement-list"})]}),this.state.emptyDisgenet?null:Object(n.jsxs)("li",{className:"menu-element",children:[Object(n.jsx)("p",{onClick:function(e){t.handleMenuClick(e,-1)},children:e[3]}),Object(n.jsx)("ul",{className:"subelement-list"})]}),Object(n.jsxs)("li",{className:"menu-element",children:[Object(n.jsx)("p",{onClick:function(e){t.handleMenuClick(e,-1)},children:"Identification"}),Object(n.jsx)("ul",{className:"subelement-list"})]})]})}),Object(n.jsxs)("div",{id:"info-table-container",children:[Object(n.jsxs)("div",{className:"info-table",children:[Object(n.jsx)("div",{className:"info-table-header",children:Object(n.jsx)("h1",{children:e[0].toUpperCase()})}),Object(n.jsx)("div",{className:"info-table-body",children:ee})]}),Object(n.jsxs)("div",{className:"info-table",children:[Object(n.jsx)("div",{className:"info-table-header",children:Object(n.jsx)("h1",{children:e[1].toUpperCase()})}),Object(n.jsx)("div",{className:"info-table-body",children:Z})]}),te,ne,Object(n.jsxs)("div",{className:"info-table",children:[Object(n.jsx)("div",{className:"info-table-header",children:Object(n.jsx)("h1",{children:"IDENTIFICATION"})}),Object(n.jsx)("div",{className:"info-table-body",children:$})]})]})]})]})}}]),s}(a.Component)),E=function(e){Object(d.a)(s,e);var t=Object(h.a)(s);function s(){return Object(c.a)(this,s),t.apply(this,arguments)}return Object(o.a)(s,[{key:"render",value:function(){return Object(n.jsx)(u.a,{children:Object(n.jsxs)(m.d,{children:[Object(n.jsx)(m.b,{path:"/",component:y,exact:!0}),Object(n.jsx)(m.b,{path:"/entity/:name/:idD?/:idM?",component:N,exact:!0}),Object(n.jsx)(m.a,{to:"/"})]})})}}]),s}(a.Component),I=function(e){e&&e instanceof Function&&s.e(3).then(s.bind(null,42)).then((function(t){var s=t.getCLS,n=t.getFID,a=t.getFCP,i=t.getLCP,l=t.getTTFB;s(e),n(e),a(e),i(e),l(e)}))};r.a.render(Object(n.jsx)(i.a.StrictMode,{children:Object(n.jsx)(E,{})}),document.getElementById("root")),I()}},[[41,1,2]]]);
//# sourceMappingURL=main.197aa194.chunk.js.map
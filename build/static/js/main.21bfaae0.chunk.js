(this["webpackJsonpdisease-searcher"]=this["webpackJsonpdisease-searcher"]||[]).push([[0],{101:function(e,t){},102:function(e,t){},114:function(e,t){},116:function(e,t){},139:function(e,t){},141:function(e,t){},153:function(e,t,n){},159:function(e,t,n){"use strict";n.r(t);var s=n(1),a=n(0),c=n.n(a),r=n(74),i=n.n(r),h=(n(83),n(2)),l=n(3),o=n(7),u=n(6),d=n(76),m=n(5),j=(n(84),n(24)),b=n.n(j),p=n(46),O=n(47);function f(e,t){return v.apply(this,arguments)}function v(){return(v=Object(p.a)(b.a.mark((function e(t,n){var s;return b.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,s=new O.SparqlEndpointFetcher,e.next=4,s.fetchBindings("https://dbpedia.org/sparql",'\n        SELECT ?s as ?search ?nameFr ?nameEn ?commentFr ?commentEn ?image\n        WHERE {\n            ?s a yago:Disease114070360;\n            foaf:depiction ?image\n            FILTER regex(?s, "'+t+'", "i").\n            OPTIONAL {\n                ?s rdfs:label ?nameFr.\n                FILTER(langMatches(lang(?nameFr), "fr")).\n            }\n            OPTIONAL {\n                ?s rdfs:label ?nameEn.\n                FILTER(langMatches(lang(?nameEn), "en")).\n            }\n            OPTIONAL {\n                ?s rdfs:comment ?commentFr.\n                FILTER(langMatches(lang(?commentFr), "fr")).\n            }\n            OPTIONAL {\n                ?s rdfs:comment ?commentEn.\n                FILTER(langMatches(lang(?commentEn), "en")).\n            }\n        } LIMIT 10 ');case 4:e.sent.on("data",(function(e){n(e,"disease")})),e.next=11;break;case 8:e.prev=8,e.t0=e.catch(0),console.log("somethin went wrong",e.t0);case 11:case"end":return e.stop()}}),e,null,[[0,8]])})))).apply(this,arguments)}function x(e,t){return g.apply(this,arguments)}function g(){return(g=Object(p.a)(b.a.mark((function e(t,n){var s;return b.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,s=new O.SparqlEndpointFetcher,e.next=4,s.fetchBindings("https://dbpedia.org/sparql",'\n        SELECT ?s as ?search ?nameFr ?nameEn ?commentFr ?commentEn ?image\n        WHERE {\n            ?s a yago:Virus101328702;\n            foaf:depiction ?image.\n            FILTER regex(?s, "'+t+'", "i").\n            OPTIONAL {\n                ?s rdfs:label ?nameFr.\n                FILTER(langMatches(lang(?nameFr), "fr")).\n            }\n            OPTIONAL {\n                ?s rdfs:label ?nameEn.\n                FILTER(langMatches(lang(?nameEn), "en")).\n            }\n            OPTIONAL {\n                ?s rdfs:comment ?commentFr.\n                FILTER(langMatches(lang(?commentFr), "fr")).\n            }\n            OPTIONAL {\n                ?s rdfs:comment ?commentEn.\n                FILTER(langMatches(lang(?commentEn), "en")).\n            }\n        } LIMIT 10');case 4:e.sent.on("data",(function(e){n(e,"virus")})),e.next=11;break;case 8:e.prev=8,e.t0=e.catch(0),console.log("somethin went wrong",e.t0);case 11:case"end":return e.stop()}}),e,null,[[0,8]])})))).apply(this,arguments)}n(153);var E=n.p+"static/media/logo2.103b5fa1.svg",k=function(e){Object(o.a)(n,e);var t=Object(u.a)(n);function n(){var e;return Object(h.a)(this,n),(e=t.call(this)).fetchData=function(){e.state.diseaseChecked&&e.state.virusChecked?(f(e.state.query,e.handleResults),x(e.state.query,e.handleResults)):e.state.diseaseChecked?f(e.state.query,e.handleResults):e.state.virusChecked&&x(e.state.query,e.handleResults)},e.handleResults=function(t,n){t.type=n;var s=e.state.searchResults;s.push(t),e.setState({searchResults:s})},e.handleInputChange=function(t){e.setState({query:e.search.value}),"Enter"===t.key&&(e.fetchData(),e.setState({searching:!0,searchResults:[]}))},e.handleCheckboxDisease=function(){var t=!e.state.diseaseChecked;e.setState({diseaseChecked:t})},e.handleCheckboxVirus=function(){var t=!e.state.virusChecked;e.setState({virusChecked:t})},e.handleTitleClick=function(){e.setState({searching:!1})},e.handleOptionClick=function(){e.setState({showOptions:!e.state.showOptions}),console.log(e.state.showOptions)},e.state={searchResults:[],query:"",searching:!1,diseaseChecked:!0,virusChecked:!0,showOptions:!1},e}return Object(l.a)(n,[{key:"render",value:function(){var e,t=this;this.state.searchResults&&(e=this.state.searchResults.sort((function(e,t){return"virus"===e.type?"virus"===t.type?e.nameEn.value<t.nameEn.value?-1:1:-1:"disease"===e.type?"disease"===t.type&&e.nameEn.value<t.nameEn.value?-1:1:0})).map((function(e){var t,n=e.nameFr?e.nameFr.value:e.nameEn.value;e.commentFr?t=e.commentFr.value:e.commentEn&&(t=e.commentEn.value);if(n)return Object(s.jsxs)("li",{className:e.type,children:[Object(s.jsx)("h2",{children:"virus"===e.type?"V":"D"}),Object(s.jsx)("h3",{children:n}),Object(s.jsx)("p",{children:t.length>=200?t.substring(0,200)+"...":t}),Object(s.jsx)("a",{href:"/"+e.type+"/"+n,children:Object(s.jsx)("button",{children:"En savoir plus"})})]})})));return Object(s.jsxs)(c.a.Fragment,{children:[Object(s.jsx)("div",{className:"searcher-container",children:Object(s.jsxs)("div",{className:this.state.searching?"search-header topbar":"search-header",children:[Object(s.jsx)("img",{onClick:this.handleTitleClick,src:E,className:"search-logo",alt:"logo"}),Object(s.jsxs)("div",{className:this.state.searching?"search-text-container topbar":"search-text-container",onClick:this.handleTitleClick,children:[Object(s.jsxs)("h2",{className:"search-title",children:["The ",Object(s.jsx)("br",{}),"Disease",Object(s.jsx)("br",{})," Searcher"]}),Object(s.jsx)("p",{children:"By the HexaOne Team"})]}),Object(s.jsxs)("div",{className:this.state.searching?"autocomplete home-search-bar topbar":"autocomplete home-search-bar",children:[Object(s.jsx)("input",{className:"home-search",type:"text",name:"search",id:"search",placeholder:"Rechercher une maladie. ex: coronavirus",ref:function(e){return t.search=e},onKeyDown:this.handleInputChange}),Object(s.jsx)("div",{className:"search-options",onClick:this.handleOptionClick,children:Object(s.jsx)("span",{class:"material-icons blue",children:"tune"})})]}),Object(s.jsxs)("div",{id:this.state.showOptions?"search-options-container":"hidden",children:[Object(s.jsxs)("label",{className:"switch",children:[Object(s.jsx)("input",{type:"checkbox",id:"disease",defaultChecked:this.state.diseaseChecked,onChange:this.handleCheckboxDisease}),Object(s.jsx)("span",{className:"slider round blue"}),Object(s.jsx)("label",{className:"label",htmlFor:"disease",children:"Disease"})]}),Object(s.jsxs)("label",{className:"switch",children:[Object(s.jsx)("input",{type:"checkbox",id:"virus",defaultChecked:this.state.virusChecked,onChange:this.handleCheckboxVirus}),Object(s.jsx)("span",{className:"slider round green"}),Object(s.jsx)("label",{className:"label",htmlFor:"virus",children:"Virus"})]})]})]})}),Object(s.jsxs)("div",{className:"results-container",children:[this.state.searching&&0===this.state.searchResults.length?Object(s.jsx)("h2",{children:"Pas de r\xe9sultats"}):Object(s.jsx)(c.a.Fragment,{}),Object(s.jsx)("ul",{className:"tilesWrap",children:e})]})]})}}]),n}(c.a.Component),C=function(e){Object(o.a)(n,e);var t=Object(u.a)(n);function n(e){var s;return Object(h.a)(this,n),(s=t.call(this,e)).state={diseaseName:s.props.match.params.diseaseName},s}return Object(l.a)(n,[{key:"render",value:function(){return Object(s.jsx)("h1",{children:this.state.diseaseName})}}]),n}(a.Component),F=function(e){Object(o.a)(n,e);var t=Object(u.a)(n);function n(e){var s;return Object(h.a)(this,n),(s=t.call(this,e)).state={virusName:s.props.match.params.virusName},s}return Object(l.a)(n,[{key:"componentDidMount",value:function(){}},{key:"render",value:function(){return Object(s.jsx)("h1",{children:this.state.virusName})}}]),n}(c.a.Component),y=function(e){Object(o.a)(n,e);var t=Object(u.a)(n);function n(){return Object(h.a)(this,n),t.apply(this,arguments)}return Object(l.a)(n,[{key:"render",value:function(){return Object(s.jsx)(d.a,{children:Object(s.jsxs)(m.d,{children:[Object(s.jsx)(m.b,{path:"/",component:k,exact:!0}),Object(s.jsx)(m.b,{path:"/virus/:virusName",component:F,exact:!0}),Object(s.jsx)(m.b,{path:"/disease/:diseaseName",component:C,exact:!0}),Object(s.jsx)(m.a,{to:"/"})]})})}}]),n}(a.Component),N=function(e){e&&e instanceof Function&&n.e(3).then(n.bind(null,160)).then((function(t){var n=t.getCLS,s=t.getFID,a=t.getFCP,c=t.getLCP,r=t.getTTFB;n(e),s(e),a(e),c(e),r(e)}))};i.a.render(Object(s.jsx)(c.a.StrictMode,{children:Object(s.jsx)(y,{})}),document.getElementById("root")),N()},83:function(e,t,n){},84:function(e,t,n){}},[[159,1,2]]]);
//# sourceMappingURL=main.21bfaae0.chunk.js.map
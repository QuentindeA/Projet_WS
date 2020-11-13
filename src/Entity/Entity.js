import React, { Component } from "react";
import { fetchAllInfos } from "../requests/Requests";
import { fetchAssociatedGenesOnDisgenet } from "../requests/Requests";
import { fetchAllInfosGenes } from "../requests/Requests";
import logo from "../logo2.svg";

import "./Entity.css";
import "./loading.css";

class Entity extends Component {
	constructor(props) {
		super(props);

		this.state = {
			loadingGenes: true, // true if we fetch the results
			loadingWikidata: true,
			loadingDisgenet: true, // true if we fetch the results
			entityIdD: this.props.match.params.idD, // url param : mesh id D
			entityIdM: this.props.match.params.idM, // url param : mesh id M
			entityName: this.props.match.params.name, // url param : name/label
			data: {}, // data parsed from the fetch
			dataGenes: {}, //data parsed from disgenet genes fetch
			dataDisgenetDiseases: {},
			notFound: false, // if error from the request
			notFoundGenes: false, // if error from the request
			language: "fr", // default language
			homepageLink: "http://localhost:3000",
			titlesTablesFrench: [
				"Présentation générale",
				"Autres informations",
				"Gènes associés",
				"Maladies similaires",
			],
			titlesTablesEnglish: [
				"General presentation",
				"Other informations",
				"Associated gene",
				"Similar Disease",
			],
			keywordsEN: [
				[
					"ID",
					"ICD",
					"MeSH tree code",
					"UMLS CUI",
					"DiseasesDB",
					"PubMed Health",
				],
				[
					"health specialty",
					"subclass of",
					"instance of",
					"Commons category",
					"altLabel",
					"label",
					"description",
				],
			],
			keywordsFR: [
				[
					"identifiant",
					"UMLS CUI",
					"arborescence MeSH",
					"ICD",
					"CIM",
					"eMedicine",
				],
				[
					"catégorie",
					"nature de l'élément",
					"spécialité médicale",
					"sous-classe de",
					"label",
					"description",
				],
			],

			formats: [
				[".jpg", ".jpeg", ".png", ".gif", ".svg"],
				[".mp4", ".wav"],
			],

			indexSubject: -1,
			enableSubelementList: true,
			subelementsCreated: { fr: false, en: false },
		};

		window.onscroll = this.handleScroll;
	}

	parseDataAllInfos = (dataArray, lang) => {
		let data = {};

		for (let i = 0; i < dataArray.length; i++) {
			let p = dataArray[i].p;
			let pvalue = p.value;

			if (p.type === "uri") {
				let split = p.value.split("/");
				split = split[split.length - 1].split("#");
				pvalue = split[split.length - 1];
			}

			let v = dataArray[i].v;

			let vLabel = dataArray[i].vLabel;

			if (vLabel.value && !vLabel.value.startsWith("statement")) {
				v = vLabel;
			}

			if (v.type === "uri") {
				continue;
			}

			if (!data[pvalue]) data[pvalue] = {};

			if (!data[pvalue].values) {
				data[pvalue].values = [];
				data[pvalue].values.push(v);
			} else {
				if (Array.isArray(data[pvalue].values)) {
					data[pvalue].values.push(v);
				} else {
					data[pvalue].values = [data[pvalue].values, v];
				}
			}

			if (!data[pvalue].propLabel)
				data[pvalue].propLabel = dataArray[i].propLabel;
		}

		if (true) {
			// TODO // If there's at least a label then the response is good
			let newData = { ...this.state.data };
			newData[lang] = data;

			this.setState({
				data: newData,
				loadingWikidata: false,
				language: lang,
			});

			//console.log(this.state.data);
		} else this.setState({ notFound: true });
	};

	parseDataGenes = (dataArray) => {
		let data = {};
		for (let i = 0; i < dataArray.length; i++) {
			let g = dataArray[i].gene;
			let gvalue = g.value;
			if (g.type === "uri") {
				let split = g.value.split("/");
				split = split[split.length - 1];
				gvalue = split.toUpperCase();
			}

			let scoreValue = dataArray[i].scoreValue.value;

			let desc = dataArray[i].description.value;
			if (desc) desc = desc.substring(1);

			data[gvalue] = [];
			data[gvalue].push([scoreValue, desc]);
		}
		console.log(data);
		this.setState({ dataGenes: data, loadingGenes: false });
	};

	parseDataDisgenetSimilarDiseases = (dataArray) => {
		let data = {};

		for (let i = 0; i < dataArray.length; i++) {
			let disease2 = dataArray[i].diseaseName2.value;

			let geneName = dataArray[i].geneName.value;
			let geneUri = dataArray[i].gene.value;

			if (!data[disease2]) {
				let urlDisease2 = dataArray[i].meshURL.value;

				let partsURL = urlDisease2.split("/");
				urlDisease2 = partsURL[partsURL.length - 1];

				urlDisease2 =
					"http://localhost:3000/entity/" +
					disease2 +
					"/" +
					urlDisease2;

				//console.log(urlDisease2);

				data[disease2] = [];
				data[disease2].push(urlDisease2);
			}

			data[disease2].push([geneUri, geneName]);
		}

		let newDataDisgenet = { ...this.state.dataDisgenetDiseases };
		newDataDisgenet = data;
		console.log(data);

		this.setState({
			dataDisgenetDiseases: newDataDisgenet,
			loadingDisgenet: false,
		});
	};

	changeLanguage = () => {
		let newLanguage = this.state.language === "fr" ? "en" : "fr";
		if (!this.state.data[newLanguage]) {
			this.setState({ loadingWikidata: true, loadingDisgenet: true });
			fetchAllInfos(
				this.state.entityIdD,
				this.state.entityIdM,
				this.state.entityName,
				newLanguage
			).then((r) => this.parseDataAllInfos(r, newLanguage));
		} else this.setState({ language: newLanguage });
		this.setState({
			enableSubelementList: true,
		});
	};

	handleTitleClick = () => {
		this.props.history.push(this.state.homepageLink);
	};

	componentDidMount() {
		let l = this.state.language;
		fetchAllInfos(
			this.state.entityIdD,
			this.state.entityIdM,
			this.state.entityName,
			l
		).then((r) => this.parseDataAllInfos(r, l));

		fetchAllInfosGenes(
			this.state.entityIdD,
			this.state.entityIdM,
			this.state.entityName,
			l
		).then((r) => this.parseDataDisgenetSimilarDiseases(r));
		//this.changeLanguage();
		fetchAssociatedGenesOnDisgenet(this.state.entityIdD).then((r) =>
			this.parseDataGenes(r)
		);
	}

	adaptLastBorder() {
		let noBottomBorderElements = Array.from(
			document.getElementsByClassName("no-bottom-border")
		);

		noBottomBorderElements.forEach((el) => {
			el.classList.remove("no-bottom-border");
		});

		let dlArray = Array.from(document.getElementsByTagName("dl"));

		dlArray.forEach((dl) => {
			let dtArray = [];
			let ddArray = [];

			dl.childNodes.forEach((child) => {
				if (child.tagName === "DT") {
					dtArray.push(child);
				} else if (child.tagName === "DD") {
					ddArray.push(child);
				}
			});

			let lastLargeItemIndex;
			for (let i = dtArray.length - 1; i >= 0; i--) {
				if (!dtArray[i].classList.contains("sm-item")) {
					lastLargeItemIndex = i;
					break;
				}
			}
			if (
				lastLargeItemIndex === dtArray.length - 1 ||
				(dtArray.length - 1 - lastLargeItemIndex) % 2 !== 0
			) {
				dtArray[dtArray.length - 1].classList.add("no-bottom-border");
				ddArray[dtArray.length - 1].classList.add("no-bottom-border");
			} else {
				dtArray[dtArray.length - 1].classList.add("no-bottom-border");
				ddArray[dtArray.length - 1].classList.add("no-bottom-border");
				dtArray[dtArray.length - 2].classList.add("no-bottom-border");
				ddArray[dtArray.length - 2].classList.add("no-bottom-border");
			}
		});
	}

	componentDidUpdate() {
		if (
			!this.state.loadingDisgenet &&
			!this.state.loadingWikidata &&
			!this.state.loadingGenes
		) {
			this.adaptLastBorder();
			if (!this.state.subelementsCreated[this.state.language]) {
				this.createSubelementLists();
			}
			this.highlightVisibleElement();
			if (this.state.enableSubelementList) {
				this.displaySubelementList();
			}
		}
	}

	identifySubject = (tag) => {
		let keywords;

		if (this.state.language == "fr") {
			keywords = this.state.keywordsFR;
		} else {
			keywords = this.state.keywordsEN;
		}

		for (let i = 0; i < keywords.length; i++) {
			for (let j = 0; j < keywords[i].length; j++) {
				if (tag.includes(keywords[i][j])) {
					return i;
				}
			}
		}
		return -1;
	};

	identifyFormat = (url, key, index) => {
		for (let i = 0; i < this.state.formats.length; i++) {
			for (let j = 0; j < this.state.formats[i].length; j++) {
				if (url.includes(this.state.formats[i][j])) {
					switch (i) {
						case 0:
							return <img src={url} key={key + index}></img>;
						case 1:
							return <video src={url} key={key + index}></video>;
					}
				}
			}
		}
		return <p key={key + index}>{url}</p>;
	};

	handleMenuClick = (menuIndex, subelementIndex) => {
		let infoTables = document.getElementsByClassName("info-table");
		let navbar = document.getElementsByTagName("nav")[0];
		let offset = navbar.offsetHeight + 20;

		if (subelementIndex === -1) {
			// click on a "title"
			window.scrollTo({
				top:
					infoTables[menuIndex].getBoundingClientRect().top +
					window.scrollY -
					offset,
			});

			let clickedElementAlreadyHighlighted = this.highlightVisibleElement();
			let subelementLists = Array.from(
				document.getElementsByClassName("subelement-list")
			);
			let allSubelementListHidden = true;
			for (let i = 0; i < subelementLists.length; i++) {
				if (subelementLists[i].style.display !== "none") {
					allSubelementListHidden = false;
					break;
				}
			}
			if (!clickedElementAlreadyHighlighted || allSubelementListHidden) {
				this.setState({ enableSubelementList: true });
				this.displaySubelementList();
			} else {
				this.setState({ enableSubelementList: false });
				subelementLists.forEach((list) => {
					list.style.display = "none";
				});
			}
		} else {
			// click on a subelement

			// get the dl element in the info-table
			let infoTableDlElement =
				infoTables[menuIndex].childNodes[1].childNodes[0];

			// scroll to the child at index "subelementIndex"
			window.scrollTo({
				top:
					infoTableDlElement.childNodes[
						subelementIndex
					].getBoundingClientRect().top +
					window.scrollY -
					offset,
			});
		}
	};

	highlightVisibleElement() {
		let highlightedElement = document.querySelector(".highlight");
		if (highlightedElement) {
			highlightedElement.classList.remove("highlight");
		}

		let infoTables = Array.from(
			document.getElementsByClassName("info-table")
		);

		let scrollPositions = new Array();

		infoTables.forEach((table) => {
			scrollPositions.push(table.getBoundingClientRect().top);
		});

		let indexHighlight = 0;
		let navbar = document.getElementsByTagName("nav")[0];
		let offset = navbar.offsetHeight + 40;
		for (let i = scrollPositions.length - 1; i > 0; i--) {
			if (scrollPositions[i] < offset) {
				indexHighlight = i;
				break;
			}
		}

		let menuList = document.querySelectorAll("#menu .menu-element > p");
		menuList[indexHighlight].classList.add("highlight");
		return menuList[indexHighlight] === highlightedElement;
	}

	handleScroll = () => {
		this.highlightVisibleElement();
		if (this.state.enableSubelementList) {
			this.displaySubelementList();
		}
	};

	createSubelementLists() {
		let dlElements = document.getElementsByTagName("dl");
		let subelementLists = document.getElementsByClassName(
			"subelement-list"
		);

		for (let i = 0; i < dlElements.length; i++) {
			let dlChildNodes = dlElements[i].childNodes;
			for (let j = 0; j < dlChildNodes.length; j++) {
				if (dlChildNodes[j].tagName === "DT") {
					let subelement = document.createElement("LI");
					subelement.innerHTML = dlChildNodes[j].textContent;
					subelement.onclick = () => this.handleMenuClick(i, j);
					subelementLists[i].appendChild(subelement);
				}
			}
		}
		let subelementsCreated = this.state.subelementsCreated;
		subelementsCreated[this.state.language] = true;
		this.setState({ subelementsCreated: subelementsCreated });
	}

	displaySubelementList() {
		// First we hide all the subelement lists
		let subelementLists = Array.from(
			document.getElementsByClassName("subelement-list")
		);
		subelementLists.forEach((list) => {
			list.style.display = "none";
		});

		// We display the list for which the "title" is highlighted
		let subelementListToDisplay = document.querySelector(
			".highlight ~ .subelement-list"
		);
		subelementListToDisplay.style.display = "inline";
	}

	render() {
		let OthersInfos = [];
		let IdentificationInfos = [];
		let PresentationInfos = [];
		let AssociatedGene = [];

		let DiseasesGenesInfos = [];

		if (
			this.state.loadingDisgenet ||
			this.state.loadingWikidata ||
			this.state.loadingGenes
		) {
			return <div className="bb"></div>;
		} else if (this.state.notFound) {
			return <h1>Résultats non trouvés</h1>;
		} else {
			let data =
				this.state.language === "fr"
					? this.state.data.fr
					: this.state.data.en;

			let dataGenes = this.state.dataGenes;

			for (const [key, value] of Object.entries(dataGenes)) {
				let infoTag = (
					<dt key={key}>
						{key} - Score : {value[0][0]}
					</dt>
				);

				let infoValues = <dd key={key + "Def"}>{value[0][1]}</dd>;

				AssociatedGene.push(infoTag);
				AssociatedGene.push(infoValues);
			}

			let dataDis = this.state.dataDisgenetDiseases;

			for (const [key, value] of Object.entries(dataDis)) {
				let infoValuesArray = [];

				let infoTag = (
					<dt key={key} href={value[0]}>
						{key}
					</dt>
				);

				for (let i = 1; i < value.length; i++) {
					let balise = (
						<p href={value[i][0]} key={key + i}>
							{value[i][1]}
						</p>
					);
					infoValuesArray.push(balise);
				}

				let infoValues = React.createElement(
					"dd",
					{ key: key + "Def" },
					infoValuesArray
				);

				DiseasesGenesInfos.push(infoTag);
				DiseasesGenesInfos.push(infoValues);
			}

			for (const [key, value] of Object.entries(data)) {
				let infoValuesArray = [];
				let infoTag;
				let infoValues;
				let subject = -1;

				if (key.startsWith("P")) {
					for (let i = 0; i < value.values.length; i++) {
						let balise = this.identifyFormat(
							value.values[i].value,
							key,
							i
						);

						infoValuesArray.push(balise);
					}

					if (value.propLabel) {
						let subjectFound = this.identifySubject(
							value.propLabel.value
						);

						if (subjectFound != -1) {
							subject = subjectFound;
						}

						infoTag = <dt key={key}>{value.propLabel.value}</dt>;
					} else {
						infoTag = <dt key={key}>{key}</dt>;
					}

					infoValues = React.createElement(
						"dd",
						{ key: key + "Def" },
						infoValuesArray
					);
				} else {
					for (let i = 0; i < value.values.length; i++) {
						let balise = this.identifyFormat(
							value.values[i].value,
							key,
							i
						);

						infoValuesArray.push(balise);
					}

					infoTag = <dt key={key}>{key}</dt>;
					infoValues = React.createElement(
						"dd",
						{ key: key + "Def" },
						infoValuesArray
					);
				}

				let subjectFound = this.identifySubject(key);

				if (subjectFound != -1) {
					subject = subjectFound;
				}

				switch (subject) {
					case 0:
						IdentificationInfos.push(infoTag);
						IdentificationInfos.push(infoValues);
						break;

					case 1:
						PresentationInfos.push(infoTag);
						PresentationInfos.push(infoValues);
						break;

					case -1:
						OthersInfos.push(infoTag);
						OthersInfos.push(infoValues);
				}
			}

			let infoListOthers = React.createElement(
				"dl",
				{ className: "grid-container" },
				OthersInfos
			);

			let infoListIdentification = React.createElement(
				"dl",
				{ className: "grid-container" },
				IdentificationInfos
			);

			let infoListPresentation = React.createElement(
				"dl",
				{ className: "grid-container" },
				PresentationInfos
			);

			let infoListGenesDiseases = React.createElement(
				"dl",
				{ className: "grid-container" },
				DiseasesGenesInfos
			);

			let titles;

			this.state.language === "fr"
				? (titles = this.state.titlesTablesFrench)
				: (titles = this.state.titlesTablesEnglish);

			let reactElementAssociatedGene = [];
			if (this.state.loadingGenes) {
				reactElementAssociatedGene = null;
			} else {
				let infoAssociatedGene = React.createElement(
					"dl",
					{ className: "grid-container" },
					AssociatedGene
				);
				reactElementAssociatedGene = (
					<div className="info-table">
						<div className="info-table-header">
							<h1>{titles[2]}</h1>
						</div>
						<div className="info-table-body">
							{infoAssociatedGene}
						</div>
					</div>
				);
			}

			return (
				<React.Fragment>
					<nav>
						<div id="nav-container">
							<div
								id="nav-text"
								onClick={this.handleTitleClick}
								title="Go to homepage"
							>
								<h2>
									The <br />
									Disease
									<br /> Searcher
								</h2>
								<p>By the HexaOne Team</p>
							</div>
							<img
								onClick={this.handleTitleClick}
								src={logo}
								id="logo"
								alt="logo"
								title="Go to homepage"
							/>
							<button id="language" onClick={this.changeLanguage}>
								{this.state.language}
							</button>
						</div>
					</nav>

					<div id="content-container">
						<div id="menu">
							<ul>
								<li class="menu-element">
									<p
										onClick={() => {
											this.handleMenuClick(0, -1);
										}}
									>
										{titles[0]}
									</p>
									<ul class="subelement-list"></ul>
								</li>
								<li class="menu-element">
									<p
										onClick={() => {
											this.handleMenuClick(1, -1);
										}}
									>
										Identification
									</p>
									<ul class="subelement-list"></ul>
								</li>
								<li class="menu-element">
									<p
										onClick={() => {
											this.handleMenuClick(2, -1);
										}}
									>
										{titles[1]}
									</p>
									<ul class="subelement-list"></ul>
								</li>
							</ul>
						</div>

						<div id="info-table-container">
							<div className="info-table">
								<div className="info-table-header">
									<h1>{titles[0].toUpperCase()}</h1>
								</div>
								<div className="info-table-body">
									{infoListPresentation}
								</div>
							</div>
							<div className="info-table">
								<div className="info-table-header">
									<h1>IDENTIFICATION</h1>
								</div>
								<div className="info-table-body">
									{infoListIdentification}
								</div>
							</div>

							<div className="info-table">
								<div className="info-table-header">
									<h1>{titles[1].toUpperCase()}</h1>
								</div>
								<div className="info-table-body">
									{infoListOthers}
								</div>
							</div>

							{reactElementAssociatedGene}

							<div className="info-table">
								<div className="info-table-header">
									<h1>{titles[3].toUpperCase()}</h1>
								</div>
								<div className="info-table-body">
									{infoListGenesDiseases}
								</div>
							</div>
						</div>
					</div>
				</React.Fragment>
			);
		}
	}
}

export default Entity;

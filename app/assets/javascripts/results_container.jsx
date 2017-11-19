checkLanguage();

var context = $('body').data('context')

// var SelectBox = React.createFactory(require('../lib/select-box'));

//Player function for EventEmitter (Component communication)
//function Player(){}
//heir.inherit(Player, EventEmitter);
//Variable for EventEmitter (Component communication)
// var ee = new EventEmitter();

function extractQuery(key) {
    var query = window.location.search.substring(1);
    var vars = query.split("&");
    for (var i = 0; i < vars.length; i++) {
        var pair = vars[i].split("=");
        if (pair[0] == key) {
            return decodeURIComponent(pair[1]);
        }
    }
    return (false);
}
var queryDirty = extractQuery("query");
var query = queryDirty.replace(new RegExp('\\+', 'g'), ' ');
var exact_matching = false;

if(query.match("^\"") && query.match("\"$")){
    exact_matching = true;
    query=query.substring(1, query.length-1)
}

function compareRank(a, b) {
    if (a["fs:rank"] < b["fs:rank"])
        return -1;
    if (a["fs:rank"] > b["fs:rank"])
        return 1;
    return 0;
}

var sourcesDirty = extractQuery("sources");
var typesDirty = extractQuery("types");

var ContainerResults = React.createClass({
    // event handler for language switch
    // change dictionary then update state so the page notices the change
    setLang: function () {
        switch (window.localStorage.getItem("lang")) {
            case "de":
                window.globalDict = dictGer;
                window.localStorage.lang = "de";
                this.setState({dictionary: "de"});
                globalFlushFilters();
                break;
            case "en":
                window.globalDict = dictEng;
                window.localStorage.lang = "en";
                this.setState({dictionary: "en"});
                globalFlushFilters();
                break;
        }
    },
    render: function () {
        return (
            <div>
                <div className="container">
                    <div className="row" id="header-main-row">
                        <nav className="widget col-md-12" data-widget="NavigationWidget">
                            <div className="row">
                                <div className="col-md-2">
                                    <a href={context === "" ? "/" : context}>
                                        <img src={context + "/assets/images/Logo_ico-gray.png"} className="smallLogo" height="64" width="178" alt="Logo_Description" align="left" />
                                    </a>
                                </div>
                                <div className="col-md-10 text-right">
                                    <SettingsBar onlangselect={this.setLang}/>
									<ViewsBar/>
                                </div>
                            </div>
                        </nav>
                    </div>
                </div>

                <div className="row search-results-container">
                    {/*
                       <WebSocketConnector />
                    */}
                    <div className="col-md-3">
                        <div className="row">
                            <SourcesInfoBox />
                        </div>
                        <div className="row">
                            <FacetedBar />
                        </div>
                    </div>
                    <div>
                        <ResultsContainer />
                    </div>
                </div>

            </div>
        );
    }
});

var SourcesInfoBox = React.createClass({
    render: function () {
        return(
            <div className="sourcesInfoBox">
                <a className="sourcesInfoBox_loader" href="#"><i className="fa fa-spinner fa-spin"></i></a>
                <a href="#"><strong>0%    </strong></a>
                <a className="sourcesInfoBox_success" href="#">0    <i className="fa fa-gear"></i></a>
                <a className="sourcesInfoBox_fail" href="#">0    <i className="fa fa-gear"></i></a>
                <a className="sourcesInfoBox_info" href="#"><i className="fa fa-info-circle"></i></a>
            </div>
            )

    }
});

var SettingsBar = React.createClass({
    preSetLang: function (lang, e) {
        window.localStorage.lang = lang
        this.props.onlangselect()
    },
    settingsBar_dropdown: function () {
        if (!event.target.matches('.settingsBar_dropbtn')) {

            var dropdowns = document.getElementsByClassName("settingsBar_dropdown-content");
            var i;
            for (i = 0; i < dropdowns.length; i++) {
                var openDropdown = dropdowns[i];
                if (openDropdown.classList.contains('settingsBar_drop')) {
                    openDropdown.classList.remove('settingsBar_drop');
                }
            }
        }
    },
    render: function () {
        let boundClickEng = this.preSetLang.bind(this, 'en');
        let boundClickGer = this.preSetLang.bind(this, 'de');
        /*let boundClickDropdown = this.settingsBar_dropdown(this, 'settingsBar_dropbtn');*/
        if (window.localStorage.getItem("lang") === "de") {
            return (
                <div className="settingsBar">
                    <a className="settingsBar_disabled" href="#"><i className="fa fa-gears" ></i></a>
                    <a className="settingsBar_sourcesOff" href="#">0    <i className="fa fa-refresh"></i></a>
                    <a href="#" onClick={boundClickEng}><strong>DE    </strong><i
                        className="fa fa-caret-down"></i></a>
                </div>
            )
        } else {
            return (
                <div className="settingsBar">
                    <a className="settingsBar_disabled" href="#"><i className="fa fa-gears" ></i></a>
                    <a className="settingsBar_sourcesOff" href="#"><strong>0    </strong><i className="fa fa-refresh"></i></a>
                    <a href="#" onClick={boundClickGer}><strong>EN    </strong><i
                        className="fa fa-caret-down"></i></a>
                </div>
            )
        }
    }

});

var ViewsBar = React.createClass({
    render: function () {
        return (
            <div className="viewsBar">
                <a className="viewsBar_active" href="#"><i className="fa fa-list-ul" ></i></a>
                <a className="viewsBar_disabled" href="#"><i className="fa fa-table"></i></a>
                <a className="viewsBar_disabled" href="#"><i className="fa fa-map-marker"></i></a>
                <a className="viewsBar_disabled" href="#"><i className="fa fa-code-fork"></i></a>
{/*                <a href="#" onClick={boundClickGer}><strong>EN    </strong><i
                    className="fa fa-caret-down"></i></a>*/}
            </div>
        )
    }
});

var SearchBox = React.createClass({
    getSelectionLabel: function(){
        var sources_list = this.getLabelsFromSelectedChecks(this.state.sources)
        var types_list = this.getLabelsFromSelectedAllowedChecks(this.state.types)

        var sources_label = ""
        var types_label = ""

        var prefix_sources_label = getTranslation("datasources");
        var prefix_types_label = getTranslation("types");
        if(sources_list.length === 0) {
            sources_label = prefix_sources_label  + ": "+ getTranslation("none") + "."
        }
        else if(sources_list.length === this.state.sources.length) {
            sources_label = prefix_sources_label + ": "+ getTranslation("all") + "."
        }else if(sources_list.length > 0) {
            sources_label = prefix_sources_label + ": (" + sources_list + ")."
        }else{
            alert("[Error] Well, seems like something went wrong...")
        }
        if(types_list.length === 0){
            types_label = prefix_types_label + ": "+ getTranslation("none") + "."
        }
        else if(types_list.length === this.state.types.length) {
            types_label = prefix_types_label + ": " + getTranslation("all") + "."
        }else if(types_list.length > 0) {
            types_label = prefix_types_label + ": (" + types_list + ")."
        }else{
            alert("[Error] Well, seems like something went wrong...")
        }

        return sources_label+" "+types_label
    },
    getLabelsFromSelectedChecks: function(checks_data) {
        var keys = [];
        for(var k in checks_data){
            if(checks_data[k]["selected"]){
                keys.push(checks_data[k]["id"])
            }
        }
        return keys
    },
    getLabelsFromSelectedAllowedChecks: function(checks_data) {
        var keys = [];
        for(var k in checks_data){
            if(checks_data[k]["selected"] && checks_data[k]["allowed"]){
                keys.push(checks_data[k]["id"])
            }
        }
        return keys
    },
    getKeysFromSelectedAllowedChecks(checks_data){
        var keys = [];
        for(var k in checks_data){
            if(checks_data[k]["selected"] && checks_data[k]["allowed"]){
                keys.push(checks_data[k]["key"])
            }
        }
        return keys
    },
    getKeysFromSelectedChecks: function(checks_data) {
        var keys = [];
        for(var k in checks_data){
            if(checks_data[k]["selected"]){
                keys.push(checks_data[k]["key"])
            }
        }
        return keys
    },
    getAllKeysFromChecks: function(checks_data) {
        var keys = [];
        for(var k in checks_data){
            keys.push(checks_data[k]["key"])
        }
        return keys
    },
    sourcesChanged: function(sources_data) {
        this.setState({ sources: sources_data, selectionLabel: this.getSelectionLabel(),allowed_types : this.getAllowedTypes(this.getKeysFromSelectedChecks(sources_data))});
    },
    typesChanged: function(types_data) {
        this.setState({ types: types_data, selectionLabel: this.getSelectionLabel()});
    },
    onClick: function() {
        if(this.state.showSourcesTypesDiv) {
            this.setState({ showSourcesTypesDiv: false});
        } else {
            this.setState({ showSourcesTypesDiv: true});
        }
    },
    OnDocumentClick: function(e){
        if(e.target.className == "sel_button"){
            this.onClick();
        }
        else{
            if($("#filterList").has(e.target).length == 0) {
                if(this.state.showSourcesTypesDiv)
                    this.setState({ showSourcesTypesDiv: false});
            }
        }

    },
    componentDidMount: function(){
        document.addEventListener('click',this.OnDocumentClick);
    },
    componentWillUnmount: function() {
        document.removeEventListener('click', this.OnDocumentClick);
    },
    getAllowedTypes : function(sources){
        var allowed_types = []
        for(var idx in sources){
            Array.prototype.push.apply(allowed_types, this.state.typesForSource[sources[idx]]);
        }
        return allowed_types.filter(function(item,idx){
            return allowed_types.indexOf(item) === idx
        });
    },
    getInitialState: function() {
        var typesForSource= {};
        typesForSource["linkedleaks"] = ["person","organization"];
        typesForSource["gkb"] = ["person","organization"];
        typesForSource["dbpedia"]  = ["person","organization","product"];

        return { showSourcesTypesDiv: false, sources: [] , types: [],typesForSource: typesForSource,allowed_types: []};
    },
    handleSubmit : function(e){
        var selected_sources_list = this.getKeysFromSelectedChecks(this.state.sources);
        var selected_types_list = this.getKeysFromSelectedAllowedChecks(this.state.types);
        var searchKeyword = $( "input[name='query']" ).val();

        if(!searchKeyword || searchKeyword.trim() === ""){
            alert(getTranslation("empty_keyword"));
            return false;
        }
        if(selected_sources_list.length === 0 || selected_types_list.length === 0){
            alert("Datasource or EntityType is not selected!!. Please Select at least one Datasource and entitytype");
            return false;
        }
        $("#form-search").submit();
        return true;
    },
    render: function() {

        var selected_sources_list = this.getKeysFromSelectedChecks(this.state.sources)
        //var allowed_types = this.getAllowedTypes(selected_sources_list);
        var selected_types_list = this.getKeysFromSelectedAllowedChecks(this.state.types)
        var selected_sources = selected_sources_list.length === 0 ? this.getAllKeysFromChecks(this.state.sources): selected_sources_list
        var selected_types = selected_types_list.length === 0 ? this.getAllKeysFromChecks(this.state.types): selected_types_list

        var floatingDivStyle = this.state.showSourcesTypesDiv ? "col-md-4 floatingSelChecks text-left" : "col-md-4"

        if(this.props.id_class === "form-search-header"){
            floatingDivStyle = this.state.showSourcesTypesDiv ? "col-md-4 floatingSelChecks-header text-left" : "col-md-4"
        }

        if(this.props.keyword)
        {
            return (
                <div>
                    <form method="get" id={this.props.id_class} role="search" action={context+"/results"} onSubmit={this.handleSubmit}>
                        <div>
                            <label ><span>Search: </span></label>
                            <input type="text" name="query" defaultValue={this.props.keyword} placeholder={getTranslation("yoursearch")}/>&nbsp;
                            <input type="hidden" name="sources" value={selected_sources}/>
                            <input type="hidden" name="types" value={selected_types}/>
                            <button type="submit">&nbsp;</button>
                        </div>
                        <div>
                            <div className="floatingSelText-header">
                                {this.getSelectionLabel()}
                                <img className="sel_button" src={context+"/assets/images/icons/arrow_down.png"}>
                                </img>
                            </div>
                        </div>
                    </form>
                    <div>
                        <div className="col-md-3"/>
                        <div className={floatingDivStyle}>
                            <div className="row" id="filterList">
                                <div className="col-md-6 separator">
                                    <FilteredCheckList filterType="datasources" lang = {this.props.lang} AllowedTypes = {[]} onSourceChangedFunction={this.sourcesChanged} show={this.state.showSourcesTypesDiv}/>
                                </div>
                                <div className="col-md-6">
                                    <FilteredCheckList filterType="entitytypes" lang = {this.props.lang} AllowedTypes = {this.state.allowed_types} onSourceChangedFunction={this.typesChanged} show={this.state.showSourcesTypesDiv}/>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-5"/>
                    </div>
                </div>

            );
        }

        return (
            <div>
                <div className="row">
                    <div className="col-md-3"/>
                    <div className="col-md-6">
                        <form method="get" id={this.props.id_class} role="search" action={context+"/results"} onSubmit={this.handleSubmit}>
                            {/*<div>
                             <label ><span>Search: </span></label>
                             <input type="search" name="query" placeholder={getTranslation("yoursearch")}/>&nbsp;
                             <input type="hidden" name="sources" value={selected_sources}/>
                             <input type="hidden" name="types" value={selected_types}/>
                             <button type="submit">&nbsp;</button>
                             </div>*/}
                            <div className="input-group">
                                <input type="text" name="query" className="form-control" placeholder={getTranslation("yoursearch")} id="inputGroup"/>
                                <input type="hidden" name="sources" value={selected_sources}/>
                                <input type="hidden" name="types" value={selected_types}/>
                                <span className="input-group-addon" onClick={this.handleSubmit}>
                                    <i className="fa fa-search"></i>
                                </span>
                            </div>
                            <div>
                                <div className="floatingSelText">
                                    {this.getSelectionLabel()}
                                    <img className="sel_button" src={context+"/assets/images/icons/arrow_down.png"}>
                                    </img>
                                </div>
                            </div>
                        </form>
                    </div>
                    {/*<div className="col-md-1 vertical-separator" title="Search with 1 keyword <- OR ->Search with 1 or more keywords"/>*/}
                    {/*<div className="col-md-1 ">*/}
                    {/*<KeywordsFile sources={selected_sources} types={selected_types}/>*/}
                    {/*</div>*/}
                </div>
                <div>
                    <div className={floatingDivStyle}>
                        <div className="row" id="filterList">
                            <div className="col-md-6 separator">
                                <FilteredCheckList filterType="datasources" disabled="false" helpText="data_sources_help" lang = {this.props.lang} AllowedTypes = {[]} onSourceChangedFunction={this.sourcesChanged} show={this.state.showSourcesTypesDiv}/>
                            </div>
                            <div className="col-md-6">
                                <FilteredCheckList filterType="entitytypes" disabled="true" helpText="entity_types_help" lang = {this.props.lang} AllowedTypes = {this.state.allowed_types} onSourceChangedFunction={this.typesChanged} show={this.state.showSourcesTypesDiv}/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
});

var ResultsContainer = React.createClass({
    render: function () {
        return (
            <div className="col-md-9">
                <ul id="search-results" className="search-results">
                    <ul className="results-list list-unstyled">
                        <PersonResultElement
                            uri = "http://dbpedia.org/resource/Mauricio_Macri"
                            id = "1234"
                            img= "https://upload.wikimedia.org/wikipedia/commons/1/12/Mauricio_Macri_Foto_de_Prensa2.jpg"
                            name= "Mauricio Macri"
                            source= "dbpedia"
                            comment="Mauricio Macri (Born 8 February 1959), is the current President of Argentina and has been in office since 2015. A former civil engineer..."
                            gender="male"
                            birthday="2009-08-07"
                            country="Argentina"
                            webpage="https://en.wikipedia.org/wiki/Mauricio_Macri"
                            jsonResult = {null}
                            uid = {null}
                            onAddLink={null}
                            onFavourite={null}>
                        </PersonResultElement>
                        <PersonResultElement
                            uri = "http://dbpedia.org/resource/Mauricio_Macri"
                            id = "1234"
                            name= "Mauricio Macri"
                            source= "LinkedLeaks"
                            comment="The Panama Papers data is current through 2015"
                            occupation="Director of FLEG TRADING LTD"
                            gender="male"
                            country="Argentina"
                            webpage="http://data.ontotext.com/resource/leaks/officer-15002701"
                            jsonResult = {null}
                            uid = {null}
                            onAddLink={null}
                            onFavourite={null}>
                        </PersonResultElement>
                        <OrganizationResultElement
                            uri = ""
                            id = "4567"
                            title="FLEG TRADING LTD"
                            source= "LinkedLeaks"
                            label="FLEG TRADING LTD"
                            comment="Directed by Mauricio Macri"
                            country="Uruguay"
                            location="CR. SANTIAGO LUSSICH TORRENDELL MISIONES Nº 1.371 PISO 4º ( C.P. 11.100 ) MONTEVIDEO, URUGUAY"
                            webpage=""
                            jsonResult = {null}
                            uid = {null}
                            onAddLink={null}
                            onFavourite={null}>
                        </OrganizationResultElement>
                    </ul>
                </ul>
            </div>
        );
    }
});

var FacetedBar = React.createClass({
    render: function () {
        return (
            <div>
                <div className="facets-container hidden-phone">
                    <div className="facets-head">
                        &nbsp;
                    </div>
                    <div className="js facets-list bt bb bl br">
                        <FacetedNav label="Person" name="Person"/>
                        <FacetedNavOrg label="Organization" name="Organization"/>
                    </div>
                </div>
            </div>
        );
    }
}).bind(this);

var FacetedNav = React.createClass({
     render: function () {
         return (
             <div className="facets-group bt bb bl br" id={"" + this.props.name + ""}>
                 <a className="h3">{this.props.label}</a>
                     <FacetedItem label="Gender" name="Gender"/>
                     <FacetedItem label="Occupation" name="Occupation"/>
                     <FacetedItem label="Birthday" name="Birthday"/>
             </div>
         );
     }
 }).bind(this);

var FacetedNavOrg = React.createClass({
    render: function () {
        return (
            <div className="facets-group bt bb bl br" id={"" + this.props.name + ""}>
                <a className="h3">{this.props.label}</a>
                    <FacetedItemOrg label="Name" name="Name"/>
                    <FacetedItemOrg label="Location" name="Location"/>
                    <FacetedItemOrg label="Country" name="Country"/>
            </div>
        );
    }
}).bind(this);

var FacetedItemOrg = React.createClass({
    /*    onClick: function() {
            if (this.matches('.facetedItem')) {
                alert()
                var dropdowns = document.getElementsByClassName("facetedItemDropdown-content");
                var i;
                for (i = 0; i < dropdowns.length; i++) {
                    var openDropdowns = dropdowns[i];
                    if (openDropdowns.classList.contains('facetedItem-show')) {
                        openDropdowns.classList.remove('facetedItem-show');
                    }
                }
            }
        },
        componentDidMount: function(){
            this.onClick();
        },*/
    render: function () {
        return (
            <div id={"" + this.props.name + ""} >
                <div className="nav-tabs js facets-item bt bb bl br">
                    <a className="h3" href="#">{this.props.label}</a>
                    <fieldset>
                        <form className="facetedItem-layout">
                            <fieldset>
                                <FacetedItemDropdown label="Orga1" name="Orga1"/>
                                <FacetedItemDropdown label="Orga2" name="Orga2"/>
                                <FacetedItemDropdown label="Orga3" name="Orga3"/>
                                <FacetedItemSearch label={"Search " + this.props.label + "s"}/>
                            </fieldset>
                        </form>
                    </fieldset>
                </div>
            </div>
        );
    }
}).bind(this);

var FacetedItem = React.createClass({
    /*    onClick: function() {
            if (this.matches('.facetedItem')) {
                alert()
                var dropdowns = document.getElementsByClassName("facetedItemDropdown-content");
                var i;
                for (i = 0; i < dropdowns.length; i++) {
                    var openDropdowns = dropdowns[i];
                    if (openDropdowns.classList.contains('facetedItem-show')) {
                        openDropdowns.classList.remove('facetedItem-show');
                    }
                }
            }
        },
        componentDidMount: function(){
            this.onClick();
        },*/
    render: function () {
        return (
            <div id={"" + this.props.name + ""} >
                <div className="nav-tabs js facets-item bt bb bl br">
                    <a className="h3" href="#">{this.props.label}</a>
                    <fieldset>
                        <form className="facetedItem-layout">
                            <fieldset>
                                <FacetedItemDropdown label="Male" name="Male"/>
                                <FacetedItemDropdown label="Female" name="Female"/>
                                <FacetedItemDropdown label="Other" name="Other"/>
                                <FacetedItemSearch label={"Search " + this.props.label + "s"}/>
                            </fieldset>
                        </form>
                    </fieldset>
                </div>
            </div>
        );
    }
}).bind(this);

var FacetedItemDropdown = React.createClass({
    render: function () {
        return (
                <a id={"" + this.props.name + ""} className="col-md-6 nav-pills facets-list facetedItemDropdown-content facetedItem-content" href="#">
                    <input className="col-md-1" type="checkbox">{this.props.label}</input>
                </a>
        );
    }
}).bind(this);

var FacetedItemSearch = React.createClass({
    render: function () {
        return (
            <input className="facets-list facetedItemSearch" type="text" placeholder={this.props.label}/>
        )
    }
}).bind(this);


var PersonResultElement = React.createClass({
    render: function () {
        var detailsPageUri = context + "/details?entityType=person" + "&eUri=" + this.props.uri + "&uid=" + this.props.uid;
        var screenShotElement = (null);
        return (
            <li className="item bb">
                <div className="summary row">
                    <div className="thumbnail-wrapper col-md-2">
                        <div className="thumbnail">
                            { this.props.img !== undefined ? <img src={this.props.img} height="60px" width="75px"/> :
                                <img src={context + "/assets/images/datasources/Unknown.png"} height="60px"
                                     width="75px"/> }
                        </div>
                    </div>
                    <div className="summary-main-wrapper col-md-8">
                        <div className="summary-main">
                            <a href={detailsPageUri} target="_blank">
                                <h2 className="title">
                                    {this.props.name}
                                </h2>
                            </a>
                            <div className="subtitle">
                                { this.props.alias !== undefined ?
                                    <p>{getTranslation("nick")}: {this.props.alias}</p> : null }
                                { this.props.location !== undefined ?
                                    <p>{getTranslation("location")}: {this.props.location}</p> : null }
                                { this.props.gender !== undefined ?
                                    <p>{getTranslation("gender")}: {this.props.gender}</p> : null }
                                { this.props.occupation !== undefined ?
                                    <p>{getTranslation("occupation")}: {this.props.occupation}</p> : null }
                                { this.props.birthday !== undefined ?
                                    <p>{getTranslation("birthday")}: {this.props.birthday}</p> : null }
                                { this.props.country !== undefined ?
                                    <p>{getTranslation("country")}: {this.props.country}</p> : null }
                                { this.props.label !== undefined ? <p>{this.props.label}</p> : null }
                                { this.props.comment !== undefined ? <p>{this.props.comment}</p> : null }
                                { this.props.webpage !== undefined ?
                                    <p><b>{getTranslation("link")}: </b>
                                        <a href={this.props.webpage} target="_blank">{this.props.webpage}</a>
                                        {screenShotElement}</p>
                                    : null }
                                { this.props.active_email !== undefined ?
                                    <p><b>{getTranslation("active_email")}:</b> {this.props.active_email}</p> : null }
                                { this.props.wants !== undefined ?
                                    <p><b>{getTranslation("wants")}:</b> {this.props.wants}</p> : null }
                                { this.props.haves !== undefined ?
                                    <p><b>{getTranslation("haves")}:</b> {this.props.haves}</p> : null }
                                { this.props.top_haves !== undefined && this.props.top_haves !== "null" ?
                                    <p><b>{getTranslation("top_haves")}:</b> {this.props.top_haves}</p> : null }
                                { this.props.interests !== undefined ?
                                    <p><b>{getTranslation("interests")}:</b> {this.props.interests}</p> : null }
                            </div>
                        </div>
                    </div>
                    <div class="thumbnail-wrapper col-md-1">
                        <div className="thumbnail">
                            <img src={context + "/assets/images/datasources/" + this.props.source + ".png"}
                                 alt={"Information from " + this.props.source} height="45" width="45"
                                 title={this.props.source}/>
                        </div>
                    </div>
                </div>
            </li>
        );
    }
});

var OrganizationResultElement = React.createClass({
    render: function () {
        var detailsPageUri = context + "/details?entityType=organization" + "&eUri=" + this.props.uri + "&uid=" + this.props.uid;
        return (
            <li className="item bt">
                <div className="summary row">
                    <div className="thumbnail-wrapper col-md-2">
                        <div className="thumbnail">
                            { this.props.img !== undefined ? <img src={this.props.img} height="60px" width="75px"/>:
                                <img src={context + "/assets/images/datasources/Unknown_Thing.jpg"} height="60px" width="75px"/> }
                        </div>
                    </div>
                    <div className="summary-main-wrapper col-md-8">
                        <div className="summary-main">
                            <a href={detailsPageUri} target="_blank">
                                <h2 className="title">
                                    {this.props.title}
                                </h2>
                            </a>
                            <div className="subtitle">
                                { this.props.label !== undefined ? <p>{this.props.label}</p> : null }
                                { this.props.comment !== undefined ? <p>{this.props.comment}</p> : null }
                                { this.props.country !== undefined ?
                                    <p>{getTranslation("country")}: {this.props.country}</p> : null }
                                { this.props.location !== undefined ?
                                    <p>{getTranslation("location")}: {this.props.location}</p> : null }
                                { this.props.webpage !== undefined ?
                                    <p><b>{getTranslation("link")}: </b><a href={this.props.webpage}
                                                                           target="_blank">{this.props.webpage}</a></p> : null }
                            </div>
                        </div>
                    </div>
                    <div class="thumbnail-wrapper col-md-1">
                        <div class="thumbnail">
                            <img src={context + "/assets/images/datasources/" + this.props.source + ".png"}
                                 alt={"Information from " + this.props.source} height="45" width="45"
                                 title={this.props.source}/>
                        </div>
                    </div>
                </div>
            </li>
        );
    }
});

var WebSocketConnector =  React.createClass({
    getInitialState(){
        return { messages : [] }
    },
    componentDidMount(){
        // this is an "echo" websocket service
        this.connection = new WebSocket('ws://localhost:9000/farbie/ws/search');
        // listen to onmessage event
        this.connection.onmessage = evt => {
            // add the new message to state
            this.setState({
                messages : this.state.messages.concat([ evt.data ])
            })
        };

        // for testing purposes: sending to the echo service which will send it back back
        setTimeout( _ =>{
            this.connection.send("Message "+Math.random())
        }, 2000 )
    },
    render: function() {
        // slice(-5) gives us the five most recent messages
        return <ul>{ this.state.messages.slice(-5).map( (msg, idx) => <li key={'msg-' + idx }>{ msg }</li> )}</ul>;
    }
});





React.render(<ContainerResults url={context + "/keyword"} pollInterval={200000}/>, document.getElementById('skeleton'));

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

//THIS IS THE PRESENTATION COMPONENT FOR QUERY RESULTS PRESENTATION - MAYBE REFACTOR NAME
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
                        <nav className="navbar navbar-default navBarExtra" data-widget="NavigationWidget">
                            <div className="container-fluid">
                                <div className="col-md-2 navbar-header">
                                    <a href={context === "" ? "/" : context}>
                                        <img data-toggle="tooltip" title="FaRBIE Home" src={context + "/assets/images/Logo_ico-gray.png"} height="64" width="178" alt="Logo_Description" align="left" />
                                    </a>
                                </div>
                                <form className="navbar-form navbar-left">
                                    {/* refresh search*/}
                                    <div className="input-group navSearchBoxHeader">
                                        <input className="form-control navSearchBoxHeader" type="text" placeholder="Search"/>
                                        <div className="input-group-addon" id="containerInputGroup">
                                            <a type="submit">
                                                <i className="fa fa-search inputGroupIconHeader"></i>
                                            </a>
                                        </div>
                                    </div>
                                </form>
                                <div className="col-md-5 navbar-right">
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
                        <div id="search-facets">
                            {/*This element's contents will be replaced with your component*/}
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

//
var SourcesInfoBox = React.createClass({
    onCLick: function () {
        alert(<Text> Query and sources information -{"\n"} Source: DBPEDIA - Status: 200 (Query Succesful){"\n"} Source: GOOGLE KNOWLEDGE GRAPH - Status: 200 (Query Succesful){"\n"} Source: LINKEDLEAKS - Status: 200 (Query Succesful){"\n"} Source: FACEBOOK - Status: 404 (FAILED - NO TOKEN FOUND){"\n"} Source: XING - Status: 404 (FAILED - NO TOKEN FOUND)</Text>)
    },
    render: function () {
        return(
            <div className="sourcesInfoBox">
                {/*<a className="sourcesInfoBox_loader" href="#"><i className="fa fa-spinner fa-spin"></i></a>*/}
                <a className="sourcesInfoBox_success" data-toggle="tooltip" title="Search completed" href="#"><i className="fa fa-check"></i></a>
                <a href="#"><strong>100%    </strong></a>
                <a className="sourcesInfoBox_success" data-toggle="tooltip" title="Successful sources" href="#">2    <i className="fa fa-gear"></i></a>
                <a className="sourcesInfoBox_fail" data-toggle="tooltip" title="Failed sources" href="#">0    <i className="fa fa-gear"></i></a>
                <a className="sourcesInfoBox_info" data-toggle="tooltip" title="Query and sources information" href="#"><i className="fa fa-info-circle"></i></a>
            </div>
            )
    }
});

//
var SettingsBar = React.createClass({
    preSetLang: function (lang, e) {
        window.localStorage.lang = lang
        this.props.onlangselect()
    },
    onClick: function () {
        alert("The selected feature is not available.")
    },
/*    settingsBar_dropdown: function () {
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
    },*/
    render: function () {
        let boundClickEng = this.preSetLang.bind(this, 'en');
        let boundClickGer = this.preSetLang.bind(this, 'de');
        /*let boundClickDropdown = this.settingsBar_dropdown(this, 'settingsBar_dropbtn');*/
        if (window.localStorage.getItem("lang") === "de") {
            return (
                <div className="nav settingsBar input-group">

                    <a className="btn btn-default settingsBar_disabled" data-toggle="tooltip" title="Settings" href="#" onClick={this.onClick}><i className="fa fa-gears" ></i></a>
                    <a className="btn btn-default settingsBar_sourcesOff" href="#" data-toggle="tooltip" title="Source Tokens" onClick={this.onClick}>0    <i className="fa fa-refresh"></i></a>
                    <a className="btn btn-default" href="#" data-toggle="tooltip" title="Select language" onClick={boundClickEng}><strong>DE    </strong><i className="fa fa-caret-down"></i></a>
                </div>
            )
        } else {
            return (
                <div className="nav settingsBar input-group">
                    <a className="btn btn-default settingsBar_disabled" href="#" data-toggle="tooltip" title="Settings" onClick={this.onClick}><i className="fa fa-gears" ></i></a>
                    <a className="btn btn-default settingsBar_sourcesOff" href="#" data-toggle="tooltip" title="Source Tokens" onClick={this.onClick}><strong>0    </strong><i className="fa fa-refresh"></i></a>
                    <a className="btn btn-default" href="#" data-toggle="tooltip" title="Select language" onClick={boundClickGer}><strong>EN    </strong><i className="fa fa-caret-down"></i></a>
                </div>
            )
        }
    }

});

//
var ViewsBar = React.createClass({
    section: {},
    onClick: function() {
        alert("The selected view is not available.")
    },
    render: function () {
        return (
            <div className="nav viewsBar input-group">
                <a className="btn btn-default viewsBar_active" data-toggle="tooltip" title="List view"><i className="fa fa-list-ul"></i></a>
                <a className="btn btn-default viewsBar_disabled" data-toggle="tooltip" title="Table view" onClick={this.onClick}><i className="fa fa-table"></i></a>
                <a className="btn btn-default viewsBar_disabled" data-toggle="tooltip" title="Map view" onClick={this.onClick}><i className="fa fa-map-marker"></i></a>
                <a className="btn btn-default viewsBar_disabled" data-toggle="tooltip" title="Graph view" onClick={this.onClick}><i className="fa fa-code-fork"></i></a>
{/*                <a href="#" onClick={boundClickGer}><strong>EN    </strong><i
                    className="fa fa-caret-down"></i></a>*/}
            </div>
        )
    }
});

//
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

//THIS IS THE CONTAINER COMPONENT FOR QUERY RESULTS DELIVERY
var ResultsContainer = React.createClass({
    componentWillUpdate() {
        setTimeout()
    },
    render: function () {
        return (
            <div className="col-md-9 scroll">
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
                        <PersonResultElement
                            uri = "http://dbpedia.org/resource/Juliana_Awada"
                            id = "1234"
                            name= "Juliana Awada"
                            source= "DBpedia"
                            comment={null}
                            occupation="Businesswoman"
                            gender="female"
                            country="Argentina"
                            webpage="https://en.wikipedia.org/wiki/Juliana_Awada"
                            jsonResult = {null}
                            uid = {null}
                            onAddLink={null}
                            onFavourite={null}>
                        </PersonResultElement>
                        <PersonResultElement
                            uri = "http://dbpedia.org/resource/Federico_Pinedo"
                            id = "1234"
                            name= "Federico Pinedo"
                            source= "DBpedia"
                            comment={null}
                            occupation="Argentine Politician"
                            gender="male"
                            country="Argentina"
                            webpage="https://en.wikipedia.org/wiki/Federico_Pinedo"
                            jsonResult = {null}
                            uid = {null}
                            onAddLink={null}
                            onFavourite={null}>
                        </PersonResultElement>
                        <PersonResultElement
                            uri = "http://dbpedia.org/resource/Jorge_Lemus"
                            id = "1234"
                            name= "Jorge Lemus"
                            source= "DBpedia"
                            comment={null}
                            occupation="Politician"
                            gender="male"
                            country="Argentina"
                            webpage="https://en.wikipedia.org/wiki/Jorge_Lemus"
                            jsonResult = {null}
                            uid = {null}
                            onAddLink={null}
                            onFavourite={null}>
                        </PersonResultElement>
                        <PersonResultElement
                            uri = "http://dbpedia.org/resource/Carolina Stanley"
                            id = "1234"
                            name= "Carolina Stanley"
                            source= "DBpedia"
                            comment={null}
                            occupation="Politician"
                            gender="male"
                            country="Argentina"
                            webpage="https://en.wikipedia.org/wiki/Carolina_Stanley"
                            jsonResult = {null}
                            uid = {null}
                            onAddLink={null}
                            onFavourite={null}>
                        </PersonResultElement>
{/*                        <OrganizationResultElement
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
                        </OrganizationResultElement>*/}
                    </ul>
                </ul>
            </div>
        );
    }
});

//THIS IS THE FACETED BAR SIDE/TOP MENU
var FacetedBar = React.createClass({
    getInitialState: function () {
        //Declare and initialize boilerplate buffers for incoming results from LogicKeeper
        var entityTypes = {};
        var attributeTypes = [];
        return {
            //Sets the default Entity option to "person"
            defaultEntity: "Person",
            //Handles visibility of dropdowns when clicked
            personClicked: false,
            orgaClicked: false,
        };
    },
    onClick: function() {
        this.setState({ isVisible: true });
    },
    // select: function (item) {
    //     this.props.selected = item;
    // },
    // show: function () {
    //     this.setState({ isVisible: true });
    //     document.addEventListener("click", this.hide);
    // },
    // hide: function () {
    //     this.setState({  isVisible: false });
    //     document.removeEventListener("click", this.hide);
    // },
    render: function () {

        return (
            <div>
                <div className={"facets-container hidden-phone" + (this.state.isVisible ? " show" : "")}>
                    <div className={"facets-head" + (this.state.isVisible = true) }>
                        &nbsp;
                    </div>
                    <div className={"js facets-list bt bb bl br" + (this.state.isVisible ? " clicked" : "")}>
                        <FacetedNav label="Person" name="Person"/>
                        {/*<FacetedNavOrg label="Organization" name="Organization"/>*/}
                    </div>
                </div>
            </div>
        );
    }
});

//
var FacetedNav = React.createClass({
    getInitialState: function () {
        return {
            isVisible: false
        };
    },
     render: function () {
         return (
             <div className="facets-group " id={"" + this.props.name + ""}>
                 <a className="h3" onClick={this.onClick}>{this.props.label}</a>
{/*                    <div>
                        {this.renderListItems()}
                    </div>*/}
                 {
                     this.state.isVisible
                         // PROPS CAN BE PASSED ONTO LOWER LEVEL COMPONENTS HERE
                         ? <FacetedContainer />
                         : null
                 }
             </div>
         );
     },

    //placeholder for automatic list generation method - IGNORE FOR THE MOMENT
    renderListItems: function() {
        var items = [];
        for (var i = 0; i < this.props.list.length; i++) {
            var item = this.props.list[i];
            items.push(<div onClick={this.select.bind(null, item)}>
                <span style={{ color: item.hex }}>{item.name}</span>
                <i className="fa fa-check"></i>
            </div>);
        }
        return items;
    },


    onClick: function () {
        this.setState({ isVisible : !this.state.isVisible });
    }
 });

//CONTAINER (LOGIC) COMPONENT FOR FacetedNav AUTOMATIC ENTITY GENERATION
var FacetedContainer = React.createClass({
    render: function () {
        return (
            <div className="list-group facetedContainerAlignment">
                <FacetedItem label="Gender" name="Gender"/>
                <AttributeDropdown id={"attribute " + this.props.name + ""} label={this.props.label}/>
                <FacetedItem label="Occupation" name="Occupation"/>
                <FacetedItem label="Birthday" name="Birthday"/>


            </div>
        );
    }
});

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
    /* getInitialState() {
    return { /* INITIAL STATE GOES HERE, EQUIVALENT TO CONSTRUCTOR*/
    getInitialState: function () {
        return {
            isVisible: false
        };
    },
    render: function () {
        return (
            <div id={"" + this.props.name + ""} onClick={this.onClick}>
                <div className="nav-tabs nav-stacked js facets-item">
                    <a className="h3" href="#">{this.props.label}</a>
                </div>
            </div>
        );
    },

    onClick: function () {
        this.setState({ isVisible : !this.state.isVisible });
    }
});

//
var AttributeDropdown = React.createClass({
    getInitialState: function () {
        return {
            isVisible: true
        };
    },
    render: function () {
        return (
            <div >
                <div id={"" + this.props.name + ""} className="col-md-8 col-md-push-12 attributeDropdown-content" href="#">
                    <ul >
                        {/*// This section should be optimized for automatic list item generation based on incoming props from ResultsItem!!! //*/}
                        <li>
                            <a className="btn btn-primary btn-sm" type="button">Male   <span className="badge badgeRound">4</span></a>
                        </li >
                        <li>
                            <a className="btn btn-primary btn-sm" type="button">Female   <span className="badge badgeRound">2</span></a>
                        </li>
                        {/*<li>*/}
                            {/*<a className="btn btn-primary btn-sm" type="button">Other</a>*/}
                        {/*</li>*/}
                    </ul>
                    <AttributeActivity label={this.props.label}/>
                </div>
            </div>
        );
    }
});

//This component is responsible for the attribute widget search box and action button
var AttributeActivity = React.createClass({
    getInitialState() {
        return {
            isVisible: false
        };
    },
    onClick: function () {
        this.setState({ isVisible : !this.state.isVisible });
    },
    render: function () {
        return (
            <div className="row input-group attributeActivity">
                {/* Attribute search*/}
                <input className="col-sm-7 attributeActivity " type="text" placeholder={"Search " + this.props.label + ""}/>
                <div className="input-group-btn">
                    <a className="btn btn-default" data-toggle="tooltip" title="Actions..."><i className="fa fa-ellipsis-h attributeActivity inputGroupIcon"></i></a>
                    <a className="btn btn-default" data-toggle="tooltip" title="Search..."><i className="fa fa-search attributeActivity inputGroupIcon"></i></a>
                </div>
            </div>
        );
    },
});

//
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
{/*                    <fieldset>
                        <form className="facetedItem-layout">
                            <fieldset>
                                <AttributeDropdown label="test1" name="test1"/>
                            </fieldset>
                        </form>
                    </fieldset>*/}
                </div>
            </div>
        );
    }
});

//
var FacetedNavOrg = React.createClass({
    getInitialState: function () {
        return {
            isVisible: false
        };
    },
    select: function (item) {
        this.props.selected = item;
    },
    render: function () {
        return (
            <div className="facets-group bt bb bl br" id={"" + this.props.name + ""} onClick={this.onClick}>
                <a className="h3">{this.props.label}</a>
                <FacetedItemOrg label="Name" name="Name"/>
            </div>
        );
    },
    onClick: function () {
        this.setState({ isVisible : !this.state.isVisible });
    }
});

//
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

//
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

//
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

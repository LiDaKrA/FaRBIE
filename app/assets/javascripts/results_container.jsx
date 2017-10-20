checkLanguage();

var context = $('body').data('context')

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
                                <div className="col-md-4">
                                    <a href={context === "" ? "/" : context}>
                                        <img src={context + "/assets/images/Logo_ico-gray.png"} className="smallLogo" height="64" width="178" alt="Logo_Description" align="left" />
                                    </a>
                                </div>
                                {/*<div className="col-md-12 text-center">
                                    <SearchBox id_class="form-search" lang = {this.state.dictionary}/>
                                </div>*/}
                                <div className="col-md-3">
                                </div>
                                <div className="col-md-12 text-right">
                                    <SettingsBar onlangselect={this.setLang}/>
                                </div>
                                <div className="col-md-5 toolbar search-header hidden-phone text-right">
                                    <div className="row">
                                        <div className="col-md-12">
                                            {/*
                                            <LangSwitcher onlangselect={this.setLang}/>
                                            <SearchForm id_class="form-search-header" keyword={query}/>
                                            */}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </nav>
                    </div>
                </div>

                <div className="row search-results-container">
                    {/*Start adding the components here!!!*/}
                    {/*
                       <Trigger url={context + "/engine/api/searches?query=" + query} pollInterval={200000}/>
                    */}
                    <div className="row">
                        <div className="col-md-3 text-center">
                            <SourcesInfoBox />
                        </div>
                    </div>
                </div>

                <a href="http://www.bdk.de/lidakra" target="_blank" className="no-external-link-icon">
                    <div id="logo-mini" title={getTranslation("sponsored_by")}/>
                </a>

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
                <a className="sourcesInfoBox_info" href="#">0    <i className="fa fa-info-circle"></i></a>
            </div>
            )

    }
})

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
                    <a className="settingsBar_dropdown" href="#"><i className="fa fa-gears" ></i><div className="settingsBar_dropdown-content">
                        <a href="#">File<i className="ffa fa-file-text"></i></a>
                    </div></a>
                    <a className="settingsBar_sourcesOff" href="#">0    <i className="fa fa-refresh"></i></a>
                    <a href="#" onClick={boundClickEng}><strong>DE    </strong><i
                        className="fa fa-caret-down"></i></a>
                </div>
            )
        } else {
            return (
                <div className="settingsBar">
                    <a className="settingsBar_dropdown" href="#"><i className="fa fa-gears" ></i><div className="settingsBar_dropdown-content">
                        <a href="#">File<i className="ffa fa-file-text"></i></a>
                    </div></a>
                    <a className="settingsBar_sourcesOff" href="#"><strong>0    </strong><i className="fa fa-refresh"></i></a>
                    <a href="#" onClick={boundClickGer}><strong>EN    </strong><i
                        className="fa fa-caret-down"></i></a>
                </div>
            )
        }
    }

})

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

React.render(<ContainerResults url={context + "/keyword"} pollInterval={200000}/>, document.getElementById('skeleton'));
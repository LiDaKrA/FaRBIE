checkLanguage();

var context = $('body').data('context')

var SearchContainer = React.createClass({displayName: "SearchContainer",
    getInitialState: function() {
        return { dictionary: "" };
    },
    setLang: function() {
        switch (window.localStorage.getItem("lang")) {
            case "de":
                window.globalDict = dictGer;
                window.localStorage.lang = "de";
                this.setState({dictionary: "de"});
                // globalFlushFilters();
                break;
            case "en":
                window.globalDict = dictEng;
                window.localStorage.lang = "en";
                this.setState({dictionary: "en"});
                // globalFlushFilters();
                break;
        }
    },
    render: function () {
        return (
            React.createElement("div", null, 
                React.createElement("div", {className: "row"}, 
                    React.createElement("div", {className: "col-md-12 text-right"}, 
                        React.createElement(SettingsBar, {onlangselect: this.setLang})
                    )
                ), 
                React.createElement("div", {className: "row"}, 
                    React.createElement("link", {rel: "stylesheet", media: "screen", href: context+"/assets/stylesheets/startPage.css"}, 
                        React.createElement("div", {className: "col-md-12 search-widget"}, 
                            React.createElement("div", null, 
                                React.createElement("img", {src: context+"/assets/images/Logo_ico-gray.png", className: "bigLogo", alt: "Logo_Description", height: "150", width: "407"})
                            ), 
                            React.createElement("div", {className: "row"}, 
                                React.createElement("div", {className: "col-md-12 text-center"}, 
                                    React.createElement(SearchBox, {id_class: "form-search", lang: this.state.dictionary})
                                )
                            )
                        )
                    )

                ), 

                /*<div id="contact-mini">
                    {getTranslation("need_help")}<a href="mailto:lidakra-support@ontos.com">{getTranslation("contact")}<img src={context + "/assets/images/icons/help-desk-icon.png"} id="support-icon"/></a>
                </div>*/

                React.createElement("div", {id: "contact-mini"}, 
                    "FaRBIE, ® University of Bonn (2017)."
                )

            )
        );
    }
});

var KeywordsFile = React.createClass({displayName: "KeywordsFile",
    handleFileSelection: function (evt)
    {
        var f = evt.target.files[0];
        var searches_array = []
        if (f) {
            var r = new FileReader();

            r.local_sources = this.props.sources;
            r.local_types = this.props.types;

            r.onload = function(e) {
                var contents = e.target.result;
                searches_array = contents.split("\n");
                for (var i = 0; i < searches_array.length; i++) {
                    var win = window.open(context+"/results?query="+searches_array[i]+"&sources="+this.local_sources+"&types="+this.local_types,'_blank');
                    win.focus();
                }
            }
            r.readAsText(f);
        } else {
            alert("Failed to load file");
        }
    },
    render: function () {
        return (
                    React.createElement("div", {className: "text-center"}, 
                       React.createElement("span", {className: "btn btn-primary btn-file btn-md"}, 
                           getTranslation("select_file"), " ", React.createElement("input", {type: "file", onChange: this.handleFileSelection})
                       )
                    )
        )
    }
});

var SettingsBar = React.createClass({displayName: "SettingsBar",
    preSetLang: function(lang, e) {
        window.localStorage.lang = lang
        this.props.onlangselect()
    },
    render: function () {
        let boundClickEng = this.preSetLang.bind(this, 'en');
        let boundClickGer = this.preSetLang.bind(this, 'de');

        if(window.localStorage.getItem("lang") === "de"){
            return (
                React.createElement("div", null, 
                    React.createElement("b", null, "DE"), 
                    "|", 
                    React.createElement("a", {href: "#", onClick: boundClickEng}, "EN")
                ))
        } else {
            return (
                React.createElement("div", null, 
                    React.createElement("a", {href: "#", onClick: boundClickGer}, "DE"), 
                    "|", 
                    React.createElement("b", null, "EN")
                ))
        }
        React.createElement("div", {className: "row"}, 
            React.createElement("div", {className: "col-md-6 text-center"}, 
                React.createElement(AccessTokenForm, {social_network: "facebook"})
            ), 
            React.createElement("div", {className: "col-md-6 text-center"}, 
                React.createElement(AccessTokenForm, {social_network: "xing"})
            )
        )
    }
});

var SearchBox = React.createClass({displayName: "SearchBox",
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
        typesForSource["facebook"] = ["person"];
        typesForSource["twitter"] = ["person"];
        typesForSource["xing"] = ["person"];
        typesForSource["gplus"] = ["person","organization"];
        typesForSource["linkedleaks"] = ["person","organization"];
        typesForSource["gkb"] = ["person","organization"];
        typesForSource["ebay"] = ["product"];
        typesForSource["occrp"] = ["document"];
        typesForSource["tor2web"]  = ["website"];
        typesForSource["elasticsearch"]  = ["website"];
        //typesForSource["pipl"] = ["person"];

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
                React.createElement("div", null, 
                    React.createElement("form", {method: "get", id: this.props.id_class, role: "search", action: context+"/results", onSubmit: this.handleSubmit}, 
                        React.createElement("div", null, 
                            React.createElement("label", null, React.createElement("span", null, "Search: ")), 
                            React.createElement("input", {type: "text", name: "query", defaultValue: this.props.keyword, placeholder: getTranslation("yoursearch")}), " ", 
                            React.createElement("input", {type: "hidden", name: "sources", value: selected_sources}), 
                            React.createElement("input", {type: "hidden", name: "types", value: selected_types}), 
                            React.createElement("button", {type: "submit"}, " ")
                        ), 
                        React.createElement("div", null, 
                            React.createElement("div", {className: "floatingSelText-header"}, 
                                this.getSelectionLabel(), 
                                React.createElement("img", {className: "sel_button", src: context+"/assets/images/icons/arrow_down.png"}
                                )
                            )
                        )
                    ), 
                    React.createElement("div", null, 
                        React.createElement("div", {className: "col-md-3"}), 
                        React.createElement("div", {className: floatingDivStyle}, 
                            React.createElement("div", {className: "row", id: "filterList"}, 
                                React.createElement("div", {className: "col-md-6 separator"}, 
                                    React.createElement(FilteredCheckList, {filterType: "datasources", lang: this.props.lang, AllowedTypes: [], onSourceChangedFunction: this.sourcesChanged, show: this.state.showSourcesTypesDiv})
                                ), 
                                React.createElement("div", {className: "col-md-6"}, 
                                    React.createElement(FilteredCheckList, {filterType: "entitytypes", lang: this.props.lang, AllowedTypes: this.state.allowed_types, onSourceChangedFunction: this.typesChanged, show: this.state.showSourcesTypesDiv})
                                )
                            )
                        ), 
                        React.createElement("div", {className: "col-md-5"})
                    )
                )

            );
        }

        return (
            React.createElement("div", null, 
                React.createElement("div", {className: "row"}, 
                    React.createElement("div", {className: "col-md-3"}), 
                    React.createElement("div", {className: "col-md-6"}, 
                        React.createElement("form", {method: "get", id: this.props.id_class, role: "search", action: context+"/results", onSubmit: this.handleSubmit}, 
                            React.createElement("div", null, 
                                React.createElement("label", null, React.createElement("span", null, "Search: ")), 
                                React.createElement("input", {type: "search", name: "query", placeholder: getTranslation("yoursearch")}), " ", 
                                React.createElement("input", {type: "hidden", name: "sources", value: selected_sources}), 
                                React.createElement("input", {type: "hidden", name: "types", value: selected_types}), 
                                React.createElement("button", {type: "submit"}, " ")
                            ), 
                            React.createElement("div", null, 
                                React.createElement("div", {className: "floatingSelText"}, 
                                    this.getSelectionLabel(), 
                                    React.createElement("img", {className: "sel_button", src: context+"/assets/images/icons/arrow_down.png"}
                                    )
                                )
                            )
                        )
                    )
                    /*<div className="col-md-1 vertical-separator" title="Search with 1 keyword <- OR ->Search with 1 or more keywords"/>*/
                    /*<div className="col-md-1 ">*/
                        /*<KeywordsFile sources={selected_sources} types={selected_types}/>*/
                    /*</div>*/
                ), 
                React.createElement("div", null, 
                    React.createElement("div", {className: floatingDivStyle}, 
                        React.createElement("div", {className: "row", id: "filterList"}, 
                            React.createElement("div", {className: "col-md-6 separator"}, 
                                React.createElement(FilteredCheckList, {filterType: "datasources", disabled: "false", helpText: "data_sources_help", lang: this.props.lang, AllowedTypes: [], onSourceChangedFunction: this.sourcesChanged, show: this.state.showSourcesTypesDiv})
                            ), 
                            React.createElement("div", {className: "col-md-6"}, 
                                React.createElement(FilteredCheckList, {filterType: "entitytypes", disabled: "true", helpText: "entity_types_help", lang: this.props.lang, AllowedTypes: this.state.allowed_types, onSourceChangedFunction: this.typesChanged, show: this.state.showSourcesTypesDiv})
                            )
                        )
                    )
                )
            )
        );
    }
});

var FilteredCheckList = React.createClass({displayName: "FilteredCheckList",
    loadListFromServer: function (filter) {

        var list_url = context+"/engine/api/schema/"+filter

        var previousDataList = []

        if(this.props.filterType === "datasources") {
            if (typeof sourcesDirty !== 'undefined') {
                previousDataList= sourcesDirty.split(',');
            }
        }

        if(this.props.filterType === "entitytypes") {
            if(typeof typesDirty !== 'undefined'){
                previousDataList= typesDirty.split(',');
            }
        }

        $.ajax({
            url: list_url,
            dataType: 'json',
            cache: false,
            success: function (list_data) {
                var processed_data = [];
                console.log(list_data);
                for(var k in list_data["@graph"]){
                    var current_label = list_data["@graph"][k]["rdfs:label"]
                    var current_key = list_data["@graph"][k]["fs:key"]
                    var current_url = list_data["@graph"][k]["fs:help_url"]
                    var checked = false

                    if(list_data["@graph"].length >= previousDataList.length) {
                        checked = $.inArray(current_key, previousDataList) > -1 || previousDataList.length == 0 ? true : false
                    }

                    var data_label,data_url;
                    if(Object.prototype.toString.call(current_label) === '[object Array]'){
                        for(var j in current_label){
                            if(current_label[j]["@language"] === window.localStorage.getItem("lang")){
                                //processed_data.push({ id: current_label[j]["@value"], selected: checked, key: current_key, allowed: true})
                                data_label = current_label[j]["@value"];
                            }
                        }
                    }else{
                        //processed_data.push({ id: current_label, selected: checked, key: current_key,allowed: true})
                        data_label = current_label;
                    }

                    if(Object.prototype.toString.call(current_url) === '[object Array]'){
                        for(var j in current_url){
                            if(current_url[j]["@language"] === window.localStorage.getItem("lang")){
                                //processed_data.push({ id: current_label[j]["@value"], selected: checked, key: current_key, allowed: true})
                                data_url = current_url[j]["@value"];
                            }
                        }
                    }else{
                        //processed_data.push({ id: current_label, selected: checked, key: current_key,allowed: true})
                        data_url = current_url;
                    }

                    processed_data.push({ id: data_label,url: data_url, selected: checked, key: current_key,allowed: true})
                }
                // if(this.props.filterType === "entitytypes"){
                //     processed_data = this.updateChecks(processed_data,this.props.AllowedTypes);
                // }
                this.setState({data: processed_data});
                this.props.onSourceChangedFunction(processed_data)
            }.bind(this),
            error: function (xhr, status, err) {
                console.error(list_url, status, err.toString());
            }.bind(this)
        });
    },
    updateChecks: function (checks,allowedTypes) {
        if(checks !== undefined) {
            return checks.map(function (d) {
                var found = allowedTypes.indexOf(d.key) > -1;
                return {
                    id: d.id,
                    url: d.url,
                    selected: found,
                    allowed: found,
                    key: d.key
                };
            });
        }
        return undefined;
    },
    componentWillReceiveProps: function (nextProps) {
        if(nextProps.lang != this.props.lang)
            this.loadListFromServer(this.props.filterType);
        if(nextProps.AllowedTypes.length !== this.props.AllowedTypes.length && this.props.filterType === "entitytypes"){
            var updatedData = this.updateChecks(this.state.data,nextProps.AllowedTypes);

            if(updatedData !== undefined) {
                var filteredTypes = updatedData.filter(function(item) { return item.allowed;});
                var allselected = filteredTypes.length >0 ? filteredTypes.every(function (item) {
                        return item.selected;
                    }) : false;
                this.props.onSourceChangedFunction(updatedData);
                this.setState({data: updatedData, selectAll: allselected});
            }
        }
    },
    componentDidMount: function () {
        this.loadListFromServer(this.props.filterType);
    },
    __changeSelection: function(id) {
        var state = this.state.data.map(function(d) {
            return {
                id: d.id,
                url: d.url,
                selected: (d.id === id ? !d.selected : d.selected),
                allowed: d.allowed,
                key: d.key
            };
        });
        var filteredData = state.filter(function(item) { return item.allowed;});
        var allselected = filteredData.length >0 ? filteredData.every(function (item) {
                return item.selected;
            }) : false;
        this.props.onSourceChangedFunction(state);
        this.setState({ data: state, selectAll:allselected });
    },
    __changeSelectAll: function(){
        var state = this.state.data.map(function(d) {
            return {
                id: d.id,
                url: d.url,
                selected: (d.allowed ? !this.state.selectAll : d.selected),
                allowed: d.allowed,
                key: d.key
            };
        },this);
        this.props.onSourceChangedFunction(state)
        this.setState({ data: state , selectAll: !this.state.selectAll});
    },
    getInitialState: function() {
        return { data: undefined, selectAll: true };
    },
    render: function() {
        if (this.props.show) {
            if (this.state.data) {
                var filter_title = getTranslation(this.props.filterType);//(this.props.filterType).charAt(0).toUpperCase() + (this.props.filterType).slice(1);

                var checks = this.state.data.map(function(d) {
                    if(d.allowed) {
                        return (
                            React.createElement("div", null, 
                                " ", 
                                this.props.disabled === "true" ?
                                    React.createElement("input", {type: "checkbox", disabled: true, 
                                           checked: d.selected, 
                                           onChange: this.__changeSelection.bind(this, d.id)})
                                    :
                                    React.createElement("input", {type: "checkbox", 
                                           checked: d.selected, 
                                           onChange: this.__changeSelection.bind(this, d.id)}), 
                                    d.id, 
                                React.createElement("br", null)
                            )
                        );
                    }
                    else{
                        return (
                            React.createElement("div", null, 
                                " ", React.createElement("s", null, React.createElement("input", {type: "checkbox", checked: d.selected, disabled: true, onChange: this.__changeSelection.bind(this, d.id)}), 
                                d.id), 
                                React.createElement("br", null)
                            )
                        );
                    }
                }.bind(this));
                return (
                    React.createElement("div", null, 
                         React.createElement("div", {className: "filterchecklist-head"}, 
                             this.props.disabled === "true" ?
                                 React.createElement("input", {type: "checkbox", disabled: true, checked: this.state.selectAll, onChange: this.__changeSelectAll})
                                 :
                                 React.createElement("input", {type: "checkbox", checked: this.state.selectAll, onChange: this.__changeSelectAll}), 
                             filter_title+":", 
                             React.createElement(ContextualHelp, {type: "contextual-help help", message: getTranslation(this.props.helpText)})
                         ), 
                        checks
                    )
                );
            }
            return React.createElement("div", {className: "row"}, 
                React.createElement("div", {className: "col-md-12 text-center"}, 
                    React.createElement("h2", null, React.createElement("img", {src: context+"/assets/images/ajaxLoader.gif"}), getTranslation("bittewarten"))
                )
            );
        }

        return null;
    }
});

var AccessTokenForm = React.createClass({displayName: "AccessTokenForm",
    loadTokenLifeLength: function () {

        var social_network_url = context+"/"+this.props.social_network+"/getTokenLifeLength"

        $.ajax({
            url: social_network_url,
            dataType: 'json',
            cache: false,
            success: function (lifelength) {
                this.setState({token_life_length: lifelength["life_length"]});
            }.bind(this),
            error: function (xhr, status, err) {
                console.error(this.props.url, status, err.toString());
            }.bind(this)
        });
    },
    getInitialState: function () {
        return {token_life_length: null};
    },
    componentDidMount: function () {
        this.loadTokenLifeLength();
    },
    render: function() {

        var social_net_upper_case = (this.props.social_network).charAt(0).toUpperCase() + (this.props.social_network).slice(1);

        if(this.state.token_life_length) {
            if(this.state.token_life_length === "-1") {
                return (
                    React.createElement("div", {className: "accessTokenDiv", align: "center"}, 
                        getTranslation("novalidtkfound_pre"), React.createElement("span", {className: "socialNetworkName"}, social_net_upper_case), getTranslation("novalidtkfound_post"), 
                        React.createElement("br", null), 
                        React.createElement("br", null), 
                        React.createElement("form", {action: context+"/"+this.props.social_network+"/getToken", method: "get"}, 
                            React.createElement("button", null, " ", getTranslation("newtoken"), " ")
                        )

                    ) )
            }
            else if(this.state.token_life_length < 60) {
                return (
                    React.createElement("div", {align: "center"}, 
                        React.createElement("p", null, social_net_upper_case+getTranslation("validtkfound"), " ", this.state.token_life_length, " ", getTranslation("minutes"), "."
                        )
                    ) )
            }
            else if(this.state.token_life_length < 1440) {
                return (
                    React.createElement("div", {align: "center"}, 
                        React.createElement("p", null, social_net_upper_case+getTranslation("validtkfound"), " ", this.state.token_life_length, " ", getTranslation("hours"), "."
                        )
                    ) )
            }
            else {
                return (
                    React.createElement("div", {align: "center"}, 
                        React.createElement("p", null, social_net_upper_case+getTranslation("validtkfound"), " ", Math.floor((this.state.token_life_length/60)/24), " ", getTranslation("days"), ".")
                    ) )
            }
        }
        return (
            React.createElement("div", {align: "center"}, 
                getTranslation("checkingtoken")
            ) )
    }
});

var SupportContact = React.createClass({displayName: "SupportContact",
    render: function () {
        return (
            React.createElement("div", {id: "contact-footer"}, 
                React.createElement("img", {src: context + "/assets/images/icons/help-desk-icon.png", id: "support-icon"}), 
                React.createElement("h6", null, getTranslation("need_help")), 
                React.createElement("h6", null, React.createElement("a", {href: "mailto:lidakra-support@ontos.com"}, getTranslation("contact")))
            )
        );
    }
});

var ContextualHelp = React.createClass({displayName: "ContextualHelp",
    onChange: function() {
        if(this.state.showSourcesTypesDiv) {
            this.setState({ showSourcesTypesDiv: false});
        } else {
            this.setState({ showSourcesTypesDiv: true});
        }
    },
    getInitialState: function() {
        return { showSourcesTypesDiv: false };
    },
    render: function () {
        var floatingDivStyle = this.state.showSourcesTypesDiv ? "popuptext popupshow" : "popuptext"
        return (
            React.createElement("div", {className: this.props.type, onClick: this.onChange}, 
                React.createElement("span", {className: floatingDivStyle}, 
                    this.props.message
                )
            )
        );
    }
});

React.render(React.createElement(SearchContainer, null), document.getElementById('containersearch'));
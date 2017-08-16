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

var ContainerResults = React.createClass({displayName: "ContainerResults",
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
            React.createElement("div", null, 
                React.createElement("div", {className: "container"}, 
                    React.createElement("div", {className: "row", id: "header-main-row"}, 
                        React.createElement("nav", {className: "widget col-md-12", "data-widget": "NavigationWidget"}, 
                            React.createElement("div", {className: "row"}, 
                                React.createElement("div", {className: "col-md-4"}, 
                                    React.createElement("a", {href: context === "" ? "/" : context}, 
                                        React.createElement("img", {src: context + "/assets/images/logoBig2.png", className: "smallLogo", 
                                             alt: "Logo_Description"})
                                    )
                                ), 
                                React.createElement("div", {className: "col-md-3"}
                                ), 
                                React.createElement("div", {className: "col-md-5 toolbar search-header hidden-phone text-right"}, 
                                    React.createElement("div", {className: "row"}, 
                                        React.createElement("div", {className: "col-md-12"}, 
                                            React.createElement(LangSwitcher, {onlangselect: this.setLang}), 
                                            React.createElement(SearchForm, {id_class: "form-search-header", keyword: query})
                                        )
                                    )
                                )
                            )
                        )
                    )
                ), 

                React.createElement("div", {className: "row search-results-container"}, 
                    React.createElement(Trigger, {url: context + "/engine/api/searches?query=" + query, pollInterval: 200000})
                ), 

                React.createElement("a", {href: "http://www.bdk.de/lidakra", target: "_blank", className: "no-external-link-icon"}, 
                    React.createElement("div", {id: "logo-mini", title: getTranslation("sponsored_by")})
                )

            )
        );
    }
});

var Trigger = React.createClass({displayName: "Trigger",
    loadKeywordFromServer: function () {
        $.ajax({
            url: this.props.url,
            dataType: 'json',
            type: "POST",
            cache: false,
            success: function (kw) {
                this.setState({keyword: kw["keyword"], searchUid: kw["uid"]});
            }.bind(this),
            error: function (xhr, status, err) {
                console.error(this.props.url, status, err.toString());
            }.bind(this)
        });
    },
    getInitialState: function () {
        return {keyword: null, searchUid: null};
    },
    componentDidMount: function () {
        this.loadKeywordFromServer();
        //setInterval(this.loadKeywordFromServer, this.props.pollInterval);
    },
    render: function () {
        if (this.state.keyword) {
            return ( React.createElement(Container, {keyword: this.state.keyword, searchUid: this.state.searchUid}));
        }

        return React.createElement(LoadingResults, null);
    }
});

var Container = React.createClass({displayName: "Container",
    onFacetSelection: function (facetName, propertyName,facetValue) {
        if (this.state.facetsDict[facetName]) {
            if (this.state.facetsDict[facetName].indexOf(facetValue) === -1) {
                this.state.facetsDict[facetName].push(facetValue)
                this.state.orgFacetsDict[propertyName].push(facetValue)
                this.setState({facetsDict: this.state.facetsDict,orgFacetsDict: this.state.orgFacetsDict, loadMoreResults: false})
            }
        } else {
            this.state.facetsDict[facetName] = [facetValue];
            this.state.orgFacetsDict[propertyName] = [facetValue];
            this.setState({facetsDict: this.state.facetsDict,orgFacetsDict: this.state.orgFacetsDict, loadMoreResults: false})
        }
    },
    onFacetRemoval: function (facetName, propertyName,facetValue) {
        if (facetValue != "all") {
            var index_of = this.state.facetsDict[facetName].indexOf(facetValue)
            this.state.facetsDict[facetName].splice(index_of, 1)
            index_of = this.state.orgFacetsDict[propertyName].indexOf(facetValue)
            this.state.orgFacetsDict[propertyName].splice(index_of, 1)

            if (this.state.facetsDict[facetName].length === 0) {
                delete this.state.facetsDict[facetName]
                delete this.state.orgFacetsDict[propertyName]
            }
        } else {
            delete this.state.facetsDict[facetName]
            delete this.state.orgFacetsDict[propertyName]
        }

        this.setState({facetsDict: this.state.facetsDict,orgFacetsDict: this.state.orgFacetsDict, loadMoreResults: false})
    },
    loadCommentsFromServer: function () {
        //alert("Keyword: "+this.props.keyword);
        var searchUrl = context + "/engine/api/searches/" + this.props.searchUid + "/results?entityType=" + this.state.entityType + "&sources=" + sourcesDirty + "&types=" + typesDirty + "&exact=" + this.state.exactMatching;
        $.ajax({
            url: searchUrl,
            dataType: 'json',
            cache: false,
            //beforeSend: function() {
            //    clearInterval();
            //    $("#cancel_loading_btn").fadeIn("slow").delay(5000).fadeOut();
            //},
            success: function () {
                this.setState({initData: true});
            }.bind(this),
            error: function (xhr, status, err) {
                console.error(this.props.url, status, err.toString());

                if(err.toString().includes("Not Acceptable")){
                    alert(getTranslation("no_valid_token_found"))
                    window.location.href = "/fuhsen";
                }else if(err.toString().includes("timeout")){
                    //alert(getTranslation("timeout"));
                    var r = confirm(getTranslation("timeout"));
                    if (r == true)
                        window.location.reload();
                    else
                        window.location.href = "/fuhsen";
                }else{
                    alert(getTranslation("internal_server_error"));
                    //Todo remove this hardcoded value
                    window.location.href = "/fuhsen";
                }
            }.bind(this)
            ,timeout: 100000 // sets timeout to 100 seconds
        });
    },
    componentDidMount: function () {
        this.loadCommentsFromServer();
    },
    getInitialState: function () {
        return {view: "list", entityType: "person", facets: "", initData: false, facetsDict: {}, orgFacetsDict: {}, exactMatching:exact_matching, loadMoreResults:false, mergeData: {1: null, 2: null}};
    },
    onExactMatchingChange: function () {
        this.setState({exactMatching:!this.state.exactMatching, loadMoreResults:false})
    },
    onLoadMoreResults: function () {
        this.setState({loadMoreResults: true})
    },
    onTypeChange: function (event) {
        var optionSelected = event.currentTarget.dataset.id;
        var type;
        if (optionSelected === "1") {
            type = "person"
        } else if (optionSelected === "2") {
            type = "organization"
        } else if (optionSelected === "3") {
            type = "product"
        } else if (optionSelected === "4") {
            type = "website"
        } else if (optionSelected === "5") {
            type = "document"
        }
        this.setState({entityType: type,facetsDict: {}, orgFacetsDict: {}, loadMoreResults: false, exactMatching: false});
    },
    setEntityType: function (type) {
        this.setState({entityType: type,facetsDict: {}, orgFacetsDict: {}, loadMoreResults: false, exactMatching: false});
    },
    onMergeChange: function(data, cancel){
        let link = this.state.mergeData;
        let state = true;
        if(data){
            if(!link[1] && !link[2]){
                link[1]= data;
            }
            else if(link[1] && !link[2]){
                link[2]= data;
            }
            else if(link[2] && !link[1]){
                link[1]= data;
            }
            else{
                alert("Only two results can be merged at once");
                state = false;
            }
        }
        if(cancel){
            link[cancel] = null;
            state = false;
        }
        this.setState({
            mergeData: link
        });
        return state;
    },
    onMerge: function(){
      let data = this.state.mergeData;
      let mergeUrl = context + '/' + this.props.searchUid + '/merge';
        $.ajax({
            url: mergeUrl,
            data: {
                'uri1': data[1].uri,
                'uri2': data[2].uri
            },
            cache: false,
            type: 'GET',
            success: function(response) {
                console.log("success");
                window.location.reload()
            },
            error: function(xhr) {
                console.log("error");
                console.log(xhr);
            }
        });
    },
    onFavourite: function(data){
        let url = context + '/' + this.props.searchUid + '/favorites';
        $.ajax({
            url: url+"?uri=" + data,
            cache: false,
            type: 'POST',
            success: function(response) {
                console.log(response);
            },
            error: function(xhr) {
                console.log("error");
                console.log(xhr);
            }
        });
    },
    render: function () {
        if (this.state.initData) {
            return (React.createElement("div", {className: "row search-results-container"}, 
                React.createElement("div", {className: "col-md-3"}, 
                    React.createElement("div", {className: "row"}, 
                        React.createElement(FacetList, {searchUid: this.props.searchUid, 
                                   keyword: this.props.keyword, 
                                   entityType: this.state.entityType, 
                                   onFacetSelection: this.onFacetSelection, 
                                   onFacetRemoval: this.onFacetRemoval, 
                                   currentTab: this.state.entityType, 
                                   orgFacetsDict: this.state.orgFacetsDict, 
                                   onExactMatchingChange: this.onExactMatchingChange, 
                                   exactMatching: this.state.exactMatching, 
                                   loadMoreResults: this.state.loadMoreResults})
                    ), 
                    React.createElement("div", {className: "row"}, 
                        React.createElement(LinkResults, {data: this.state.mergeData, onLinkCancel: this.onMergeChange, merge: this.onMerge})
                    )
                ), 
                React.createElement("div", null, 
                    React.createElement(ResultsContainer, {searchUid: this.props.searchUid, 
                                      keyword: this.props.keyword, 
                                      entityType: this.state.entityType, 
                                      view: this.state.view, 
                                      facets: this.state.facets, 
                                      onTypeChange: this.onTypeChange, 
                                      facetsDict: this.state.facetsDict, 
                                      exactMatching: this.state.exactMatching, 
                                      onExactMatchingChange: this.onExactMatchingChange, 
                                      onLoadMoreResults: this.onLoadMoreResults, 
                                      loadMoreResults: this.state.loadMoreResults, 
                                      setEntityType: this.setEntityType, 
                                      onAddLink: this.onMergeChange, 
                                      onFavourite: this.onFavourite})
                )
            ));
        }
        return React.createElement(LoadingResults, null);
    }
});


//************** Begin Facets Components *******************

// inject/ passing data
var FacetList = React.createClass({displayName: "FacetList",
    onFacetSelection: function (facetName,propertyName, valueSelected) {
        this.props.onFacetSelection(facetName,propertyName, valueSelected)
    },
    onFacetRemoval: function (facetName,propertyName, valueSelected) {
        this.props.onFacetRemoval(facetName,propertyName, valueSelected)
    },
    loadFacetsFromServer: function (eType,selectedFacets, exact) {
        var searchUrl = context + "/engine/api/searches/" + this.props.searchUid + "/facets?entityType=" + eType + "&lang=" + window.localStorage.lang + "&exact=" + exact
        $.ajax({
            type: 'POST',
            url: searchUrl,
            dataType: 'json',
            cache: false,
            data:JSON.stringify(selectedFacets),
            contentType: 'application/json',
            success: function (response) {
                console.log(response)
                if(exact && JSON.stringify(response["@graph"]) == undefined){
                    //alert(getTranslation("no_exact_match_results"));
                }else{
                    this.setState({data: response["@graph"]});
                }
            }.bind(this),
            error: function (xhr, status, err) {
                console.error(this.props.url, status, err.toString());
            }.bind(this)
        });
    },
    getInitialState: function () {
        return {data: null, exactMatching:false};
    },
    componentDidMount: function () {
        this.loadFacetsFromServer(this.props.entityType,this.props.orgFacetsDict, this.props.exactMatching);
    },
    componentWillReceiveProps: function (nextProps) {
        // see if it actually changed
        if (nextProps.entityType !== this.props.entityType || nextProps.exactMatching !== this.props.exactMatching) {
            this.loadFacetsFromServer(nextProps.entityType,nextProps.orgFacetsDict, nextProps.exactMatching);
        }
        else{
            this.loadFacetsFromServer(this.props.entityType,nextProps.orgFacetsDict, this.props.exactMatching);
        }
    },
    handleExactMatchingChange: function () {
        this.props.onExactMatchingChange();
    },
    facets2CSV: function () {
        var JSONData = JSON.stringify(this.state.data);
        var arrData = typeof JSONData != 'object' ? JSON.parse(JSONData) : JSONData;
        var CSV = '';
        var headers_set = new Set();

        for (var i = 0; i < arrData.length; i++) {
            if (this.state.selectedChecks === undefined || this.state.selectedChecks === null || this.state.selectedChecks.length == 0 || this.state.selectedChecks.indexOf(i) > -1) {
                for (var header in arrData[i]) {
                    headers_set.add(header)
                }
            }
        }

        headers_set.delete("http://vocab.lidakra.de/fuhsen/hasFacet")

        let headers = Array.from(headers_set);
        for (var i = 0; i < headers.length; i++) CSV += headers[i] + ',';
        CSV = CSV.slice(0, -1);
        CSV += '\r\n';

        var CVS_values = '@facet_name, @facet_value, @count \r\n'

        for (var i = 0; i < arrData.length; i++) {
            if (this.state.selectedChecks === undefined
                || this.state.selectedChecks === null
                || this.state.selectedChecks.length == 0
                || this.state.selectedChecks.indexOf(i) > -1){

                var row = "";

                for (var index in headers) {
                    var value = arrData[i][headers[index]]
                    if (value === undefined || value === 'null') value = ''
                    row += '"' + value + '",';
                }

                row.slice(0, row.length - 1);

                //add a line break after each row
                CSV += row + '\r\n';

                var facet_values = arrData[i]["http://vocab.lidakra.de/fuhsen/hasFacet"]
                var facet_name = arrData[i]["http://vocab.lidakra.de/fuhsen#facetLabel"]

                if (Object.prototype.toString.call(facet_values) === '[object Array]') {
                    for (var j = 0; j < facet_values.length; j++) {
                        value_number_pair = facet_values[j].split("^")
                        for (var k = 0; k < value_number_pair.length; k=k+2) {
                            CVS_values += '"' + facet_name + '","' + value_number_pair[k] + '","' + value_number_pair[k+1] + '"\r\n';
                        }
                    }
                } else {
                    value_number_pair = facet_values.split("^")
                    for (var k = 0; k < value_number_pair.length; k=k+2) {
                        CVS_values += '"' + facet_name + '","' + value_number_pair[k] + '","' + value_number_pair[k+1] + '"\r\n';
                    }
                }
            }
        }

        if (CSV == '' || CVS_values == '') {
            alert("Invalid data");
            return;
        }

        var zip = new JSZip();
        // create a file
        zip.file("Facets_summary.csv", CSV);
        zip.file("Facets_values.csv", CVS_values);
        zip.generateAsync({type:"blob"})
            .then(function (blob) {
                saveAs(blob, "facets_csv_export.zip");
            });

        this.setState({
            resultsData: this.state.resultsData,
            selected: this.state.selected,
            loading: this.state.loading,
            underDev: false,
            view: this.state.view
        });
    },
    render: function () {
        if (this.state.data && this.state.data !== undefined) {
            var _searchUid = this.props.searchUid;
            var _entityType = this.props.entityType;
            var MItems = this.state.data.map(function (menuItems) {
                if(menuItems["http://vocab.lidakra.de/fuhsen/hasFacet"] !== undefined) {
                    return React.createElement(FacetItems, {searchUid: _searchUid, 
                                       entityType: _entityType, 
                                       label: menuItems["http://vocab.lidakra.de/fuhsen#facetLabel"], 
                                       name: menuItems["http://vocab.lidakra.de/fuhsen#facetName"], 
                                       property: menuItems["http://vocab.lidakra.de/fuhsen#value"], 
                                       facets: menuItems["http://vocab.lidakra.de/fuhsen/hasFacet"], 
                                       count: menuItems["http://vocab.lidakra.de/fuhsen#count"], 
                                       onFacetSelection: this.onFacetSelection, 
                                       onFacetRemoval: this.onFacetRemoval, 
                                       currentTab: this.props.currentTab, 
                                       selectedFacets: this.props.orgFacetsDict})
                }
            }, this);
            var exact_text = "Exact matching."
            var exact_property = ""

            switch (this.props.currentTab) {
                case "person":
                    exact_property="Regarding the full name (blue title)."
                    break;
                case "organization":
                    exact_property="Regarding the full name (blue title)."
                    break;
                case "product":
                    exact_property="Regarding the product description (blue title)."
                    break;
                case "website":
                    exact_text = "Match results starting with."
                    exact_property="Regarding the web title."
                    break;
                case "document":
                    exact_property="Regarding the document title (blue title)."
                    break;
            }

            const tooltipStyle = { display: this.state.hover ? 'block' : 'none'}

            return (
                React.createElement("div", {id: "facetsDiv", className: "facets-container hidden-phone"}, 
                    React.createElement("div", {className: "facets-head"}, 
                        React.createElement("h3", null, getTranslation("resultfilters"), 
                            React.createElement("span", {className: "export-facets-btn"}, "(", React.createElement("a", {href: "#", title: getTranslation("export_facets"), onClick: this.facets2CSV, className: "no-external-link-icon"}, getTranslation("export")), ")")
                        ), 
                        React.createElement(ContextualHelp, {type: "contextual-help help", message: getTranslation("facets_help")})
                    ), 
                    React.createElement("div", {className: "js facets-list bt bb"}, 
                        MItems
                    ), 
                    React.createElement("div", null, 
                        React.createElement("input", {
                            name: "isGoing", 
                            type: "checkbox", 
                            checked: this.props.exactMatching, 
                            onChange: this.handleExactMatchingChange}), 
                        getTranslation("exact_match")
                    )
                )
            )
        }
        return (
            React.createElement("div", {className: "facets-container hidden-phone"}, 
                React.createElement("div", {className: "facets-head"}, 
                    React.createElement("h3", null, getTranslation("resultfilters"))
                ), 
                React.createElement("div", {className: "js facets-list bt bb"}
                )
            )
        )

    }
});

var FacetItems = React.createClass({displayName: "FacetItems",
    getInitialState: function () {
        arr_ele = [];//fill elements of the sub menu in an array
        return {showTextBox: false, selected_facets: []};
    },
    onClick: function () {
        var propsName = this.props.name;//.replace(/\s/g, '');
        var propsName_key = arr_ele.indexOf(propsName);
        //Check if the menu item is shown
        // if Yes hide it, if No show it

        if (this.state.showTextBox) {
            //Check if the item is in the array: means you just now clicked it, then hide it by setting the state to false and remove it from the array
            //if not in the array: means it was hidden by showing other item:
            //      - then show it by using normal js
            //      - set the state to true
            //      - hide and remove all others
            if (propsName_key >= 0) {
                this.setState({showTextBox: false});
                arr_ele.splice(propsName_key, 1);
            }
            else {
                this.setState({showTextBox: true});
                arr_ele.push(propsName);
                document.getElementById(propsName).style.display = "inline";
                if (arr_ele[0] != propsName) {
                    document.getElementById(arr_ele[0]).style.display = "none";
                    arr_ele.splice(0, 1);
                }
            }
        }
        else {
            this.setState({showTextBox: true});
            if (propsName_key < 0) {
                arr_ele.push(propsName);
            }
            for (var i = 0; i < arr_ele.length - 1; i++) {
                if (arr_ele[i] != propsName) {
                    document.getElementById(arr_ele[i]).style.display = "none";
                    arr_ele.splice(arr_ele[i], 1);
                }
            }
        }
    },
    onFacetItemClick: function (eSelectedItem) {
        var _selectedFacets = this.state.selected_facets;
        var _index = _selectedFacets.indexOf(eSelectedItem);
        if (_index < 0) {
            _selectedFacets.push(eSelectedItem);
            this.setState({showTextBox: false, selected_facets: _selectedFacets});
        }

        this.props.onFacetSelection(this.props.name,this.props.property, eSelectedItem)
    },
    onFacetItemRemoveClick: function (eSelectedItem) {
        if (eSelectedItem != "all") {
            var _selectedFacets = this.state.selected_facets;
            var _index = _selectedFacets.indexOf(eSelectedItem);
            if (_index >= 0) {
                _selectedFacets.splice(_index, 1);
                this.setState({showTextBox: false, selected_facets: _selectedFacets});
            }
        } else {
            this.setState({showTextBox: false, selected_facets: []});
        }

        this.props.onFacetRemoval(this.props.name, this.props.property,eSelectedItem)

    },
    componentWillUpdate: function (nextProps, nextState) {
        if (this.props.currentTab != nextProps.currentTab) {
            this.onFacetItemRemoveClick("all")
        }
    },
    OnDocumentClick: function (e) {
        if ($("#facetsDiv").has(e.target).length == 0){
            var propsName = this.props.name;//.replace(/\s/g, '');
            var propsName_key = arr_ele.indexOf(propsName);
            if (this.state.showTextBox && propsName_key > -1) {
                this.setState({showTextBox: false});
                arr_ele.splice(propsName_key, 1);
            }
        }
    },
    componentDidMount: function () {
        document.addEventListener('click', this.OnDocumentClick);
    },
    componentWillUnmount: function () {
        document.removeEventListener('click', this.OnDocumentClick);
    },
    render: function () {
        var selItems = [];
        var _onFacetItemRemoveClick = this.onFacetItemRemoveClick;
        if (this.props.selectedFacets[this.props.property]) {
            this.props.selectedFacets[this.props.property].map(function (item) {
                selItems.push(React.createElement("li", {"data-fctvalue": item}, 
                    React.createElement("span", {title: "male", className: "facet-value"}, item), 
                    React.createElement("a", {title: "Remove", className: "facet-remove fr", onClick: _onFacetItemRemoveClick.bind(this, item)}
                    )
                ));
            });
            return (
                React.createElement("div", {className: "facets-item bt bb bl br"}, 
                    React.createElement("a", {className: "h3"}, this.props.label), 
                    React.createElement("div", {id: "" + this.props.name + ""}, 
                         this.state.showTextBox ?
                            React.createElement(FacetSubMenuItems, {searchUid: this.props.searchUid, entityType: this.props.entityType, 
                                               facetName: this.props.name, 
                                               property: this.props.property, 
                                               facetsValues: this.props.facets, 
                                               onFacetItemClick: this.onFacetItemClick}) : null
                    ), 
                    React.createElement("div", {className: "flyout-left-container"}, 
                        React.createElement("ul", {className: "selected-items unstyled"}, 
                            selItems
                        )
                    )
                )
            );
        }
        return (
            React.createElement("div", {className: "facets-item bt bb bl br"}, 
                React.createElement("a", {className: "h3", onClick: this.onClick}, this.props.label), 
                React.createElement("div", {id: "" + this.props.name + ""}, 
                     this.state.showTextBox ?
                        React.createElement(FacetSubMenuItems, {searchUid: this.props.searchUid, entityType: this.props.entityType, 
                                           facetName: this.props.name, 
                                           property: this.props.property, 
                                           facetsValues: this.props.facets, 
                                           onFacetItemClick: this.onFacetItemClick}) : null
                )
            )
        );
    }
});

var FacetSubMenuItems = React.createClass({displayName: "FacetSubMenuItems",
    loadFacetsFromServer: function (eFacet) {
        var searchUrl = context + "/engine/api/searches/" + this.props.searchUid + "/facets/" + eFacet + "?entityType=" + this.props.entityType;
        $.ajax({
            url: searchUrl,
            dataType: 'json',
            cache: false,
            success: function (data) {
                var facetsValues = data["@graph"];
                if (facetsValues !== undefined) {
                    facetsValues.sort(function (a, b) {
                        var count_a = parseInt(a["http://vocab.lidakra.de/fuhsen#count"]);
                        var count_b = parseInt(b["http://vocab.lidakra.de/fuhsen#count"]);
                        if (isNaN(count_a) || isNaN(count_b))
                            return 0;
                        if (count_a < count_b)
                            return 1;
                        if (count_a > count_b)
                            return -1;
                        return 0;
                    });
                }
                this.setState({data: facetsValues});
            }.bind(this),
            error: function (xhr, status, err) {
                console.error(this.props.url, status, err.toString());
            }.bind(this)
        });
    },
    getInitialState: function () {
        return {data: null,searchFacetText: ""};
    },
    sortFacetsValues : function(facetsValues){
        if (facetsValues !== undefined) {
            facetsValues.sort(function (a, b) {
                var count_a = parseInt(a["http://vocab.lidakra.de/fuhsen#count"]);
                var count_b = parseInt(b["http://vocab.lidakra.de/fuhsen#count"]);
                if (isNaN(count_a) || isNaN(count_b))
                    return 0;
                if (count_a < count_b)
                    return 1;
                if (count_a > count_b)
                    return -1;
                return 0;
            });
        }
        return facetsValues;
    },
    splitFacetsValues : function(){
        var facetData = [];
        if(Array.isArray(this.props.facetsValues)){
            this.props.facetsValues.map(function (facetElement) {
                var res = facetElement.split("^");
                if (res.length == 2) {
                    facetData.push({
                        "http://vocab.lidakra.de/fuhsen#value": res[0],
                        "http://vocab.lidakra.de/fuhsen#count": res[1]
                    });
                }
            });
        }
        else{
            var facetElement = this.props.facetsValues;
            if(facetElement.length >0){
                var res = facetElement.split("^");
                if (res.length == 2) {
                    facetData.push({
                        "http://vocab.lidakra.de/fuhsen#value": res[0],
                        "http://vocab.lidakra.de/fuhsen#count": res[1]
                    });
                }
            }
        }
        return facetData;
    },
    componentDidMount: function () {
        //this.loadFacetsFromServer(this.props.facetName);
        var facetsValues = this.splitFacetsValues();
        facetsValues = this.sortFacetsValues(facetsValues);
        this.setState({data: facetsValues});
    },
    ontextChanged: function(e){
        var text = e.target.value;
        this.setState({searchFacetText: text});
    },
    render: function () {
        var subMenuEle = [];
        if (this.state.data && this.state.data !== undefined) {
            var _onFacetItemClick = this.props.onFacetItemClick;
            var searchRegPattern = (this.state.searchFacetText ? new RegExp('\\b' + this.state.searchFacetText,'i') : null);
            this.state.data.map(function (menuItems) {
                if (menuItems["http://vocab.lidakra.de/fuhsen#value"] && menuItems["http://vocab.lidakra.de/fuhsen#value"] !== "blank") {
                    var facetValue = menuItems["http://vocab.lidakra.de/fuhsen#value"];
                    if(!searchRegPattern || (searchRegPattern && facetValue.match(searchRegPattern))) {
                        subMenuEle.push(React.createElement("li", null, React.createElement("a", {href: "#", id: menuItems["http://vocab.lidakra.de/fuhsen#value"], 
                                                onClick: _onFacetItemClick.bind(this, menuItems["http://vocab.lidakra.de/fuhsen#value"])}, 
                       React.createElement("span", {
                           className: "sub-item-result"}, "(", menuItems["http://vocab.lidakra.de/fuhsen#count"], ")"), 
                            menuItems["http://vocab.lidakra.de/fuhsen#value"])
                        ));
                    }
                }
            });
        }
        return (
            React.createElement("div", null, 
                React.createElement("div", {className: "flyout-left-container"}, 
                    React.createElement("ul", {className: "selected-items unstyled"}), 
                    React.createElement("div", {className: "input-search-fct-container"}, 
                        React.createElement("input", {type: "text", className: "input-search-fct", placeholder: "Facet Value to Search for", onChange: this.ontextChanged})
                    )
                ), 

                React.createElement("div", {className: "flyout-right-container"}, 
                    React.createElement("div", {className: "flyout-right-head"}, 
                        React.createElement("span", null, getTranslation("sortedby"))
                    ), 
                    React.createElement("div", {className: "flyout-right-body"}, 
                        React.createElement("ul", {className: "left-col unstyled"}, 
                            subMenuEle
                        )
                    )
                )
            )
        );
    }
});

//************** End Facets Components *******************
var ResultsContainer = React.createClass({displayName: "ResultsContainer",
    checksListener: function (listOfSelectedRows) {
        this.setState({selectedChecks: listOfSelectedRows})
    },
    noData: function () {
        alert(getTranslation("nodata"));
    },
    toggleResultsView: function () {
        var view_selector = (this.state.view == "list" ? "table" : "list");
        this.setState({
            resultsData: this.state.resultsData,
            selected: this.state.selected,
            loading: this.state.loading,
            underDev: false,
            view: view_selector,
            selectedChecks: []
        });
    },
    underDevelopmentFunction: function () {
        this.setState({
            resultsData: this.state.resultsData,
            selected: this.state.selected,
            loading: this.state.loading,
            underDev: true,
            view: this.state.view
        });
    },
    crawlAll: function () {
        var JSONData = this.state.resultsData;

        var seeds = []

        for (var key in JSONData) {
            seeds.push(JSONData[key].url)
        }

        var createCrawlJobUrl = context + "/crawling/jobs/create";

        $.ajax({
            url: createCrawlJobUrl,
            data: JSON.stringify({"seedURLs": seeds}),
            type: "POST",
            dataType: "text",
            contentType: "application/json; charset=utf-8",
            cache: false,
            success: function () {
                this.setState({crawled: true});
            }.bind(this),
            error: function (xhr, status, err) {
                console.error(this.props.url, status, err.toString());
            }.bind(this)
        });

    },
    csvFunction: function () {
        var JSONData = JSON.stringify(this.state.resultsData);
        var arrData = typeof JSONData != 'object' ? JSON.parse(JSONData) : JSONData;
        var ReportTitle = "Current results in CSV format"

        var CSV = '';
        var headers_set = new Set();

        for (var i = 0; i < arrData.length; i++) {
            if (this.state.selectedChecks === undefined || this.state.selectedChecks === null || this.state.selectedChecks.length == 0 || this.state.selectedChecks.indexOf(i) > -1) {
                for (var header in arrData[i]) {
                    headers_set.add(header)
                }
            }
        }

        let headers = Array.from(headers_set);
        for (var i = 0; i < headers.length; i++) CSV += headers[i] + ',';
        CSV = CSV.slice(0, -1);
        CSV += '\r\n';

        for (var i = 0; i < arrData.length; i++) {
            if (this.state.selectedChecks === undefined || this.state.selectedChecks === null || this.state.selectedChecks.length == 0 || this.state.selectedChecks.indexOf(i) > -1) {
                var row = "";

                for (var index in headers) {
                    //console.log(headers[index])
                    var value = arrData[i][headers[index]]
                    if( value === undefined || value === 'null') value=''
                    row += '"' + value + '",';
                }

                row.slice(0, row.length - 1);

                //add a line break after each row
                CSV += row + '\r\n';
            }
        }

        if (CSV == '') {
            alert("Invalid data");
            return;
        }

        //Generate a file name
        var fileName = "Fuhsen_";
        //this will remove the blank-spaces from the title and replace it with an underscore
        fileName += ReportTitle.replace(/ /g, "_");

        //Initialize file format you want csv or xls
        var uri = 'data:text/csv;charset=utf-8,' + escape(CSV);

        // Now the little tricky part.
        // you can use either>> window.open(uri);
        // but this will not work in some browsers
        // or you will not get the correct file extension

        //this trick will generate a temp <a /> tag
        var link = document.createElement("a");
        link.href = uri;

        //set the visibility hidden so it will not effect on your web-layout
        link.style = "visibility:hidden";
        link.download = fileName + ".csv";

        //this part will append the anchor tag and remove it after automatic click
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);

        this.setState({
            resultsData: this.state.resultsData,
            selected: this.state.selected,
            loading: this.state.loading,
            underDev: false,
            view: this.state.view
        });
    },
    loadDataFromServer: function (eType, exactMatching, loadmore) {
        this.setState({selected: eType, loading: true});

        //alert("Loading results ResultsContainer "+loadmore);
        var loadMore = "";
        if (loadmore)
            loadMore = "&loadMoreResults=true";

        var searchUrl = context + "/engine/api/searches/" + this.props.searchUid + "/results?entityType=" + eType + "&sources=" + sourcesDirty + "&types=" + typesDirty + "&exact=" + exactMatching + loadMore;

        $.ajax({
            url: searchUrl,
            dataType: 'json',
            cache: false,
            success: function (data) {
                if(exactMatching && (data["@graph"] === undefined && data["@id"] === undefined)){
                    this.setState({
                        resultsData: this.state.resultsData,
                        selected: eType,
                        loading: false,
                        underDev: false,
                        originalData: this.state.originalData
                    })
                    alert(getTranslation("no_exact_match_results"));
                    this.props.onExactMatchingChange();
                }else{
                    if(Object.keys(this.state.results_stat).length == 0 || loadmore)
                        this.computeDataStatistics();
                    data_to_handle = JSON.parse(JSON.stringify(data));
                    //alert(JSON.stringify(data_to_handle));
                    if (data_to_handle["@graph"] !== undefined)
                        data_to_handle = data_to_handle["@graph"].sort(compareRank);
                    else {
                        if (data_to_handle["fs:source"] !== undefined) {
                            data_to_handle = JSON.parse("{ \"@graph\": [" + JSON.stringify(data) + "]}");
                            data_to_handle = data_to_handle["@graph"].sort(compareRank);
                        }
                        else
                            data_to_handle = undefined;
                    }

                    data_to_maintain = data_to_handle;
                    //alert(JSON.stringify(data_to_handle));
                    //data_to_handle = JSON.parse(JSON.stringify(data))
                    //data_to_maintain = JSON.parse(JSON.stringify(data))
                    this.setState({
                        resultsData: data_to_handle,
                        selected: eType,
                        loading: false,
                        underDev: false,
                        originalData: data_to_maintain
                    });
                }
            }.bind(this),
            error: function (xhr, status, err) {
                console.error(this.props.url, status, err.toString());
            }.bind(this)
        });
    },
    computeDataStatistics: function(){
        var stat_url = context + "/engine/api/searches/" + this.props.searchUid + "/results_stat";
        var moreResultsHelper = false;
      $.ajax({
          url: stat_url,
          dataType: 'json',
          cache: true,
          success: function (data) {
              var stat = {};
              stat["person"] = stat["organization"] = stat["product"] = stat["website"] = stat["document"] = 0;
              if (data["@graph"] === undefined && data["http://vocab.lidakra.de/fuhsen#value"] !== undefined)
                  data = JSON.parse("{ \"@graph\": [" + JSON.stringify(data) + "]}");

              if(data["@graph"] !== undefined) {
                  data["@graph"].map(function (result) {
                      if (result["http://vocab.lidakra.de/fuhsen#nextPage"] !== undefined)
                          moreResultsHelper = true;
                      else
                        stat[result["http://vocab.lidakra.de/fuhsen#value"]] = result["http://vocab.lidakra.de/fuhsen#count"];
                  });
              }
              var selectedType = this.state.selected;
              if(stat["person"] == 0){
                  for(var key in stat){
                      if(stat.hasOwnProperty(key) && key !== "person" && stat[key] > 0) {
                          selectedType = key;
                          this.props.setEntityType(selectedType);
                          break;
                      }
                  }
              }
              this.setState({
                    results_stat: stat,
                    areThereMoreResults: moreResultsHelper,
                    selected: selectedType
                });

          }.bind(this),
          error: function (xhr, status, err) {
              console.error(this.props.url, status, err.toString());
          }.bind(this)
      });
    },
    getInitialState: function () {
        return {
            resultsData: "",
            selected: "person",
            loading: true,
            underDev: false,
            crawled: false,
            view: this.props.view,
            selectedChecks: [],
            results_stat: {},
            areThereMoreResults: false
        };
    },
    componentDidMount: function () {
        this.loadDataFromServer(this.props.entityType, this.props.exactMatching, false);
    },
    componentWillReceiveProps: function (nextProps) {
        //see if it actually changed
        if (nextProps.entityType !== this.props.entityType || nextProps.exactMatching !== this.props.exactMatching || nextProps.loadMoreResults === true) {
            this.loadDataFromServer(nextProps.entityType, nextProps.exactMatching, nextProps.loadMoreResults);
        }
    },
    render: function () {
        var loadMoreResultsItem = React.createElement("div", {id: "load-more-results", className: "hidden"}, getTranslation("show_more_results"))
        if (this.state.areThereMoreResults) {
            loadMoreResultsItem = React.createElement("a", {href: "#", onClick: this.props.onLoadMoreResults}, React.createElement("div", {id: "load-more-results"}, getTranslation("show_more_results")))
        }

        var personenItem = (this.state.results_stat["person"] > 0 ? React.createElement("li", {className: "headers-li", onClick: this.props.onTypeChange, 
                               "data-id": "1"}, getTranslation("people")+'(' + this.state.results_stat["person"]+ ')') : null);
        var organizationenItem = (this.state.results_stat["organization"] > 0 ? React.createElement("li", {className: "headers-li", onClick: this.props.onTypeChange, 
                                     "data-id": "2"}, getTranslation("organisations")+'(' + this.state.results_stat["organization"]+ ')') : null);
        var produkteItem = (this.state.results_stat["product"] >0 ? React.createElement("li", {className: "headers-li", onClick: this.props.onTypeChange, 
                               "data-id": "3"}, getTranslation("products")+'(' + this.state.results_stat["product"]+ ')') : null);
        var darkWebItem = (this.state.results_stat["website"] > 0 ? React.createElement("li", {className: "headers-li", onClick: this.props.onTypeChange, 
                              "data-id": "4"}, getTranslation("tor_websites")+'(' + this.state.results_stat["website"]+ ')') : null);
        var documentItem = ( this.state.results_stat["document"] >0 ? React.createElement("li", {className: "headers-li", onClick: this.props.onTypeChange, 
                               "data-id": "5"}, getTranslation("documents")+'(' + this.state.results_stat["document"]+ ')') : null);

        if (this.state.selected === "person" && personenItem !== null) {
            personenItem = React.createElement("li", {className: "headers-li", onClick: this.props.onTypeChange, "data-id": "1"}, React.createElement("p", null, 
                React.createElement("b", null, getTranslation("people")+'(' + this.state.results_stat[this.state.selected]+ ')')))
        } else if (this.state.selected === "organization" && organizationenItem !== null) {
            organizationenItem = React.createElement("li", {className: "headers-li", onClick: this.props.onTypeChange, "data-id": "2"}, React.createElement("p", null, 
                React.createElement("b", null, getTranslation("organisations")+'(' + this.state.results_stat[this.state.selected]+ ')')))
        } else if (this.state.selected === "product" && produkteItem !== null) {
            produkteItem = React.createElement("li", {className: "headers-li", onClick: this.props.onTypeChange, "data-id": "3"}, React.createElement("p", null, 
                React.createElement("b", null, getTranslation("products")+'(' +  this.state.results_stat[this.state.selected]+ ')')))
        } else if (this.state.selected === "website" && darkWebItem !== null) {
            darkWebItem = React.createElement("li", {className: "headers-li", onClick: this.props.onTypeChange, "data-id": "4"}, React.createElement("p", null, 
                React.createElement("b", null, getTranslation("tor_websites")+'(' + this.state.results_stat[this.state.selected]+ ')')))
        } else if (this.state.selected === "document" && documentItem !== null) {
            documentItem = React.createElement("li", {className: "headers-li", onClick: this.props.onTypeChange, "data-id": "5"}, React.createElement("p", null, 
                React.createElement("b", null, getTranslation("documents")+'(' + this.state.results_stat[this.state.selected]+ ')')))
        }

        if (this.state.loading) {
            return React.createElement("div", {className: "col-md-9"}, 
                React.createElement("div", {id: "results-paginator-options", className: "results-paginator-options"}, 
                    React.createElement("div", {class: "off result-pages-count"}), 
                    React.createElement("div", {className: "row"}, 
                        React.createElement("div", {className: "col-md-8 tabulator"}, 
                            React.createElement("ul", {className: "list-inline"}, 
                                /*<li>*/
                                    /*<span className="total-results-label"> {getTranslation("results")}:</span>*/
                                /*</li>*/
                                personenItem, 
                                organizationenItem, 
                                produkteItem, 
                                darkWebItem, 
                                documentItem
                            )
                        )
                    )
                ), 
                React.createElement(LoadingResults, null)
            );
        }

        var final_data = this.state.resultsData;

        //Facets filtering algorithm
        if (Object.keys(this.props.facetsDict).length > 0) {
            final_data = this.state.originalData
            for (var key in this.props.facetsDict) {
                if (this.props.facetsDict.hasOwnProperty(key)) {
                    var facet_name = "fs:" + key
                    var facet_values = this.props.facetsDict[key]

                    function containsAll(source, target) {
                        var found = false;
                        for (var i = 0; i < target.length; i++) {
                            if (source.indexOf(target[i]) > -1) {
                                found = true;
                                break;
                            }
                        }
                        return found;
                    }

                    function filterByFacet(obj) {
                        //Comparing array of elements
                        if (Array.isArray(obj[facet_name])) {
                            if (containsAll(obj[facet_name], facet_values))
                                return true;
                            else
                                return false;
                        }
                        //Comparing just one element
                        else {
                            if (facet_values.indexOf(obj[facet_name]) >= 0)
                                return true;
                            else
                                return false;
                        }
                    }

                    var as = final_data.filter(filterByFacet);
                    final_data = JSON.parse(JSON.stringify(as));
                }
            }
        }
        else {
            final_data = this.state.originalData;
        }
        //No results
        if (final_data === undefined) {
            return React.createElement("div", {className: "col-md-9"}, 
                React.createElement("div", {id: "results-paginator-options", className: "results-paginator-options"}, 
                    React.createElement("div", {class: "off result-pages-count"}), 
                    React.createElement("div", {className: "row"}, 
                        React.createElement("div", {className: "col-md-8 tabulator"}, 
                            React.createElement("div", {className: "tabs-head"}, 
                                React.createElement("ul", {className: "list-inline"}, 
                                    /*<li>*/
                                    /*<span className="total-results">0</span>*/
                                    /*<span className="total-results-label"> {getTranslation("results")}:</span>*/
                                    /*</li>*/
                                    personenItem, 
                                    organizationenItem, 
                                    produkteItem, 
                                    darkWebItem, 
                                    documentItem
                                ), 
                                React.createElement(SearchMetadataInfo, {searchUid: this.props.searchUid})
                            )
                        ), 
                        React.createElement("div", {className: "col-md-4 text-right"}, 
                            " "
                        )
                    )
                ), 
                React.createElement("div", {className: "search-results-content"}, 
                    React.createElement("div", {className: "row"}, 
                        React.createElement("div", {className: "col-md-12"}, 
                            React.createElement("ul", {id: "search-results", className: "search-results"}, 
                                React.createElement("ul", {className: "results-list list-unstyled"}, 
                                    React.createElement("h1", null, getTranslation("no_results"))
                                )
                            )
                        )
                    )
                )
            )
        }

        var stat_text = (final_data.length <  this.state.results_stat[this.state.selected] ?  final_data.length + '/' : "")+ this.state.results_stat[this.state.selected];
        if (this.state.selected === "person" && personenItem !== null) {
            personenItem = React.createElement("li", {className: "headers-li", onClick: this.props.onTypeChange, "data-id": "1"}, React.createElement("p", null, 
                React.createElement("b", null, getTranslation("people")+'(' + stat_text + ')')))
        } else if (this.state.selected === "organization" && organizationenItem !== null) {
            organizationenItem = React.createElement("li", {className: "headers-li", onClick: this.props.onTypeChange, "data-id": "2"}, React.createElement("p", null, 
                React.createElement("b", null, getTranslation("organisations")+'(' + stat_text+ ')')))
        } else if (this.state.selected === "product" && produkteItem !== null) {
            produkteItem = React.createElement("li", {className: "headers-li", onClick: this.props.onTypeChange, "data-id": "3"}, React.createElement("p", null, 
                React.createElement("b", null, getTranslation("products")+'(' + stat_text + ')')))
        } else if (this.state.selected === "website" && darkWebItem !== null) {
            darkWebItem = React.createElement("li", {className: "headers-li", onClick: this.props.onTypeChange, "data-id": "4"}, React.createElement("p", null, 
                React.createElement("b", null, getTranslation("tor_websites")+'(' + stat_text + ')')))
        } else if (this.state.selected === "document" && documentItem !== null) {
            documentItem = React.createElement("li", {className: "headers-li", onClick: this.props.onTypeChange, "data-id": "5"}, React.createElement("p", null, 
                React.createElement("b", null, getTranslation("documents")+'(' + stat_text + ')')))
        }

        if (this.state.underDev) {
            return React.createElement("div", {className: "col-md-9"}, 
                React.createElement("div", {id: "results-paginator-options", className: "results-paginator-options"}, 
                    React.createElement("div", {class: "off result-pages-count"}), 
                    React.createElement("div", {className: "row"}, 
                        React.createElement("div", {className: "col-md-8 tabulator"}, 
                            React.createElement("ul", {className: "list-inline"}, 
                                /*<li>*/
                                    /*<span className="total-results">{final_data.length}</span>*/
                                    /*<span className="total-results-label"> {getTranslation("results")}:</span>*/
                                /*</li>*/
                                personenItem, 
                                organizationenItem, 
                                produkteItem, 
                                darkWebItem, 
                                documentItem
                            )
                        ), 
                        React.createElement("div", {className: "col-md-4 text-right"}, 
                            " "
                        )
                    )
                ), 
                React.createElement("div", {className: "search-results-content"}, 
                    React.createElement("div", {className: "row"}, 
                        React.createElement("div", {className: "col-md-12"}, 
                            React.createElement("ul", {id: "search-results", className: "search-results"}, 
                                React.createElement("ul", {className: "results-list list-unstyled"}, 
                                    React.createElement("h1", null, getTranslation("underdevelopment"))
                                )
                            )
                        )
                    )
                )
            )
        }

        return React.createElement("div", {className: "col-md-9"}, 
            React.createElement("div", {id: "results-paginator-options", className: "results-paginator-options"}, 
                React.createElement("div", {class: "off result-pages-count"}), 
                React.createElement("div", {className: "row"}, 
                    React.createElement("div", {className: "col-md-8 tabulator"}, 
                        React.createElement("div", {className: "tabs-head"}, 
                            React.createElement("ul", {className: "list-inline"}, 
                                /*<li>*/
                                    /*<span className="total-results">{final_data.length}</span>*/
                                    /*<span className="total-results-label"> {getTranslation("results")}:</span>*/
                                /*</li>*/
                                personenItem, 
                                organizationenItem, 
                                produkteItem, 
                                darkWebItem, 
                                documentItem
                            ), 
                            React.createElement(SearchMetadataInfo, {searchUid: this.props.searchUid})
                        )
                    ), 
                    React.createElement("div", {className: "col-md-4 text-right"}, 
                        /*{ this.state.selected === "website" ? <CustomForm id="btn_crawl" class_identifier="crawl_icon"*/
                                                                          /*func={this.crawlAll}/> : null }*/
                        /*{ this.state.selected === "website" ? <div className="divider"/> : null }*/
                        React.createElement(CustomForm, {id: "btn_view_selector", 
    class_identifier: (this.state.view == "list" ? "table" : "list") + "_icon", 
    func: this.toggleResultsView}), 
                        React.createElement("div", {className: "divider"}), 
                        React.createElement(CustomForm, {id: "btn_csv", class_identifier: "csv_icon", func: this.csvFunction})
                    )
                )
            ), 
            React.createElement("div", {className: "search-results-content"}, 
                React.createElement("div", {className: "row"}, 
                    React.createElement(RetunToTopBtn, null), 
                     this.state.view == "list" ?
                        React.createElement("div", {className: "col-md-12"}, 
                            React.createElement("ul", {id: "search-results", className: "search-results"}, 
                                React.createElement("ul", {className: "results-list list-unstyled"}, 
                                    React.createElement(ResultsList, {data: final_data, 
                                                 crawled: this.state.crawled, 
                                                 searchUid: this.props.searchUid, 
                                                 onAddLink: this.props.onAddLink, 
                                                 onFavourite: this.props.onFavourite}
                                    )

                                )
                            )
                        )
                        :
                        React.createElement("div", {id: "search-results", className: "search-results"}, 
                            React.createElement(ResultsTable, {data: final_data, 
                                          crawled: this.state.crawled, 
                                          type: this.props.entityType, 
                                          checksListener: this.checksListener, 
                                          onAddLink: this.props.onAddLink, 
                                          onFavourite: this.props.onFavourite}
                            )
                        )
                    
                )
            ), 
            loadMoreResultsItem
        )
    }
});

var CustomForm = React.createClass({displayName: "CustomForm",
    render: function () {
        return (
            React.createElement("button", {id: this.props.id, onClick: this.props.func, className: this.props.class_identifier, 
                    title: getTranslation(this.props.class_identifier)}
            )
        );
    }
});

var ResultsList = React.createClass({displayName: "ResultsList",
    render: function () {

        var resultsNodesSorted = this.props.data;

        var already_crawled = this.props.crawled;
        var resultsNodes = resultsNodesSorted.map(function (result,idx) {
            if (result["@type"] === "foaf:Person") {
                return (
                    React.createElement(PersonResultElement, {
                        uri: result["@id"], 
                        id: result["fs:id"], 
                        img: result.image, 
                        name: result["fs:title"], 
                        source: result["fs:source"], 
                        alias: result["fs:alias"], 
                        location: result["fs:location"], 
                        label: result["fs:label"], 
                        comment: result["fs:comment"], 
                        gender: result["fs:gender"], 
                        occupation: result["fs:occupation"], 
                        birthday: result["fs:birthday"], 
                        country: result["fs:country"], 
                        webpage: result.url, 
                        active_email: result["fs:active_email"], 
                        wants: result["fs:wants"], 
                        haves: result["fs:haves"], 
                        top_haves: result["fs:top_haves"], 
                        interests: result["fs:interests"], 
                        jsonResult: result, 
                        uid: this.props.searchUid, 
                        onAddLink: this.props.onAddLink, 
                        onFavourite: this.props.onFavourite}
                    )
                );
            } else if (result["@type"] === "foaf:Organization") {
                return (
                    React.createElement(OrganizationResultElement, {
                        uri: result["@id"], 
                        id: result["fs:id"], 
                        img: result.image, 
                        title: result["fs:title"], 
                        source: result["fs:source"], 
                        label: result["fs:label"], 
                        comment: result["fs:comment"], 
                        country: result["fs:country"], 
                        location: result["fs:location"], 
                        webpage: result.url, 
                        jsonResult: result, 
                        uid: this.props.searchUid, 
                        onAddLink: this.props.onAddLink, 
                        onFavourite: this.props.onFavourite}
                    )
                );
            } else if (result["@type"] === "gr:ProductOrService") {
                return (
                    React.createElement(ProductResultElement, {
                        uri: result["@id"], 
                        id: result["fs:id"], 
                        img: result.image, 
                        title: result["fs:title"], 
                        source: result["fs:source"], 
                        location: result["fs:location"], 
                        country: result["fs:country"], 
                        price: result["fs:priceLabel"], 
                        condition: result["fs:condition"], 
                        webpage: result.url, 
                        jsonResult: result, 
                        uid: this.props.searchUid, 
                        onAddLink: this.props.onAddLink, 
                        onFavourite: this.props.onFavourite}
                    )
                );
            } else if (result["@type"] === "foaf:Document") {
                if (result["fs:source"] === "ELASTIC") {
                    return (
                        React.createElement(ElasticSearchResultElement, {
                            img: context + "/assets/images/datasources/Elasticsearch.png", 
                            content: result["fs:content"], 
                            label: result["fs:title"], 
                            onion_url: result.url, 
                            entity_url: result["fs:entity_url"], 
                            entity_dbpedia: result["fs:entity_dbpedia"], 
                            entity_type: result["fs:entity_type"], 
                            entity_name: result["fs:entity_name"], 
                            onAddLink: this.props.onAddLink, 
                            onFavourite: this.props.onFavourite}
                        )
                    );
                } else {
                    return (
                        React.createElement(WebResultElement, {
                            img: context + "/assets/images/datasources/TorLogo.png", 
                            onion_url: result["url"], 
                            comment: result["fs:comment"], 
                            source: result["fs:source"], 
                            onion_label: result["rdfs:label"], 
                            crawled: already_crawled, 
                            onAddLink: this.props.onAddLink, 
                            onFavourite: this.props.onFavourite}
                        )
                    );
                }
            } else if (result["@type"] === "fs:Document") {
                return (
                    React.createElement(DocumentResultElement, {
                        label: result["fs:label"], 
                        comment: result["fs:comment"], 
                        webpage: result.url, 
                        country: result["fs:country"], 
                        language: result["fs:language"], 
                        filename: result["fs:file_name"], 
                        extension: result["fs:extension"], 
                        source: result["fs:source"], 
                        onAddLink: this.props.onAddLink, 
                        onFavourite: this.props.onFavourite}
                    )
                );
            }
        },this);

        return (
            React.createElement("div", {className: "commentList"}, 
                resultsNodes
            )
        );
    }
});

var WebResultElement = React.createClass({displayName: "WebResultElement",
    checkOnionSite: function () {
        var searchUrl = context + "/checkOnionSite?site=" + this.props.onion_url;

        $.ajax({
            url: searchUrl,
            dataType: 'json',
            cache: false,
            success: function (data) {
                if(data.valid) {
                    this.createCrawlJob();
                }
                else {
                    alert(getTranslation("tor_invalid_websites"));
                    this.setState({validTORSite: false});
                }

            }.bind(this),
            error: function (xhr, status, err) {
                console.error(this.props.url, status, err.toString());
            }.bind(this)
        });
    },
    createCrawlJob: function () {
        console.info("Creating crawl job task")
        var createCrawlJobUrl = context + "/crawling/jobs/create";

        $.ajax({
            url: createCrawlJobUrl,
            data: JSON.stringify({"seedURLs": [this.props.onion_url]}),
            type: "POST",
            dataType: "text",
            contentType: "application/json; charset=utf-8",
            cache: false,
            success: function (response) {
                var idx = response.lastIndexOf('/');
                var crawlID = null;
                if(idx !== -1)
                    crawlID = response.substr(idx+1);
                var timer = setInterval(this.getCrawlJobStatus,5000);
                this.setState({crawlJobCreated: true,crawlID: crawlID,jobStatus: "crawlJobCreated",timerJobStatus : timer });
            }.bind(this),
            error: function (xhr, status, err) {
                console.error(this.props.url, status, err.toString());
            }.bind(this)
        });
    },
    getCrawlJobStatus: function(){
      var jobStatusUrl = context + "/crawling/jobs/" + this.state.crawlID + "/status";
        $.ajax({
            url: jobStatusUrl,
            contentType: "application/json; charset=utf-8",
            cache: false,
            success: function (response) {
                var status = response['crawlStatus'];
                if(status === "FINISHED" || status === "FAILED")
                    clearInterval(this.state.timerJobStatus);
                this.setState({jobStatus: "crawlJob"+ status});
            }.bind(this),
            error: function (xhr, status, err) {
                clearInterval(this.state.timerJobStatus);
                console.error(this.props.url, status, err.toString());
            }.bind(this)
        });
    },
    onCreateCrawlJobClick: function () {
        this.checkOnionSite();
        this.setState({jobStatus:"validatingUrl"});
    },
    getInitialState: function () {
        return {crawlJobCreated: false, validTORSite: true,crawlID: null,jobStatus: null,timerJobStatus: null };
    },
    onClickLink : function(url,e){
        e.preventDefault();
        if(navigator.appCodeName == "Mozilla") //"Mozilla" is the application code name for both Chrome, Firefox, IE, Safari, and Opera.
            url = url.replace(".onion",".onion.to");
        window.open(url,'_blank');
    },
    render: function () {
        return (
            React.createElement("li", {className: "item bt"}, 
                React.createElement("div", {className: "summary row"}, 
                    React.createElement("div", {className: "thumbnail-wrapper col-md-2"}, 
                        React.createElement("div", {className: "thumbnail"}, 
                            React.createElement("img", {src: this.props.img, height: "60px", width: "75px"})
                        )
                    ), 
                    React.createElement("div", {className: "summary-main-wrapper col-md-8"}, 
                        React.createElement("div", {className: "summary-main"}, 
                            React.createElement("h2", {className: "title"}, 
                                this.props.onion_url
                            ), 
                            React.createElement("div", {className: "subtitle"}, 
                                React.createElement("p", null, React.createElement("b", null, "Web title"), ": ", this.props.onion_label), 
                                React.createElement("p", null, React.createElement("b", null, getTranslation("comment")), ": ", this.props.comment), 
                                React.createElement("p", null, React.createElement("b", null, "Link: "), React.createElement("a", {href: this.props.onion_url, 
                                                     onClick: this.onClickLink.bind(this,this.props.onion_url)}, getTranslation("clickhere")))
                            )
                        )
                    ), 
                    React.createElement("div", {class: "thumbnail-wrapper col-md-1"}, 
                        React.createElement("div", {className: "thumbnail"}, 
                            React.createElement(LinkResultsButton, {data: this.props, onAddLink: this.props.onAddLink})
                        ), 
                        React.createElement("div", {className: "thumbnail"}, 
                            React.createElement(FavouritesButton, {data: this.props.uri, onFavourite: this.props.onFavourite})
                        ), 
                        React.createElement("div", {className: "thumbnail"}, 
                            React.createElement("div", null, 
                                React.createElement("div", null, 
                                    React.createElement("img", {src: context + "/assets/images/datasources/" + this.props.source + ".png", 
                                         alt: "Information from " + this.props.source, height: "45", width: "45", 
                                         title: this.props.source})
                                ), 
                                React.createElement("div", null, 
                                    this.state.validTORSite ? this.props.crawled == true || this.state.crawlJobCreated === true || this.state.jobStatus !== null ?
                                        React.createElement("label", null, this.state.jobStatus !== "crawlJobFINISHED" && this.state.jobStatus !== "crawlJobFAILED" ? React.createElement("img", {src: context+"/assets/images/ajaxLoader.gif"}) : null, getTranslation(this.state.jobStatus)) : React.createElement("button", {
                                            onClick: this.onCreateCrawlJobClick}, " ", getTranslation("createCrawlJob"), " ") : getTranslation("invalid_website")
                                )
                            )
                        )
                    )
                )
            )
        );
    }
});

var SnapshotLink = React.createClass({displayName: "SnapshotLink",
    showPDF: function () {
        var url = context + "/screenshot?url=" + this.props.webpage;
        window.open(url);
    },
    render: function () {
        return (
            React.createElement("a", {href: "#", onClick: this.showPDF}, " --- (", getTranslation("see_snapshot"), ")")
        );
    }
});

var ProductResultElement = React.createClass({displayName: "ProductResultElement",
    render: function () {
        var detailsPageUri = context + "/details?entityType=product" + "&eUri=" + this.props.uri + "&uid=" + this.props.uid;
        return (
            React.createElement("li", {className: "item bt"}, 
                React.createElement("div", {className: "summary row"}, 
                    React.createElement("div", {className: "thumbnail-wrapper col-md-2"}, 
                        React.createElement("div", {className: "thumbnail"}, 
                            React.createElement("img", {src: this.props.img, height: "60px", width: "75px"})
                        )
                    ), 
                    React.createElement("div", {className: "summary-main-wrapper col-md-8"}, 
                        React.createElement("div", {className: "summary-main"}, 
                            React.createElement("a", {href: detailsPageUri, target: "_blank"}, 
                            React.createElement("h2", {className: "title"}, 
                                this.props.title
                            )
                            ), 
                            React.createElement("div", {className: "subtitle"}, 
                                 this.props.location !== undefined ?
                                    React.createElement("p", null, getTranslation("location"), ": ", this.props.location) : null, 
                                 this.props.country !== undefined ?
                                    React.createElement("p", null, getTranslation("country"), ": ", this.props.country) : null, 
                                 this.props.price !== undefined ?
                                    React.createElement("p", null, getTranslation("price"), ": ", this.props.price) : null, 
                                 this.props.condition !== undefined ?
                                    React.createElement("p", null, getTranslation("condition"), ": ", this.props.condition) : null, 
                                 this.props.webpage !== undefined ?
                                    React.createElement("p", null, React.createElement("b", null, getTranslation("link"), ": "), React.createElement("a", {href: this.props.webpage, 
                                                                           target: "_blank"}, this.props.webpage), React.createElement(SnapshotLink, {
                                        webpage: this.props.webpage})) : null
                            )
                        )
                    ), 
                    React.createElement("div", {class: "thumbnail-wrapper col-md-1"}, 
                        React.createElement("div", {className: "thumbnail"}, 
                            React.createElement(LinkResultsButton, {data: this.props, onAddLink: this.props.onAddLink})
                        ), 
                        React.createElement("div", {className: "thumbnail"}, 
                            React.createElement(FavouritesButton, {data: this.props.uri, onFavourite: this.props.onFavourite})
                        ), 
                        React.createElement("div", {class: "thumbnail"}, 
                            React.createElement("img", {src: context + "/assets/images/datasources/" + this.props.source + ".png", 
                                 alt: "Information from " + this.props.source, height: "45", width: "45", 
                                 title: this.props.source})
                        )
                        /*<Graph id={"graph"+this.props.id} entity={this.props.jsonResult}/>*/
                    )
                )
            )
        );
    }
});

var PersonResultElement = React.createClass({displayName: "PersonResultElement",
    render: function () {
        var detailsPageUri = context + "/details?entityType=person" + "&eUri=" + this.props.uri + "&uid=" + this.props.uid;
        var screenShotElement = (this.props.source !== "Facebook" ? React.createElement(SnapshotLink, {webpage: this.props.webpage}) : null);
        return (
            React.createElement("li", {className: "item bt"}, 
                React.createElement("div", {className: "summary row"}, 
                    React.createElement("div", {className: "thumbnail-wrapper col-md-2"}, 
                        React.createElement("div", {className: "thumbnail"}, 
                             this.props.img !== undefined ? React.createElement("img", {src: this.props.img, height: "60px", width: "75px"}) :
                                React.createElement("img", {src: context + "/assets/images/datasources/Unknown.png", height: "60px", 
                                     width: "75px"})
                        )
                    ), 
                    React.createElement("div", {className: "summary-main-wrapper col-md-8"}, 
                        React.createElement("div", {className: "summary-main"}, 
                            React.createElement("a", {href: detailsPageUri, target: "_blank"}, 
                            React.createElement("h2", {className: "title"}, 
                                this.props.name
                            )
                            ), 
                            React.createElement("div", {className: "subtitle"}, 
                                 this.props.alias !== undefined ?
                                    React.createElement("p", null, getTranslation("nick"), ": ", this.props.alias) : null, 
                                 this.props.location !== undefined ?
                                    React.createElement("p", null, getTranslation("location"), ": ", this.props.location) : null, 
                                 this.props.gender !== undefined ?
                                    React.createElement("p", null, getTranslation("gender"), ": ", this.props.gender) : null, 
                                 this.props.occupation !== undefined ?
                                    React.createElement("p", null, getTranslation("occupation"), ": ", this.props.occupation) : null, 
                                 this.props.birthday !== undefined ?
                                    React.createElement("p", null, getTranslation("birthday"), ": ", this.props.birthday) : null, 
                                 this.props.country !== undefined ?
                                    React.createElement("p", null, getTranslation("country"), ": ", this.props.country) : null, 
                                 this.props.label !== undefined ? React.createElement("p", null, this.props.label) : null, 
                                 this.props.comment !== undefined ? React.createElement("p", null, this.props.comment) : null, 
                                 this.props.webpage !== undefined ?
                                    React.createElement("p", null, React.createElement("b", null, getTranslation("link"), ": "), 
                                        React.createElement("a", {href: this.props.webpage, target: "_blank"}, this.props.webpage), 
                                        screenShotElement)
                                    : null, 
                                 this.props.active_email !== undefined ?
                                    React.createElement("p", null, React.createElement("b", null, getTranslation("active_email"), ":"), " ", this.props.active_email) : null, 
                                 this.props.wants !== undefined ?
                                    React.createElement("p", null, React.createElement("b", null, getTranslation("wants"), ":"), " ", this.props.wants) : null, 
                                 this.props.haves !== undefined ?
                                    React.createElement("p", null, React.createElement("b", null, getTranslation("haves"), ":"), " ", this.props.haves) : null, 
                                 this.props.top_haves !== undefined && this.props.top_haves !== "null" ?
                                    React.createElement("p", null, React.createElement("b", null, getTranslation("top_haves"), ":"), " ", this.props.top_haves) : null, 
                                 this.props.interests !== undefined ?
                                    React.createElement("p", null, React.createElement("b", null, getTranslation("interests"), ":"), " ", this.props.interests) : null
                            )
                        )
                    ), 
                    React.createElement("div", {class: "thumbnail-wrapper col-md-1"}, 
                        React.createElement("div", {className: "thumbnail"}, 
                            React.createElement(LinkResultsButton, {data: this.props, onAddLink: this.props.onAddLink})
                        ), 
                        React.createElement("div", {className: "thumbnail"}, 
                            React.createElement(FavouritesButton, {data: this.props.uri, onFavourite: this.props.onFavourite})
                        ), 
                        React.createElement("div", {className: "thumbnail"}, 
                            React.createElement("img", {src: context + "/assets/images/datasources/" + this.props.source + ".png", 
                                 alt: "Information from " + this.props.source, height: "45", width: "45", 
                                 title: this.props.source})
                        )
                        /*<Graph id={"graph"+this.props.id} entity={this.props.jsonResult}/>*/
                    )
                )
            )
        );
    }
});

var OrganizationResultElement = React.createClass({displayName: "OrganizationResultElement",
    render: function () {
        var detailsPageUri = context + "/details?entityType=organization" + "&eUri=" + this.props.uri + "&uid=" + this.props.uid;

        return (
            React.createElement("li", {className: "item bt"}, 
                React.createElement("div", {className: "summary row"}, 
                    React.createElement("div", {className: "thumbnail-wrapper col-md-2"}, 
                        React.createElement("div", {className: "thumbnail"}, 
                             this.props.img !== undefined ? React.createElement("img", {src: this.props.img, height: "60px", width: "75px"}):
                                React.createElement("img", {src: context + "/assets/images/datasources/Unknown_Thing.jpg", height: "60px", width: "75px"})
                        )
                    ), 
                    React.createElement("div", {className: "summary-main-wrapper col-md-8"}, 
                        React.createElement("div", {className: "summary-main"}, 
                            React.createElement("a", {href: detailsPageUri, target: "_blank"}, 
                            React.createElement("h2", {className: "title"}, 
                                this.props.title
                            )
                            ), 
                            React.createElement("div", {className: "subtitle"}, 
                                 this.props.label !== undefined ? React.createElement("p", null, this.props.label) : null, 
                                 this.props.comment !== undefined ? React.createElement("p", null, this.props.comment) : null, 
                                 this.props.country !== undefined ?
                                    React.createElement("p", null, getTranslation("country"), ": ", this.props.country) : null, 
                                 this.props.location !== undefined ?
                                    React.createElement("p", null, getTranslation("location"), ": ", this.props.location) : null, 
                                 this.props.webpage !== undefined ?
                                    React.createElement("p", null, React.createElement("b", null, getTranslation("link"), ": "), React.createElement("a", {href: this.props.webpage, 
                                                                           target: "_blank"}, this.props.webpage), React.createElement(SnapshotLink, {
                                        webpage: this.props.webpage})) : null
                            )
                        )
                    ), 
                    React.createElement("div", {class: "thumbnail-wrapper col-md-1"}, 
                        React.createElement("div", {className: "thumbnail"}, 
                            React.createElement(LinkResultsButton, {data: this.props, onAddLink: this.props.onAddLink})
                        ), 
                        React.createElement("div", {className: "thumbnail"}, 
                            React.createElement(FavouritesButton, {data: this.props.uri, onFavourite: this.props.onFavourite})
                        ), 
                        React.createElement("div", {class: "thumbnail"}, 
                            React.createElement("img", {src: context + "/assets/images/datasources/" + this.props.source + ".png", 
                                 alt: "Information from " + this.props.source, height: "45", width: "45", 
                                 title: this.props.source})
                        )
                        /*<Graph id={"graph"+this.props.id} entity={this.props.jsonResult}/>*/
                    )
                )
            )
        );
    }
});

var ElasticSearchResultElement = React.createClass({displayName: "ElasticSearchResultElement",
    onClickLink : function(url,e){
        e.preventDefault();
        if(navigator.appCodeName == "Mozilla") //"Mozilla" is the application code name for both Chrome, Firefox, IE, Safari, and Opera.
            url = url.replace(".onion",".onion.to");
        window.open(url,'_blank');
    },
    render: function () {
        return (
            React.createElement("li", {className: "item bt"}, 
                React.createElement("div", {className: "summary row"}, 
                    React.createElement("div", {className: "thumbnail-wrapper col-md-2"}, 
                        React.createElement("div", {className: "thumbnail"}, 
                             this.props.img !== undefined ? React.createElement("img", {src: this.props.img, height: "60px", width: "75px"}):
                                React.createElement("img", {src: context + "/assets/images/datasources/Unknown_Thing.jpg", height: "60px", width: "75px"})
                        )
                    ), 
                    React.createElement("div", {className: "summary-main-wrapper col-md-8"}, 
                        React.createElement("div", {className: "summary-main"}, 
                            React.createElement("h2", {className: "title"}, 
                                this.props.label
                            ), 
                            React.createElement("div", {className: "subtitle"}, 
                                 this.props.onion_url !== undefined ?
                                    React.createElement("p", null, React.createElement("b", null, getTranslation("link"), ": "), React.createElement("a", {href: this.props.onion_url, 
                                                                           onClick: this.onClickLink.bind(this,this.props.onion_url)}, this.props.onion_url), React.createElement(SnapshotLink, {
                                        webpage: this.props.onion_url.replace(".onion",".onion.to")})) : null, 
                                 this.props.content !== undefined ?
                                    React.createElement("p", null, React.createElement("b", null, "Content: "), React.createElement(RichText, {label: "Content", text: this.props.content, maxLength: 300})) : null, 
                                 this.props.entity_url !== undefined ?
                                    React.createElement("p", null, React.createElement("b", null, "Entity URL: "), this.props.entity_url) : null, 
                                 this.props.entity_dbpedia !== undefined ?
                                    React.createElement("p", null, React.createElement("b", null, "Entity DBPedia: "), this.props.entity_dbpedia) : null, 
                                 this.props.entity_type !== undefined ?
                                    React.createElement("p", null, React.createElement("b", null, "Entity type: "), this.props.entity_type) : null, 
                                 this.props.entity_name !== undefined ?
                                    React.createElement("p", null, React.createElement("b", null, "Entity name: "), this.props.entity_name) : null
                            )
                        )
                    ), 
                    React.createElement("div", {class: "thumbnail-wrapper col-md-1"}, 
                        React.createElement("div", {className: "thumbnail"}, 
                            React.createElement(LinkResultsButton, {data: this.props, onAddLink: this.props.onAddLink})
                        ), 
                        React.createElement("div", {className: "thumbnail"}, 
                            React.createElement(FavouritesButton, {data: this.props.uri, onFavourite: this.props.onFavourite})
                        ), 
                        React.createElement("div", {class: "thumbnail"}, 
                            React.createElement("img", {src: context + "/assets/images/datasources/Elasticsearch.png", 
                                 alt: "Information from " + this.props.source, height: "45", width: "45", 
                                 title: "Elasticsearch"})
                        )
                    )
                )
            )
        );
    }
});

var DocumentResultElement = React.createClass({displayName: "DocumentResultElement",
    render: function () {
        return (
            React.createElement("li", {className: "item bt"}, 
                React.createElement("div", {className: "summary row"}, 
                    React.createElement("div", {className: "thumbnail-wrapper col-md-2"}, 
                        React.createElement("div", {className: "thumbnail"}, 
                             this.props.extension !== undefined ? React.createElement("img", {src: context + "/assets/images/icons/" + this.props.extension + ".png", height: "60px", width: "75px"}):
                                React.createElement("img", {src: context + "/assets/images/datasources/Unknown_Thing.jpg", height: "60px", width: "75px"})
                        )
                    ), 
                    React.createElement("div", {className: "summary-main-wrapper col-md-8"}, 
                        React.createElement("div", {className: "summary-main"}, 
                            React.createElement("h2", {className: "title"}, 
                                this.props.label
                            ), 
                            React.createElement("div", {className: "subtitle"}, 
                                 this.props.comment !== undefined ? React.createElement("p", null, this.props.comment) : null, 
                                 this.props.country !== undefined ?
                                    React.createElement("p", null, getTranslation("country"), ": ", this.props.country) : null, 
                                 this.props.language !== undefined ?
                                    React.createElement("p", null, getTranslation("language"), ": ", this.props.language) : null, 
                                 this.props.filename !== undefined ?
                                    React.createElement("p", null, getTranslation("filename"), ": ", this.props.filename) : null, 
                                 this.props.webpage !== undefined ?
                                    React.createElement("p", null, React.createElement("b", null, getTranslation("link"), ": "), React.createElement("a", {href: this.props.webpage, 
                                                                           target: "_blank"}, this.props.webpage), React.createElement(SnapshotLink, {
                                        webpage: this.props.webpage})) : null
                            )
                        )
                    ), 
                    React.createElement("div", {class: "thumbnail-wrapper col-md-1"}, 
                        React.createElement("div", {className: "thumbnail"}, 
                            React.createElement(LinkResultsButton, {data: this.props, onAddLink: this.props.onAddLink})
                        ), 
                        React.createElement("div", {className: "thumbnail"}, 
                            React.createElement(FavouritesButton, {data: this.props.uri, onFavourite: this.props.onFavourite})
                        ), 
                        React.createElement("div", {class: "thumbnail"}, 
                            React.createElement("img", {src: context + "/assets/images/datasources/" + this.props.source + ".png", 
                                 alt: "Information from " + this.props.source, height: "45", width: "45", 
                                 title: this.props.source})
                        )
                    )
                )
            )
        );
    }
});

var FavouritesButton = React.createClass({displayName: "FavouritesButton",
   getInitialState: function () {
       return({style: "favorite link-button"})
   },
   handleClick: function (e){
        let style = this.state.style;
        if(style.includes("favorited")){
            style = "favorite link-button"
        }
        else{
            style += " favorited"
        }
        this.setState({style: style});
        this.props.onFavourite(this.props.data);
   },
   render: function (){
       return(
           React.createElement("button", {className: this.state.style, title: "Favourite", onClick: this.handleClick})
       )
   }
});

var SearchMetadataInfo = React.createClass({displayName: "SearchMetadataInfo",
    loadSearchMetadata: function () {
        var searchUrl = context + "/engine/api/searches/" + this.props.searchUid + "/metadata";
        var messageBuilder = "";
        if (!this.state.isDataLoad) {
            $.ajax({
                url: searchUrl,
                dataType: 'json',
                cache: false,
                success: function (data) {
                    if (data["@graph"] === undefined && data["fs:wrapperLabel"] !== undefined)
                        data = JSON.parse("{ \"@graph\": [" + JSON.stringify(data) + "]}");

                    if(data["@graph"] !== undefined) {
                        data["@graph"].map(function (result) {
                            if (result["rdfs:label"] === "200") {
                                messageBuilder = messageBuilder + result["fs:wrapperLabel"] + getTranslation("search_ok");
                            }
                            else {
                                messageBuilder = messageBuilder + result["fs:wrapperLabel"] + getTranslation("search_error");
                            }
                        });
                    }

                    messageBuilder = messageBuilder.replace("ebay", "eBay");
                    messageBuilder = messageBuilder.replace("elasticsearch", "Crawled Onion websites");
                    messageBuilder = messageBuilder.replace("facebook", "Facebook");
                    messageBuilder = messageBuilder.replace("gkb", "Google Knowledge Graph");
                    messageBuilder = messageBuilder.replace("gplus", "Google+");
                    messageBuilder = messageBuilder.replace("linkedleaks", "Linked Leaks");
                    messageBuilder = messageBuilder.replace("occrp", "OCCRP");
                    messageBuilder = messageBuilder.replace("tor2web", "Onion websites");
                    messageBuilder = messageBuilder.replace("twitter", "Twitter");
                    messageBuilder = messageBuilder.replace("xing", "Xing");
                    messageBuilder = messageBuilder.replace(",", ", ");

                    this.setState({isDataLoad: true, message: messageBuilder});

                }.bind(this)
            });
        }
    },
    componentDidMount: function () {
        this.loadSearchMetadata();
    },
    getInitialState: function() {
        return { isDataLoad: false, message: "" };
    },
    render: function () {
        return (
            React.createElement(ContextualHelp, {type: "contextual-help info", message: this.state.message})
        );
    }
});

var LoadingResults = React.createClass({displayName: "LoadingResults",
    render: function () {
        return (
            React.createElement("div", {className: "row"}, 
                React.createElement("div", {className: "col-md-12 text-center"}, 
                    React.createElement("div", {id: "cancel_loading_btn", className: "cancel-loading"}, 
                        getTranslation("searching_too_long"), React.createElement("button", null, getTranslation("cancel_search_btn"))
                    ), 
                    React.createElement("div", null, 
                    React.createElement("img", {className: "img-responsive center-block", src: context + "/assets/images/ajaxLoading.gif", 
                         alt: "Loading results"}), 
                    React.createElement("h2", null, React.createElement("img", {src: context + "/assets/images/ajaxLoader.gif"}), getTranslation("bittewarten"))
                    )
                )
            )
        );
    }
});

var LinkResults = React.createClass({displayName: "LinkResults",
    getInitialState: function(){
      return {link: null}
    },
    getThumbnail(data){
      if(data.img)
          return data.img;
      if(data.extension){
          return context + "/assets/images/icons/" + data.extension + ".png"
      }
      if(data.name){
          return context + "/assets/images/datasources/Unknown.png";
      }
      return context + "/assets/images/datasources/Unknown_Thing.jpg";
    },
    getStyle: function(data){
        let style = {
            span1 : "compare-default-pic",
            span2 : "compare-default",
            img :   "compare-img off",
            src: "",
            title: "",
            titleStyle: "compare-title truncate off",
            cancel :"comparison-cancel-button off"
        };
        if(data){
            style.span1 += " off";
            style.span2 += " off";
            style.img = "compare-img";
            style.src = this.getThumbnail(data);
            style.title = data.name || data.title || data.label || data.onion_url;
            style.titleStyle = "compare-title truncate";
            style.cancel = "comparison-cancel-button";
        }
        return style;
    },
    cancelLink: function(event){
      let index = event.target.dataset.index;
      this.props.onLinkCancel(false, index);

    },
    render: function () {
        let data = this.props.data;
        let style1 = this.getStyle(data[1]);
        let style2 = this.getStyle(data[2]);
        let buttonStyle = data[1] && data[2] ? "button" : "button disabled";
        return(
            React.createElement("div", {className: "compare-objects bt br bb bl"}, 
                React.createElement("div", {className: "compare-header"}, 
                    React.createElement("b", null, "Merge Results"), 
                    React.createElement("span", {className: "contextual-help hidden-phone hidden-tablet", "data-content": "To merge results, please select two results by clicking on the appropriate icon in the results list."}
  ), 

                    React.createElement("div", {className: "tooltip hasArrow", style: {display: 'none'}}, "To merge results, please select two results by clicking on the appropriate icon in the results list.", React.createElement("div", {className: "arrow"}))
                ), 
                React.createElement("div", {className: "compare-main"}, 
                    React.createElement("div", {id: "compare-object1", className: "compare-object bt br bb bl"}, 
                        React.createElement("div", {className: "compare-table"}, 
                            React.createElement("span", {className: style1.span1}), 
                            React.createElement("span", {className: style1.span2}, "First result"), 
                            React.createElement("a", {className: "compare-link"}, 
                                React.createElement("span", {className: "compare-text off"}), 
                                React.createElement("img", {className: style1.img, title: style1.title, alt: style1.title, src: style1.src})
                            ), 
                            React.createElement("span", {className: style1.titleStyle}, style1.title), 
                            React.createElement("span", {"data-index": "1", className: style1.cancel, onClick: this.cancelLink})
                        )
                    ), 
                    React.createElement("div", {id: "compare-object2", className: "compare-object bt br bb bl"}, 
                        React.createElement("div", {className: "compare-table"}, 
                            React.createElement("span", {className: style2.span1}), 
                            React.createElement("span", {className: style2.span2}, "Second result"), 
                            React.createElement("a", {className: "compare-link"}, 
                                React.createElement("span", {className: "compare-text off"}), 
                                React.createElement("img", {className: style2.img, title: style2.title, alt: style2.title, src: style2.src})
                            ), 
                            React.createElement("span", {className: style2.titleStyle}, style2.title), 
                            React.createElement("span", {"data-index": "2", className: style2.cancel, onClick: this.cancelLink})
                        )
                    )
                ), 
                React.createElement("div", {className: "compare-footer bt bb bl br"}, 
                    React.createElement("a", {id: "compare-button"}, 
                        React.createElement("div", {className: buttonStyle, onClick: this.props.merge}, 
                            "Merge Results"
                        )
                    )
                )
            )
        );
    }
});

var LinkResultsButton = React.createClass({displayName: "LinkResultsButton",
    getInitialState: function(){
      return({style: "compare-button link-button"})
    },
    handleClick: function (e) {
        let state  = this.props.onAddLink(this.props.data);
        let style = this.state.style;
        style = style.includes("compared") ? "compare-button link-button" : style + " compared";
        this.setState({style: style});
        e.preventDefault();
    },
    render: function(){
        return (
            React.createElement("button", {className: this.state.style, title: "Merge Result", onClick: this.handleClick})
        )
    }
});

React.render(React.createElement(ContainerResults, {url: context + "/keyword", pollInterval: 200000}), document.getElementById('skeleton'));

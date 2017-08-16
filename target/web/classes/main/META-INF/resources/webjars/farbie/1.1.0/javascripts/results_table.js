/**
 * Created by Ahmed on 9/24/2016.
 */
var ResultsTable = React.createClass({displayName: "ResultsTable",
    OnCheckBoxChange : function (id) {
        var index = this.state.checkedRows.indexOf(id)
        if(index > -1) {
            this.state.checkedRows.splice(index, 1)
        }else{
            this.state.checkedRows.push(id)
        }

        this.props.checksListener(this.state.checkedRows)

        var checkBox = document.getElementById("check"+ id);
        var currentRow = checkBox.parentNode.parentNode;
        if(checkBox.checked)
            currentRow.setAttribute("class","info");
        else{
            currentRow.removeAttribute("class");
			$("#selectall").prop("checked",false);
		}
    },
    getInitialState : function () {
      return {dialogID : "model_comment", checkedRows:[]};
    },
    render: function () {
        var resultsNodesSorted = this.props.data; //.sort(compareRank)
        //var resultsNodesSorted = this.props.data["@graph"].sort(compareRank);
        var resultsNodes = resultsNodesSorted.map(function (result,i) {
            var checkBoxHandle = this.OnCheckBoxChange.bind(this,i);
			if (result["@type"] === "foaf:Person") {
                return (
                    React.createElement(PersonResultRow, {
                        id: i, 
                        img: result.image, 
                        name: result["fs:title"], 
                        source: result["fs:source"] === "ELASTIC" ? "Elasticsearch" : result["fs:source"], 
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
                        liveInName: result["fs:placeLived"], 
                        workedAtName: result["fs:workedAt"], 
                        studyAtName: result["fs:studiedAt"], 
                        OnCheckBoxChangeHandle: checkBoxHandle
                    }
                    )
                );
             } else if (result["@type"] === "foaf:Organization") {
                return (
                    React.createElement(OrganizationResultRow, {
                        id: i, 
                        img: result.image, 
                        name: result["fs:title"], 
                        source: result["fs:source"] === "ELASTIC" ? "Elasticsearch" : result["fs:source"], 
                        label: result["fs:label"], 
                        comment: result["fs:comment"], 
                        country: result["fs:country"], 
                        location: result["fs:location"], 
                        webpage: result.url, 
                        OnCheckBoxChangeHandle: checkBoxHandle}
                    )
                );
            }
            else if (result["@type"] === "gr:ProductOrService") {
                return (
                    React.createElement(ProductResultRow, {
                        id: i, 
                        img: result.image, 
                        description: result["fs:title"], 
                        source: result["fs:source"] === "ELASTIC" ? "Elasticsearch" : result["fs:source"], 
                        location: result["fs:location"], 
                        country: result["fs:country"], 
                        price: result["fs:priceLabel"], 
                        condition: result["fs:condition"], 
                        webpage: result.url, 
                        OnCheckBoxChangeHandle: checkBoxHandle}
                    )
                );
            }
            else if (result["@type"] === "foaf:Document") {
                 return (
                        React.createElement(WebResultRow, {
                            id: i, 
                            img: context+"/assets/images/datasources/"+ (result["fs:source"] === "ELASTIC" ? "Elasticsearch.png": "TorLogo.png"), 
                            webpage: result.url, 
                            label: result["fs:title"], 
                            title: result["fs:title"], 
                            comment: result["fs:excerpt"], 
                            source: result["fs:source"] === "ELASTIC" ? "Elasticsearch" : result["fs:source"], 
                            content: result["fs:content"], 
                            entity_type: result["fs:entity_type"], 
                            entity_name: result["fs:entity_name"], 
                            OnCheckBoxChangeHandle: checkBoxHandle}
                        )
                    );
            } else if (result["@type"] === "fs:Document") {
                 return (
                     React.createElement(DocumentResultRow, {
                         id: i, 
                         label: result["fs:label"], 
                         comment: result["fs:comment"], 
                         webpage: result.url, 
                         country: result["fs:country"], 
                         language: result["fs:language"], 
                         filename: result["fs:file_name"], 
                         extension: result["fs:extension"], 
                         source: result["fs:source"] === "ELASTIC" ? "Elasticsearch" : result["fs:source"], 
                         OnCheckBoxChangeHandle: checkBoxHandle}
                     )
                 );
             }
        },this);

        return (
            React.createElement("div", {className: "table-responsive results-table"}, 
                React.createElement("table", {className: "table table-bordered table-hover"}, 
                    React.createElement("thead", null, 
                    React.createElement(TableHeader, {type: this.props.type})
                    ), 
                    React.createElement("tbody", null, 
                    resultsNodes
                    )
                )
            )
        );
    }
});
var TableHeader = React.createClass({displayName: "TableHeader",
    OnClickCheckBox: function(){
        $(".checkBoxClass").each(function(idx) {
			if( $("#check" + idx).prop("checked") !== $("#selectall").prop("checked"))
				$("#check" + idx).click();
		})
    },
    render: function () {

        if (this.props.type == "person")
        {
            return (

                React.createElement("tr", null, 
                    React.createElement("th", null, 
                        React.createElement("input", {type: "checkbox", id: "selectall", onClick: this.OnClickCheckBox})
                    ), 
                    React.createElement("th", null), 
                    React.createElement("th", null, "Name"), 
                    React.createElement("th", null, getTranslation("link")), 
                    React.createElement("th", null, getTranslation("source")), 
                    React.createElement("th", null, getTranslation("nick")), 
                    React.createElement("th", null, getTranslation("location")), 
                    React.createElement("th", null, "Label"), 
                    React.createElement("th", null, "Comment"), 
                    React.createElement("th", null, getTranslation("gender")), 
                    React.createElement("th", null, getTranslation("occupation")), 
                    React.createElement("th", null, getTranslation("birthday")), 
                    React.createElement("th", null, getTranslation("country")), 
                    React.createElement("th", null, getTranslation("active_email")), 
                    React.createElement("th", null, getTranslation("liveIn")), 
                    React.createElement("th", null, getTranslation("workAt")), 
                    React.createElement("th", null, getTranslation("studyAt"))
                )

            );
        }
        else if(this.props.type == "product")
        {
            return(
                React.createElement("tr", null, 
                    React.createElement("th", null, 
                        React.createElement("input", {type: "checkbox", id: "selectall", onClick: this.OnClickCheckBox})
                    ), 
                    React.createElement("th", null), 
                    React.createElement("th", null, "Description"), 
                    React.createElement("th", null, getTranslation("link")), 
                    React.createElement("th", null, getTranslation("source")), 
                    React.createElement("th", null, getTranslation("location")), 
                    React.createElement("th", null, getTranslation("country")), 
                    React.createElement("th", null, getTranslation("price")), 
                    React.createElement("th", null, getTranslation("condition"))
                )
            );
        }
        else if(this.props.type == "organization")
        {
            return(
                React.createElement("tr", null, 
                    React.createElement("th", null, 
                        React.createElement("input", {type: "checkbox", id: "selectall", onClick: this.OnClickCheckBox})
                    ), 
                    React.createElement("th", null), 
                    React.createElement("th", null, "Name"), 
                    React.createElement("th", null, getTranslation("link")), 
                    React.createElement("th", null, getTranslation("source")), 
                    React.createElement("th", null, "Label"), 
                    React.createElement("th", null, "Comment"), 
                    React.createElement("th", null, getTranslation("country")), 
                    React.createElement("th", null, getTranslation("location"))
                )
            );
        }
        else if(this.props.type == "website")
        {
            return(
                React.createElement("tr", null, 
                    React.createElement("th", null, 
                        React.createElement("input", {type: "checkbox", id: "selectall", onClick: this.OnClickCheckBox})
                    ), 
                    React.createElement("th", null), 
                    React.createElement("th", null, "Label"), 
                    React.createElement("th", null, "Comment"), 
                    React.createElement("th", null, getTranslation("link")), 
                    React.createElement("th", null, getTranslation("source")), 
                    React.createElement("th", null, getTranslation("content")), 
                    React.createElement("th", null, getTranslation("title")), 
                    React.createElement("th", null, "Entity Type"), 
                    React.createElement("th", null, "Entity Name")

                )
            );
        }
        else //document
        {
            return(
                React.createElement("tr", null, 
                    React.createElement("th", null, 
                        React.createElement("input", {type: "checkbox", id: "selectall", onClick: this.OnClickCheckBox})
                    ), 
                    React.createElement("th", null), 
                    React.createElement("th", null, "Label"), 
                    React.createElement("th", null, "Comment"), 
                    React.createElement("th", null, getTranslation("link")), 
                    React.createElement("th", null, getTranslation("source")), 
                    React.createElement("th", null, getTranslation("country")), 
                    React.createElement("th", null, getTranslation("language")), 
                    React.createElement("th", null, getTranslation("filename")), 
                    React.createElement("th", null, "Extension")
                )
            );
        }
    }

});
var PersonResultRow = React.createClass({displayName: "PersonResultRow",


    render: function () {
        return (
        React.createElement("tr", {id: "row"+this.props.id}, 
                React.createElement("td", null, 
                        React.createElement("input", {type: "checkbox", id: "check"+this.props.id, className: "checkBoxClass", onChange: this.props.OnCheckBoxChangeHandle})
                ), 
            React.createElement("td", null, 
                React.createElement("div", {className: "thumbnail"}, 
                 this.props.img !== undefined ? React.createElement("img", {src: this.props.img, height: "60px", width: "75px"}):
                        React.createElement("img", {src: context + "/assets/images/datasources/Unknown.png", height: "60px", width: "75px"})
                )
            ), 

            React.createElement("td", null, this.props.name), 
            React.createElement("td", null,  this.props.webpage !== undefined ? React.createElement("p", null, React.createElement("a", {className: "no-external-link-icon", href: this.props.webpage, 

                                                           target: "_blank"}, 
                React.createElement("img", {src: context + "/assets/images/icons/link_icon_0.png"})
            )
            ) : null), 
            React.createElement("td", null, 
                React.createElement("div", {class: "thumbnail"}, 
                    React.createElement("img", {src: context+"/assets/images/datasources/"+this.props.source+".png", alt: "Information from "+this.props.source, height: "45", width: "45"})
                )
            ), 

            React.createElement("td", null,  this.props.alias !== undefined ? React.createElement("p", null, this.props.alias) : null), 
            React.createElement("td", null,  this.props.location !== undefined ?
                React.createElement("p", null, this.props.location) : null), 
            React.createElement("td", null,  this.props.label !== undefined ? React.createElement("p", null, this.props.label) : null), 
            React.createElement("td", null,  this.props.comment !== undefined ? React.createElement(RichText, {label: "Comment", text: this.props.comment, maxLength: 100}) : null), 
            React.createElement("td", null,  this.props.gender !== undefined ? React.createElement("p", null, this.props.gender) : null), 
            React.createElement("td", null,  this.props.occupation !== undefined ?
                React.createElement("p", null, this.props.occupation) : null), 
            React.createElement("td", null,  this.props.birthday !== undefined ?
                React.createElement("p", null, this.props.birthday) : null), 
            React.createElement("td", null,  this.props.country !== undefined ?
                React.createElement("p", null, this.props.country) : null), 


            React.createElement("td", null,  this.props.active_email !== undefined ?
                React.createElement("p", null, this.props.active_email) : null), 
            React.createElement("td", null,  this.props.liveInName !== undefined ?
                React.createElement("p", null, JSON.stringify(this.props.liveInName).replace(/(\[|\{|\]|\}|")/g,'')) : null), 
            React.createElement("td", null,  this.props.workedAtName !== undefined ?
                React.createElement("p", null, JSON.stringify(this.props.workedAtName).replace(/(\[|\{|\]|\}|")/g,'')) : null), 
            React.createElement("td", null,  this.props.studyAtName !== undefined ?
                React.createElement("p", null, JSON.stringify(this.props.studyAtName).replace(/(\[|\{|\]|\}|")/g,'')) : null)

        )
        );
        }
        });
var ProductResultRow = React.createClass({displayName: "ProductResultRow",
    render: function () {
        return (
            React.createElement("tr", {id: "row"+this.props.id}, 
                React.createElement("td", null, 
                    React.createElement("input", {type: "checkbox", id: "check"+this.props.id, className: "checkBoxClass", onChange: this.props.OnCheckBoxChangeHandle})
                ), 
                React.createElement("td", null, 
                    React.createElement("div", {className: "thumbnail"}, 
                         this.props.img !== undefined ? React.createElement("img", {src: this.props.img, height: "60px", width: "75px"}):
                            React.createElement("img", {src: context + "/assets/images/datasources/Unknown_Thing.jpg", height: "60px", width: "75px"})
                    )
                ), 
                React.createElement("td", null, this.props.description !== undefined ? React.createElement(RichText, {label: "Description", text: this.props.description, maxLength: 100}) : null), 
                React.createElement("td", null,  this.props.webpage !== undefined ? React.createElement("p", null, React.createElement("a", {className: "no-external-link-icon", href: this.props.webpage, 

                                                               target: "_blank"}, 
                    React.createElement("img", {src: context + "/assets/images/icons/link_icon_0.png"})
                )
                ) : null), 
                React.createElement("td", null, 
                    React.createElement("div", {class: "thumbnail"}, 
                        React.createElement("img", {src: context+"/assets/images/datasources/"+this.props.source+".png", alt: "Information from "+this.props.source, height: "45", width: "45"})
                    )
                ), 
                React.createElement("td", null,  this.props.location !== undefined ? React.createElement("p", null, this.props.location) : null), 
                React.createElement("td", null,  this.props.country !== undefined ? React.createElement("p", null, this.props.country) : null), 
                React.createElement("td", null,  this.props.price !== undefined ? React.createElement("p", null, this.props.price) : null), 
                React.createElement("td", null,  this.props.condition !== undefined ? React.createElement("p", null, this.props.condition) : null)
            )
        );
    }
});

var OrganizationResultRow = React.createClass({displayName: "OrganizationResultRow",
    render: function () {
        return (
            React.createElement("tr", {id: "row"+this.props.id}, 
                React.createElement("td", null, 
                    React.createElement("input", {type: "checkbox", id: "check"+this.props.id, className: "checkBoxClass", onChange: this.props.OnCheckBoxChangeHandle})
                ), 
                React.createElement("td", null, 
                    React.createElement("div", {className: "thumbnail"}, 
                         this.props.img !== undefined ? React.createElement("img", {src: this.props.img, height: "60px", width: "75px"}):
                            React.createElement("img", {src: context + "/assets/images/datasources/Unknown_Thing.jpg", height: "60px", width: "75px"})
                    )
                ), 
                React.createElement("td", null, this.props.name), 
                React.createElement("td", null,  this.props.webpage !== undefined ? React.createElement("p", null, React.createElement("a", {className: "no-external-link-icon", href: this.props.webpage, 

                                                               target: "_blank"}, 
                    React.createElement("img", {src: context + "/assets/images/icons/link_icon_0.png"})
                )
                ) : null), 
                React.createElement("td", null, 
                    React.createElement("div", {class: "thumbnail"}, 
                        React.createElement("img", {src: context+"/assets/images/datasources/"+this.props.source+".png", alt: "Information from "+this.props.source, height: "45", width: "45"})
                    )
                ), 
                React.createElement("td", null,  this.props.label !== undefined ? React.createElement("p", null, this.props.label) : null), 
                React.createElement("td", null,  this.props.comment !== undefined ? React.createElement(RichText, {label: "Comment", text: this.props.comment, maxLength: 100}) : null), 
                React.createElement("td", null,  this.props.country !== undefined ? React.createElement("p", null, this.props.country) : null), 
                React.createElement("td", null,  this.props.location !== undefined ? React.createElement("p", null, this.props.location) : null)
            )
        );
    }
});
var WebResultRow = React.createClass({displayName: "WebResultRow",
    onClickLink : function(url,e){
        e.preventDefault();
        if(navigator.appCodeName == "Mozilla") //"Mozilla" is the application code name for both Chrome, Firefox, IE, Safari, and Opera.
            url = url.replace(".onion",".onion.to");
        window.open(url,'_blank');
    },
    render: function () {
        return (
            React.createElement("tr", {id: "row"+this.props.id}, 
                React.createElement("td", null, 
                    React.createElement("input", {type: "checkbox", id: "check"+this.props.id, className: "checkBoxClass", onChange: this.props.OnCheckBoxChangeHandle})
                ), 
                React.createElement("td", null, 
                    React.createElement("div", {className: "thumbnail"}, 
                         this.props.img !== undefined ? React.createElement("img", {src: this.props.img, height: "60px", width: "75px"}):
                            React.createElement("img", {src: context + "/assets/images/datasources/Unknown_Thing.jpg", height: "60px", width: "75px"})
                    )
                ), 
                React.createElement("td", null,  this.props.label !== undefined ? React.createElement("p", null, this.props.label) : null), 
                React.createElement("td", null,  this.props.comment !== undefined ? React.createElement(RichText, {label: "Comment", text: this.props.comment, maxLength: 100}) : null), 
                React.createElement("td", null,  this.props.webpage !== undefined ? React.createElement("p", null, React.createElement("a", {className: "no-external-link-icon", href: this.props.webpage, 

                                                               onClick: this.onClickLink.bind(this,this.props.webpage)}, 
                    React.createElement("img", {src: context + "/assets/images/icons/link_icon_0.png"})
                )
                ) : null), 
                React.createElement("td", null, 
                    React.createElement("div", {class: "thumbnail"}, 
                        React.createElement("img", {src: context+"/assets/images/datasources/"+this.props.source+".png", alt: "Information from "+this.props.source, height: "45", width: "45"})
                    )
                ), 
                React.createElement("td", null,  this.props.content !== undefined ? React.createElement("p", null, this.props.content) : null), 
                React.createElement("td", null,  this.props.title !== undefined ? React.createElement("p", null, this.props.title) : null), 
                React.createElement("td", null,  this.props.entity_type !== undefined ? React.createElement("p", null, JSON.stringify(this.props.entity_type).replace(/(\[|\{|\]|\}|")/g,'')) : null), 
                React.createElement("td", null,  this.props.entity_name !== undefined ? React.createElement("p", null, JSON.stringify(this.props.entity_name).replace(/(\[|\{|\]|\}|")/g,'')) : null)
            )
        );
    }
});
var DocumentResultRow = React.createClass({displayName: "DocumentResultRow",
    render: function () {
        return (
            React.createElement("tr", {id: "row"+this.props.id}, 
                React.createElement("td", null, 
                    React.createElement("input", {type: "checkbox", id: "check"+this.props.id, className: "checkBoxClass", onChange: this.props.OnCheckBoxChangeHandle})
                ), 
                React.createElement("td", null, 
                    React.createElement("div", {className: "thumbnail"}, 
                         this.props.extension !== undefined ? React.createElement("img", {src: context + "/assets/images/icons/" + this.props.extension + ".png", height: "60px", width: "75px"}):
                            React.createElement("img", {src: context + "/assets/images/datasources/Unknown_Thing.jpg", height: "60px", width: "75px"})
                    )
                ), 
                React.createElement("td", null,  this.props.label !== undefined ? React.createElement("p", null, this.props.label) : null), 
                React.createElement("td", null,  this.props.comment !== undefined ? React.createElement("p", null, " ", this.props.comment, " ") : null), 
                React.createElement("td", null,  this.props.webpage !== undefined ? React.createElement("p", null, React.createElement("a", {className: "no-external-link-icon", href: this.props.webpage, 

                                                               target: "_blank"}, 
                    React.createElement("img", {src: context + "/assets/images/icons/link_icon_0.png"})
                )
                ) : null), 
                React.createElement("td", null, 
                    React.createElement("div", {class: "thumbnail"}, 
                        React.createElement("img", {src: context+"/assets/images/datasources/"+this.props.source+".png", alt: "Information from "+this.props.source, height: "45", width: "45"})
                    )
                ), 
                React.createElement("td", null,  this.props.country !== undefined ? React.createElement("p", null, this.props.country) : null), 
                React.createElement("td", null,  this.props.language !== undefined ? React.createElement("p", null, this.props.language) : null), 
                React.createElement("td", null,  this.props.file_name !== undefined ? React.createElement("p", null, this.props.file_name) : null), 
                React.createElement("td", null,  this.props.extension !== undefined ? React.createElement("p", null, this.props.extension) : null)
            )
        );
    }
});

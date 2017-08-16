var ProfileContainer = React.createClass({displayName: "ProfileContainer",
    getInitialState: function () {
        return {data: undefined};
    },
    loadProfileFromServer: function(uid,eUri,eType){
        var url = context + "/engine/api/entitysummarization/" + uid + "/summarize?uri=" + eUri + "&entityType=" + eType;
        $.ajax({
            url: url,
            dataType: 'json',
            cache: false,
            success: function (response) {
                if(response["@context"] !== undefined) {
                    delete response["@context"];
                }
                var data_to_handle = response;
                this.setState({
                   data: data_to_handle
                });
            }.bind(this),
            error: function (xhr, status, err) {
                console.error(this.props.url, status, err.toString());
            }.bind(this)
        });
    },
    componentDidMount: function (){
        this.loadProfileFromServer(this.props.uid,this.props.eUri,this.props.entityType);
    },
    render: function () {
        return (
            React.createElement("div", {className: "container"}, 
                React.createElement("div", {className: "row", id: "header-main-row"}, 
                 React.createElement("div", {id: "profile_container"}, 
                            React.createElement(ProfileHeader, {image: this.state.data !== undefined ? this.state.data["image"] : undefined, name: this.state.data !== undefined ? this.state.data["fs:title"] : undefined}), 
                            React.createElement(ProfileBody, {data: this.state.data})
                    )
                )
            )
        );
    }
});

var ProfileHeader = React.createClass({displayName: "ProfileHeader",
    render: function () {
        return (
            React.createElement("div", {id: "profile_container_top"}, 
                React.createElement("div", {id: "profile_image"}, 
                    React.createElement("img", {className: "thumbnail", src: this.props.image, width: "90", height: "90"})
                ), 
                React.createElement("div", {id: "profile_summary"}, 
                    React.createElement("div", {className: "header"}, 
                        React.createElement("span", {className: "highlight"}, 
                            this.props.name
                        )
                    )
                )
            )
        );
    }
});

var ProfileBody = React.createClass({displayName: "ProfileBody",
    render: function () {
        var profileSections = (this.props.data !== undefined ? Object.keys(this.props.data).map(function(key,index){
            var data_items = this.props.data[key];
            if(!Array.isArray(this.props.data[key]))
                data_items = [this.props.data[key]];
            return(
               React.createElement(ProfileSection, {header: key, data: data_items})
           )
        },this) : undefined);
        return (
            React.createElement("div", {id: "profile_container_middle"}, 
                profileSections
            )
        );
    }
});

var ProfileSection = React.createClass({displayName: "ProfileSection",
    render: function () {
        var data_items = this.props.data.map(function (item) {
            return (React.createElement("li", null, React.createElement("span", null, item), React.createElement("br", null)));
        });
        return (
            React.createElement("div", {className: "row-line"}, 
                React.createElement("div", {className: "field_label"}, 
                    React.createElement("div", {className: "hidden-xs hidden-sm"}, 
                        /*<i className="fa fa-suitcase hidden-sm hidden-xs"/>&nbsp;*/
                        React.createElement("span", null, React.createElement("b", null, this.props.header))
                    )
                ), 
                React.createElement("div", {className: "values"}, 
                    React.createElement("ul", {className: "jobs"}, 
                        data_items
                    )
                 )
                )
        );
    }
});
React.render(
    React.createElement(ProfileContainer, {uid: uid, eUri: eUri, entityType: eType})
    , document.getElementById('skeleton'));
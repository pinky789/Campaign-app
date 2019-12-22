import React, { Component } from "react";
import CampaignTable from "./CampaignTable";

class LiveCampaigns extends Component{
    render(){
        return(
            <>
                { this.props.activeTab === "live" ?<CampaignTable activeTab={this.props.activeTab} data={this.props.data}/> : "No data found!!" }
            </>
        )
    }
}

export default LiveCampaigns;


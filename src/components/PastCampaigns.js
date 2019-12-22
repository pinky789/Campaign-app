import React, { Component } from "react";
import CampaignTable from "./CampaignTable";

class PastCampaigns extends Component{

    render(){
        return(
            <>
                { this.props.activeTab === "past" ?<CampaignTable activeTab={this.props.activeTab} data={this.props.data}/> : "No data found!!" }
            </>
        )
    }
}

export default PastCampaigns;


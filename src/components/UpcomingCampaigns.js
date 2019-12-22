import React, { Component } from "react";
import CampaignTable from "./CampaignTable";

class UpcomingCampaigns extends Component{

    render(){
        return(
            <>
                { this.props.activeTab === "upcoming" ?<CampaignTable activeTab={this.props.activeTab} data={this.props.data}/> : "No data found!!" }
            </>
        )
    }
}

export default UpcomingCampaigns;


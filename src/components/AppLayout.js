import React, { useState, useEffect } from "react";
import {Switch, Route, Redirect, BrowserRouter as Router} from "react-router-dom";
import PageTitle from './PageTitle';
import NavigationBarCampaigns from "./NavigationBarCampaigns";
import UpcomingCampaigns from "./UpcomingCampaigns";
import LiveCampaigns from "./LiveCampaigns";
import PastCampaigns from "./PastCampaigns";
import NotFound from "./NotFound";

function AppLayout(){

    const [data, setData] = useState([]);

    useEffect(() => {
        const myHeaders = new Headers({
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
            "Accept": "application/json",
            "Access-Control-Allow-Methods": 'HEAD, GET, POST, PUT, PATCH, DELETE'
        });

        fetch("http://localhost:3001/data", {
            headers: myHeaders,

        })
            .then(response => {
                console.log(response);
                return response.json();
            })
            .then(data => {
                console.log(data);
                setData(data);
            });
    }, []);

        return (
            <Router>
                <div className='app-body container'>
                    <PageTitle />
                    <NavigationBarCampaigns/>
                    <hr/>
                    <Switch>
                        <Route exact path='/' component={() => <UpcomingCampaigns activeTab="upcoming" data={data}/>}>
                            <Redirect from="/" to="/campaigns/upcoming-campaigns" />
                            </Route>
                        <Route path='/campaigns/upcoming-campaigns' component={() => <UpcomingCampaigns activeTab="upcoming" data={data} />}/>
                        <Route path='/campaigns/live-campaigns' component={() => <LiveCampaigns activeTab="live" data={data}/>}/>
                        <Route path='/campaigns/past-campaigns' component={() => <PastCampaigns activeTab="past" data={data}/>}/>
                        <Route component={NotFound} />
                    </Switch>
                </div>
            </Router>
        )
}

export default AppLayout;

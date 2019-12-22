import React, { Component } from "react";
import { Table, Button, Modal } from "react-bootstrap";
import CurrencyFormat from "react-currency-format";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "../css/campaign-table.scss";
import popup_icon from "../images/popup/icon.png";
import {
    calendar,
    file,
    priceImg,
    statistics,
    icon
} from "../images/Row/index";

class CampaignTable extends Component{

    defaultState = {data : [],
        currentData : [], showModal : false};

    constructor(props){
        super(props);
        this.state = {data : this.props.data,
            currentData : []};

        this.handleDateChange = this.handleDateChange.bind(this);

    }

    setModal = (bool) =>{
        this.setState({showModal : bool});
    }

    componentWillMount() {
        this.getFilteredData();
    }
    find_date_status = (date1, date2) =>{
        let newDate1 = new Date(date1);
        let newDate2 = new Date(date2);

        return Math.sign(
            (Date.UTC(newDate2.getFullYear(), newDate2.getMonth(), newDate2.getDate()) -
                Date.UTC(newDate1.getFullYear(), newDate1.getMonth(), newDate1.getDate()))
        );
    };
    getActiveTabValue = () =>{
        let activeTabStatus;
        if(this.props.activeTab === "upcoming"){
            activeTabStatus = 1;
        }else if(this.props.activeTab === "past"){
            activeTabStatus = -1;
        }else{
            activeTabStatus = 0;
        }
        return activeTabStatus;
    };

    setFilteredData = () => {
        var activeTabStatus = this.getActiveTabValue();
        this.state.data.map((campaignData, index) => {
            let dateStatus = this.find_date_status(
                new Date().toLocaleDateString(),
                new Date(campaignData.date).toLocaleDateString()
            );

            if(dateStatus === activeTabStatus){
                this.setState(state => {
                    const currentData = state.currentData.concat(campaignData);

                    return{
                        currentData
                    };
                });
            };
        });
    };

    getFilteredData = () => {
        this.setState({currentData : this.defaultState.currentData}, function(){
            return this.setFilteredData();
        });

    };


    find_diff_date_indays = (date1, date2) =>{
        let newDate1 = new Date(date1);
        let newDate2 = new Date(date2);

        return Math.floor(
            (Date.UTC(newDate2.getFullYear(), newDate2.getMonth(), newDate2.getDate()) -
             Date.UTC(newDate1.getFullYear(), newDate1.getMonth(), newDate1.getDate())) /
            ( 1000 * 3600 * 24)
        );
    };

    handleDateChange = (name, date, e) => {
        console.log(date);
        let newDate=date;

        this.state.data.map((campaignData, index) => {
            if(campaignData.name === name){
                campaignData.date = newDate.valueOf();
            }
        });
        this.getFilteredData();
    };

    render(){
        if(this.state.currentData.length === 0){
            return <h1>No Campaigns data found!!</h1>
        }else{
            return(
                <div className="table-container">
                    <Table responsive>
                        <thead className="table-header">
                        <tr>
                            <th>DATE</th>
                            <th>CAMPAIGN</th>
                            <th>VIEW</th>
                            <th>ACTIONS</th>
                        </tr>
                        </thead>
                        <tbody>
                        {this.state.currentData.map((campaignData, index) => {
                            this.prices = campaignData.price;
                            this.campaignName = campaignData.name;
                            this.region = campaignData.region;
                            return (
                                <tr key = {index}>
                                    <td>
                                        <p>{new Date(campaignData.date).toDateString()}</p>
                                        <p className="date-text">
                                            {this.find_diff_date_indays(
                                                new Date().toLocaleDateString(),
                                                new Date(campaignData.date).toLocaleDateString()
                                            )}{" "} days Ahead
                                        </p>
                                    </td>
                                    <td>
                                        <div className="campaign-details">
                                            <img id="icon" src={icon} alt="icon" />
                                            &nbsp;
                                            <div>
                                                <p>{campaignData.name}</p>
                                                <p className="country-text">{campaignData.region}</p>
                                            </div>
                                        </div>
                                    </td>
                                    <td>
                                        <div className="pricing">
                                            <img src={priceImg} alt="priceImg" />
                                            <Button variant = "link" onClick={() => this.setModal(true)}> View Pricing </Button>
                                        </div>
                                    </td>
                                    <td>
                                        <div className="action-items">
                                        <span>
                                            <img src={file} alt="file" />
                                            &nbsp; CSV
                                        </span>
                                            <span>
                                            <img src={statistics} alt="statistics" />
                                                &nbsp; Report
                                        </span>
                                            <span className="calendar">
                                            <label onClick={e => this.calendar.state.open && e.preventDefault()}>
                                            <DatePicker
                                                ref={(r) => this.calendar = r}
                                                className="date-picker"
                                                selected={new Date(campaignData.date)}
                                                onChange={this.handleDateChange.bind(this, campaignData.name)}
                                            />
                                            <img src={calendar} alt="Calendar" />
                                                &nbsp; Schedule Again
                                            </label>
                                        </span>
                                        </div>
                                    </td>
                                </tr>
                            )
                        })}
                        </tbody>
                    </Table>
                    <Modal
                        dialogClassName="modal-90w"
                        show={this.state.showModal}
                        onHide={() => this.setModal(false)}
                        aria-labelledby="example-custom-modal-styling-title"
                        centered
                    >
                        <Modal.Body>
                            <div id="price-title">
                                <img id="popup_icon" src={popup_icon} alt="popup_icon" />
                                &nbsp;
                                <div>
                                    <p>{this.campaignName}</p>
                                    <p className="popup-country-text">{this.region}</p>
                                </div>
                            </div>
                            <div className="price-modal">
                                <Modal.Title>Pricing</Modal.Title>
                                <br />
                                <div className="pricing-details">
                                    <div className="left-titles">
                                        <p>1 Week - 1 Month</p>
                                        <p>6 Month</p>
                                        <p>1 Year</p>
                                    </div>
                                    <div className="Prices-value">
                                        {this.prices ? (
                                            <>
                                                {" "}
                                                <CurrencyFormat value={this.prices._1Month} displayType={'text'} prefix={'$'}/>
                                                <CurrencyFormat value={this.prices._6Months} displayType={'text'} prefix={'$'}/>
                                                <CurrencyFormat value={this.prices._1Year} displayType={'text'} prefix={'$'}/>
                                            </>
                                        ) : null}
                                    </div>
                                </div>
                            </div>
                            <button className="btn-close" onClick={() => this.setModal(false)}>
                                Close
                            </button>
                        </Modal.Body>
                    </Modal>
                </div>
            )
        }

    }
}

export default CampaignTable;

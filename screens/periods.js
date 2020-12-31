import React from "react";
import {Image, ImageBackground, TouchableOpacity,Text, View} from 'react-native';
import NumericInput from 'react-native-numeric-input'
import styles from '../styles';
import {Button, DatePicker} from 'native-base';
import {connect} from 'react-redux';
import {periods, bleedingDays} from '../actions/actions';
import DeviceInfo from 'react-native-device-info';

var date = new Date().getDate();
var month = new Date().getMonth() + 1;
var year = new Date().getFullYear();
class Periods extends React.Component{
    constructor(props) {
        super(props);
        this.setDate = this.setDate.bind(this);
        this.endDate = this.endDate.bind(this);
        this.state={
            startDate: new Date(),
            endDate: new Date(),
        }
    }
    setDate(newDate) {
        this.setState({ startDate: newDate });
    }
    endDate(newDate) {
        this.setState({ endDate: newDate });
    }
    submit = ()=>{
        this.props.periods(DeviceInfo.getUniqueId(), this.state.startDate.toDateString(), this.state.endDate.toDateString());
        this.props.bleedingDays(DeviceInfo.getUniqueId(),this.state.endDate.getDate()-this.state.startDate.getDate());
        this.props.navigation.navigate("Dashboard")
    };
    render(){
        return(
            <View style={{width:"100%",height:"100%"}}>
                <View style={{height:"60%"}}>
                    <View style={styles.backgrounds}>
                        <View style={styles.card}>
                            <View>
                                <TouchableOpacity style={{border:"solid",borderColor:"green",borderRadius:50,width:"90%",borderWidth:1,alignSelf:"center",margin:5}}>
                                    <DatePicker
                                        defaultDate={new Date(year, month-1, date)}
                                        minimumDate={new Date(2020, 1, 1)}
                                        maximumDate={new Date(2099, 12, 31)}
                                        locale={"en"}
                                        timeZoneOffsetInMinutes={undefined}
                                        modalTransparent={false}
                                        animationType={"fade"}
                                        androidMode={"default"}
                                        placeHolderText="Period Start Date"
                                        textStyle={{ color: "green", alignSelf: "center", fontSize: 25}}
                                        placeHolderTextStyle={{ color: "orange", alignSelf:"center", fontSize: 25 }}
                                        onDateChange={this.setDate}
                                        disabled={false}
                                        // onDateChange={(last_period) => { this.props.onDateChange && this.props.onDateChange(date);this.setState({ last_period }); }}
                                    />
                                </TouchableOpacity>
                                <TouchableOpacity style={{border:"solid",borderColor:"green",borderRadius:50,width:"90%",borderWidth:1,alignSelf:"center",margin:5}}>
                                    <DatePicker
                                        defaultDate={new Date(year, month-1, date)}
                                        minimumDate={new Date(2020, 1, 1)}
                                        maximumDate={new Date(2099, 12, 31)}
                                        locale={"en"}
                                        timeZoneOffsetInMinutes={undefined}
                                        modalTransparent={false}
                                        animationType={"fade"}
                                        androidMode={"default"}
                                        placeHolderText="Period End Date"
                                        textStyle={{ color: "green", alignSelf: "center", fontSize: 25}}
                                        placeHolderTextStyle={{ color: "orange", alignSelf:"center", fontSize: 25 }}
                                        onDateChange={this.endDate}
                                        disabled={false}
                                        // onDateChange={(last_period) => { this.props.onDateChange && this.props.onDateChange(date);this.setState({ last_period }); }}
                                    />
                                </TouchableOpacity>
                                <View style={{marginTop:"30%"}}>
                                    <Text style={{fontSize:15,alignSelf:"center",color:"gray"}}>Please select start and last date</Text>
                                    <Text style={{fontSize:15,alignSelf:"center",color:"gray"}}>of your period</Text>
                                </View>
                            </View>
                        </View>
                    </View>
                </View>
                <View style={{height:"20%"}}>
                    <View style={styles.mini_card}>
                        <Text style={{fontSize: 20,textAlign:"center",color:"gray",margin:20}}>{this.state.endDate.getDate()-this.state.startDate.getDate()} days of bleeding</Text>
                    </View>
                </View>
                <View style={{height:"20%"}}>
                    <Button style={styles.Button} onPress={this.submit}>
                        <Text style={{color:"white"}}>Done</Text>
                    </Button>
                </View>
            </View>
        )
    }

}
export default connect(null, {periods, bleedingDays})(Periods)

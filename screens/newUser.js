import React from "react";
import {Image, ImageBackground, TextInput, TouchableOpacity, View} from 'react-native';
import NumericInput from 'react-native-numeric-input'
import styles from '../styles';
import {Button, DatePicker} from 'native-base';
import {connect} from 'react-redux';
import {bleedingDays, fertile, getData, newUserData, nextPeriod, periodDay, sex} from '../actions/actions';
import DeviceInfo from 'react-native-device-info';
import CardView from 'react-native-cardview';
import {Text} from 'react-native';
import Modal from 'react-native-modal';

var date = new Date().getDate();
var month = new Date().getMonth() + 1;
var year = new Date().getFullYear();
var today = new Date(year, month-1, date);

class NewUser extends React.Component{
    constructor(props) {
        super(props);
        this.setDate = this.setDate.bind(this);
        this.state={
            bleeding_days: '',
            menstrual_cycle: '',
            last_period: new Date(),
        }

    }
    submit = ()=>{
        this.props.sex(DeviceInfo.getUniqueId(), this.state.chosenDate.toDateString());
        this.props.navigation.navigate("Dashboard")
    };
    setDate(newDate) {
        this.setState({ last_period: newDate });
    }
    toggleModal = () => {
        if (this.state.bleeding_days!=''){
            if(this.state.menstrual_cycle!=''){
                if(this.state.last_period!=''){
                    console.log("Last Period================",this.state.last_period);
                    this.setState({isModalVisible: !this.state.isModalVisible});
                    let date = new Date((this.state.last_period).toLocaleDateString());
                    let Difference_In_Time = today.getTime() - date.getTime();
                    let Difference_In_Days = Difference_In_Time / (1000 * 3600 * 24);
                    let cycle_length = new Date(new Date().getTime()+(this.state.menstrual_cycle*24*60*60*1000));
                    let length = cycle_length.toDateString();
                    let dated = new Date(this.state.last_period-1);
                    let cycle = this.state.menstrual_cycle/2;
                    console.log("this.state.last_period===================", this.state.last_period);
                    let cycle_length_fertile = new Date(dated.getTime()+(cycle*24*60*60*1000));
                    let fertile = cycle_length_fertile.toDateString();
                    let new_diff = Difference_In_Days+1;
                    this.props.newUserData(DeviceInfo.getUniqueId(),this.state.bleeding_days,this.state.menstrual_cycle,(this.state.last_period).toLocaleDateString());
                    this.props.bleedingDays(DeviceInfo.getUniqueId(),this.state.bleeding_days);
                    this.props.periodDay(DeviceInfo.getUniqueId(),new_diff);
                    this.props.nextPeriod(DeviceInfo.getUniqueId(), length);
                    this.props.fertile(DeviceInfo.getUniqueId(), fertile);
                    this.props.navigation.navigate("Dashboard", {period_day:Difference_In_Days+1, menstrual_cycle: length, fertile: fertile})
                    // alert(cycle_length_fertile.toDateString())
                }
                else{
                    alert("Please Enter Start Data Of Your Last PeriodLength")
                }
            }
            else {
                alert("Please Enter Menstrual Cycle Days")
            }
        }
        else{
            alert("Please Enter Bleeding Days")
        }
    };
    render(){
        console.log("if========================",this.props.navigation.state.routeName);
        return(
            <View style={{width:"100%",height:"100%"}}>
                <View style={{height:"20%"}}>
                    <View style={styles.backgrounds}>
                    </View>
                </View>
                <View style={{height:"40%"}}>
                    <View style={styles.new_card}>
                        <View>
                            <Text style={styles.model_text}>The length of your period?</Text>
                            <Text style={styles.inner_model_text}>Bleeding usually lasts between 4-7 days</Text>
                            <TextInput
                                keyboardType='numeric'
                                placeholder="Bleeding days"
                                placeholderTextColor="gray"
                                style={styles.text_input}
                                onChangeText = {bleeding_days => this.setState({bleeding_days})}
                            />
                            <Text style={styles.model_text}>The length of your menstrual cycle?</Text>
                            <Text style={styles.inner_model_text}>The duration of two periods start date, usually 23-35 days</Text>
                            <TextInput
                                keyboardType='numeric'
                                placeholder="Menstrual cycle days count"
                                placeholderTextColor="gray"
                                style={styles.text_input}
                                onChangeText = {menstrual_cycle => this.setState({menstrual_cycle})}
                            />
                            <Text style={styles.model_text}>The start date of your last period?</Text>
                            <TouchableOpacity style={{border:"solid",borderColor:"orange",borderRadius:10,width:"90%",borderWidth:1,alignSelf:"center"}}>
                                <DatePicker
                                    defaultDate={new Date(year, month-1, date)}
                                    minimumDate={new Date(2020, 1, 1)}
                                    maximumDate={new Date(2099, 12, 31)}
                                    locale={"en"}
                                    timeZoneOffsetInMinutes={undefined}
                                    modalTransparent={false}
                                    animationType={"fade"}
                                    androidMode={"default"}
                                    placeHolderText="Start date of your last period"
                                    textStyle={{ color: "gray", alignSelf: "center", fontSize: 15,textAlign:"center"}}
                                    placeHolderTextStyle={{ color: "orange", alignSelf:"center", fontSize: 15 }}
                                    onDateChange={this.setDate}
                                    disabled={false}
                                />
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
                <View style={{height:"40%",marginTop:"40%"}}>
                    <Button style={styles.done} onPress={this.toggleModal}>
                        <Text style={{color:"white"}}>Done</Text>
                    </Button>
                </View>
            </View>
        )
    }
}
export default connect(null, {newUserData, periodDay, nextPeriod, fertile,bleedingDays, getData})(NewUser)

import React from "react";
import {Image, ImageBackground, TouchableOpacity, View} from 'react-native';
import NumericInput from 'react-native-numeric-input'
import styles from '../styles';
import {Button, DatePicker} from 'native-base';
import {connect} from 'react-redux';
import {sex} from '../actions/actions';
import DeviceInfo from 'react-native-device-info';
import CardView from 'react-native-cardview';
import {Text} from 'react-native';

var date = new Date().getDate();
var month = new Date().getMonth() + 1;
var year = new Date().getFullYear();
class Sex extends React.Component{
    constructor(props) {
        super(props);
        this.setDate = this.setDate.bind(this);
        this.state={
            chosenDate: new Date()
        }

    }
    setDate(newDate) {
        this.setState({ chosenDate: newDate });
    }
    // alert = ()=>{
    //     alert((this.state.chosenDate).toLocaleDateString())
    // }
    submit = ()=>{
        this.props.sex(DeviceInfo.getUniqueId(), this.state.chosenDate.toDateString());
        this.props.navigation.navigate("Dashboard")
    };
    render(){
        console.log("if========================",this.props.navigation.state.routeName);
        return(
            <View style={{width:"100%",height:"100%"}}>
                <View style={{height:"70%"}}>
                    <View style={styles.backgrounds}>
                        <View style={styles.card}>
                            <View>
                                <TouchableOpacity style={{border:"solid",borderColor:"orange",borderRadius:10,width:"90%",borderWidth:1,alignSelf:"center",margin:15}}>
                                    <DatePicker
                                        defaultDate={new Date(year, month-1, date)}
                                        minimumDate={new Date(2020, 1, 1)}
                                        maximumDate={new Date(2099, 12, 31)}
                                        locale={"en"}
                                        timeZoneOffsetInMinutes={undefined}
                                        modalTransparent={false}
                                        animationType={"fade"}
                                        androidMode={"default"}
                                        placeHolderText="Select date"
                                        textStyle={{ color: "green", alignSelf: "center", fontSize: 25}}
                                        placeHolderTextStyle={{ color: "orange", alignSelf:"center", fontSize: 25 }}
                                        onDateChange={this.setDate}
                                        disabled={false}
                                        // onDateChange={(last_period) => { this.props.onDateChange && this.props.onDateChange(date);this.setState({ last_period }); }}
                                    />
                                </TouchableOpacity>
                                <View style={{marginTop:"30%"}}>
                                    <Text style={{fontSize:15,alignSelf:"center",color:"gray"}}>Please select date of your last</Text>
                                    <Text style={{fontSize:15,alignSelf:"center",color:"gray"}}>sexual relation</Text>
                                </View>
                            </View>
                        </View>
                    </View>
                </View>
                <View style={{height:"30%"}}>
                    <Button style={styles.Button} onPress={this.submit}>
                        <Text style={{color:"white"}}>Done</Text>
                    </Button>
                </View>
            </View>
        )
    }
}
export default connect(null, {sex})(Sex)

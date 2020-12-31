import React from "react";
import {Image, Text, View, TouchableOpacity, ImageBackground} from 'react-native';
import NumericInput from 'react-native-numeric-input'
import styles from '../styles';
import {Button} from 'native-base';
import {connect} from 'react-redux';
import {nextPeriod,fertile} from '../actions/actions';
import DeviceInfo from 'react-native-device-info';

class Cycle extends React.Component{
    state = {
        value: ''
    };
    settings = ()=>{
        if(this.state.value > 0){
            let cycle_length = new Date(new Date().getTime()+(this.state.value*24*60*60*1000));
            this.props.nextPeriod(DeviceInfo.getUniqueId(),cycle_length.toDateString());
            this.props.navigation.navigate("Dashboard")
        }
        else{
            alert("Please enter a valid number")
        }
    };
    render(){
        return(
            <View style={{width:"100%",height:"100%"}}>
                <View style={{height:"70%"}}>
                    <View style={styles.backgrounds}>
                        <View style={styles.card}>
                            <View>
                                <View style={{marginTop:"10%",alignSelf:"center"}}>
                                    <NumericInput
                                        value={this.state.value}
                                        onChange={value => this.setState({value})}
                                        onLimitReached={(isMax,msg) => console.log(isMax,msg)}
                                        totalWidth={270}
                                        totalHeight={50}
                                        iconSize={25}
                                        step={1}
                                        valueType='real'
                                        rounded
                                        textColor='#B0228C'
                                        iconStyle={{ color: 'white' }}
                                        rightButtonBackgroundColor='orange'
                                        leftButtonBackgroundColor='green'/>
                                </View>
                                <View style={{marginTop:"30%"}}>
                                    <Text style={{fontSize:15,textAlign:"center",color:"gray"}}>We use this cycle length to predict your next period start date</Text>
                                </View>
                            </View>
                        </View>
                    </View>
                </View>
                <View style={{height:"30%"}}>
                    <Button style={styles.Button} onPress={this.settings}>
                        <Text style={{color:"white"}}>Done</Text>
                    </Button>
                </View>
            </View>
        )
    }
}
export default connect(null, {nextPeriod,fertile})(Cycle)

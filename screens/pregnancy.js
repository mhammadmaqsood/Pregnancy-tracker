import React, { useState } from "react";
import {View, Switch, Text, ImageBackground, Image, TouchableOpacity} from 'react-native';
import styles from '../styles';
import {Item,Button} from 'native-base'
import {connect} from 'react-redux';
import {pregnancy} from '../actions/actions';
import DeviceInfo from 'react-native-device-info';
import NumericInput from "react-native-numeric-input";

class Pregnancy extends React.Component{
    state = {switchValue:false};
    toggleSwitch = (value) => {
        //onValueChange of the switch this function will be called
        this.setState({switchValue: value})
        //state changes according to switch
        //which will result in re-render the text
    };
    submit = ()=>{
        this.props.pregnancy(DeviceInfo.getUniqueId(), this.state.switchValue);
        this.props.navigation.navigate("Dashboard")
    };
    render(){
        return(
            <View style={{width:"100%",height:"100%"}}>
                <View style={{height:"60%"}}>
                    <View style={styles.backgrounds}>
                        <View style={styles.card}>
                            <View>
                                <View style={{marginTop:"10%",alignSelf:"center"}}>
                                    <Item>
                                        <Text style={{fontSize:20, color: "gray", margin: 30}}>Tapping I'm pregnant! will pause the period cycle, and start the count down to your delivery day</Text>
                                    </Item>
                                </View>
                            </View>
                        </View>
                    </View>
                </View>
                <View style={{height:"20%"}}>
                    <View style={styles.mini_card}>
                        <View style={styles.pregnant}>
                            <Text style={{fontSize:20, color: "gray", fontWeight: 'bold'}}>I'm pregnant!</Text>
                            <Switch
                                onValueChange = {this.toggleSwitch}
                                value = {this.state.switchValue}/>
                        </View>
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
export default connect(null, {pregnancy})(Pregnancy)

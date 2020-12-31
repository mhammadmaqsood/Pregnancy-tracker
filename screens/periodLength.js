import React from "react";
import {Image, Text, TouchableOpacity, View, ImageBackground} from 'react-native';
import NumericInput from 'react-native-numeric-input'
import styles from '../styles';
import {Button, DatePicker} from 'native-base';

export default class PeriodLength extends React.Component{
    state = {
        value: ''
    };
    settings = ()=>{
        if(this.state.value > 0){
            this.props.navigation.navigate("Settings")
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
                                    <Text style={{fontSize:15,alignSelf:"center",color:"gray"}}>Bleeding usually lasts between 4-7 days</Text>
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

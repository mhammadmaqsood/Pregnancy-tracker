import React from "react";
import * as RNLocalize from "react-native-localize";
import i18n from "i18n-js";
import memoize from "lodash.memoize"; // Use for caching/memoize for better performance
import {I18nManager, View, TextInput, Image, TouchableOpacity, ImageBackground} from 'react-native';
import styles from ".././styles"
import {Button, DatePicker, Text} from 'native-base';
import firebase from '../fb';
import DeviceInfo from 'react-native-device-info';
var data=[];
export default class EnterPassword extends React.Component{
    state={
        password : '',
        db_password: '',
    };
    componentDidMount(){
        // To get Next Period date
        let pwd = firebase.database().ref('/users').child(DeviceInfo.getUniqueId()).child('password').once('value').then(snapShot => {
            snapShot.forEach(child => {
                data = [child.val(), ...data];
            });
            this.setState({db_password: data[0]});
            return data;
        });
    }
    submit = ()=>{
        if(this.state.db_password===this.state.password){
            this.props.navigation.navigate("Dashboard")
        }
        else{
            alert("Incorrect Password")
        }
    };
    render(){
        return(
            <View style={{width:"100%",height:"100%"}}>
                <View style={{height:"20%"}}>
                    <View style={styles.backgrounds}>
                    </View>
                </View>
                <View style={{height:"40%"}}>
                    <View style={styles.card}>
                        <View>
                            <Text style={{fontSize:15, color: "orange", alignSelf: "center"}}>Please Enter Password</Text>
                            <TextInput
                                keyboardType='default'
                                placeholder="Enter Password"
                                placeholderTextColor="gray"
                                style={styles.text_input_pwd}
                                secureTextEntry
                                onChangeText = {password=>this.setState({password})}
                            />
                            <Button style={styles.pwd_btn} onPress={this.submit}>
                                <Text style={{color:"white"}}>Done</Text>
                            </Button>
                        </View>
                    </View>
                </View>

            </View>
        )
    }
}

import React from "react";
import {View, Text, Image} from 'react-native';
import firebase from '../fb';
import DeviceInfo from 'react-native-device-info';

export default class Routes extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            password: '',
            password_exists: false
        }
    }
    componentDidMount(){
        console.log("Coming here");
        let pwd = firebase.database().ref('/users').child(DeviceInfo.getUniqueId()).child("password").once('value').then(snapShot => {
            snapShot.forEach(child => {
                if(child.exists()){
                    console.log("Exists========================");
                    this.setState({password_exists:true});
                }
                else{
                    this.setState({password_exists:false});
                }
            });
        });
    }
    render(){
        return(
            <View style={{height:"100%",width:"100%"}}>
                <Image
                    style={{width:120,height:120,alignSelf:"center",justifyContent:"center",marginTop:"50%"}}
                source={require("../assets/Calender.png")}
                />
                <Text style={{textAlign:"center",color:"gray",fontSize:30, margin:30}}>My Calender</Text>
                {this.state.password_exists?this.props.navigation.navigate("EnterPassword"):this.props.navigation.navigate("Main")}
            </View>
        )

    }
}

import React from "react";
import * as RNLocalize from "react-native-localize";
import i18n from "i18n-js";
import memoize from "lodash.memoize"; // Use for caching/memoize for better performance
import {I18nManager, View, TextInput, ImageBackground} from "react-native";
import {Button} from 'native-base';
import styles from ".././styles"
import { Container, Text } from 'native-base';
import {connect} from 'react-redux';
import {pwd} from '../actions/actions';
import DeviceInfo from 'react-native-device-info';
import firebase from '../fb';
var data=[];
const translationGetters = {
    // lazy requires (metro bundler does not support symlinks)
    ar: () => require("../src/translations/ar"),
    en: () => require("../src/translations/en.json"),
    fr: () => require("../src/translations/fr.json")
};

const translate = memoize(
    (key, config) => i18n.t(key, config),
    (key, config) => (config ? key + JSON.stringify(config) : key)
);

const setI18nConfig = () => {
    // fallback if no available language fits
    const fallback = { languageTag: "en", isRTL: false };

    const { languageTag, isRTL } =
    RNLocalize.findBestAvailableLanguage(Object.keys(translationGetters)) ||
    fallback;

    // clear translation cache
    translate.cache.clear();
    // update layout direction
    I18nManager.forceRTL(isRTL);
    // set i18n-js config
    i18n.translations = { [languageTag]: translationGetters[languageTag]() };
    i18n.locale = languageTag;
};
class UpdatePassword extends React.Component{
    constructor(props) {
        super(props);
        setI18nConfig(); // set initial config
        this.state = {
            old_password: '',
            new_password: '',
            confirm_password: '',
            password: ''
        }
    }
    componentDidMount() {
        RNLocalize.addEventListener("change", this.handleLocalizationChange);
    }

    componentWillUnmount() {
        RNLocalize.removeEventListener("change", this.handleLocalizationChange);
    }

    handleLocalizationChange = () => {
        setI18nConfig();
        this.forceUpdate();
    };
    submit = ()=>{
        if(this.state.password===this.state.old_password){
            if(this.state.new_password == this.state.confirm_password){
                this.props.pwd(this.state.new_password,DeviceInfo.getUniqueId())
                alert("Password updated successfully")
            }
            else{
                alert("Please enter same password for both fields")
            }
        }
        else{
            alert("Oops, Old password is incorrect")
        }
    };
    componentDidMount(){
        // To get Next Period date
        firebase.database().ref('/users').child(DeviceInfo.getUniqueId()).child('password').once('value').then(snapShot => {
            snapShot.forEach(child => {
                data = [child.val(), ...data];
            });
            this.setState({password: data[0]});
            return data;
        });
    }
    render(){
        // this.password();
        // console.log("Password==================",this.state.password);
        return(
            <View style = {styles.main_screen}>
                <TextInput
                    keyboardType='default'
                    placeholder="Old Password"
                    placeholderTextColor="gray"
                    style={styles.text_input_pwd}
                    onChangeText = {old_password => this.setState({old_password})}
                    secureTextEntry
                />
                <TextInput
                    keyboardType='default'
                    placeholder="New Password"
                    placeholderTextColor="gray"
                    style={styles.text_input_pwd}
                    onChangeText = {new_password => this.setState({new_password})}
                    secureTextEntry
                />
                <TextInput
                    keyboardType='default'
                    placeholder="Confirm Password"
                    placeholderTextColor="gray"
                    style={styles.text_input_pwd}
                    onChangeText = {confirm_password => this.setState({confirm_password})}
                    secureTextEntry
                />
                <Button style={styles.new_user} onPress={this.submit}>
                    <Text>Update Password</Text>
                </Button>
                <Button style={styles.new_user} onPress={()=>this.props.navigation.navigate("Dashboard")}>
                    <Text>Dashboard</Text>
                </Button>
            </View>
        )
    }
}
export default connect(null, {pwd})(UpdatePassword)

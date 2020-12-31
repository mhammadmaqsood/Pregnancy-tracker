import React from "react";
import * as RNLocalize from "react-native-localize";
import i18n from "i18n-js";
import memoize from "lodash.memoize"; // Use for caching/memoize for better performance
import {TextInput} from 'react-native';
import {I18nManager, View, Image, ImageBackground} from "react-native";
import {Button} from 'native-base';
import styles from ".././styles"
import Modal from 'react-native-modal';
import { Container, DatePicker, Text } from 'native-base';
import {connect} from 'react-redux';
import {newUserData, periodDay, nextPeriod, fertile,bleedingDays, getData} from '../actions/actions';
import DeviceInfo from 'react-native-device-info';
import firebase from '../fb';
const axios = require('axios').default;

const translationGetters = {
    // lazy requires (metro bundler does not support symlinks)
    ar: () => require("./../src/translations/ar"),
    en: () => require("./../src/translations/en.json"),
    fr: () => require("./../src/translations/fr.json")
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
var date = new Date().getDate();
var month = new Date().getMonth() + 1;
var year = new Date().getFullYear();
var today = new Date(year, month-1, date);

class Main extends React.Component{
    constructor(props) {
        super(props);
        setI18nConfig(); // set initial config
        this.setDate = this.setDate.bind(this);
        this.state={
            isModalVisible: false,
            last_period: new Date(),
            password_exists: false
        }

    }
    setDate(newDate) {
        this.setState({ last_period: newDate });
    }
    // alert=()=>{
    //     alert(Difference_In_Days)
    // };
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
    changeStateTrue = ()=>{
        this.setState({
            isModalVisible: true,
        });
    };
    // http://172.17.240.1:3000/subscribers
    componentDidMount(){
        // axios.get('http://172.17.240.1:27017/subscribers')
        //     .then(function (response) {
        //         // handle success
        //         console.log("Response========",response);
        //     })
        //     .catch(function (error) {
        //         // handle error
        //         console.log("Error==========",error);
        //     })
        //     .finally(function () {
        //         // always executed
        //     });

        firebase.database().ref('/users').child(DeviceInfo.getUniqueId()).child("password").once('value').then(snapShot => {
            snapShot.forEach(child => {
                if(child.exists()){
                    console.log("Exists========================");
                    this.setState({password_exists:true});
                }
            });
        });
    }
    temp=()=>{
        if(this.state.password_exists){
            console.log("True=============",this.state.password_exists);
            this.props.navigation.navigate("EnterPassword")
        }
        else{
            console.log("False=============",this.state.password_exists);
            date = new Date((this.state.last_period).toLocaleDateString());
            let Difference_In_Time = today.getTime() - date.getTime();
            let Difference_In_Days = Difference_In_Time / (1000 * 3600 * 24);
            let cycle_length = new Date(new Date().getTime()+(this.state.menstrual_cycle*24*60*60*1000));
            let length = cycle_length.toDateString();
            let dated = new Date(this.state.last_period-1);
            let cycle = this.state.menstrual_cycle/2;
            let cycle_length_fertile = new Date(dated.getTime()+(cycle*24*60*60*1000));
            this.props.navigation.navigate("Dashboard", {period_day:Difference_In_Days+1, menstrual_cycle: length, fertile: cycle_length_fertile.toDateString()})
        }
    };
    render(){
        return(
            <View style={{width:"100%",height:"100%"}}>
                <View style={{height:"30%"}}>
                    <View style={styles.backgrounds}>
                    </View>
                </View>
                <View style={{height:"20%"}}>
                    <View style={styles.card}>
                        <View style = {styles.main_screen}>
                            <Button style={styles.new_user} onPress={()=>this.props.navigation.navigate("newUser")}>
                                <Text>New User</Text>
                            </Button>
                            <Button style={styles.restore_data} onPress={this.temp}>
                                <Text>Restore Data</Text>
                            </Button>
                        </View>
                    </View>
                </View>

            </View>
        )
    }
}
export default connect(null, {newUserData, periodDay, nextPeriod, fertile,bleedingDays, getData})(Main)

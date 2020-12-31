import React from "react";
import * as RNLocalize from "react-native-localize";
import i18n from "i18n-js";
import memoize from "lodash.memoize"; // Use for caching/memoize for better performance
import {I18nManager, Text, View, Image, ImageBackground, TouchableOpacity} from "react-native";
import {Button} from 'native-base';
import styles from ".././styles"
import firebase from '../fb';
import DeviceInfo from 'react-native-device-info';

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
var data = [];
var next_period = [];
var fertile = [];
var bleeding = [];
var date = new Date().getDate();
var month = new Date().getMonth() + 1;
var year = new Date().getFullYear();
var today = new Date(year, month-1, date);

export default class Dashboard extends React.Component {
    constructor(props) {
        super(props);
        setI18nConfig(); // set initial config
        this.state={
            period_day: '',
            next_period: '',
            fertile: '',
            backpressed:0,
            bleeding: '',
            period : false,
            days_left: null,
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
    periodDate(){
        // To get Period Day count
        firebase
            .database()
            .ref('/users')
            .child(DeviceInfo.getUniqueId())
            .child('PeriodDay')
            .once('value')
            .then(snapShot => {
                snapShot.forEach(child => {
                    // this.setState({data:child.val(), ...data})
                    data = [child.val(), ...data];
                });
                this.setState({period_day: data[0]});
                return data;

            });
    }
    nextPeriod(){
        // To get Next Period date
        firebase.database().ref('/users').child(DeviceInfo.getUniqueId()).child('NextPeriod').once('value').then(snapShot => {
                snapShot.forEach(child => {
                    next_period = [child.val(), ...data];
                });
                this.setState({next_period: next_period[0]});
                let date = new Date(this.state.next_period);
                let Difference_In_Time = date.getTime() - today.getTime();
                let Difference_In_Days = Difference_In_Time / (1000 * 3600 * 24);
                this.setState({days_left:Difference_In_Days});
                return next_period;
            });
    }
    fertile(){
        // // To get Next Fertile date
        fertile = firebase.database().ref('/users').child(DeviceInfo.getUniqueId()).child('fertile').once('value').then(snapShot => {
            snapShot.forEach(child => {
                // this.setState({data:child.val(), ...data})
                fertile = [child.val(), ...data];
            });
            this.setState({fertile: fertile[0]});
            return fertile;
        });
    }
    bleedingDays(){
        // To get Bleeding Days count
        firebase.database().ref('/users').child(DeviceInfo.getUniqueId()).child('bleedingDays').once('value').then(snapShot => {
            snapShot.forEach(child => {
                bleeding = [child.val(), ...data];
            });
            this.setState({bleeding:bleeding[0]});
            return bleeding;
        });
        console.log("bleeding===================================",this.state.bleeding)
    }
    componentDidMount(){
        this.periodDate();
        this.nextPeriod();
        this.fertile();
        this.bleedingDays();
        this.props.navigation.addListener('willFocus',this._handleStateChange);
        // BackHandler.addEventListener('hardwareBackPress', this.handleBackPress);
    }

    _handleStateChange = state => {
        console.log("coming");
        this.nextPeriod();
        this.bleedingDays();
        // this.render()
    };
    render() {
        return (
                <View style={styles.externalcontainer}>
                    <View style={styles.internalcontainer}>
                        <View style={styles.main_view}>
                            {this.state.period_day<this.state.bleeding?
                                <Text style={styles.dashboard_text}>{this.state.period_day}</Text>:
                                <Text style={styles.dashboard_text}>{this.state.days_left}</Text>
                            }
                            {this.state.period_day<this.state.bleeding?
                                <Text style={{color:"gray", fontSize:20}} >Day of period</Text> :
                                <Text style={{color:"gray", fontSize:20}}>Days Left</Text>
                            }
                        </View>
                        <View style={{height: "20%", flex: 1, flexDirection: 'row'}}>
                            {/*<Text style={styles.myText}>Login</Text>*/}
                            <View style={styles.sec_view}>
                                <Text style={styles.dashboard_text}>{this.state.next_period}</Text>
                                <Text style={{color:"gray", fontSize:20}}>Next Period</Text>
                            </View>
                            <View style={styles.sec_view}>
                                <Text style={styles.dashboard_text}>{this.state.fertile}</Text>
                                <Text style={{color:"gray", fontSize:20}}>Next Fertile</Text>
                            </View>
                        </View>
                        <View style = {styles.pills}>
                            <Image
                                style={styles.settings_icon}
                                source={require("../assets/pill.png")}
                            />
                            <Text style={{fontSize: 25, color: "gray"}}>Pills Time</Text>
                        </View>
                        <View style = {{height:"10%"}}>
                            <Button style={styles.Button} onPress={()=>this.props.navigation.navigate("Periods")}>
                                <Text style={{color:"white"}}>Periods</Text>
                            </Button>
                        </View>
                        <View style = {{height:"10%"}}>
                            <Button style={styles.Button} onPress={()=>this.props.navigation.navigate("Sex")}>
                                <Text style={{color:"white"}}>Sexual Relation Date</Text>
                            </Button>
                        </View>
                        <View style = {{height:"30%"}}>
                            <View style={styles.icon_view}>
                                <View style={{margin:40}}>
                                    <TouchableOpacity onPress={()=>this.props.navigation.navigate("Calender")}>
                                        <Image
                                            style={styles.inputIcon}
                                            source={require("../assets/Calender.png")}
                                        />
                                        <Text style={styles.icon_text}>Calender</Text>
                                    </TouchableOpacity>
                                </View>
                                <View style={{margin:40}}>
                                    <TouchableOpacity onPress={()=>this.props.navigation.navigate("Settings")}>
                                        <Image
                                            style={styles.inputIcon}
                                            source={require("../assets/settings.png")}
                                        />
                                        <Text style={styles.icon_text}>Settings</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>
                    </View>
                </View>
        );
    }
}

import React from "react";
import * as RNLocalize from "react-native-localize";
import i18n from "i18n-js";
import memoize from "lodash.memoize"; // Use for caching/memoize for better performance
import {I18nManager, View, ImageBackground} from "react-native";
import {Button, DatePicker} from 'native-base';
import styles from ".././styles"
import { Container, Text } from 'native-base';
import firebase from '../fb';
import DeviceInfo from 'react-native-device-info';
var data=[];
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
export default class Password extends React.Component{
    constructor(props) {
        super(props);
        setI18nConfig(); // set initial config
        this.setDate = this.setDate.bind(this)
    }
    setDate(newDate) {
        this.setState({ chosenDate: newDate });
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
    render(){
        return(
            <View style={{width:"100%",height:"100%"}}>
                <View style={{height:"70%"}}>
                    <View style={styles.backgrounds}>
                        <View style={styles.card}>
                            <View>
                                <View>
                                    <Button style={styles.new_user} onPress={()=>this.props.navigation.navigate("AddPassword")}>
                                        <Text>Add Password</Text>
                                    </Button>
                                    <Button style={styles.restore_data} onPress={()=>this.props.navigation.navigate("UpdatePassword")}>
                                        <Text>Update Password</Text>
                                    </Button>
                                </View>
                                <View style={{marginTop:"30%"}}>
                                    <Text style={{fontSize:15,textAlign:"center",color:"gray"}}>Use above buttons to add or update password</Text>
                                </View>
                            </View>
                        </View>
                    </View>
                </View>
            </View>
        )
    }
}

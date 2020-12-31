import React from "react";
import * as RNLocalize from "react-native-localize";
import i18n from "i18n-js";
import memoize from "lodash.memoize"; // Use for caching/memoize for better performance
import {Dimensions, SafeAreaView, StatusBar, ScrollView} from 'react-native';
import {I18nManager, View, Image, ImageBackground} from "react-native";
import styles from ".././styles"
import {Text, Item} from 'native-base';

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
const { height } = Dimensions.get('window');

export default class Settings extends React.Component{
    state = {
        // We don't know the size of the content initially, and the probably won't instantly try to scroll, so set the initial content height to 0
        screenHeight: 0,
    };
    onContentSizeChange = (contentWidth, contentHeight) => {
        // Save the content height in state
        this.setState({ screenHeight: contentHeight });
    };
    constructor(props) {
        super(props);
        setI18nConfig(); // set initial config
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
        const scrollEnabled = this.state.screenHeight > height;
        return(
            <SafeAreaView style={styles.container}>
                <StatusBar barStyle="light-content" backgroundColor="green" />
                <ScrollView
                    style={{ flex: 1 }}
                    contentContainerStyle={styles.scrollview}
                    scrollEnabled={scrollEnabled}
                    onContentSizeChange={this.onContentSizeChange}
                >
                    <View>
                        <Item onPress={()=>this.props.navigation.navigate("PeriodLength")}>
                            <Image
                                style={styles.settings_icon}
                                source={require("../assets/drop.png")}
                            />
                            <Text style={styles.myText}>Period Length</Text>
                        </Item>
                        <Item onPress={()=>this.props.navigation.navigate("Cycle")}>
                            <Image
                                style={styles.settings_icon}
                                source={require("../assets/cycle.png")}
                            />
                            <Text style={styles.myText}>Cycle Length</Text>
                        </Item>
                        <Item onPress={()=>this.props.navigation.navigate("Ovulation")}>
                            <Image
                                style={styles.settings_icon}
                                source={require("../assets/ovulation.png")}
                            />
                            <Text style={styles.myText}>Ovulation and Fertile</Text>
                        </Item><Item onPress={()=>this.props.navigation.navigate("Pregnancy")}>
                            <Image
                                style={styles.settings_icon}
                                source={require("../assets/pregnancy.png")}
                            />
                            <Text style={styles.myText}>Pregnancy</Text>
                        </Item>
                        <Item onPress={()=>this.props.navigation.navigate("Password")}>
                            <Image
                                style={styles.settings_icon}
                                source={require("../assets/password.png")}
                            />
                            <Text style={styles.myText}>Password</Text>
                        </Item>
                    </View>
                </ScrollView>
            </SafeAreaView>
        )
    }
}

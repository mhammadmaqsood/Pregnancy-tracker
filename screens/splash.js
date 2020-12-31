import React, { Component } from 'react';
import { Container, Header, Title, Content, Footer, FooterTab, Form, Button, Left, Right, Body, Icon, Text, View, Item } from 'native-base';
import styles from "../styles";
import {Image} from "react-native";

export default class SplashScreen extends React.Component {
    render() {
        return (
            <Container style={styles.textWrap}>
                <View>
                    <Image
                        style={styles.SplashIcon}
                        source={require('../assets/Calender.png')}
                    />
                </View>
            </Container>
        );
    }
}

import React, { Component } from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import { Calendar } from 'react-native-calendars';
import { format } from 'date-fns'
import firebase from '../fb';
import DeviceInfo from 'react-native-device-info';

// var date = new Date('Sun july 09 2020');
// var year = date.getFullYear();
// var month = date.getMonth();
// var day = date.getDate();
// var final_date = format(new Date(year, month, day), 'yyyy-MM-dd');
var i = 0;
var data=[];

export default class Calender extends Component {
    constructor(props) {
        super(props);
        this.state={
            fertile: '',
            day: 1,     // day of month (1-31)
            month: 1,   // month of year (1-12)
            year: 2017, // year
            mark_dates: [],
            dateString: '2020-07-23', // date formatted as 'YYYY-MM-DD' string
            markedData:[],
        }
    }
    componentDidMount(){
        // To get Period Day count
        firebase
            .database()
            .ref('/users')
            .child(DeviceInfo.getUniqueId())
            .child('fertile')
            .once('value')
            .then(snapShot => {
                snapShot.forEach(child => {
                    data = [child.val(), ...data];
                });
                this.setState({fertile: data[0]});
                this.markDates();
                return data;
            });
    }
    markDates(){
        let fertile = new Date(this.state.fertile);
        for(i = 1; i<=7; i++){
            let next_date = new Date(fertile.getTime() +(i*24*60*60*1000));
            let nextdate = next_date.getDate();
            let nextmonth = next_date.getMonth();
            let nextyear = next_date.getFullYear();
            let next_final_dated = format(new Date(nextyear, nextmonth, nextdate), 'yyyy-MM-dd');
            this.state.mark_dates.push(next_final_dated);
            this.setState({markedData:this.state.mark_dates});
        }
    };
    render() {
        let dates = [];
        dates[this.state.mark_dates[0]] = {selected: true, color: 'orange'};
        // dates[this.state.mark_dates[1]] = {selected: true};
        // dates[this.state.mark_dates[2]] = {selected: true};
        // dates[this.state.mark_dates[3]] = {selected: true};
        // dates[this.state.mark_dates[4]] = {selected: true};
        // dates[this.state.mark_dates[5]] = {selected: true};
        // dates[this.state.mark_dates[6]] = {selected: true};
        return (
            <View style={styles.container}>
                <Text style={{fontSize: 17, alignSelf: "center", color: "gray"}}>Marked dates have chances of pregnancy</Text>
                <Calendar
                    // onDayPress={(dateString) => this.setState(JSON.stringify(dateString))}
                    onDayPress={(dateString) => this.setState({dateString})}

                    // Date marking style [simple/period/multi-dot/single]. Default = 'simple'
                    markingType={'custom'}
                    // onDayPress={({ dateString }) => markedDates(dateString)}
                    markedDates={dates}
                />
                <TouchableOpacity onPress={()=>this.props.navigation.navigate("Dashboard")}>
                    <Image
                        style={{width: 70, height: 70, alignSelf:"center", margin:30}}
                        source={require("../assets/done.png")}
                    />
                </TouchableOpacity>
            </View>
        );
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFFFFF',
        marginTop: 100,
    },
});

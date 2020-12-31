import React from 'react';
import {StyleSheet} from 'react-native'
import {
    responsiveHeight,
    responsiveWidth,
    responsiveFontSize
} from "react-native-responsive-dimensions";
export default StyleSheet.create({
    externalcontainer: {
        width: "100%",
        height: "100%",
        alignItems: "stretch",
        flexWrap: "wrap"
    },internalcontainer: {
        flexDirection: 'column',
        width:"100%",
        height: "100%",
        alignItems: "stretch",
        flexWrap: "wrap",
        position: 'relative'
    },
    textWrapper: {
        // height: screenHeight, // 70% of height device screen
        width: responsiveWidth('80%')   // 80% of width device screen
    },
    myText: {
        fontSize: 20,
    },
    dashboard_text: {
        fontSize: 18,
        color: "orange"
    },
    container: {
        flex: 1,
        flexDirection: "column"
    },
    image: {
        flex: 1,
        resizeMode: "cover",
        justifyContent: "center"
    },
    text: {
        color: "gold",
        fontSize: 30,
        fontWeight: "bold"
    },
    main_view:{
        height: "20%",
        width: "90%",
        // marginTop: 10,
        justifyContent: "center",
        alignItems: "center",
        margin: 15,
        alignSelf: "center",
        borderColor: "orange",
        borderRadius : 10,
        borderWidth: 2
    },
    pills:{
        height: "10%",
        width: "90%",
        // marginTop: 10,
        // justifyContent: "space-between",
        alignItems: "center",
        alignSelf: "center",
        borderColor: "orange",
        borderRadius : 10,
        borderWidth: 2,
        // flex: 0.8,
        flexDirection: 'row',
    },
    sec_view:{
        height: "70%",
        width: "40%",
        // marginTop: 10,
        alignSelf:"center",
        justifyContent: "center",
        alignItems: "center",
        margin: 17,
        // alignSelf: "center",
        borderColor: "orange",
        borderRadius : 10,
        borderWidth: 1.5,
        // display:'flex',
        // flex-direction:'row'
    },
    Button:{
        margin: 10,
        width:"90%",
        backgroundColor:"orange",
        alignSelf:"center",
        justifyContent:"center",
        borderRadius:50,
        shadowColor: 'black',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.8,
        shadowRadius: 2,
        elevation: 5
    },
    pwd_btn:{
        margin: "30%",
        width:"90%",
        backgroundColor:"orange",
        alignSelf:"center",
        justifyContent:"center",
        borderRadius:50,
        shadowColor: 'black',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.8,
        shadowRadius: 2,
        elevation: 5
    },
    inputIcon:{
        width: 60,
        height: 60
    },
    icon_view:{
        flex: 0.8,
        flexDirection: 'row',
        // justifyContent: 'space-between',
        width: "80%",
        alignSelf: "center",
        alignItems: "center",
        justifyContent: "center",
    },
    icon_text:{
        fontSize: 15,
        marginTop: 20,
        alignSelf: "center",
        color: "gray"
    },
    main_screen:{
        flex: 1,
        flexDirection: 'column',
        justifyContent: "center",
    },
    new_user:{
        width:"90%",
        backgroundColor:"orange",
        alignSelf:"center",
        justifyContent:"center",
        borderRadius:50,
        margin: 15,
        shadowColor: 'black',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.8,
        shadowRadius: 2,
        elevation: 10
    },
    done:{
        width:"80%",
        backgroundColor:"orange",
        alignSelf:"center",
        justifyContent:"center",
        borderRadius:50,
        margin: 40,
        shadowColor: 'black',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.8,
        shadowRadius: 2,
        elevation: 5
    },
    restore_data:{
        width:"90%",
        backgroundColor:"#cbbeb5",
        alignSelf:"center",
        justifyContent:"center",
        borderRadius:50
    },
    text_input:{
        width:"90%",
        borderWidth:1,
        borderRadius:10,
        borderColor:"orange",
        alignSelf:"center",
        // margin:10,
        color: 'gray',
    },
    model_text:{
        fontSize: 18,
        alignSelf: "center",
        color: "white"
    },
    inner_model_text:{
        fontSize: 12,
        alignSelf: "center",
        color: "orange",
        textAlign: "center"
    },
    settings_icon:{
        width: 30,
        height: 30,
        margin:20
    },
    increment:{
        alignSelf: "center",
        margin: 40,
        flex: 0.4,
        flexDirection: "column",
        justifyContent: "space-between",
        // justifyContent: "center",
        alignItems: "center"
    },
    increment_text:{
        fontSize: responsiveWidth(4),
        color: "gold"
    },
    done_btn:{
        width: 70,
        height: 70,
        alignSelf: "center"
    },
    pregnant:{
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        margin: 20
    },
    text_input_pwd:{
        width:"90%",
        borderWidth:2,
        borderRadius:10,
        borderColor:"orange",
        alignSelf:"center",
        margin:10,
        color: "gray"
    },
    backgrounds:{
        height: "50%",
        borderBottomLeftRadius: 100,
        borderBottomRightRadius: 100,
        backgroundColor: 'orange'
    },
    card:{
        width:'80%',
        height:"150%",
        backgroundColor:"white",
        alignSelf:"center",
        borderRadius:20,
        margin:90,
        shadowColor: 'black',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.8,
        shadowRadius: 2,
        elevation: 10
    },
    new_card:{
        width:'85%',
        height:"150%",
        backgroundColor:"white",
        alignSelf:"center",
        borderRadius:20,
        // marginBottom:90,
        shadowColor: 'black',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.8,
        shadowRadius: 2,
        elevation: 10
    },
    textWrap:{
        backgroundColor:"#262938",
        flex: 1,
        height: '10%',
        width: '100'
    },
    SplashIcon:{
        width:350,
        height:350,
        alignSelf: 'center',
        justifyContent:'center',
        marginTop: 150
    },
    mini_card:{
        width:'80%',
        height:"50%",
        backgroundColor:"white",
        alignSelf:"center",
        borderRadius:20,
        // margin:90,
        shadowColor: 'black',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.8,
        shadowRadius: 2,
        elevation: 10
    }
});

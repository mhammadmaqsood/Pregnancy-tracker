import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import Dashboard from "./screens/dashboard";
import Main from "./screens/main";
import Settings from "./screens/settings";
import PeriodLength from './screens/periodLength';
import Cycle from './screens/cycle';
import Ovulation from './screens/ovulation';
import Pregnancy from './screens/pregnancy';
import Password from './screens/password';
import AddPassword from './screens/addPassword';
import UpdatePassword from './screens/updatePassword';
import EnterPassword from './screens/enterPassword';
import Sex from './screens/sex';
import Periods from './screens/periods';
import Calender from './screens/calender';
import Routes from './screens/routes';
import newUser from './screens/newUser';

const AuthStack = createStackNavigator({
    // Routes:{
    //     screen: Routes,
    //     navigationOptions: ({navigation}) => {
    //         return {
    //             header: null
    //         };
    //     },
    // },
    Main:{
        screen: Main,
        navigationOptions: ({navigation}) => {
            return {
                header: null,
            };
        },
    },
    EnterPassword:{
        screen: EnterPassword,
        navigationOptions: ({navigation}) => {
            return {
                header: null
            };
        },
    },
    newUser:{
        screen: newUser,
        navigationOptions: ({navigation}) => {
            return {
                header: null
            };
        },
    },
    Settings:{
        screen: Settings,
        navigationOptions: ({navigation}) => {
            return {
                title: 'Settings',
                backgroundColor: 'orange',
            };
        },
    },
    PeriodLength:{
        screen: PeriodLength,
        navigationOptions: ({navigation}) => {
            return {
                header: null
            };
        },
    },
    Cycle:{
        screen: Cycle,
        navigationOptions: ({navigation}) => {
            return {
                header: null
            };
        },
    },
    Ovulation:{
        screen: Ovulation,
        navigationOptions: ({navigation}) => {
            return {
                header: null
            };
        },
    },
    Pregnancy:{
        screen: Pregnancy,
        navigationOptions: ({navigation}) => {
            return {
                header: null
            };
        },
    },
    Password:{
        screen: Password,
        navigationOptions: ({navigation}) => {
            return {
                header: null
            };
        },
    },
    AddPassword:{
        screen: AddPassword,
        navigationOptions: ({navigation}) => {
            return {
                header: null
            };
        },
    },
    UpdatePassword:{
        screen: UpdatePassword,
        navigationOptions: ({navigation}) => {
            return {
                header: null
            };
        },
    },
    Sex:{
        screen: Sex,
        navigationOptions: ({navigation}) => {
            return {
                header: null
            };
        },
    },
    Periods:{
        screen: Periods,
        navigationOptions: ({navigation}) => {
            return {
                header: null
            };
        },
    },
    Calender:{
        screen: Calender,
        navigationOptions: ({navigation}) => {
            return {
                title: 'Pregnancy Calender',
                backgroundColor: 'orange',
            };
        },
    },
    Dashboard:{
        screen: Dashboard,
        navigationOptions: ({navigation}) => {
            return {
                header: null,
            };
        },
    },
});
const AppContainer = createAppContainer(AuthStack);
export default AppContainer;

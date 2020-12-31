import firebase from '../fb';


export function getBlogs(){
    return(dispatch) => {
        firebase.database().ref('/blogs').on('value', snapshot=>{
            dispatch({
                type: "BLOGS_FETCH",
                payload : snapshot.val()
            })
        })
    }
}

export function pwd(password, id) {
    return(dispatch)=>{
        firebase.database().ref('/users').child(id).child('password').set({password:password})
    }

}
export function newUserData(id, bleeding_days, menstrual_cycle, last_period) {
    return(dispatch)=>{
        firebase.database().ref('/users').child(id).child('data').set({BleedingDays:bleeding_days, MenstrualCycle:menstrual_cycle, LastPeriod:last_period})
    }

}
export function periodDay(id, period_day) {
    return(dispatch)=>{
        firebase.database().ref('/users').child(id).child('PeriodDay').set({PeriodDay:period_day})
    }

}export function nextPeriod(id, next_period) {
    return(dispatch)=>{
        firebase.database().ref('/users').child(id).child('NextPeriod').set({NextPeriod:next_period})
    }

}export function fertile(id, fertile) {
    return(dispatch)=>{
        firebase.database().ref('/users').child(id).child('fertile').set({NextFertile:fertile})
    }

}
export function periods(id, start_date, end_date) {
    return(dispatch)=>{
        firebase.database().ref('/users').child(id).child('periods').set({StartDate:start_date, EndDate:end_date})
    }

}
export function sex(id, date) {
    return(dispatch)=>{
        firebase.database().ref('/users').child(id).child('sex').set({LastSex:date})
    }

}
export function menstrualCycle(id, menstrual_cycle) {
    return(dispatch)=>{
        console.log("Menstrual Cycle", menstrual_cycle);
        firebase.database().ref('/users').child(id).child('MenstrualCycle').set({MenstrualCycle:menstrual_cycle})
    }

}
export function pregnancy(id, pregnancy) {
    return(dispatch)=>{
        firebase.database().ref('/users').child(id).child('pregnancy').set({pregnancy:pregnancy})
    }

}
export function bleedingDays(id, bleedingDays) {
    return(dispatch)=>{
        firebase.database().ref('/users').child(id).child('bleedingDays').set({BleedingDays:bleedingDays})
    }

}

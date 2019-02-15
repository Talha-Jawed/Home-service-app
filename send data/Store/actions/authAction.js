import actionTypes from '../Constant/Constant'
import firebase from '../../Config/firebase/index'
import { StackActions, NavigationActions } from 'react-navigation';


// Fb LogIn
export function fb_Action(type, token) {
    return dispatch => {
        if (type === 'success') {
            const credential = firebase.auth.FacebookAuthProvider.credential(token)

            firebase.auth().signInAndRetrieveDataWithCredential(credential).then((success) => {
                console.log(success.additionalUserInfo.profile.name, 'success******');
                var currentUID = success.user.uid
                var obj = {
                    Name: success.additionalUserInfo.profile.name,
                    UID: success.user.uid,
                    Photo: success.user.photoURL,
                    Token: token
                }
                firebase.database().ref('/UserData/' + currentUID).update(obj);

            })
                .catch((error) => {
                    console.log(error, '********');
                    alert(error)
                })
            console.log("fb login");

        } else {
            type === 'cancel'
        }

    }
}

// Google LogIn

export function Google_Action(currentUID, obj) {
    return dispatch => {
        dispatch(
            { type: actionTypes.UID, payload: currentUID }
        )
        dispatch(
            { type: actionTypes.USER, payload: obj }
        )
    }
}


// current User
export function current_User(currentUser) {
    return dispatch => {
        const UID = currentUser.uid
        var arr = [];
        dispatch(
            { type: actionTypes.UID, payload: UID }
        )
        firebase.database().ref('/UserData/').on('child_added', snapShot => {
            const UserData = snapShot.val();
            if (snapShot.key === currentUser.uid) {
                dispatch(
                    { type: actionTypes.USER, payload: snapShot.val() }
                )
            }
            else {
                arr.push(snapShot.val())
                dispatch(
                    { type: actionTypes.ALLUSER, payload: arr }
                )
            }
        })
       
    }
}

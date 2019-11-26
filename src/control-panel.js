import { Dispatcher, Store } from './flux'; // import Dispatcher and Store constructors

const controlPanelDispathcer = new Dispatcher(); // Instantiation of the Dispatcher for the control panel

const UPDATE_USERNAME = 'UPDATE_USERNAME'; // const for actions
const UPDATE_FONT_SIZE_PREFERENCE = 'UPDATE_FONT_SIZE_PREFERENCE';

const userNameUpdateAction = name => { // An action to update userName, 1 parameter 'name'
    return {
        type: UPDATE_USERNAME,
        value: name
    }
}

const fontSizePreferenceUpdateAction = size => { // an action to change font size
    return {
        type: UPDATE_FONT_SIZE_PREFERENCE,
        value: size
    }
}

document.getElementById('userNameInput').addEventListener('input', ({target})=>{ // Adds Event Listener to the Input to use Dispatcher to dispatch the Update name action
    const name = target.value; 
    console.log("Dispatching...", name);
    controlPanelDispathcer.dispatch(userNameUpdateAction(name));

})

document.forms.fontSizeForm.fontSize.forEach(element=>{
    element.addEventListener('change', ({target})=>{
        controlPanelDispathcer.dispatch(fontSizePreferenceUpdateAction(target.value));
    })
})

class UserPrefsStore extends Store {
    getInitialState(){
        return {
            username: 'Jim',
            fontSize: 'small'
        }
    }
    __onDispatch(action){
        console.log('Store received dispatch', action);
        this.__emitChange();
    }
    getUserPrefeerences() {
        return this.__state;
    }
}

const userPrefsStore = new UserPrefsStore(controlPanelDispathcer);

userPrefsStore.addListener(state=>{
    console.info('the current state is...', state);
})

controlPanelDispathcer.register(action=>{
    console.info("Received action...", action);
})
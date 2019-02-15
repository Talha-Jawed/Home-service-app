import { createStackNavigator, createAppContainer, createDrawerNavigator, createMaterialTopTabNavigator } from 'react-navigation';
import LogIn from '../Screen/Authentication/Auth'
import Home from '../Screen/Dashboard'
import PhoneScreen from '../Screen/Authentication/PhotoAndNum'
import AddService from '../Screen/Add Services/AddServices'


const StackNavigator = createStackNavigator({
    LogIn: {
        screen: LogIn
    },
    Home: {
        screen: Home
    },
    PhoneScreen:{
        screen: PhoneScreen
    },
    AddService:{
        screen: AddService
    }
})
const Navigation = createAppContainer(StackNavigator)
export default Navigation;
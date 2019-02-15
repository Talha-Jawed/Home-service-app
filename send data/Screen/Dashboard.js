import React from 'react';
import { View, ScrollView, Alert, Text, TextInput, StyleSheet, Platform, Button, TouchableOpacity, ActivityIndicator, Dimensions } from 'react-native';
import firebase from 'firebase'
import { StackActions, NavigationActions } from 'react-navigation';
import { connect } from 'react-redux'
import { ThemeProvider, Header, Input, Card, ListItem, } from 'react-native-elements';
import Menu, { MenuItem, MenuDivider } from 'react-native-material-menu';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Constants, Location, Permissions } from 'expo';

class Home extends React.Component {
  constructor() {
    super()
    this.state = {
      alluser: null,
      CurrentUser: '',
      currentUID: '',
      loading: false,
      Name: '',
      search: '',
      _search: false,
      image: '',
      where: { lat: null, lng: null },
    }
  }

  componentDidMount() {
    const { alluser, CurrentUser, UID } = this.props;
    if (alluser) {
      setTimeout(() => {
        this.setState({ alluser, loading: true, image: CurrentUser.Photo, currentUID: UID })
      }, 100);
    }
    if (!Constants.isDevice) {
      this.setState({
        errorMessage: 'Oops, this will not work on Sketch in an Android emulator. Try it on your device!',
      });
    } else {
      this._getLocationAsync();
    }
  }

  _getLocationAsync = async () => {
    let { status } = await Permissions.askAsync(Permissions.LOCATION);
    if (status !== 'granted') {
      this.setState({
        errorMessage: 'Permission to access location was denied',
      });
    }

    let location = await Location.getCurrentPositionAsync({});
    console.log('where==>', location);
    this.setState({
      location,
      where: { lat: location.coords.latitude, lng: location.coords.longitude },
    });
  };
  componentDidUpdate() {
    const { currentUID, location } = this.state
    if (!location) {
      
      setTimeout(() => {
        this.sendLocation()
      }, 13000);
    }
  }

  sendLocation() {
    const { currentUID, location } = this.state
    if (location) {
      console.log('===', currentUID);

      const obj = {
        where: { lat: location.coords.latitude, lng: location.coords.longitude },
      }
      firebase.database().ref('/UserData/' + currentUID).update(obj);
    } else {
      alert('Please Turn on Your Location!')
      this._getLocationAsync();
    }
  }

  LogOut() {
    firebase.auth().signOut()
      .then(function () {
        console.log('logout***');
      })
    const resetAction = StackActions.reset({
      index: 0,
      actions: [
        NavigationActions.navigate({ routeName: 'LogIn' }),
      ]
    })
    this.props.navigation.dispatch(resetAction)
  }

  setMenuRef = ref => {
    this._menu = ref;
  };

  hideMenu = () => {
    this._menu.hide();
  };

  showMenu = () => {
    this._menu.show();
    this.setState({ _search: false })
  };

  startSearch() {
    this.setState({ _search: true })
  }

  searchItem() {
    this.setState({ _search: false })
  }
  AddService() {
    this._menu.hide();
    this.props.navigation.navigate('AddService')
  }

  static navigationOptions = { header: null }

  render() {
    const { alluser, where, loading, location, _search, image, currentUID, contact } = this.state
    // console.log('allUser', alluser);
    // console.log('currentUID==>', currentUID);
    

    return (
      <View style={{ flex: 1 }}>
        <Header
          placement="left"
          rightComponent={{ icon: 'search', color: 'white', onPress: () => this.startSearch() }}
          centerComponent={{ text: 'Home', style: { color: '#fff' } }}
          leftComponent={{ icon: 'menu', color: '#fff', onPress: () => this.showMenu() }}
        />
        <Menu
          ref={this.setMenuRef}
          button={<Text></Text>}
        >
          <MenuItem onPress={() => this.AddService()}>Add Services</MenuItem>
          <MenuItem onPress={this.hideMenu}>Menu item 2</MenuItem>
          <MenuItem onPress={this.hideMenu} disabled>
            Menu item 3
          </MenuItem>
          <MenuDivider />
          <MenuItem onPress={() => this.LogOut()}>Log Out</MenuItem>
        </Menu>
        <ScrollView >

          <View style={styles.container}>
            {!loading ?
              <ActivityIndicator size="large" color="#0000ff" />
              :
              <View >
                {
                  _search
                  &&
                  this.searchComponent()
                }
                <View>
                  <Text style={styles.heading}>Categoris Near By You!</Text>
                </View>
                <ScrollView
                  horizontal={true}
                  // scrollEnabled={scrollEnabled}
                  // style={{ flex: 1 }}
                  pagingEnabled={true}
                // onContentSizeChange={this.onContentSizeChange}
                // contentContainerStyle={styles.Scrollview}
                >
                  <View style={{ height: 300, width: 200, flexDirection: 'row' }} >
                    <Card
                      title='HELLO WORLD'
                      image={source = { uri: image }} style={{ size: 100 }}>
                      <Text style={{ marginBottom: 2 }}>
                        full stack developer
  </Text>
                      <Button
                        icon={<Icon name='code' color='#ffffff' />}
                        backgroundColor='#03A9F4'
                        buttonStyle={{ borderRadius: 0, marginLeft: 0, marginRight: 0, marginBottom: 0 }}
                        title='VIEW NOW' />
                    </Card>
                    <Card
                      title='HELLO WORLD'
                      image={source = { uri: image }}>
                      <Text style={{ marginBottom: 5 }}>
                        full stack developer
  </Text>
                      <Button
                        icon={<Icon name='code' color='#ffffff' />}
                        backgroundColor='#03A9F4'
                        buttonStyle={{ borderRadius: 0, marginLeft: 0, marginRight: 0, marginBottom: 0 }}
                        title='VIEW NOW' />
                    </Card>
                    <Card
                      title='HELLO WORLD'
                      image={source = { uri: image }}>
                      <Text style={{ marginBottom: 5 }}>
                        full stack developer
  </Text>
                      <Button
                        icon={<Icon name='code' color='#ffffff' />}
                        backgroundColor='#03A9F4'
                        buttonStyle={{ borderRadius: 0, marginLeft: 0, marginRight: 0, marginBottom: 0 }}
                        title='VIEW NOW' />
                    </Card>
                    <Card
                      title='HELLO WORLD'
                      image={source = { uri: image }}>
                      <Text style={{ marginBottom: 5 }}>
                        full stack developer
  </Text>
                      <Button
                        icon={<Icon name='code' color='#ffffff' />}
                        backgroundColor='#03A9F4'
                        buttonStyle={{ borderRadius: 0, marginLeft: 0, marginRight: 0, marginBottom: 0 }}
                        title='VIEW NOW' />
                    </Card>
                  </View>
                </ScrollView>
                {
                  !contact &&

                  <View>
                    <Text style={styles.heading}>Contact User's!</Text>
                    <ScrollView horizontal>
                      <View style={{ height: 300, width: 200, flexDirection: 'row', flex: 1 }}>

                        <Card
                          style={{ borderRadius: 0, marginLeft: 0, marginRight: 0, marginBottom: 0 }}
                          title='HELLO WORLD'
                          image={source = { uri: image }}>
                          <Text style={{ marginBottom: 5 }}>
                            full stack developer
  </Text>
                          <Button
                            icon={<Icon name='code' color='#ffffff' />}
                            backgroundColor='#03A9F4'
                            buttonStyle={{ borderRadius: 0, marginLeft: 0, marginRight: 0, marginBottom: 0 }}
                            title='VIEW NOW' />
                        </Card>
                        <Card
                          title='HELLO WORLD'
                          image={source = { uri: image }}>
                          <Text style={{ marginBottom: 5 }}>
                            full stack developer
  </Text>
                          <Button
                            icon={<Icon name='code' color='#ffffff' />}
                            backgroundColor='#03A9F4'
                            buttonStyle={{ borderRadius: 0, marginLeft: 0, marginRight: 0, marginBottom: 0 }}
                            title='VIEW NOW' />
                        </Card>
                        <Card
                          title='HELLO WORLD'
                          image={source = { uri: image }}>
                          <Text style={{ marginBottom: 5 }}>
                            full stack developer
  </Text>
                          <Button
                            icon={<Icon name='code' color='#ffffff' />}
                            backgroundColor='#03A9F4'
                            buttonStyle={{ borderRadius: 0, marginLeft: 0, marginRight: 0, marginBottom: 0 }}
                            title='VIEW NOW' />
                        </Card>
                      </View>
                    </ScrollView>
                  </View>
                }
              </View>
            }
          </View>
        </ScrollView>
      </View>
    );
  }
  searchComponent() {
    const { search } = this.state
    return (
      <View style={{ flex: 1, justifyContent: 'space-around', flexDirection: 'row' }}>
        <TextInput
          style={styles.input}
          onChangeText={(e) => this.setState({ search: e })}
          value={search}
          placeholder={'Search ...'}
          placeholderTextColor='rgba(255,255,255,0.7)'
          autoFocus
        />
        <Text onPress={() => this.searchItem()} style={{ fontSize: 18, fontWeight: 'bold', color: "#3498db", paddingTop: 10 }}>
          Search
       </Text>
      </View>
    )
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 0,
    backgroundColor: '#fff',
    // alignItems: 'center',
    // justifyContent: 'center',
  },
  input: {
    // margin: 10,
    backgroundColor: 'rgba(99, 172, 221,0.5)',
    marginBottom: 10,
    color: '#fff',
    height: 40,
    width: 225,
    paddingHorizontal: 10,
    fontSize: 18,
    borderRadius: 20
  },
  heading: {
    fontSize: 20,
    fontWeight: 'bold',
    paddingLeft: 8,
    paddingBottom: 2,
    paddingTop: 10,
    textDecorationLine: 'underline'
  }
});


function mapStateToProps(states) {
  return ({
    UID: states.authReducers.UID,
    CurrentUser: states.authReducers.USER,
    alluser: states.authReducers.ALLUSER,

  })
}

function mapDispatchToProps(dispatch) {
  return ({
    // userAuth: (Email, Password) => {
    //     dispatch(userAction(Email, Password));
    // }
  })
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);
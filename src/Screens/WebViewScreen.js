import React,{Component} from 'react'
import { View, StyleSheet, BackHandler} from 'react-native'
import { Button, Icon } from "native-base";

import { WebView } from "react-native-webview";
class WebViewScreen extends Component {
  constructor(props) {
    super(props);
    this._webRef = null;
    this.state = {
      initialLink: "",
      history: [],
      canGoBack: false,
      canGoForward: false,
      key: 1,
    };
  }
  componentDidMount = () => {
    this.setState({
      initialLink: this.props.link,
      history: [this.props.link],
    });
    BackHandler.addEventListener("hardwareBackPress", this.handleBackButton);
  };

  componentWillUnmount() {
    BackHandler.removeEventListener("hardwareBackPress", this.handleBackButton);
  }

  goBack =()=>this._webRef.goBack();

  handleBackButton = () => {
    const { canGoBack } = this.state;
    if (this._webRef && canGoBack) {
      this.goBack();
      return true;
    } else {
      this.props.onChangeTab(0);
      return true;
    }
  };

  render() {
    return (
      <View style={styles.wrapper}>
        <WebView
          key={this.state.key}
          allowsFullscreenVideo
          style={{
            flex: 1,
          }}
          ref={(el) => (this._webRef = el)}
          source={{ uri: this.props.link }}
          onNavigationStateChange={(navState) => {
            this.setState({
              canGoBack: navState.canGoBack,
              canGoForward: navState.canGoForward,
              history: [...this.state.history, navState.url],
            });
          }}
        />
        <View style={styles.navigation}>
          <Button
            disabled={!this.state.canGoBack}
            onPress={this.goBack}
            style={styles.btn}
          >
            <Icon name="arrow-back" />
          </Button>
          <Button
            onPress={() => this.props.onChangeTab(0)}
            style={styles.btn}
          >
            <Icon name="home" />
          </Button>
          <Button onPress={() => this._webRef.reload()} style={styles.btn}>
            <Icon name="refresh" />
          </Button>
          <Button
            disabled={!this.state.canGoForward}
            onPress={() => this._webRef.goForward()}
            style={styles.btn}
          >
            <Icon name="arrow-forward" />
          </Button>
        </View>
      </View>
    );
  }
};

const styles = StyleSheet.create({
    wrapper :{
        flex:1,
    },
    navigation:{
      paddingVertical: 10,
      flexDirection:"row",
      justifyContent: "center",
      backgroundColor:"rgba(255,255,255,0.8)"
    },
    btn:{
      marginHorizontal: 10
    }
})
export default WebViewScreen;


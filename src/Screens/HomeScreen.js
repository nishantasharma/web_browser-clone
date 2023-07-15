import React,{Component} from 'react'
import { Text, StyleSheet, Image, FlatList, Platform, TouchableOpacity, StatusBar } from 'react-native'
import {
  Container,
  Content,
  Input,
  Icon,
  Item,
  View,
  Tab,
  Tabs,
  TabHeading,
  ScrollableTab,
} from "native-base";
import { ITEMS } from '../config/CONSTANTS';
import WebViewScreen from './WebViewScreen';
export default class HomeScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeTabs: [],
    };
    this._tabsRef = null;
  }

  handleTabs = (item) => {
    const contains = this.state.activeTabs.filter((tab) => tab.id === item.id);
    if (!contains.length) {
      this.setState(
        {
          activeTabs: [...this.state.activeTabs, item],
        },
        () => {
          let currentIndex = this.state.activeTabs.findIndex(
            (tab) => tab.id === item.id
          );
          this.onChangeTab(currentIndex +1);
        }
      );
    } else {
      let currentIndex = this.state.activeTabs.findIndex(
        (tab) => tab.id === item.id
      );
      this.onChangeTab(currentIndex +1);
    }
  };
  onChangeTab = (index) => {
    setTimeout(() => this._tabsRef.goToPage(index), 10);
  };
  handleCloseTabs = (index) => {
    let newState = this.state.activeTabs;
    newState.splice(index, 1);
    this.setState({ activeTabs: newState });
    this.onChangeTab(0);
  };
  renderTabs = () =>
    this.state.activeTabs.map((tab, index) => (
      <Tab
        tabStyle={{
          backgroundColor: "#fff",
        }}
        heading={
          <TabHeading>
            <Image style={{ height: 20, width: 20 }} source={tab.icon} />
            <Text style={styles.tabHeading}>{tab.name}</Text>
            <TouchableOpacity onPress={() => this.handleCloseTabs(index)}>
              <View style={styles.tabCloseBtn}>
                <Icon name="close" style={styles.closeIcon} />
              </View>
            </TouchableOpacity>
          </TabHeading>
        }
        key={tab.id}
      >
        <View style={{ flex: 1 }}>
          <WebViewScreen link={tab.link} onChangeTab={this.onChangeTab} />
        </View>
      </Tab>
    ));

  render() {
    return (
      <Container>
        <Content
          contentContainerStyle={{
            flex: 1,
          }}
        >
          <StatusBar
            barStyle={
              Platform.OS === "android" ? "light-content" : "dark-content"
            }
          />
          <Tabs
            initialPage={0}
            ref={(component) => (this._tabsRef = component)}
            locked
            renderTabBar={() => (
              <ScrollableTab
                tabsContainerStyle={{
                  justifyContent: "flex-start",
                }}
              />
            )}
          >
            <Tab
              heading={
                <TabHeading>
                  <Icon name="home" />
                  <Text style={styles.tabHeading}>Home</Text>
                </TabHeading>
              }
            >
              <View padder>
                <Item>
                  <Input placeholder="Search" />
                  <Icon name="search" />
                </Item>
                <View style={styles.wrapper}>
                  {ITEMS.map((catItem, index) => (
                    <View style={styles.item} key={catItem.id}>
                      <View style={styles.category}>
                        <Text style={styles.categoryText}>
                          {catItem.category}
                        </Text>
                      </View>
                      <FlatList
                        data={catItem.items}
                        numColumns={5}
                        keyExtractor={(item) => item.id}
                        renderItem={({ item }) => (
                          <TouchableOpacity
                            onPress={() => this.handleTabs(item)}
                          >
                            <View style={styles.innerItem}>
                              <View style={styles.iconWrapper}>
                                <Image style={styles.icon} source={item.icon} />
                                {this.state.activeTabs.includes(item) && (
                                  <View style={styles.activeIcon} />
                                )}
                              </View>
                              <Text>{item.name}</Text>
                            </View>
                          </TouchableOpacity>
                        )}
                      />
                    </View>
                  ))}
                </View>
              </View>
            </Tab>
            {this.renderTabs()}
          </Tabs>
        </Content>
      </Container>
    );
  }
}


const styles = StyleSheet.create({
  wrapper: {
    paddingTop: 20,
  },
  category: {
    borderColor: "#d3d3d3",
    borderBottomWidth: 1,
    marginBottom: 8,
  },
  categoryText: {
    fontWeight: "bold",
    fontSize: 20,
    marginBottom: 5,
  },
  item: {
    marginVertical: 20,
  },
  icon: {
    height: 40,
    width: 40,
    resizeMode: "contain",
  },
  innerItem: {
    paddingHorizontal: 10,
    marginBottom: 10,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  tab: {
    padding: 12,
    borderRadius: 8,
    color: "#666",
    backgroundColor: "#eaeaea",
  },
  tabHeading: {
    color: Platform.OS === "android" ? "white" : undefined,
    marginLeft: 10,
  },
  tabCloseBtn: {
    marginLeft: 15,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    height: 20,
    width: 20,
    borderRadius: 10,
    backgroundColor: "rgba(0,0,0,0.2)",
    padding: 5,
  },
  closeIcon: {
    fontSize: 15,
    padding: 0,
    margin: 0,
    color: Platform.OS === "android" ? "#d3d3d3" : undefined,
  },
  iconWrapper: {
    position: "relative",
  },
  activeIcon: {
    position: "absolute",
    top: 0,
    right: -3,
    height: 14,
    width: 14,
    borderRadius: 7,
    borderColor: "white",
    borderWidth: 2,
    backgroundColor: "rgb(255,0,0)",
  },
});
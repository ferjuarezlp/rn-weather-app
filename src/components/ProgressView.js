import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Modal,
  Image,
  ActivityIndicator
} from 'react-native';

class ProgressView extends Component {
    constructor(props) {
      super(props);
      this.state = {
        isLoading: this.props.isLoading
      }
    }
  
    static getDerivedStateFromProps(nextProps) {
      return {
        isLoading: nextProps.isLoading
      };
    }
  
    render() {
      return (
        <Modal
          transparent={true}
          animationType={'none'}
          visible={this.state.isLoading}
          style={{ zIndex: 1100 }}
          onRequestClose={() => { }}>
          <View style={styles.modalBackground}>
            <View style={styles.activityIndicatorWrapper}>
              <ActivityIndicator animating={this.state.loading} size="large" color="#0000ff" />
              
  
              {/* If you want to image set source here */}
              {/* <Image
                source={require('../assets/images/loader.gif')}
                style={{ height: 80, width: 80 }}
                resizeMode="contain"
                resizeMethod="resize"
              /> */}
            </View>
          </View>
        </Modal>
      )
    }
  }
  
  const styles = StyleSheet.create({
    modalBackground: {
      flex: 1,
      alignItems: 'center',
      flexDirection: 'column',
      justifyContent: 'space-around',
      backgroundColor: '#rgba(0, 0, 0, 0.5)',
      zIndex: 1000
    },
    activityIndicatorWrapper: {
      backgroundColor: '#FFFFFF',
      height: 50,
      width: 50,
      borderRadius: 10,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-around'
    }
  });
  
  export default ProgressView
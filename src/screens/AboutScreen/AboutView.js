import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  ScrollView, View, Text, Image, Linking
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import styles from './style.js';
import config from '../../config';

class AboutView extends Component {

  constructor(props) {
    super(props);
    this.state = {
      conference: {},
    };
  }

  componentDidMount() {
    const { getInfo } = this.props;
    getInfo();
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.completed) {
      this.setState({
        conference: nextProps.conference,
        error: nextProps.error,
        completed: nextProps.completed
      });
    }
  }

  render() {
    return (
      <ScrollView>
        <Image
          source={{uri: this.props.conference.banner}}
          style={styles.banner}
        />
        <View style={styles.container}>
          <Text style={styles.title}>{this.props.conference.name}</Text>
          <View style={styles.info}>
            <Icon.Button name="calendar" backgroundColor="transparent" color={config.PRIMARY_BG_COLOR}>
              <Text>{this.props.conference.date}</Text>
            </Icon.Button>
            <Icon.Button name="map-pin" backgroundColor="transparent" color={config.PRIMARY_BG_COLOR}>
              <Text>{(this.props.conference.location||{}).city}</Text>
            </Icon.Button>
          </View>
          <Text style={styles.description}>{this.props.conference.description}</Text>
          <View style={styles.author}>
            <Image
              source={{uri: 'https://www.bof.co.uk/application/files/cache/d1793653bf163a9e4fac035e5b67b349.jpg'}}
              style={styles.avatar}
            />
            <View>
              <Text style={styles.name}>Organiser:</Text>
              <Text>Oesophageal cancer clinical and molecular stratification (OCCAMS) </Text>
              <Text style={styles.link} onPress={() => Linking.openURL('https://www.mrc-cu.cam.ac.uk/research/rebecca-fitzgerald/clinical-studies/occams')}>https://www.mrc-cu.cam.ac.uk/research/rebecca-fitzgerald/clinical-studies/occams</Text>
              <Text></Text>
              <Text style={styles.name}>Privacy Policy:</Text>
              <Text style={styles.link} onPress={() => Linking.openURL('https://c4cam.github.io/conference-app/')}>https://c4cam.github.io/conference-app/</Text>
            </View>
          </View>
        </View>
      </ScrollView>
    );
  }

}

AboutView.propTypes = {
  getInfo: PropTypes.func.isRequired,
  navigation: PropTypes.object.isRequired,
  conference: PropTypes.object.isRequired
};

export default AboutView;

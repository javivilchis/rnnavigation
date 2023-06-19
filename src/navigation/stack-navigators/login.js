import { useState } from 'react';
import { Pressable, ActivityIndicator, SafeAreaView, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { useNavigation, useTheme } from '@react-navigation/native';

import { connect, useDispatch } from 'react-redux';
import { bindActionCreators } from 'redux';

import { StyleFromTheme } from '../../../style';
import { ActionCreators } from '../../../store/actions';

import { AlertBox, Btn, ErrorBox, Link, MaaTextInput, Spark } from '../../../components';
import { addAlertBox } from '../../../store/actions/alertBoxActions';
import IconTwo from '../../../assets/icons/icontwo';
import MPTrace from '../../../helpers/MPTrace';
import {useTranslation} from 'react-i18next';


const Login = (props) => {
  const { t, ready, i18n } = useTranslation()
console.log(ready)
console.log(t('hello-world'))
console.log(JSON.stringify(i18n, null, 2))
  const Style = StyleFromTheme();
  const { colors } = useTheme();
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const [username, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [checkValidUsername, setValidUsername] = useState(false);
  const [seePassword, setSeePassword] = useState(false);

  // ----- user login methods -----

  const onUserLogin = () => {
    MPTrace("view/Login onUserLogin()");

    // if the password look like an authentication token, use bluenetAuthorize
    if (looksLikeAuthenticationToken(password)) {
      props.bluenetAuthorize(username, password.trim()); // trim off triggering space
      return;
    }

    const checkusername = handleCheckUsername(username);
    const checkpassword = checkPasswordValidity(password);

    if (!checkusername || !checkpassword) {
      if (typeof username === "string") {
        props.loginUser(username.toLowerCase(), password);
      }
    } else {
      alert(checkusername);
    }
  };

  const looksLikeAuthenticationToken = text => {
    /** Simplified pattern description:
     * starts with a space - this gets trimmed off
     * contains exactly 32 hexadecimal characters: 0123456789abcdef
     */
    return / [0-9a-f]{32}/.test(text);
  };

  const handleCheckUsername = (text) => {
    // no white space
    let regex = /^\S*$/;

    // setUserName(text)
    if (regex.test(text)) {
      setValidUsername(false)
      return 'There is something wrong with your username or password.';
    } else {
      setValidUsername(true);
      setUserName(text);
    }
  }

  const checkPasswordValidity = value => {
    // this check exist in MAA, applied here as a first security combat.
    /** Simplified pattern description:
     * At least 8 non-whitespace characters
     * At least 1 digit
     * At least 1 lower case letter
     * At least 1 upper case letter
     */
    const required = /^\S*(?=\S{8,})(?=\S*\d)(?=\S*[a-z])(?=\S*[A-Z])\S*$/;
    if (!required.test(value)) {
      return 'There is something wrong with your username or password.';
    }

    return null;
  };

  // -----

  const Errors = () => {
    if (props.error) {
      return [props.error];
    }

    return [];
  };

  const exampleAlertBox = () => {
    dispatch(addAlertBox({
      id: "example-big-alert",
      category: "login",
      icon: "circle-exclamation-light",
      message: "Here’s a big alert box. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    }));
  };

// change language
const languages = [{name: "en", label: "English"},{name: "es", label: "Español"}];
const LanguageItem = ({ name, label }: { name: string; label: string }) => (
  <Btn type="secondary" size={12}
    
    onPress={() => {
      i18n.changeLanguage(name); //changes the app language
    
    }}
  >
    <Text >{label}</Text>
  </Btn>
);

  // ----- return loading indicator -----

  if (props.loading) {
    return (
      <ActivityIndicator size="large" color={colors.activityIndicator} style={{ flex: 1 }} />
    );
  }

  // ----- otherwise, return login interface -----

  return (
    <SafeAreaView style={Style.loginSafeArea}>
      <View style={Style.loginView}>
        <View style={Style.loginRegionWelcome}>
          <View style={Style.loginSparkContainer}>
            <Spark />
          </View>
          <Text style={Style.loginWelcome}>Welcome to</Text>
          <Text style={Style.loginWelcome}>
            <Text style={Style.loginWelcomeBrand}>MyAmbit </Text>
            <Text>Account Mobile</Text>
          </Text>
        </View>
        <AlertBox category="login" />
        <View style={Style.loginRegionForm}>
          <ErrorBox Errors={Errors()} boxStyle={Style.loginErrorBox} />
          <View style={Style.loginInputPromptRow}>
            <Text style={Style.loginInputPrompt}>{t('LOGIN.USERNAME')}</Text>
            <Text style={Style.loginInputPromptHelp}>
              <Text>{t('LOGIN.FORGOT')} </Text>
              <Link onPress={() => navigation.navigate('Forgot Username')}>
              {t('LOGIN.USERNAME')}
              </Link>
              <Text>?</Text>
            </Text>
          </View>
          <View style={{ width: '100%' }}>
            <MaaTextInput
              autoCapitalize="none"
              editable={!props.loading}
              onChangeText={text => setUserName(text)}
              value={username}
            />
            <View style={Style.loginInputPromptRow}>
              <Text style={Style.loginInputPrompt}>{t('LOGIN.PASSWORD')}</Text>
              <Text style={Style.loginInputPromptHelp}>
                <Text>{t('LOGIN.FORGOT')} </Text>
                <Link onPress={() => navigation.navigate('Forgot Password')}>
                {t('LOGIN.PASSWORD')}
                </Link>
                <Text>?</Text>
              </Text>
            </View>
            <MaaTextInput
              after={{
                icon: seePassword ? "eye-regular" : "eye-slash-regular",
                onPress: () => { setSeePassword(!seePassword) }
              }}
              autoCapitalize="none"
              editable={!props.loading}
              onChangeText={text => setPassword(text)}
              secureTextEntry={!seePassword}
              textContentType={'password'}
              value={password}
            />
          </View>
          <Btn onPress={onUserLogin}
            disabled={username == '' || password == ''}
          >
            {t('LOGIN.SIGN_IN')}
          </Btn>
        </View>

        <View style={{flexDirection: 'row'}}>
          
            {languages.map((lang) => (
              <LanguageItem {...lang} key={lang.name} />
            ))}
        
        </View>


        <View style={Style.loginRegionStart}>
          <Text style={Style.small}>{t('LOGIN.FIRST_TIME_USER')}?</Text>
          <Btn type="secondary" onPress={() => { navigation.navigate('Register') }}>
          {t('LOGIN.REGISTER')}
          </Btn>
        </View>
        <View style={Style.loginRegionFooter}>
          <Text style={Style.footerSmall}>Copyright ©2023 Ambit Energy</Text>
          <Text style={Style.footerTiny}>
            Version: 20230601.1
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default connect(
  state => ({
    error: state.session.error,
    loading: state.session.loading,
    isLoggedIn: state.session.isLoggedIn,
    token: state.session.token,
  }),
  dispatch => bindActionCreators(ActionCreators, dispatch)
)(Login);

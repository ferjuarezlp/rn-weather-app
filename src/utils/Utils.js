
 import { NativeModules, Platform } from 'react-native';

 const deviceLanguage =
 Platform.OS === 'ios'
   ? NativeModules.SettingsManager.settings.AppleLocale ||
     NativeModules.SettingsManager.settings.AppleLanguages[0]
   : NativeModules.I18nManager.localeIdentifier.split('_')[0];
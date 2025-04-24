import WebView from 'react-native-webview';

export default function HomeScreen() {
  return (
    <WebView
      source={{ uri: process.env.WEBVIEW_URL || 'http://localhost:3000' }}
    />
  );
}

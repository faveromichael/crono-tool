import React from 'react';
import {Flex, Layout} from 'antd';
import './App.css';

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyClNvOvirUsZgM21KGkt6U20-fGwcum5h0",
  authDomain: "cronotool.firebaseapp.com",
  projectId: "cronotool",
  storageBucket: "cronotool.appspot.com",
  messagingSenderId: "186464784726",
  appId: "1:186464784726:web:53e4587af1499b399e86f7",
  measurementId: "G-ZHTTZVW417"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

const {Header, Footer, Content} = Layout;

function App() {
  return (
    <div>
      <Flex gap="middle" wrap="wrap">
        <Layout className="layoutStyle">
          <Header className="headerStyle">
            AC Crono Tool
          </Header>
          <Content className="contentStyle">
          </Content>
          <Footer className="footerStyle">
          </Footer>
        </Layout>
      </Flex>
    </div>
  );
}

export default App;

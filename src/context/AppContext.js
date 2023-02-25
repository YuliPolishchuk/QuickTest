import React, {useState} from 'react';

const AppContext = React.createContext();

export const AppProvider = ({children}) => {
  /*************************************************************************** */
  /************************** BASIC SETTINGS ***************************** */
  /*************************************************************************** */

  // const [baseUrl, setBaseUrl] = useState('https://vodafone.onecg.cc');
  // const [baseUrl, setBaseUrl] = useState('http://demo.onecg.cc:8911');
  const [baseUrl, setBaseUrl] = useState('https://labapi.quicktest.ai');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phone, setPhone] = useState('');
  const [token, setToken] = useState('');
  const [clientIdForSprintTesting, setClientIdForSprintTesting] = useState('');
  const [regex, setRegex] = useState(
    /^(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])$/,
  );

  const storeFirstName = (fname) => {
    setFirstName(fname);
  };
  const storeLastName = (nam) => {
    setLastName(nam);
  };
  const storeEmail = (em) => {
    setEmail(em);
  };
  const storePassword = (pw) => {
    setPassword(pw);
  };
  const storePhone = (add) => {
    setPhone(add);
  };
  const storeToken = (token) => {
    setToken(token);
  };
  //Basic Setting end

  /*************************************************************************** */
  /************************** TEST METHODS START ***************************** */
  /*************************************************************************** */

  const [selectedTestType, setSelectedTestType] = useState('');
  const storeSelectedTestType = (STT) => {
    setSelectedTestType(STT);
  };
  const storeClientIdForSprintTesting = (st) => {
    setClientIdForSprintTesting(st);
  };




  return (
    <AppContext.Provider
      value={{
        /*************************************************************************** */
        /************************** BASIC SETTINGS ***************************** */
        /*************************************************************************** */

        baseUrl,
        firstName,
        lastName,
        email,
        phone,
        regex,
        token,
        storeFirstName,
        storeLastName,
        storeEmail,
        storePhone,
        storeToken,
        password,
        storePassword,

        /*************************************************************************** */
        /************************** TEST METHODS START ***************************** */
        /*************************************************************************** */

        selectedTestType,
        storeSelectedTestType,
        clientIdForSprintTesting,
        storeClientIdForSprintTesting



        
      }}>
      {children}
    </AppContext.Provider>
  );
};

export default AppContext;

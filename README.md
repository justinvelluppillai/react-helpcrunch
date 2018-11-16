# react-helpcrunch
A component to configure and enable HelpCrunch in your react application. If you run into issues, please submit an issue. Pull requests are also welcome!

## Usage
Inside of your application where you would be running HelpCrunch, insert `HelpCrunch`:
```js
import React from 'react';
import HelpCrunch from 'react-helpcrunch';

export class App extends React.Component {

  render () {
    const { appUser } = this.props;
    
    const user = {
      user_id: appUser.id,
      email: appUser.email,
      name: appUser.name
    };

    return (
      <div className="app">
        <HelpCrunch appID="1234" appSecret="aasdf321341304913q==" appDomain="domain" { ...user } />
      </div>
    );
  }
}
```

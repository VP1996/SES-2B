import React from 'react';
import { useStore } from '../stores/helpers/UseStore';
import { Route, Redirect, useHistory } from 'react-router-dom'

const StudentRoute = ({ component: Component, ...rest }) => {
  const { studentAuth, teacherAuth } = useStore(); //MobX persisted store
  let history = useHistory();
  return (
    <Route
      {...rest}
      render={props => {
        if (studentAuth.loggedIn) {
          return <Component {...props} /> //if logged in -> take it straight to the component it wants to go to 
        } else if (teacherAuth.loggedIn) {
          history.goBack()
        }
        return <Redirect to={
          {
            pathname: '/',
            state: {
              from: props.location
            }
          } 
        } />
      }}
    />
  );
}

export default StudentRoute;
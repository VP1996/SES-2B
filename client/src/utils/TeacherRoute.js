import React from 'react';
import { useStore } from '../stores/helpers/UseStore';
import { Route, Redirect, useHistory } from 'react-router-dom'

const TeacherRoute = ({ component: Component, ...rest }) => {
  const { teacherAuth, studentAuth } = useStore(); //MobX persisted store
  let history = useHistory();
  return (
    <Route
      {...rest}
      render={props => {
        if (teacherAuth.loggedIn) {
          return <Component {...props} /> //if logged in -> take it straight to the component it wants to go to 
        } else if (studentAuth.loggedIn) {
          history.goBack();
        }
      }}
    />
  );
}

export default TeacherRoute;
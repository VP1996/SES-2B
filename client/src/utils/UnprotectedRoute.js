import React from 'react';
import { useStore } from '../stores/helpers/UseStore';
import { Route, Redirect } from 'react-router-dom'

const UnprotectedRoute = ({ component: Component, ...rest }) => {
  const { studentAuth } = useStore(); //MobX persisted store
  const { teacherAuth } = useStore(); //MobX persisted store

  return (
    <Route
      {...rest}
      render={props => {
        if (!studentAuth.loggedIn && !teacherAuth.loggedIn ) {
          return <Component {...props} /> //just take to the component it asked to go to
        } else if (studentAuth.loggedIn) {
          return <Redirect to={
            {
              pathname: props.location.state? props.location.state.from.pathname : '/student/dashboard',
              state: {
                from: props.location
              }
            } 
          } />
        } else if (teacherAuth.loggedIn) {
          return <Redirect to={
            {
              pathname: props.location.state? props.location.state.from.pathname : '/teacher/dashboard',
              state: {
                from: props.location
              }
            } 
          } />
        }
      }}
    />
  );
}

export default UnprotectedRoute;

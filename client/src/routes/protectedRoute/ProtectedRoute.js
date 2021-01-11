import React, { Component } from "react";
import { useSelector } from "react-redux";
import { Route, Redirect } from "react-router-dom";

// 싱글페이지 주소를 새로고침 없이 안의 구성요소만 바뀌면서 화면을 보여주는 것인데, 
// 이때 주소를 받아오는 것은 history 또는 location을 사용한다. 

// 기존의 Component와 나머지(...rest)를 가져와서 render하도록 한다. 
// 단 userId 와 creatorId가 같은 경우와 그렇지 않은 경우를 구분하여 post edit를 보호하도록 한다. 
// 같지 않은 경우는 받았던 위치상태(props.location) 그대로 "/"으로 이동한다.
export const EditProtectedRoute = ({ component: Component, ...rest }) => {
  const { userId } = useSelector((state) => state.auth)
  const { creatorId } = useSelector((state) => state.post)

  return (
    <Route
      {...rest}
      render={(props) => {
        if (userId === creatorId) {
          return <Component {...props} />
        } else {
          return (
            <Redirect
              to={{
                pathname: "/",
                state: {
                  from: props.location
                }
              }}
            />
          )
        }
      }}
    />
  )
}
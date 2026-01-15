import React, { Component } from "react";
import CustomToast from "components/notifications/CustomToast";
import { store } from "redux/store";

class Toaster extends Component {
  state = {
    editedData: null,
    toast: false,
    toastify: {}
  };

  error = error => {
    if (error && error.response) {
      this.setState({
        toast: true,
        toastify: {
          message: error.response.data.message,
          styleClass: "c-danger"
        }
      });
    }
    // else if(error && error.hasOwnProperty('message')){
    //   this.setState({
    //     toast: true,
    //     toastify: {
    //       message: "Request Cancelled",
    //       styleClass: "c-danger",
    //     },
    //   });
    // }
    else {
      this.setState({
        toast: true,
        toastify: {
          message: error,
          styleClass: "c-danger"
        }
      });
    }

    if (error.response && error.response.status === 401) {
      store.dispatch({ type: "LOGOUT" });
    }
    setTimeout(() => {
      this.setState({ toast: false });
    }, 2000);
  };

  success = message => {
    this.setState({
      toast: true,
      toastify: {
        message: message,
        styleClass: "c-success"
      }
    });
    setTimeout(() => {
      this.setState({ toast: false });
    }, 2000);
  };

  info = message => {
    this.setState({
      toast: true,
      toastify: {
        message: message,
        styleClass: "c-dark"
      }
    });
    setTimeout(() => {
      this.setState({ toast: false });
    }, 2000);
  };

  render() {
    const { toastify, toast } = { ...this.state };
    return (
      <CustomToast
        width={400}
        show={toast}
        transition={true}
        position="top-right"
        className={toastify && toastify.styleClass}
        message={toastify && toastify.message}
        onCloseCLick={() => this.setState({ toast: false })}
      />
    );
  }
}

export default Toaster;

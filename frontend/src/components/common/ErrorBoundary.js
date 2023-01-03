import React from "react";
import { BankToast } from "../BankPage/BankToast";

export class ErrorBoundary extends React.Component {
    
    constructor(props) {
        super(props);
        this.state = {
            error: {
                message: "",
                description: ""
            },
            hasError: false
        };
    }

    componentDidCatch(error, errorInfo) {
        this.setState({hasError: true});
        this.setState({error:{message: "Try Again! ", description: error.message}});
    }

    render() {
        if (this.state.hasError) {
            return (
                <>
                    <BankToast error={this.state.error}/>
                    {this.props.children}
                </>
            )
        }
        return this.props.children; 
    };
}

import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

const CalculatorOperations = {
  '%': (prevValue, nextValue) => prevValue / nextValue,
  '*': (prevValue, nextValue) => prevValue * nextValue,
  '+': (prevValue, nextValue) => prevValue + nextValue,
  '-': (prevValue, nextValue) => prevValue - nextValue,
  '=': (prevValue, nextValue) => nextValue
}

class App extends Component {

  constructor(props){
    super(props);
    this.state = {
      value: null,
      _: '',
      operator: null,
      waitingForOperand: false
    }
  }

  addNumber = (digit) => {
    console.log("test");
    const { _, waitingForOperand } = this.state

    if (waitingForOperand) {
      this.setState({
        _: String(digit),
        waitingForOperand: false
      })
    } else {
      this.setState({
        _: _.length === '0' ? String(digit) : _ + digit
      })
    }
  }

  addMethods = (nextOperator) => {
    const { value, _, operator } = this.state
    const inputValue = parseFloat(_)

    if (value == null) {
      this.setState({
        value: inputValue,
        _: nextOperator,
      })
    } else if (operator) {
      const currentValue = value || 0
      const newValue = CalculatorOperations[operator](currentValue, inputValue)
      this.setState({
        value: newValue,
        _: String(newValue)
      })
    }

    this.setState({
      waitingForOperand: true,
      operator: nextOperator,
    })
  }

  handleKeyPress = (event) => {
    let a = parseInt(event.key);
    if(event.key === "Enter" || event.key === "="){
      this.addMethods("=");
    }
    if(event.key === "+"){
      this.addMethods("+");
    }
    if(event.key === "-"){
      this.addMethods("-");
    }
    if(event.key === "*"){
      this.addMethods("*");
    }
    if(event.key === "%"){
      this.addMethods("%");
    }
    if(a >= 0 || a <= 9){
      this.addNumber(a);
    }
  }

  render() {
    return (
      <div className="App">
        <div>
          <input value={this.state._} onKeyPress={this.handleKeyPress.bind(this)}/>
        </div>
        <div className="btn-container">
          <div className="numbers">
            <div className="number-row">
              <button onClick={this.addNumber.bind(this,1)}>1</button>
              <button onClick={this.addNumber.bind(this,2)}>2</button>
              <button onClick={this.addNumber.bind(this,3)}>3</button>
            </div>
            <div className="number-row">
              <button onClick={this.addNumber.bind(this,4)}>4</button>
              <button onClick={this.addNumber.bind(this,5)}>5</button>
              <button onClick={this.addNumber.bind(this,6)}>6</button>
            </div>
            <div className="number-row">
              <button onClick={this.addNumber.bind(this,7)}>7</button>
              <button onClick={this.addNumber.bind(this,8)}>8</button>
              <button onClick={this.addNumber.bind(this,9)}>9</button>
            </div>
            <div className="number-row">
              <button onClick={this.addNumber.bind(this,0)}>0</button>
            </div>
          </div>
          <div className="methods">
            <button onClick={this.addMethods.bind(this,"+")}>+</button>
            <button onClick={this.addMethods.bind(this,"-")}>-</button>
            <button onClick={this.addMethods.bind(this,"%")}>%</button>
            <button onClick={this.addMethods.bind(this,"*")}>*</button>
            <button onClick={this.addMethods.bind(this,"=")}>=</button>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
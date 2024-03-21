import React, { Component } from 'react'
import "./App.css";
import BoxClass from './component/BoxClass';
import AssetClass from './component/AssetClass';

const choice = {
    rock:{
      name:"Rock",
      img:"https://t3.ftcdn.net/jpg/02/93/71/22/360_F_293712283_EGPqlm1bxpH0ZnrngyjRBol9GnJm2ST7.jpg"
    },
  
    scissors:{
      name:"Scissors",
      img:"https://m.egamedi.com/web/product/big/202306/6b1a8e08ba5a06bad4de0a71cf2fbfb6.jpg"
    },
  
    paper:{
      name:"Paper",
      img:"https://cdn11.bigcommerce.com/s-2i5mq6440u/images/stencil/2048x2048/products/3762/9095/PlasticPaper-CutSheet__18809.1597757191.png?c=2"
    },
  
    default:{
      name:"Default",
      img:"https://miro.medium.com/v2/resize:fit:1338/0*3oJdSb7B26rt3xjJ"
    }
  };

export default class AppClass extends Component {

    constructor(){
        super();
        this.inputRef = React.createRef();
        this.state = {
            userSelect: choice.default,
            computerSelect: choice.default,
            result:"",
            coinCount: 0,
            leverage: 1,
        };
        
    }

  // const inputRef = useRef(null);

  play = (userChoice)=>{
    if(this.state.coinCount <= 0) {
      alert('To play the game, you need to recharge coins.')
      return;
    }

    // computer random 함수
    let computerChoice = this.randomChoice();

    this.setState({
        userSelect: choice[userChoice],
        computerSelect: computerChoice,
        result: this.judgement(choice[userChoice], computerChoice),
        coinCount: this.countCoin(choice[userChoice], computerChoice),
    })
  };

  handleLeverageChange = (event) => {
    this.setState({
        leverage: parseInt(event.target.value) // 선택된 레버리지를 정수형으로 변환
    });
  };

  charge = (amount)=>{
    const newAmount = parseInt(amount)
    if (this.inputRef !== null) {
        // DOM 엘리먼트에 접근하여 value를 초기화합니다.
        this.inputRef.current.value = '';
    }
    // coinCount를 업데이트합니다.
    this.setState(prevState => ({
        coinCount: prevState.coinCount + newAmount,
    }));
  }

  countCoin = (user, computer)=>{
    let newCoinCount;

    if(user.name === computer.name){
      newCoinCount = this.state.coinCount;
    }else if(user.name === "Rock") {
      newCoinCount = computer.name === "Scissors" ? this.state.coinCount+this.state.leverage*1 : this.state.coinCount-this.state.leverage*1;
    }else if(user.name === "Scissors") {
      newCoinCount = computer.name === "Paper" ? this.state.coinCount+this.state.leverage*1 : this.state.coinCount-this.state.leverage*1;
    }else if(user.name === "Paper") {
      newCoinCount = computer.name === "Rock" ? this.state.coinCount+this.state.leverage*1 : this.state.coinCount-this.state.leverage*1;
    }
  
    // 게임 코인이 0보다 작으면 0으로 설정
    if (newCoinCount < 0) {
      newCoinCount = 0;
    }
  
    return newCoinCount;
  }

  judgement = (user, computer)=>{
    if(user.name === computer.name){
      return "Tie"
    }else if(user.name === "Rock") return computer.name === "Scissors" ? "Win" : "Lose";
    else if(user.name === "Scissors") return computer.name === "Paper" ? "Win" : "Lose";
    else if(user.name === "Paper") return computer.name === "Rock" ? "Win" : "Lose";
  }

  // computer random 함수
  randomChoice = ()=>{
    // default 제외하고 배열 생성
    let itemArray = Object.keys(choice).filter(key => key !== 'default');

    let randomItem = Math.floor(Math.random() * itemArray.length);
    let final = itemArray[randomItem];

    return choice[final];
  }


  render() {
    return (
        <div className='mainView'>
        <div className='title'>
          Casino <br/>
          : Betting Rock Paper Scissors
        </div>
  
        {/* 박스 영역 */}
        <div className='mainBox'>
          <BoxClass title="Player" item={this.state.userSelect} result={this.state.result}/>
          <BoxClass title="Computer" item={this.state.computerSelect}
           result={this.state.result !== '' && (this.state.result === 'Tie' ? this.state.result : (this.state.result ==='Win' ? 'Lose' : 'Win'))}/>
        </div>
  
        {/* 버튼 영역 */}
        <div className='buttonBox'>
          <button className='button' onClick={()=>this.play("scissors")}>가위</button>
          <button className='button' onClick={()=>this.play("rock")}>바위</button>
          <button className='button' onClick={()=>this.play("paper")}>보</button>
        </div>
  
       <div className='setting'>
        {/* 레버리지 선택 영역 */}
        <div className='settingBox'>
          <div> Betting Leverage </div>
          <label>
            <input type="radio" name="leverage" value={1} checked={this.state.leverage === 1} onChange={this.handleLeverageChange} /> x1
          </label>
          <label>
            <input type="radio" name="leverage" value={2} checked={this.state.leverage === 2} onChange={this.handleLeverageChange} /> x2
          </label>
          <label>
            <input type="radio" name="leverage" value={3} checked={this.state.leverage === 3} onChange={this.handleLeverageChange} /> x3
          </label>
        </div>
  
        {/* 게임 코인 영역 */}
        <div className='assetBox'>
          <AssetClass item={this.state.coinCount}/>
        </div>
  
        {/* 코인 충전 영역 */}
        <div className='chargeBox'>
          <input type='number' className='chargeInput' placeholder='Coin Charge' ref={this.inputRef}/>
          <button className='chargeButton' onClick={()=>this.charge(this.inputRef.current.value)}> Charge </button>
        </div>
       </div>
  
      </div>
    )
  }
}

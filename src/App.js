import './App.css';
import Box from "./component/Box";
import Asset from "./component/Asset";
import { useState, useRef } from 'react';


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

function App() {

  // User State
  const[userSelect, setUserSelect] = useState(choice.default); 

  // Computer State
  const[computerSelect, setComputerSelect] = useState(choice.default);

  // Result State
  const[result, setResult] = useState('');

  // Count State
  let[coinCount, setCoinCount] = useState(0);
  const inputRef = useRef(null);

  // Leverage State
  const[leverage, setLeverage] = useState(1);

  const handleLeverageChange = (event) => {
    const selectedLeverage = parseInt(event.target.value); // 선택된 레버리지를 정수형으로 변환
    setLeverage(selectedLeverage); // 선택된 레버리지로 상태 업데이트
  };

  const charge = (amount)=>{
    const newAmount = parseInt(amount)
    setCoinCount(coinCount + newAmount);
    inputRef.current.value = '';
  }

  const play = (userChoice)=>{
    if(coinCount <= 0) {
      alert('To play the game, you need to recharge coins.')
      return;
    }

    setUserSelect(choice[userChoice]) ;

    // computer random 함수
    let computerChoice = randomChoice();
    setComputerSelect(computerChoice);

    // 결과 출력 함수
    setResult(judgement(choice[userChoice], computerChoice));

    // coin count 함수
    setCoinCount(countCoin(choice[userChoice], computerChoice));
    
  };

  const countCoin = (user, computer)=>{
    let newCoinCount;

    if(user.name === computer.name){
      newCoinCount = coinCount;
    }else if(user.name === "Rock") {
      newCoinCount = computer.name === "Scissors" ? coinCount+leverage*1 : coinCount-leverage*1;
    }else if(user.name === "Scissors") {
      newCoinCount = computer.name === "Paper" ? coinCount+leverage*1 : coinCount-leverage*1;
    }else if(user.name === "Paper") {
      newCoinCount = computer.name === "Rock" ? coinCount+leverage*1 : coinCount-leverage*1;
    }
  
    // 게임 코인이 0보다 작으면 0으로 설정
    if (newCoinCount < 0) {
      newCoinCount = 0;
    }
  
    return newCoinCount;
  }

  const judgement = (user, computer)=>{

    if(user.name === computer.name){
      return "Tie"
    }else if(user.name === "Rock") return computer.name === "Scissors" ? "Win" : "Lose";
    else if(user.name === "Scissors") return computer.name === "Paper" ? "Win" : "Lose";
    else if(user.name === "Paper") return computer.name === "Rock" ? "Win" : "Lose";

  }
  // computer random 함수
  const randomChoice = ()=>{
    // default 제외하고 배열 생성
    let itemArray = Object.keys(choice).filter(key => key !== 'default');

    let randomItem = Math.floor(Math.random() * itemArray.length);
    let final = itemArray[randomItem];

    return choice[final];
  }


  return (
    <div className='mainView'>
      <div className='title'>
        Casino <br/>
        : Betting Rock Paper Scissors
      </div>

      {/* 박스 영역 */}
      <div className='mainBox'>
        <Box title="Player" item={userSelect} result={result}/>
        <Box title="Computer" item={computerSelect}
         result={result !== '' && (result === 'Tie' ? result : (result ==='Win' ? 'Lose' : 'Win'))}/>
      </div>

      {/* 버튼 영역 */}
      <div className='buttonBox'>
        <button className='button' onClick={()=>play("scissors")}>가위</button>
        <button className='button' onClick={()=>play("rock")}>바위</button>
        <button className='button' onClick={()=>play("paper")}>보</button>
      </div>

     <div className='setting'>
      {/* 레버리지 선택 영역 */}
      <div className='settingBox'>
        <div> Betting Leverage </div>
        <label>
          <input type="radio" name="leverage" value={1} checked={leverage === 1} onChange={handleLeverageChange} /> x1
        </label>
        <label>
          <input type="radio" name="leverage" value={2} checked={leverage === 2} onChange={handleLeverageChange} /> x2
        </label>
        <label>
          <input type="radio" name="leverage" value={3} checked={leverage === 3} onChange={handleLeverageChange} /> x3
        </label>
      </div>

      {/* 게임 코인 영역 */}
      <div className='assetBox'>
        <Asset item={coinCount}/>
      </div>

      {/* 코인 충전 영역 */}
      <div className='chargeBox'>
        <input type='number' className='chargeInput' placeholder='Coin Charge' ref={inputRef}/>
        <button className='chargeButton' onClick={()=>charge(inputRef.current.value)}> Charge </button>
      </div>
     </div>

    </div>
  );
}

export default App;

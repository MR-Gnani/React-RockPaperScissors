import './App.css';
import Box from "./component/Box";
import { useState } from 'react';

// 1. 박스 2개 (title, image, result)
// 2. 가위바위보 버튼
// 3. 버튼 클릭시 클릭한 값이 박스에 랜더링
// 4. 컴퓨터는 랜덤
// 5. 3과4의 결과에 따라 승패가 정해짐
// 6. 이기면 초록, 지면 빨강, 비기면 검정



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
  }
};

function App() {

  const[userSelect, setUserSelect] = useState(null) 

  const play = (userChoice)=>{
    console.log(userChoice);
    setUserSelect(choice[userChoice]) 
  }

  return (
    <div className='mainView'>
      {/* 박스 영역 */}
      <div className='mainBox'>
        <Box title="Player" item={userSelect}/>
        {/* <Box title="Computer"/> */}
      </div>

      {/* 버튼 영역 */}
      <div className='buttonBox'>
        <button onClick={()=>play("scissors")}>가위</button>
        <button onClick={()=>play("rock")}>바위</button>
        <button onClick={()=>play("paper")}>보</button>
      </div>

    </div>
  );
}

export default App;

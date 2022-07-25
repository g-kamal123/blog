// import './App.css';
import Create from './component/Create';
import Feed from './component/Feed';
import {Post, useRender} from './component/Storage';
// import LogIn from './component/LogIn';

function App() {
  return (
    <div className="App">
      {/* <LogIn /> */}
      <Post>
        <Create />
        {useRender() &&  <Feed /> }
      </Post>
    </div>
  );
}

export default App;

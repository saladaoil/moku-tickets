
import './App.css';
import MemberList from './components/MemberList';
import Member from './components/Member';
import {Routes,Route} from "react-router-dom";
import MemberRegistration from "./components/MemberRegistration"
import NotFound from './components/NotFound';
import ReturnTickets from './components/ReturnTickets';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route exact path="/" element={<MemberList/>}/>
        <Route  exact path="/member/:member_id" element={<Member/>}/>
        <Route exact path="/member_registration" element={<MemberRegistration/>}/>
        <Route exact path="/return_tickets" element={<ReturnTickets/>}/>
        <Route exact path="*" element={<NotFound/>}/>
      </Routes>
    </div>
  );
}

export default App;

import './App.css';
import MemberList from './components/MemberList';
import Member from './components/Member';
import { Routes, Route, Outlet, Navigate, useNavigate } from 'react-router-dom';
import MemberRegistration from './components/MemberRegistration';
import NotFound from './components/NotFound';
import ReturnTickets from './components/ReturnTickets';
import Auth from './components/Auth';
import { supabase } from './services/supabase_api';
import { useState, useEffect } from 'react';

const ProtectedRoute = ({ session, redirectPath = `/auth` }) => {
  if (!session) {
    return <Navigate to={redirectPath} replace />;
  }

  return <Outlet />;
};

function App() {
  const [session, setSession] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    supabase.auth.onAuthStateChange((event, session) => {
      if (event === 'SIGNED_IN') {
        console.log('onAuthStateChange() : SIGNED_IN');
        setSession(session);
        navigate('/');
      }
      if (event === 'SIGNED_OUT') {
        console.log('onAuthStateChange() : SIGNED_OUT');
        setSession(session);
        navigate('/');
      }
    });
  }, []);

  return (
    <div className="App">
      <Routes>
        <Route path="/auth" element={<Auth />} />
        <Route element={<ProtectedRoute session={session} />}>
          <Route path="/" element={<MemberList />} />
          <Route path="/member/:member_id" element={<Member />} />
          <Route path="/member_registration" element={<MemberRegistration />} />
          <Route path="/return_tickets" element={<ReturnTickets />} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default App;

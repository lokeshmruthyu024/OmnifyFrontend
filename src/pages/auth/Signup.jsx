import React, { useState } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { usePostStore } from '../../store/Posts';
import { toast } from 'react-toastify';

const Signup = ({ open, handleClose }) => {
  const [fullName, setFullName] = useState('');
  const [userName, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const signupUser = usePostStore((state) => state.signupUser);

  const handleSignup = async () => {
    try {
      await signupUser(fullName, userName, email, password);
      handleClose();
      toast.success('signup successful, Please login!');
    } catch (err) {
      setError(err.message || 'Signup failed');
      toast.error(error);
    }
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Signup</DialogTitle>
      <DialogContent>
        <TextField label="Full Name" fullWidth margin="normal" value={fullName} onChange={e => setFullName(e.target.value)} />
        <TextField label="Username" fullWidth margin="normal" value={userName} onChange={e => setUserName(e.target.value)} />
        <TextField label="Email" fullWidth margin="normal" value={email} onChange={e => setEmail(e.target.value)} />
        <TextField label="Password" type="password" fullWidth margin="normal" value={password} onChange={e => setPassword(e.target.value)} />
        {error && <div style={{ color: 'red' }}>{error}</div>}
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button onClick={handleSignup} variant="contained">Signup</Button>
      </DialogActions>
    </Dialog>
  );
};

export default Signup;

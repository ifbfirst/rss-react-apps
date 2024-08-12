import { useNavigate } from 'react-router-dom';
import './index.css';
import { useState } from 'react';

const SecondForm = () => {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const Submitted = (event: { preventDefault: () => void }) => {
    event.preventDefault();
    alert(`${name} && ${age} && ${email} && ${password}`);
    navigate('/');
  };

  return (
    <div className="form__second">
      <h1>SecondForm </h1>

      <form onSubmit={Submitted}>
        <input
          type="text"
          placeholder="enter your name"
          onChange={(e) => setName(e.target.value)}
        ></input>
        <input
          type="text"
          placeholder="enter your age"
          onChange={(e) => setAge(e.target.value)}
        ></input>
        <input
          type="text"
          placeholder="enter your email"
          onChange={(e) => setPassword(e.target.value)}
        ></input>
        <input
          type="password"
          placeholder="enter your password"
          // onChange={(e) => setEmail(e.target.value)}
        ></input>
        <input
          type="password"
          placeholder="confirm your password"
          onChange={(e) => setEmail(e.target.value)}
        ></input>
        <select>
          <option>male</option>
          <option>female</option>
        </select>
        <label htmlFor="agreement">
          I accept Terms and Conditions agreement
        </label>
        <input
          type="checkbox"
          id="agreement"
          // onChange={(e) => setEmail(e.target.value)}
        ></input>
        <input
          type="file"
          accept="image/png, image/jpeg"
          // onChange={handleImageChange}
        />
        <button type="submit">submit</button>
      </form>
    </div>
  );
};

export default SecondForm;

import { useNavigate } from 'react-router-dom';
import './index.css';
import { useRef } from 'react';

const FirstForm = () => {
  const navigate = useNavigate();
  const inputRef = useRef<HTMLInputElement>(null);

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (inputRef.current) {
      alert('A name was submitted: ' + inputRef.current.value);
    }
    navigate('/');
  }

  return (
    <div className="form__first">
      <h1>FirstForm </h1>
      <form onSubmit={handleSubmit}>
        <input type="text" ref={inputRef} placeholder="enter your name" />

        <button type="submit">submit</button>
      </form>
    </div>
  );
};

export default FirstForm;

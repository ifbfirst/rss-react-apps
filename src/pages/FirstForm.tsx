import { Link, useNavigate } from 'react-router-dom';
import { useRef, useState } from 'react';
import {
  setAge,
  setCountry,
  setEmail,
  setGender,
  setName,
  setPassword,
} from '../store/reducer';
import { useDispatch } from 'react-redux';
import { schema } from '../constants';
import * as yup from 'yup';

const FirstForm = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const nameRef = useRef<HTMLInputElement>(null);
  const ageRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const confPasswordRef = useRef<HTMLInputElement>(null);
  const genderRef = useRef<HTMLSelectElement>(null);
  const countryRef = useRef<HTMLInputElement>(null);
  const agreementRef = useRef<HTMLInputElement>(null);

  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = {
      name: nameRef.current!.value,
      age: ageRef.current!.value,
      email: emailRef.current!.value,
      password: passwordRef.current!.value,
      confPassword: confPasswordRef.current!.value,
      gender: genderRef.current!.value,
      country: countryRef.current!.value,
      agreement: agreementRef.current!.checked,
    };
    try {
      setErrors({});
      await schema.validate(formData, { abortEarly: false });
      dispatch(setName(nameRef.current!.value));
      dispatch(setAge(+ageRef.current!.value));
      dispatch(setEmail(emailRef.current!.value));
      dispatch(setPassword(passwordRef.current!.value));
      dispatch(setGender(genderRef.current!.value));
      dispatch(setCountry(countryRef.current!.value));
      navigate('/');
      setErrors({});
    } catch (err) {
      if (err instanceof yup.ValidationError) {
        const validationErrors: { [key: string]: string } = {};
        err.inner.forEach((error) => {
          if (error.path) {
            validationErrors[error.path] = error.message;
          }
        });
        setErrors(validationErrors);
      } else {
        console.error('Unexpected error:', err);
      }
    }
  }

  return (
    <div className="form__content">
      <h2>First Form Uncontrolled</h2>
      <Link to="/">Back to Main Page</Link>
      <form onSubmit={handleSubmit}>
        <label>Enter your name</label>
        <input ref={nameRef} />
        {errors.name && <p>{errors.name}</p>}
        <label>Enter your age</label>
        <input ref={ageRef} />
        {errors.name && <p>{errors.age}</p>}
        <label>Enter email</label>
        <input ref={emailRef} />
        {errors.name && <p>{errors.email}</p>}
        <label>Enter password</label>
        <input type="password" ref={passwordRef} />
        {errors.name && <p>{errors.password}</p>}
        <label>Confirm password</label>
        <input type="password" ref={confPasswordRef} />
        {errors.name && <p>{errors.confPassword}</p>}
        <label>Select gender</label>
        <select ref={genderRef}>
          <option value="male">male</option>
          <option value="female">female</option>
        </select>
        <label>Country</label>
        <input autoComplete="country" ref={countryRef} />
        {errors.name && <p>{errors.country}</p>}
        <label className="input-file">
          <input type="file" accept="image/png, image/jpeg" />
          <span className="input-file-btn">Upload image</span>
          <span className="input-file-text"> max 2mb, .png .jpeg</span>
        </label>
        <div className="agreement-block">
          <input type="checkbox" id="agreement" ref={agreementRef} />
          <label htmlFor="agreement" className="label_active">
            I accept Terms and Conditions agreement
          </label>
        </div>
        {errors.name && <p>{errors.agreement}</p>}
        <button
          type="submit"
          className={Object.keys(errors).length > 0 ? 'disabled' : ''}
          disabled={Object.keys(errors).length > 0}
        >
          submit
        </button>
      </form>
    </div>
  );
};

export default FirstForm;

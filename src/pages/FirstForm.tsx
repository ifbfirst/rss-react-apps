import { Link, useNavigate } from 'react-router-dom';
import { useEffect, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { countries, schema } from '../constants';
import * as yup from 'yup';
import { setData } from '../store/reducer';

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
  const imageRef = useRef<HTMLInputElement>(null);
  const agreementRef = useRef<HTMLInputElement>(null);

  const [errors, setErrors] = useState<{ [key: string]: string | undefined }>(
    {}
  );
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);

  const checkFormValidity = () => {
    const name = nameRef.current?.value;
    const age = ageRef.current?.value;
    const email = emailRef.current?.value;
    const password = passwordRef.current?.value;
    const confPassword = confPasswordRef.current?.value;
    const gender = genderRef.current?.value;
    const country = countryRef.current?.value;
    const image = imageRef.current?.files;
    const agreement = agreementRef.current?.checked;

    const isValid =
      name &&
      age &&
      email &&
      password &&
      confPassword &&
      gender &&
      country &&
      image &&
      agreement;

    setIsButtonDisabled(!isValid);
  };

  useEffect(() => {
    checkFormValidity();
  }, [
    nameRef.current?.value,
    ageRef.current?.value,
    emailRef.current?.value,
    passwordRef.current?.value,
    confPasswordRef.current?.value,
    genderRef.current?.value,
    countryRef.current?.value,
    imageRef.current?.files,
    agreementRef.current?.checked,
  ]);

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
      image: imageRef.current!.files,
      agreement: agreementRef.current!.checked,
    };

    try {
      setErrors({});
      await schema.validate(formData, { abortEarly: false });
      const file = imageRef.current!.files![0];
      const reader = new FileReader();

      reader.onloadend = () => {
        const base64data = reader.result;

        const dataStore = {
          name: nameRef.current!.value,
          age: +ageRef.current!.value,
          email: emailRef.current!.value,
          password: passwordRef.current!.value,
          gender: genderRef.current!.value,
          country: countryRef.current!.value,
          image: base64data as string,
        };

        dispatch(setData(dataStore));
        navigate('/');
      };
      reader.readAsDataURL(file);
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
        <input ref={nameRef} onChange={checkFormValidity} />
        {errors.name && <p>{errors.name}</p>}
        <label>Enter your age</label>
        <input ref={ageRef} onChange={checkFormValidity} />
        {errors.age && <p>{errors.age}</p>}
        <label>Enter email</label>
        <input ref={emailRef} onChange={checkFormValidity} />
        {errors.email && <p>{errors.email}</p>}
        <label>Enter password</label>
        <input type="password" ref={passwordRef} onChange={checkFormValidity} />
        {errors.password && <p>{errors.password}</p>}
        <label>Confirm password</label>
        <input
          type="password"
          ref={confPasswordRef}
          onChange={checkFormValidity}
        />
        {errors.confPassword && <p>{errors.confPassword}</p>}
        <label>Select gender</label>
        <select ref={genderRef} onChange={checkFormValidity}>
          <option value="male">male</option>
          <option value="female">female</option>
        </select>
        <label>Country</label>
        <input list="countries" ref={countryRef} onChange={checkFormValidity} />
        <datalist id="countries">
          {countries.map((element: string) => (
            <option key={element} value={element} />
          ))}
        </datalist>
        <label className="input-file">
          <input
            type="file"
            accept="image/png, image/jpeg"
            ref={imageRef}
            onChange={checkFormValidity}
          />
          <span className="input-file-btn">Upload image</span>
          <span className="input-file-text"> max 2mb, .png .jpeg</span>
        </label>
        {errors.image && <p>{errors.image}</p>}
        <div className="agreement-block">
          <input
            type="checkbox"
            id="agreement"
            ref={agreementRef}
            onChange={checkFormValidity}
          />
          <label htmlFor="agreement" className="label_active">
            I accept Terms and Conditions agreement
          </label>
        </div>
        {errors.agreement && <p>{errors.agreement}</p>}
        <button
          type="submit"
          className={isButtonDisabled ? 'disabled' : ''}
          disabled={isButtonDisabled}
        >
          submit
        </button>
      </form>
    </div>
  );
};

export default FirstForm;

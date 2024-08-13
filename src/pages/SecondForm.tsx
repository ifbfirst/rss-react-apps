import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import {
  setAge,
  setConfPassword,
  setEmail,
  setGender,
  setName,
  setPassword,
} from '../store/reducer';

import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

const schema = yup
  .object({
    name: yup.string().required('Field required'),
    age: yup
      .number()
      .typeError('*** Age must be a number')
      .positive('*** Age must be a positive number')
      .integer('*** Age must be an integer')
      .required('*** Field required'),
    email: yup
      .string()
      .email('*** Invalid email format')
      .required('*** Field required'),
    password: yup
      .string()
      .min(6, '*** Password must contain at least 6 characters')
      .required('*** Field required'),
    confPassword: yup
      .string()
      .oneOf([yup.ref('password')], '*** Passwords must match')
      .required('*** Password confirmation is required'),
    gender: yup.string().required('*** Field required'),
  })
  .required();

const SecondForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(schema),
    mode: 'onChange',
  });
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const onSubmit = (data) => {
    dispatch(setName(data.name));
    dispatch(setAge(data.age));
    dispatch(setEmail(data.email));
    dispatch(setPassword(data.password));
    dispatch(setConfPassword(data.confPassword));
    dispatch(setGender(data.gender));
    alert('Form submitted successfully!');
    navigate('/');
  };

  return (
    <div className="form__content">
      <h2>Second Form Controlled</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <label>Enter your name</label>
        <input {...register('name')} className={errors.name ? 'invalid' : ''} />
        {errors.name && <p>{errors.name.message}</p>}

        <label>Enter your age</label>
        <input {...register('age')} className={errors.age ? 'invalid' : ''} />
        {errors.age && <p>{errors.age.message}</p>}

        <label>Enter email</label>
        <input
          {...register('email')}
          className={errors.email ? 'invalid' : ''}
        />
        {errors.email && <p>{errors.email.message}</p>}

        <label>Enter password</label>
        <input
          type="password"
          {...register('password')}
          className={errors.password ? 'invalid' : ''}
        />
        {errors.password && <p>{errors.password.message}</p>}

        <label>Confirm password</label>
        <input
          type="password"
          {...register('confPassword')}
          className={errors.password ? 'invalid' : ''}
        />
        {errors.confPassword && <p>{errors.confPassword.message}</p>}

        <label>Select gender</label>
        <select {...register('gender')}>
          <option value="male">male</option>
          <option value="female">female</option>
        </select>
        <label>Country</label>
        <input autoComplete="country" />
        <label className="input-file">
          <input type="file" accept="image/png, image/jpeg" />
          <span className="input-file-btn">Upload image</span>
          <span className="input-file-text"> max 10mb, .png .jpeg</span>
        </label>
        <div className="agreement-block">
          <input type="checkbox" id="agreement"></input>
          <label htmlFor="agreement" className="label_active">
            I accept Terms and Conditions agreement
          </label>
        </div>

        <button
          type="submit"
          disabled={Object.keys(errors).length > 0 || isSubmitting}
        >
          submit
        </button>
      </form>
    </div>
  );
};

export default SecondForm;

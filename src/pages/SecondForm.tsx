import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import {
  setAge,
  setCountry,
  setEmail,
  setGender,
  setImage,
  setName,
  setPassword,
} from '../store/reducer';

import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { countries, schema } from '../constants';
import { FormData } from '../interfaces';

const SecondForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isValid },
  } = useForm({
    resolver: yupResolver(schema),
    mode: 'onChange',
    defaultValues: {
      agreement: false,
    },
  });
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const onSubmit = (data: FormData) => {
    const file = data.image[0];

    if (file && file instanceof Blob) {
      const reader = new FileReader();

      reader.onloadend = () => {
        const base64data = reader.result;
        if (typeof base64data === 'string') {
          dispatch(setImage(base64data));
        }
        dispatch(setName(data.name));
        dispatch(setAge(data.age));
        dispatch(setEmail(data.email));
        dispatch(setPassword(data.password));
        dispatch(setGender(data.gender));
        dispatch(setCountry(data.country));
        navigate('/');
      };
      reader.readAsDataURL(file);
    } else {
      console.error('No valid file selected');
    }
  };

  return (
    <div className="form__content">
      <h2>Second Form Controlled</h2>
      <Link to="/">Back to Main Page</Link>
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
          className={errors.confPassword ? 'invalid' : ''}
        />
        {errors.confPassword && <p>{errors.confPassword.message}</p>}

        <label>Select gender</label>
        <select {...register('gender')}>
          <option value="male">male</option>
          <option value="female">female</option>
        </select>
        <label htmlFor="country">Country:</label>
        <input list="countries" {...register('country')} />
        <datalist id="countries">
          {countries.map((element: string) => (
            <option key={element} value={element} />
          ))}
        </datalist>

        <label className="input-file">
          <input type="file" {...register('image')} />
          <span className="input-file-btn">Upload image</span>
          <span className="input-file-text"> max 2mb, .png .jpeg</span>
        </label>
        {errors.image && <p>{errors.image.message}</p>}
        <div className="agreement-block">
          <input type="checkbox" id="agreement" {...register('agreement')} />
          <label htmlFor="agreement" className="label_active">
            I accept Terms and Conditions agreement
          </label>
        </div>
        {errors.agreement && <p>{errors.agreement.message}</p>}

        <button
          type="submit"
          disabled={!isValid || isSubmitting}
          className={!isValid || isSubmitting ? 'disabled' : ''}
        >
          submit
        </button>
      </form>
    </div>
  );
};

export default SecondForm;

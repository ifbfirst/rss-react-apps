import * as yup from 'yup';

export const schema = yup
  .object({
    name: yup
      .string()
      .required('*** Field required')
      .matches(/^[A-ZА-Я].*/, '*** Name must start with a capital letter'),
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
      .required('*** Field required')
      .matches(/(?=.*[0-9])/, '*** Password must contain at least one number')
      .matches(
        /(?=.*[a-z])/,
        '*** Password must contain at least one lowercase letter'
      )
      .matches(
        /(?=.*[A-Z])/,
        '*** Password must contain at least one uppercase letter'
      )
      .matches(
        /(?=.*[!@#$%^&*])/,
        '*** Password must contain at least one special character'
      ),
    confPassword: yup
      .string()
      .oneOf([yup.ref('password')], '*** Passwords must match')
      .required('*** Password confirmation is required'),
    gender: yup.string().required('*** Field required'),
    country: yup.string().required('*** Field required'),
    agreement: yup
      .boolean()
      .oneOf([true], '*** You must accept the terms')
      .required('*** Field required'),

    image: yup
      .mixed()
      .test('fileSize', '*** File size should be less than 2MB', (value) => {
        const files = value as FileList;
        const file = files && files[0];
        return file && file.size <= 2 * 1024 * 1024;
      })
      .test('fileType', '*** Only PNG and JPEG files are allowed', (value) => {
        const files = value as FileList;
        const file = files && files[0];
        return (
          file && (file.type === 'image/png' || file.type === 'image/jpeg')
        );
      }),
  })
  .required();

export const countries = [
  'Austria',
  'Belarus',
  'Bulgaria',
  'Germany',
  'Georgia',
  'Greece',
  'Finland',
  'Scotland',
];

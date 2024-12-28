import { useState } from 'react';
import { FaRegEye, FaRegEyeSlash } from 'react-icons/fa6';

// eslint-disable-next-line react/prop-types
const PasswordInput = ({ value, onChange, placeholder }) => {
	const [showPass, setshowPass] = useState(false);
	const togglePass = () => {
		setshowPass(!showPass);
	};
	return (
		<div className='flex items-center bg-transparent border-[1.5px] px-5 rounded mb-3'>
			<input
				className='w-full text-sm poppins-md bg-transparent py-3 mr-3 rounded outline-none'
				type={showPass ? 'text' : 'password'}
				onChange={onChange}
				value={value}
				placeholder={placeholder || 'password'}
			/>
			{showPass ? (
				<FaRegEye size={22} className='text-primary cursor-pointer' onClick={() => togglePass()} />
			) : (
				<FaRegEyeSlash size={22} className='text-slate-400 cursor-pointer' onClick={() => togglePass()} />
			)}
		</div>
	);
};
export default PasswordInput;

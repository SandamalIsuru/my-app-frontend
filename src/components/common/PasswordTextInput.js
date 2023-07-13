import classNames from 'classnames';
import React, { useState } from 'react';
import RemoveRedEyeOutlinedIcon from '@mui/icons-material/RemoveRedEyeOutlined';
import VisibilityOffOutlinedIcon from '@mui/icons-material/VisibilityOffOutlined';

const PasswordTextInput = ({ className, placeholder, field, error }) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div
      className={classNames(
        className,
        `flex flex-row items-center justify-center h-12 border-2 px-2.5 text-[14px] ${
          error ? 'border-errorRed' : 'border-hoverBackground'
        }`
      )}
    >
      <input
        {...field}
        type={showPassword ? 'text' : 'password'}
        className={classNames(className, 'bg-transparent w-11/12 h-full focus:outline-none mb-3 text-[14px]')}
        placeholder={placeholder}
      />
      {showPassword ? (
        <VisibilityOffOutlinedIcon onClick={() => setShowPassword(!showPassword)} />
      ) : (
        <RemoveRedEyeOutlinedIcon onClick={() => setShowPassword(!showPassword)} />
      )}
    </div>
  );
};

export default PasswordTextInput;

import React, { useContext, useEffect } from 'react';
import classNames from 'classnames';
import CircularSpinner from './CircularSpinner';
import { AppContext } from '../../appContexts';
import backgroundImage from '../../assets/images/background.jpeg';
import Logo from './Logo';

const PageWrapper = ({ className, content, isLoading }) => {
  const { setPopup } = useContext(AppContext);

  useEffect(() => {
    setPopup(null);
  }, [setPopup]);

  useEffect(() => {
    let popup = null;
    if (isLoading) {
      popup = (
        <div className="flex flex-col items-center justify-center w-[500px] h-[500px]">
          <div
            className="flex justify-center items-center w-full h-full bg-grayBackground border-borderColor border-[1px] rounded-[16px] overflow-x-auto"
            onContextMenu={(e) => e.preventDefault()}
          >
            <CircularSpinner size={60} />
          </div>
        </div>
      );
    }
    setPopup(popup);
  }, [isLoading, setPopup]);

  return <div className={classNames(className, 'h-screen w-screen')} style={{ backgroundImage: `url(${backgroundImage})` }}>
    <div className='absolute text-xl h-10 w-32 border-2 border-hoverBackground ml-6 mt-3 '>
      <Logo />
    </div>
    {content}
    </div>;
};

export default PageWrapper;

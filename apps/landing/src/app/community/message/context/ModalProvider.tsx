//THIRD PARTY MODULES
import { PropsWithChildren, createContext, useContext, useState } from 'react';

type ModalType = {
  openSetting: boolean;
  setOpenSetting: (value: boolean) => void;
  openAddChat: boolean;
  setOpenAddChat: (value: boolean) => void;
  openInfo: boolean;
  setOpenInfo: (value: boolean) => void;
  openBlock: boolean;
  setOpenBlock: (value: boolean) => void;
  openReport: boolean;
  setOpenReport: (value: boolean) => void;
  openLeave: boolean;
  setOpenLeave: (value: boolean) => void;
};

const ModalContext = createContext<ModalType>({
  openSetting: false,
  setOpenSetting: (_: boolean) => {},
  openAddChat: false,
  setOpenAddChat: (_: boolean) => {},
  openInfo: false,
  setOpenInfo: (_: boolean) => {},
  openBlock: false,
  setOpenBlock: (_: boolean) => {},
  openReport: false,
  setOpenReport: (_: boolean) => {},
  openLeave: false,
  setOpenLeave: (_: boolean) => {},
});

export const useModalContext = () => useContext(ModalContext);

const ModalContextProvider = ({ children }: PropsWithChildren) => {
  const [openSetting, setOpenSetting] = useState<boolean>(false);
  const [openAddChat, setOpenAddChat] = useState<boolean>(false);
  const [openInfo, setOpenInfo] = useState<boolean>(false);
  const [openBlock, setOpenBlock] = useState<boolean>(false);
  const [openReport, setOpenReport] = useState<boolean>(false);
  const [openLeave, setOpenLeave] = useState<boolean>(false);

  return (
    <ModalContext.Provider
      value={{
        openBlock,
        setOpenBlock,
        openReport,
        setOpenReport,
        openLeave,
        setOpenLeave,
        openSetting,
        setOpenSetting,
        openAddChat,
        setOpenAddChat,
        openInfo,
        setOpenInfo,
      }}
    >
      {children}
    </ModalContext.Provider>
  );
};

export default ModalContextProvider;

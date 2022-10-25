import React, { useState } from 'react';
import { Button } from '@material-ui/core';
import { useWallet } from 'use-wallet';
import useModal from '../../hooks/useModal';
import WalletProviderModal from '../WalletProviderModal';
import AccountModal from './AccountModal';

interface AccountButtonProps {
  text?: string;
}

const AccountButton: React.FC<AccountButtonProps> = ({ text }) => {
  const { account } = useWallet();
  const [onPresentAccountModal] = useModal(<AccountModal />);

  const [isWalletProviderOpen, setWalletProviderOpen] = useState(false);

  const handleWalletProviderOpen = () => {
    setWalletProviderOpen(true);
  };

  const handleWalletProviderClose = () => {
    setWalletProviderOpen(false);
  };

  const buttonText = text ? text : 'Unlock';

  return (
    <div>
      {!account ? (
        <Button
          onClick={handleWalletProviderOpen}
          style={{ padding: '12px 22px', background: '#282C42', borderRadius: '10px', color: '#FCFCFC' }}
        >
          {buttonText}
        </Button>
      ) : (
        <Button
          style={{ padding: '12px 22px', background: '#282C42', borderRadius: '10px', color: '#FCFCFC' }}
          onClick={onPresentAccountModal}
        >
          My Wallet
        </Button>
      )}

      <WalletProviderModal open={isWalletProviderOpen} handleClose={handleWalletProviderClose} />
      {/* <AccountModal open={isAccountModalOpen} handleClose={handleAccountModalClose}/> */}
    </div>
  );
};

export default AccountButton;

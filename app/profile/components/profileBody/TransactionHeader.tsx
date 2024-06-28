'use client';

import React from 'react';
import { Chip } from "@nextui-org/chip";
import { FaGift } from 'react-icons/fa';
import TransactionLogo from '@/public/menutransaccionlogo.svg';
import { Transaction } from '@/types/transaction';

interface TransactionHeaderProps {
  transaction: Transaction;
}

const TransactionHeader: React.FC<TransactionHeaderProps> = ({ transaction }) => {
  return (
    <div className='flex flex-col w-full'>
      <div className='flex justify-between items-center'>
        <div className='flex items-center gap-2'>
          {transaction.isPromotion ? (
            <FaGift className="w-5 h-5 text-[#fe41f0]" />
          ) : (
            <TransactionLogo className="w-5 h-5" />
          )}
          <span className='text-base font-semibold truncate'>{`#${transaction.id}: ${transaction.raffleType}`}</span>
        </div>
      </div>
      <div className='flex justify-between items-center mt-1'>
        <div className='text-xs text-default-500'>
          <span>{new Date(transaction.createdAt).toLocaleDateString()}</span>
          <span className="mx-1">•</span>
          <span>{`${transaction.totalAmount} COP`}</span>
        </div>
        <div className='flex justify-end items-center space-x-2'>
          <div className='w-20 flex items-center'>
            {transaction.isPromotion ? (
              <Chip 
                radius='full' 
                variant="bordered" 
                size="sm" 
                className="text-[#fe41f0] border-[#fe41f0] h-6 flex items-center"
              >
                Promoción
              </Chip>
            ) : <div className="w-20"></div>}
          </div>
          <Chip 
            radius='full' 
            variant="bordered" 
            size="sm" 
            className="text-yellow-500 border-yellow-500 h-6 flex items-center"
          >
            Pendiente
          </Chip>
        </div>
      </div>
    </div>
  );
};

export default TransactionHeader;

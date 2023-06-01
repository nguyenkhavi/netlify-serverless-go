'use client';
//THIRD PARTY MODULES
import sal from 'sal.js';
import 'sal.js/dist/sal.css';
import { useEffect } from 'react';

export const useSalAnim = () => {
  useEffect(() => {
    sal();
  }, []);
};

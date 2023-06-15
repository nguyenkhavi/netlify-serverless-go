'use client';
//THIRD PARTY MODULES
import sal from 'sal.js';
import 'sal.js/dist/sal.css';
import { Options } from 'sal.js';
import { useEffect } from 'react';

export const useSalAnim = () => {
  useEffect(() => {
    sal({
      threshold: 0.2,
    } as Options);
  }, []);
};

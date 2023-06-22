'use client';
//THIRD PARTY MODULES
import 'sal.js/dist/sal.css';
import { useEffect } from 'react';
import sal, { Options } from 'sal.js';

export default function useSalAnim() {
  useEffect(() => {
    sal({
      threshold: 0.2,
    } as Options);
  }, []);
}

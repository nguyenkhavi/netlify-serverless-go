//THIRD PARTY MODULES
import { PropsWithChildren } from 'react';
//HOOK
import useSal from '_@landing/hooks/useSal';

export default function AnimationProvider({ children }: PropsWithChildren) {
  useSal();
  return children;
}

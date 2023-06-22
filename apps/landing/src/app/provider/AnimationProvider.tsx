'use client';

//HOOK
import useSalAnim from '_@landing/hooks/useSalAnim';

export default function AnimationProvider({ children }: any) {
  useSalAnim();

  return children;
}

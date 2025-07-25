import type { RideService } from '@/lib/types';
import type { SVGProps } from 'react';

const UberIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
    <path d="M12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm0 22c-5.514 0-10-4.486-10-10s4.486-10 10-10 10 4.486 10 10-4.486 10-10 10zm-1-16h2v10h-2v-10zm-4-2h10v2h-10v-2z" />
  </svg>
);

const OlaIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 128 41" fill="currentColor" {...props}>
    <path d="M22.82 2.14a20.06 20.06 0 1 0 0 36.78 20.06 20.06 0 0 0 0-36.78Zm0 31.9a11.72 11.72 0 1 1 11.72-11.72A11.72 11.72 0 0 1 22.82 34Zm18.9-19.1v15.5h4.88V2.14h-4.88v10.59h-9.76V2.14h-4.88v31.9h19.52V27.46H36.84V14.94h4.88Zm21.84 0v15.5h4.88V2.14h-4.88v10.59h-9.76V2.14H54v31.9h19.52V27.46H68.68V14.94h4.88Zm24.54 17.26a16.66 16.66 0 0 1-13.78-7.08l4-2.58a11.79 11.79 0 0 0 9.77 5c5.3 0 8.78-3 8.78-7.78s-3.48-7.78-8.78-7.78a11.79 11.79 0 0 0-9.77 5l-4-2.58a16.66 16.66 0 0 1 13.78-7.08c9.35 0 13.66 5.8 13.66 12.38s-4.3 12.38-13.66 12.38Z" />
  </svg>
);

const RapidoIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
    <path d="M10.687 0l-1.84 9.165h3.948l-3.321 14.835 11.239-15.558h-6.221l5.484-8.442z" />
  </svg>
);

interface RideServiceIconProps extends SVGProps<SVGSVGElement> {
  service: RideService;
}

export const RideServiceIcon = ({ service, ...props }: RideServiceIconProps) => {
  switch (service) {
    case 'Uber':
      return <UberIcon {...props} />;
    case 'Ola':
      return <OlaIcon {...props} />;
    case 'Rapido':
      return <RapidoIcon {...props} />;
    default:
      return null;
  }
};

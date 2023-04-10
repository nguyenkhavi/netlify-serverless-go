import classcat from 'classcat'
import * as React from 'react'

export interface IBrandBannerProps {
  className?: string
}

export default function BrandBanner({ className }: IBrandBannerProps) {
  return (
    <div className={classcat(['flex justify-center', className || ''])}>
      {/* S */}
      <svg
        className="h-[45px] w-[38px] lg:h-[180px] lg:w-[154px]"
        viewBox="0 0 157 182"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M27.3311 178.525C16.9306 176.948 8.3601 174.847 1.60156 172.183L8.84932 138.844C16.0971 141.979 24.432 144.407 33.8541 146.092C43.2762 147.777 52.6983 148.629 62.1204 148.629C76.1267 148.629 86.1648 147.415 92.1986 145.005C98.2323 142.595 102.11 137.884 103.795 130.872C104.031 129.912 104.157 128.698 104.157 127.248C104.157 122.411 101.929 118.678 97.4532 116.015C92.9777 113.351 84.5884 109.854 72.2672 105.506L62.4828 102.244C48.712 97.4067 38.4927 92.1523 31.8428 86.4811C25.193 80.8099 21.8772 72.892 21.8772 62.7454C21.8772 60.8067 22.3664 56.9474 23.3267 51.1494C26.9506 34.7156 35.1587 22.3948 47.9691 14.1689C60.7795 5.96108 79.9861 1.84811 105.607 1.84811C124.687 1.84811 141.248 4.38475 155.272 9.45801L148.387 42.4524C142.353 39.7889 135.395 37.7415 127.55 36.292C119.686 34.8425 112.148 34.1177 104.9 34.1177C91.6006 34.1177 81.7618 35.2592 75.3657 37.5603C68.9695 39.8614 65.0376 44.1555 63.588 50.4246C63.3525 51.3849 63.2256 52.5989 63.2256 54.0484C63.2256 57.4366 64.494 60.2813 67.0307 62.5642C69.5674 64.8653 73.7893 67.094 79.7143 69.2682C85.6394 71.4425 92.4522 73.7436 100.189 76.1534C116.37 81.4803 127.912 87.0971 134.815 93.0039C141.701 98.9287 145.143 106.847 145.143 116.739C145.143 120.363 144.546 124.965 143.332 130.51C139.708 147.904 131.373 160.66 118.327 168.759C105.281 176.858 85.9474 180.898 60.3265 180.898C48.7301 180.898 37.7317 180.119 27.3311 178.543V178.525Z"
          stroke="url(#paint0_linear_790_4998)"
          strokeWidth="2"
          strokeMiterlimit="10"
        />
        <defs>
          <linearGradient
            id="paint0_linear_790_4998"
            x1="78.446"
            y1="182.692"
            x2="78.446"
            y2="-5.43373e-06"
            gradientUnits="userSpaceOnUse"
          >
            <stop offset="0" stopColor="#63D6B4" />
            <stop offset="0.07" stopColor="#6CD7B7" />
            <stop offset="0.2" stopColor="#85DBBF" />
            <stop offset="0.36" stopColor="#AFE2CD" />
            <stop offset="0.54" stopColor="#E8ECE1" />
            <stop offset="0.57" stopColor="#F1EEE4" />
            <stop offset="0.87" stopColor="#64D5B4" />
            <stop offset="0.99" stopColor="#64D6B3" />
          </linearGradient>
        </defs>
      </svg>

      {/* Z */}
      <svg
        className="h-[44px] w-[44px] lg:h-[171px] lg:w-[178px]"
        viewBox="0 0 183 175"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M6.42288 152.583L125.322 33.7052H35.7944L42.6798 1.43564H180.786L175.712 25.7148L58.6249 142.799H153.226L147.066 173.238H2.07422L6.42288 152.583Z"
          stroke="url(#paint0_linear_790_4999)"
          strokeWidth="2"
          strokeMiterlimit="10"
        />
        <defs>
          <linearGradient
            id="paint0_linear_790_4999"
            x1="91.421"
            y1="175.068"
            x2="91.421"
            y2="-0.376246"
            gradientUnits="userSpaceOnUse"
          >
            <stop offset="0" stopColor="#63D6B4" />
            <stop offset="0.07" stopColor="#6CD7B7" />
            <stop offset="0.2" stopColor="#85DBBF" />
            <stop offset="0.36" stopColor="#AFE2CD" />
            <stop offset="0.54" stopColor="#E8ECE1" />
            <stop offset="0.57" stopColor="#F1EEE4" />
            <stop offset="0.87" stopColor="#64D5B4" />
            <stop offset="0.99" stopColor="#64D6B3" />
          </linearGradient>
        </defs>
      </svg>

      {/* N */}
      <svg
        className="h-[44px] w-[47px] lg:h-[175px] lg:w-[191px]"
        viewBox="0 0 194 179"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M38.1172 5.43565H74.3741L72.5622 23.5545C82.2198 17.0317 92.8559 11.7772 104.452 7.7911C116.049 3.80496 128.008 1.81189 140.347 1.81189C157.741 1.81189 170.86 5.68932 179.684 13.4079C188.508 21.1447 192.911 32.2515 192.911 46.7647C192.911 52.5627 192.186 58.9767 190.737 65.9706L167.182 177.256H128.026L151.218 67.7825C152.432 61.2597 153.03 56.3133 153.03 52.9251C153.03 45.1883 150.548 39.7527 145.601 36.6181C140.637 33.4836 132.121 31.9072 120.053 31.9072C111.102 31.9072 101.988 33.7191 92.6928 37.3429C83.3794 40.9666 75.117 45.6775 67.8692 51.4756L41.4149 177.256H1.89648L38.1172 5.43565Z"
          stroke="url(#paint0_linear_790_5000)"
          strokeWidth="2"
          strokeMiterlimit="10"
        />
        <defs>
          <linearGradient
            id="paint0_linear_790_5000"
            x1="97.1683"
            y1="179.068"
            x2="97.1683"
            y2="1.19457e-05"
            gradientUnits="userSpaceOnUse"
          >
            <stop offset="0" stopColor="#63D6B4" />
            <stop offset="0.07" stopColor="#6CD7B7" />
            <stop offset="0.2" stopColor="#85DBBF" />
            <stop offset="0.36" stopColor="#AFE2CD" />
            <stop offset="0.54" stopColor="#E8ECE1" />
            <stop offset="0.57" stopColor="#F1EEE4" />
            <stop offset="0.87" stopColor="#64D5B4" />
            <stop offset="0.99" stopColor="#64D6B3" />
          </linearGradient>
        </defs>
      </svg>

      {/* I */}
      <svg
        className="h-[45px] w-[13px] lg:h-[180px] lg:w-[51px]"
        viewBox="0 0 14 46"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M4.46275 45.2713L0.882812 45.4672L9.94383 0.455475H13.669L4.46275 45.2713Z"
          stroke="url(#paint0_linear_790_5346)"
          strokeWidth="0.5"
          strokeMiterlimit="10"
        />
        <defs>
          <linearGradient
            id="paint0_linear_790_5346"
            x1="7.27135"
            y1="45.9545"
            x2="7.27135"
            y2="2.84072e-05"
            gradientUnits="userSpaceOnUse"
          >
            <stop offset="0" stopColor="#63D6B4" />
            <stop offset="0.07" stopColor="#6CD7B7" />
            <stop offset="0.2" stopColor="#85DBBF" />
            <stop offset="0.36" stopColor="#AFE2CD" />
            <stop offset="0.54" stopColor="#E8ECE1" />
            <stop offset="0.57" stopColor="#F1EEE4" />
            <stop offset="0.87" stopColor="#64D5B4" />
            <stop offset="0.99" stopColor="#64D6B3" />
          </linearGradient>
        </defs>
      </svg>

      {/* O */}
      <svg
        className="h-[45px] w-[50px] lg:h-[180px] lg:w-[200px]"
        viewBox="0 0 203 182"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M22.5234 164.392C8.75261 153.394 1.86719 137.395 1.86719 116.359C1.86719 109.347 2.82753 101.012 4.7663 91.3551C11.0537 61.8758 23.4293 39.5896 41.9292 24.4785C60.411 9.38556 86.5754 1.83002 120.404 1.83002C146.986 1.83002 167.171 7.39249 180.941 18.4993C194.712 29.6243 201.597 45.6775 201.597 66.7135C201.597 73.961 200.637 82.1869 198.698 91.3551C192.411 121.324 180.035 143.737 161.535 158.594C143.054 173.451 116.635 180.88 82.3355 180.88C56.2435 180.88 36.2941 175.39 22.5234 164.392ZM123.303 125.056C130.551 118.298 135.86 107.064 139.249 91.337C140.698 84.325 141.423 78.4182 141.423 73.5805C141.423 64.3943 139.013 57.7628 134.175 53.6498C129.337 49.5368 121.6 47.4894 110.982 47.4894C97.6826 47.4894 87.3546 50.932 79.98 57.8171C72.6054 64.7023 67.3507 75.8816 64.2161 91.3551C62.7665 98.1315 62.0418 104.165 62.0418 109.474C62.0418 118.425 64.4516 124.947 69.2895 129.042C74.1274 133.155 81.7376 135.203 92.12 135.203C105.655 135.203 116.038 131.814 123.285 125.056H123.303Z"
          stroke="url(#paint0_linear_790_5001)"
          strokeWidth="2"
          strokeMiterlimit="10"
        />
        <defs>
          <linearGradient
            id="paint0_linear_790_5001"
            x1="101.723"
            y1="0.1"
            x2="101.723"
            y2="1.71404e-05"
            gradientUnits="userSpaceOnUse"
          >
            <stop offset="0" stopColor="#63D6B4" />
            <stop offset="0.07" stopColor="#6CD7B7" />
            <stop offset="0.2" stopColor="#85DBBF" />
            <stop offset="0.36" stopColor="#AFE2CD" />
            <stop offset="0.54" stopColor="#E8ECE1" />
            <stop offset="0.57" stopColor="#F1EEE4" />
            <stop offset="0.87" stopColor="#64D5B4" />
            <stop offset="0.99" stopColor="#64D6B3" />
          </linearGradient>
        </defs>
      </svg>

      {/* N */}
      <svg
        className="h-[44px] w-[52px] lg:h-[175px] lg:w-[206px]"
        viewBox="0 0 209 179"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M37.5332 5.43565H91.9095L90.8223 20.2931C99.2841 14.9843 109.25 10.5633 120.719 7.06635C132.189 3.56941 143.622 1.81189 154.983 1.81189C190.026 1.81189 207.548 16.6693 207.548 46.4023C207.548 51.24 206.696 58.1252 205.011 67.0577L181.818 177.256H123.455L145.561 71.7686C146.521 67.9093 147.011 64.1587 147.011 60.535C147.011 54.9725 145.253 50.9863 141.756 48.5765C138.259 46.1667 132.388 44.9528 124.18 44.9528C117.893 44.9528 111.007 46.4023 103.524 49.3013C96.0226 52.2003 89.6265 55.8241 84.3175 60.1726L59.6751 177.256H1.3125L37.5332 5.43565Z"
          stroke="url(#paint0_linear_790_5002)"
          strokeWidth="2"
          strokeMiterlimit="10"
        />
        <defs>
          <linearGradient
            id="paint0_linear_790_5002"
            x1="104.213"
            y1="179.068"
            x2="104.213"
            y2="1.19457e-05"
            gradientUnits="userSpaceOnUse"
          >
            <stop offset="0" stopColor="#63D6B4" />
            <stop offset="0.07" stopColor="#6CD7B7" />
            <stop offset="0.2" stopColor="#85DBBF" />
            <stop offset="0.36" stopColor="#AFE2CD" />
            <stop offset="0.54" stopColor="#E8ECE1" />
            <stop offset="0.57" stopColor="#F1EEE4" />
            <stop offset="0.87" stopColor="#64D5B4" />
            <stop offset="0.99" stopColor="#64D6B3" />
          </linearGradient>
        </defs>
      </svg>

      {/* E */}
      <svg
        className="h-[45px] w-[45px] lg:h-[180px] lg:w-[182px]"
        viewBox="0 0 186 182"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M24.1352 163.486C8.9149 151.89 1.30469 135.094 1.30469 113.098C1.30469 106.086 2.15634 98.8381 3.84145 91.3551C16.3982 31.6717 52.655 1.83002 112.594 1.83002C134.827 1.83002 152.294 7.44685 164.977 18.6805C177.661 29.9142 184.003 44.4817 184.003 62.365C184.003 67.2027 183.405 72.8739 182.191 79.3967L175.668 110.199H53.8691C54.1046 121.559 58.0366 129.477 65.6467 133.934C73.2569 138.41 86.7196 140.638 106.071 140.638C115.493 140.638 125.278 139.787 135.443 138.102C145.59 136.417 154.16 134.242 161.172 131.579L153.2 169.646C135.316 177.148 112.232 180.88 83.9654 180.88C59.323 180.88 39.3735 175.082 24.1532 163.486H24.1352ZM132.163 76.4976L133.613 68.8877C134.102 66.949 134.337 64.4124 134.337 61.2778C134.337 47.9968 124.915 41.3471 106.071 41.3471C92.5359 41.3471 82.3346 44.1193 75.4493 49.6818C68.5639 55.2443 63.7804 64.1769 61.135 76.4976H132.181H132.163Z"
          stroke="url(#paint0_linear_790_5003)"
          strokeWidth="2"
          strokeMiterlimit="10"
        />
        <defs>
          <linearGradient
            id="paint0_linear_790_5003"
            x1="92.6627"
            y1="0.1"
            x2="92.6627"
            y2="1.71404e-05"
            gradientUnits="userSpaceOnUse"
          >
            <stop offset="0" stopColor="#63D6B4" />
            <stop offset="0.07" stopColor="#6CD7B7" />
            <stop offset="0.2" stopColor="#85DBBF" />
            <stop offset="0.36" stopColor="#AFE2CD" />
            <stop offset="0.54" stopColor="#E8ECE1" />
            <stop offset="0.57" stopColor="#F1EEE4" />
            <stop offset="0.87" stopColor="#64D5B4" />
            <stop offset="0.99" stopColor="#64D6B3" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  )
}

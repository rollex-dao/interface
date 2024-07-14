type SVGProps = React.SVGProps<SVGSVGElement> & {
  fill?: string;
  height?: string | number;
  width?: string | number;
};

export const RollexSymbol = (props: SVGProps) => (
  <svg
    width="45"
    height="45"
    viewBox="0 0 45 45"
    fill="none"
    xmlns="http://www.w3.org/2000/svg "
    {...props}
  >
    <circle cx="22.0135" cy="22.0135" r="22.0135" fill="#191919" />
    <path
      d="M8.26091 13.7C6.80994 16.1042 5.9751 18.922 5.9751 21.9349C5.9751 30.7492 13.1205 37.8947 21.9349 37.8947C24.3864 37.8947 26.7089 37.342 28.7844 36.3543L8.26091 13.7Z"
      fill="#EE1771"
    />
    <path
      d="M33.8758 32.524C36.3761 29.7066 37.8945 25.9981 37.8945 21.9349C37.8945 13.1205 30.749 5.9751 21.9347 5.9751C18.3816 5.9751 15.0997 7.13615 12.4478 9.09955L33.8758 32.524Z"
      fill="url(#paint0_linear_6092_19)"
    />
    <path
      d="M29.3251 36.9513L0.550293 5.18889L8.72674 5.03165L34.0423 32.7058L29.3251 36.9513Z"
      fill="#191919"
    />
    <defs>
      <linearGradient
        id="paint0_linear_6092_19"
        x1="12.4478"
        y1="19.2496"
        x2="37.8945"
        y2="19.2496"
        gradientUnits="userSpaceOnUse"
      >
        <stop stop-color="#DBEF88" />
        <stop offset="1" stop-color="#EACF5E" />
      </linearGradient>
    </defs>
  </svg>
);

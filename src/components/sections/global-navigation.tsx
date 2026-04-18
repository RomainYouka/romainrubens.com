"use client";

import { useState, useEffect, useMemo, useRef, useCallback } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { Languages, Check, Palette } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "@/contexts/ThemeContext";
import type { AccentColor } from "@/contexts/ThemeContext";
import { ThemeToggle, ThemeToggleMobile } from "@/components/ThemeToggle";
import { usePageTransition } from "@/contexts/PageTransitionContext";
import { detectLanguage, type Language } from "@/lib/language";
import { Analytics } from "@/lib/analytics";

// ─── Accent options ──────────────────────────────────────────────────────────
const ACCENT_OPTIONS: { id: AccentColor; light: string; dark: string; mono?: boolean }[] = [
  { id: "blue",   light: "#314DCB", dark: "#5194FF" },
  { id: "pink",   light: "#B2003A", dark: "#FF376C" },
  { id: "green",  light: "#004430", dark: "#53C999" },
  { id: "orange", light: "#B24400", dark: "#FFA269" },
  { id: "mono",   light: "#1d1d1f", dark: "#f5f5f5", mono: true },
];

// ─── Animated burger ────────────────────────────────────────────────────────
const AnimatedBurgerIcon = ({ isOpen, isDark }: { isOpen: boolean; isDark: boolean }) => {
  const bg = isDark ? "bg-[#FFFFFF]" : "bg-[#1d1d1f]";
  return (
    <div className="relative flex flex-col justify-center items-center" style={{ width: 18, height: 18 }}>
      <span
        className={`absolute h-0.5 ${bg} transition-all duration-500 ease-in-out`}
        style={{ width: 18, transform: isOpen ? "translateY(0) rotate(45deg)" : "translateY(-5px) rotate(0deg)" }}
      />
      <span
        className={`absolute h-0.5 ${bg} transition-all duration-500 ease-in-out`}
        style={{ width: 18, transform: isOpen ? "translateY(0) rotate(-45deg)" : "translateY(5px) rotate(0deg)" }}
      />
    </div>
  );
};

// ─── Logo inline SVG ─────────────────────────────────────────────────────────
const LogoInline = ({ isScrolled, className, ...rest }: { isScrolled: boolean; className?: string } & React.SVGAttributes<SVGElement>) => {
  const { isDark } = useTheme();
  const stroke = isDark ? "var(--theme-accent-gradient)" : "none";
  const strokeW = isDark ? "1.5" : "0";

  if (isScrolled) {
    return (
      <svg viewBox="0 0 646 127" className={className} fill="none" xmlns="http://www.w3.org/2000/svg" aria-label="Rubens" role="img" {...rest}>
        <g clipPath="url(#logo-s-clip)">
          <path d="M35.3621 6.63462L62.999 43.7235L63.3451 43.6513L87.0865 5.65238L107.213 20.7749L81.8037 55.8533L82.0673 56.0888L124.19 66.5511L117.718 90.7074L76.0069 78.7065L75.6196 78.9325L80.1144 122.518L55.2304 123.931L53.5743 80.1166L53.3107 79.881L10.6382 98.2955L2.16829 74.4229L45.4417 58.6431L45.5654 58.1816L15.9382 23.033L35.3621 6.63462Z" style={{ fill: "var(--theme-accent)", stroke, strokeWidth: strokeW }} />
        </g>
        <path d="M164.912 113.195V12.7068H204.56C215.273 12.7068 223.764 15.4435 230.033 20.9171C236.302 26.3906 239.436 33.9694 239.436 43.6533C239.436 52.6355 236.396 59.957 230.314 65.6176C224.279 71.2783 216.186 74.1086 206.034 74.1086H173.824V58.8108H202.525C207.952 58.8108 212.069 57.5477 214.876 55.0214C217.683 52.4952 219.086 48.8228 219.086 44.0042V43.934C219.086 39.3026 217.659 35.7003 214.805 33.1273C211.998 30.5543 207.882 29.2677 202.455 29.2677H185.473V113.195H164.912ZM224.139 113.195L196.63 67.5825L217.683 65.758L247.366 113.195H224.139ZM279.005 114.599C271.052 114.599 264.784 112.213 260.199 107.441C255.614 102.669 253.322 96.1665 253.322 87.9328V39.3026H271.848V82.74C271.848 87.7457 272.971 91.6052 275.216 94.3186C277.508 97.032 280.947 98.3887 285.532 98.3887C290.491 98.3887 294.444 96.6811 297.391 93.266C300.338 89.8509 301.812 85.5703 301.812 80.4243V39.3026H320.338V113.195H302.373V93.0555L311.636 102.318H302.373C299.987 106.295 296.83 109.336 292.9 111.441C289.017 113.546 284.385 114.599 279.005 114.599ZM378.957 114.599C372.969 114.599 367.612 113.476 362.887 111.23C358.162 108.985 354.56 105.874 352.08 101.897H348.361L352.852 97.8975V113.195H335.449V12.7068H353.905V48.5655L353.133 49.1269C355.472 45.665 358.84 42.9282 363.238 40.9165C367.682 38.9049 372.665 37.8991 378.185 37.8991C388.29 37.8991 396.921 41.4779 404.079 48.6356C411.283 55.7933 414.886 65.0329 414.886 76.3542C414.886 87.5352 411.377 96.7045 404.36 103.862C397.389 111.02 388.921 114.599 378.957 114.599ZM374.466 98.3185C380.641 98.3185 385.764 96.3303 389.834 92.3538C393.904 88.3773 395.939 83.0441 395.939 76.3542C395.939 69.7111 393.904 64.4013 389.834 60.4248C385.81 56.4015 380.688 54.3899 374.466 54.3899C368.384 54.3899 363.331 56.4249 359.308 60.495C355.332 64.565 353.32 69.8514 353.273 76.3542C353.18 82.5763 355.121 87.7925 359.098 92.0029C363.074 96.2133 368.197 98.3185 374.466 98.3185ZM459.884 114.599C448.797 114.599 439.487 110.997 431.955 103.792C424.423 96.5408 420.657 87.3714 420.657 76.284C420.657 65.1966 424.377 56.0273 431.815 48.776C439.3 41.5247 448.469 37.8991 459.323 37.8991C470.364 37.8991 479.276 41.3376 486.059 48.2146C492.843 55.0448 496.234 63.6762 496.234 74.1086V80.9155H429.92V69.8281H479.393C479.065 65.0563 477.1 61.0798 473.498 57.8985C469.943 54.7173 465.288 53.1267 459.534 53.1267C453.499 53.1267 448.306 55.3255 443.955 59.7231C439.604 64.1206 437.429 69.7579 437.429 76.6349C437.429 83.6055 439.698 89.2427 444.236 93.5467C448.82 97.8039 454.13 99.9325 460.165 99.9325C463.346 99.9325 466.13 99.5115 468.516 98.6694C470.948 97.7805 473.147 96.4706 475.112 94.7397C477.124 93.0087 479.112 90.4825 481.077 87.1609L494.55 93.6871C491.743 98.8799 488.749 102.927 485.568 105.827C482.387 108.728 478.714 110.926 474.551 112.423C470.434 113.874 465.545 114.599 459.884 114.599ZM505.812 113.195V39.3026H523.917V52.9162L521.671 50.1795H523.706C526.045 46.5304 529.297 43.5831 533.46 41.3376C537.671 39.0453 542.349 37.8991 547.495 37.8991C555.542 37.8991 561.857 40.3552 566.442 45.2673C571.073 50.1795 573.389 56.9629 573.389 65.6176V113.195H554.863V69.8281C554.863 65.1498 553.74 61.3838 551.495 58.5301C549.249 55.6764 545.647 54.2495 540.688 54.2495C536.103 54.2495 532.221 55.8635 529.039 59.0915C525.858 62.2727 524.268 66.4597 524.268 71.6526V113.195H505.812ZM613.539 114.599C608.066 114.599 603.458 114.014 599.715 112.844C595.972 111.628 592.721 109.874 589.961 107.581C587.248 105.289 585.072 102.763 583.435 100.003C581.797 97.2425 580.979 95.8624 580.979 95.8624L593.82 89.0556C593.82 89.0556 594.452 90.038 595.715 92.0029C597.025 93.921 598.429 95.5584 599.926 96.915C601.469 98.2717 603.294 99.3477 605.399 100.143C607.551 100.938 610.124 101.336 613.118 101.336C616.72 101.336 619.668 100.611 621.96 99.1606C624.252 97.6636 625.399 95.6519 625.399 93.1257C625.399 90.3187 624.346 88.2603 622.241 86.9504C620.182 85.5937 616.182 84.1902 610.241 82.74C600.604 80.3541 593.844 77.36 589.961 73.7578C586.125 70.1087 584.207 65.4071 584.207 59.6529C584.207 52.8694 586.92 47.5596 592.347 43.7235C597.82 39.8406 604.791 37.8991 613.259 37.8991C617.563 37.8991 621.212 38.3435 624.206 39.2324C627.246 40.1212 629.96 41.4779 632.346 43.3024C634.732 45.0802 636.79 47.162 638.521 49.5479C640.299 51.9338 641.188 53.1267 641.188 53.1267L629.188 60.9862C629.188 60.9862 628.627 60.2377 627.504 58.7406C626.381 57.2436 625.071 55.9103 623.574 54.7407C622.124 53.5712 620.533 52.7057 618.802 52.1443C617.118 51.5829 615.2 51.3022 613.048 51.3022C609.446 51.3022 606.615 52.0274 604.557 53.4776C602.545 54.8811 601.54 56.6354 601.54 58.7406C601.54 61.3604 602.709 63.3019 605.048 64.565C607.434 65.8282 611.621 67.1615 617.609 68.5649C626.872 70.7637 633.422 73.594 637.258 77.0559C641.094 80.471 643.012 85.4768 643.012 92.0731C643.012 99.2776 640.275 104.845 634.802 108.774C629.328 112.657 622.241 114.599 613.539 114.599Z" style={{ fill: "var(--theme-fg)" }} />
        <defs>
          <clipPath id="logo-s-clip">
            <rect width="129.391" height="125.049" fill="white" transform="translate(0 0.671875)" />
          </clipPath>
        </defs>
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 701 76" className={className} fill="none" xmlns="http://www.w3.org/2000/svg" aria-label="Romain Rubens" role="img" {...rest}>
      <g clipPath="url(#logo-f-clip)">
        <path d="M21.2637 4.08739L37.8817 26.3888L38.0898 26.3454L52.3654 3.49677L64.4675 12.5899L49.1889 33.6824L49.3474 33.824L74.6759 40.115L70.7839 54.6401L45.7033 47.424L45.4704 47.5599L48.1731 73.7679L33.2104 74.6175L32.2146 48.2718L32.0561 48.1302L6.39732 59.2027L1.30436 44.8482L27.3245 35.3599L27.3989 35.0824L9.58414 13.9477L21.2637 4.08739Z" style={{ fill: "var(--theme-accent)", stroke, strokeWidth: strokeW }} />
      </g>
      <path d="M100.034 68V7.57658H121.807C127.63 7.57658 132.383 9.22219 136.069 12.5134C139.754 15.8046 141.596 20.207 141.596 25.7205C141.596 31.0933 139.782 35.4816 136.153 38.8854C132.524 42.261 127.7 43.9488 121.68 43.9488H104.338V36.3537H121.089C124.493 36.3537 127.208 35.4254 129.233 33.5688C131.286 31.7122 132.313 29.1524 132.313 25.8893C132.313 22.8512 131.3 20.4039 129.275 18.5473C127.278 16.6907 124.606 15.7624 121.258 15.7624H109.275V68H100.034ZM134.507 68L117.081 40.4044L126.786 39.5183L145.351 68H134.507ZM169.464 69.0971C162.91 69.0971 157.452 66.8748 153.092 62.4302C148.76 57.9857 146.594 52.5425 146.594 46.1007C146.594 39.6027 148.774 34.1454 153.134 29.729C157.495 25.3126 162.938 23.1044 169.464 23.1044C175.99 23.1044 181.433 25.3267 185.794 29.7712C190.182 34.1876 192.376 39.6308 192.376 46.1007C192.376 52.5425 190.196 57.9857 185.836 62.4302C181.476 66.8748 176.018 69.0971 169.464 69.0971ZM169.464 60.9956C173.402 60.9956 176.75 59.5891 179.506 56.7761C182.263 53.935 183.642 50.3765 183.642 46.1007C183.642 41.7687 182.249 38.2102 179.464 35.4254C176.707 32.6124 173.374 31.2059 169.464 31.2059C165.554 31.2059 162.221 32.6124 159.464 35.4254C156.707 38.2102 155.329 41.7687 155.329 46.1007C155.329 50.3765 156.693 53.935 159.422 56.7761C162.178 59.5891 165.526 60.9956 169.464 60.9956ZM199.769 68V24.2015H208.335V31.7122L207.491 30.7417H208.462C209.756 28.5194 211.64 26.691 214.116 25.2563C216.591 23.8217 219.348 23.1044 222.386 23.1044C225.536 23.1044 228.335 23.9202 230.783 25.5517C233.23 27.1551 234.89 29.2227 235.762 31.7544C237.478 28.9133 239.616 26.7613 242.175 25.2985C244.763 23.8358 247.619 23.1044 250.741 23.1044C255.551 23.1044 259.279 24.5953 261.923 27.5771C264.595 30.5589 265.931 34.5533 265.931 39.5605V68H257.112V41.628C257.112 38.1962 256.353 35.566 254.834 33.7376C253.315 31.9091 251.093 30.9949 248.167 30.9949C245.213 30.9949 242.654 32.1623 240.488 34.4971C238.35 36.8037 237.281 39.7433 237.281 43.3159V68H228.42V41.7124C228.42 38.3087 227.66 35.6785 226.141 33.8219C224.65 31.9372 222.428 30.9949 219.474 30.9949C216.521 30.9949 213.975 32.1763 211.837 34.5393C209.699 36.8741 208.63 39.8137 208.63 43.358V68H199.769ZM289.057 69.0971C284.247 69.0971 280.308 67.789 277.242 65.1729C274.176 62.5287 272.643 59.0968 272.643 54.8773C272.643 50.4609 274.345 46.9446 277.749 44.3285C281.18 41.6843 285.639 40.3622 291.124 40.3622C293.319 40.3622 295.527 40.6013 297.749 41.0795C299.971 41.5577 301.842 42.1906 303.361 42.9783V40.32C303.361 37.2819 302.292 34.8909 300.154 33.1468C298.044 31.3746 295.428 30.4885 292.306 30.4885C290.59 30.4885 289.099 30.6995 287.833 31.1215C286.567 31.5153 285.428 32.0638 284.415 32.7671C283.403 33.4422 282.432 34.2439 281.504 35.1722C280.576 36.1005 280.111 36.5646 280.111 36.5646L274.162 31.7122C274.162 31.7122 274.795 31.0793 276.061 29.8134C277.355 28.5476 278.803 27.3942 280.407 26.3534C282.01 25.3126 283.825 24.5109 285.85 23.9483C287.875 23.3857 290.309 23.1044 293.15 23.1044C298.888 23.1044 303.459 24.6234 306.863 27.6615C310.295 30.6995 312.011 34.8487 312.011 40.109V68H303.53V58.5061L305.808 61.4598H303.403C301.94 63.8508 299.943 65.7215 297.411 67.0717C294.88 68.422 292.095 69.0971 289.057 69.0971ZM290.745 62.0083C294.486 62.0083 297.524 60.7002 299.859 58.0841C302.194 55.4399 303.361 52.5706 303.361 49.4763V49.2232C302.067 48.3793 300.45 47.7041 298.509 47.1978C296.596 46.6633 294.556 46.3961 292.39 46.3961C289.015 46.3961 286.342 47.0853 284.373 48.4637C282.404 49.842 281.42 51.8393 281.42 54.4554C281.42 56.7902 282.277 58.6327 283.993 59.9829C285.709 61.3332 287.96 62.0083 290.745 62.0083ZM322.38 68V24.2015H331.241V68H322.38ZM326.811 17.83C325.264 17.83 323.942 17.2955 322.845 16.2266C321.748 15.1295 321.199 13.7933 321.199 12.218C321.199 10.6428 321.748 9.33471 322.845 8.2939C323.942 7.22496 325.264 6.69049 326.811 6.69049C328.414 6.69049 329.751 7.22496 330.819 8.2939C331.888 9.33471 332.423 10.6428 332.423 12.218C332.423 13.7933 331.888 15.1295 330.819 16.2266C329.751 17.2955 328.414 17.83 326.811 17.83ZM342.178 68V24.2015H350.786V32.0076L349.604 30.7417H350.87C352.22 28.5194 354.189 26.691 356.777 25.2563C359.365 23.8217 362.136 23.1044 365.09 23.1044C370.041 23.1044 373.909 24.6093 376.693 27.6193C379.478 30.6292 380.871 34.694 380.871 39.8137V68H372.01V41.5859C372.01 38.2946 371.208 35.7067 369.605 33.8219C368.029 31.9372 365.568 30.9949 362.221 30.9949C359.098 30.9949 356.454 32.1623 354.288 34.4971C352.122 36.8037 351.039 39.7152 351.039 43.2315V68H342.178ZM409.858 68V7.57658H433.15C439.254 7.57658 444.233 9.27845 448.087 12.6822C451.941 16.0578 453.868 20.6149 453.868 26.3534C453.868 31.7825 451.997 36.2271 448.256 39.6871C444.514 43.1471 439.564 44.8771 433.403 44.8771H415.048V35.9739H432.053C435.091 35.9739 437.51 35.1441 439.31 33.4844C441.139 31.8247 442.053 29.5462 442.053 26.6488C442.053 23.9483 441.153 21.7682 439.353 20.1085C437.58 18.4489 435.203 17.619 432.222 17.619H421.715V68H409.858ZM444.458 68L427.285 40.6576L439.69 39.8559L458.129 68H444.458ZM478.138 69.1393C473.216 69.1393 469.362 67.6906 466.577 64.7932C463.792 61.8958 462.4 57.8732 462.4 52.7254V24.1171H473.581V50.2359C473.581 53.3302 474.285 55.7072 475.691 57.3668C477.098 59.0265 479.165 59.8563 481.894 59.8563C484.819 59.8563 487.196 58.8015 489.025 56.6917C490.881 54.582 491.81 51.9659 491.81 48.8434V24.1171H502.949V68H492.274V56.3963L497.633 61.7551H492.147C490.825 64.0337 488.954 65.834 486.535 67.1561C484.116 68.4782 481.317 69.1393 478.138 69.1393ZM538.384 69.1393C535.036 69.1393 532.012 68.4782 529.312 67.1561C526.64 65.8059 524.558 63.9915 523.067 61.7129H520.578L523.194 59.139V68H512.645V7.57658H523.784V29.5602L523.658 29.7712C525.064 27.6896 527.047 26.044 529.607 24.8344C532.195 23.5967 535.05 22.9778 538.173 22.9778C544.136 22.9778 549.158 25.1157 553.237 29.3915C557.344 33.6391 559.397 39.1807 559.397 46.0163C559.397 52.7676 557.372 58.3092 553.321 62.6412C549.298 66.9733 544.319 69.1393 538.384 69.1393ZM535.768 59.4344C539.34 59.4344 542.308 58.2107 544.671 55.7634C547.034 53.288 548.215 50.053 548.215 46.0585C548.215 42.0641 547.034 38.8432 544.671 36.3959C542.308 33.9485 539.34 32.7249 535.768 32.7249C532.28 32.7249 529.354 33.9626 526.991 36.438C524.628 38.8854 523.433 42.0922 523.405 46.0585C523.376 49.9124 524.53 53.1051 526.865 55.6368C529.228 58.1685 532.195 59.4344 535.768 59.4344ZM586.674 69.1393C580.007 69.1393 574.493 66.9733 570.133 62.6412C565.801 58.2811 563.635 52.7535 563.635 46.0585C563.635 39.3917 565.801 33.8782 570.133 29.518C574.465 25.1579 579.88 22.9778 586.378 22.9778C592.848 22.9778 598.094 24.9891 602.117 29.0117C606.14 33.0062 608.151 38.0696 608.151 44.202V48.548H569.247V42.05H597.855C597.658 39.1526 596.533 36.7615 594.48 34.8768C592.426 32.9921 589.74 32.0498 586.42 32.0498C582.904 32.0498 579.965 33.3297 577.602 35.8895C575.239 38.4493 574.057 41.825 574.057 46.0163C574.057 50.3484 575.337 53.8224 577.897 56.4385C580.485 59.0265 583.621 60.3205 587.306 60.3205C589.135 60.3205 590.738 60.0814 592.117 59.6032C593.495 59.0968 594.747 58.3795 595.872 57.4512C596.997 56.4948 598.193 55.0602 599.459 53.1473L607.138 57.5356C605.366 60.5174 603.523 62.7959 601.611 64.3712C599.726 65.9184 597.602 67.0998 595.239 67.9156C592.876 68.7314 590.021 69.1393 586.674 69.1393ZM614.919 68V24.1171H625.678V32.1341L624.37 30.5307H625.763C627.141 28.2803 629.11 26.4659 631.67 25.0876C634.258 23.6811 637.029 22.9778 639.982 22.9778C644.877 22.9778 648.703 24.4546 651.46 27.4083C654.244 30.3619 655.637 34.3986 655.637 39.5183V68H644.497V42.0078C644.497 39.0823 643.78 36.7897 642.345 35.13C640.939 33.4422 638.773 32.5983 635.847 32.5983C633.091 32.5983 630.77 33.611 628.885 35.6363C627 37.6617 626.058 40.2215 626.058 43.3159V68H614.919ZM680.688 69.1393C677.565 69.1393 674.879 68.7876 672.628 68.0844C670.378 67.4093 668.395 66.4107 666.679 65.0885C664.991 63.7664 663.627 62.3177 662.586 60.7424C661.545 59.139 661.025 58.3373 661.025 58.3373L668.62 53.6537C668.62 53.6537 669.014 54.2163 669.801 55.3415C670.589 56.4667 671.489 57.4512 672.502 58.2951C673.514 59.1109 674.682 59.7438 676.004 60.1939C677.354 60.644 678.958 60.869 680.814 60.869C683.036 60.869 684.837 60.433 686.215 59.561C687.593 58.6889 688.283 57.4793 688.283 55.9322C688.283 54.4132 687.664 53.2598 686.426 52.4722C685.216 51.6564 682.643 50.7844 678.704 49.8561C672.994 48.5059 668.943 46.7337 666.552 44.5395C664.161 42.3172 662.966 39.4902 662.966 36.0583C662.966 32.0638 664.611 28.8851 667.902 26.5222C671.222 24.1593 675.413 22.9778 680.477 22.9778C683.036 22.9778 685.287 23.245 687.228 23.7795C689.169 24.314 690.899 25.1157 692.418 26.1846C693.937 27.2536 695.217 28.4491 696.258 29.7712C697.298 31.0933 697.819 31.7544 697.819 31.7544L690.646 36.7334C690.646 36.7334 690.308 36.3115 689.633 35.4676C688.958 34.6237 688.142 33.8782 687.186 33.2312C686.229 32.5561 685.188 32.0638 684.063 31.7544C682.938 31.4168 681.7 31.248 680.35 31.248C678.24 31.248 676.552 31.67 675.287 32.5139C674.049 33.3578 673.43 34.3986 673.43 35.6363C673.43 37.0428 674.063 38.1399 675.329 38.9276C676.595 39.7152 679.253 40.5872 683.304 41.5437C688.93 42.8376 692.924 44.5536 695.287 46.6915C697.65 48.8293 698.831 51.7127 698.831 55.3415C698.831 59.6172 697.158 62.9928 693.81 65.4683C690.463 67.9156 686.089 69.1393 680.688 69.1393Z" style={{ fill: "var(--theme-fg)" }} />
      <defs>
        <clipPath id="logo-f-clip">
          <rect width="78" height="75" fill="white" transform="translate(0 0.5)" />
        </clipPath>
      </defs>
    </svg>
  );
};

// ─── Traductions nav ─────────────────────────────────────────────────────────
const translations = {
  FR:  { home: "Accueil", projects: "Projets",    skills: "Compétences",   contact: "Contact", resume: "CV",     lab: "Lab", soon: "Bientôt",  accentLabel: "Couleur principale" },
  EN:  { home: "Home",    projects: "Projects",   skills: "Skills",        contact: "Contact", resume: "Resume", lab: "Lab", soon: "Soon",      accentLabel: "Main color"         },
  ՀԱՅ: { home: "Գlxavar", projects: "Նaxagitzer", skills: "Հmtouthyunner", contact: "Կap",     resume: "Ռezyume", lab: "Լab", soon: "Շուտով",  accentLabel: "Himnakan guyn"     },
};

// ─── Bouton CV ───────────────────────────────────────────────────────────────
const ResumeButton = ({ selectedLanguage, isDark }: { selectedLanguage: Language; isDark: boolean }) => {
  const t = translations[selectedLanguage];
  const [validating, setValidating] = useState(false);

  const handleDownload = () => {
    setValidating(true);
    setTimeout(() => setValidating(false), 2200);
    const files: Record<Language, string> = {
      FR: "/resume/RUBENS_Romain_cv.pdf",
      EN: "/resume/RUBENS_Romain_Resume.pdf",
      ՀԱՅ: "/resume/RUBENS_Romain_Ամփոփում.pdf",
    };
    const names: Record<Language, string> = {
      FR: "RUBENS_Romain_cv.pdf",
      EN: "RUBENS_Romain_Resume.pdf",
      ՀԱՅ: "RUBENS_Romain_Ամփոփում.pdf",
    };
    const a = document.createElement("a");
    a.href = files[selectedLanguage];
    a.download = names[selectedLanguage];
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  return (
    <button
      onClick={handleDownload}
      disabled={validating}
      aria-label={`Download ${t.resume}`}
      className="relative flex items-center justify-center font-medium text-sm no-underline disabled:cursor-not-allowed"
      style={{
        backgroundColor: "var(--theme-accent)", color: "var(--theme-accent-fg)",
        border: `1px solid var(--theme-accent)`,
        borderRadius: 980, padding: "8px 16px", height: 36, minWidth: 95, width: 95,
        transition: "opacity 180ms ease, background-color 180ms ease, transform 180ms ease",
        outline: "none",
      }}
      onMouseEnter={(e) => { if (!validating) e.currentTarget.style.opacity = "0.85"; }}
      onMouseLeave={(e) => { e.currentTarget.style.opacity = "1"; }}
      onMouseDown={(e) => { if (!validating) e.currentTarget.style.transform = "scale(0.97)"; }}
      onMouseUp={(e) => { e.currentTarget.style.transform = "scale(1)"; }}
    >
      <span style={{ textAlign: "center", width: "100%" }}>{t.resume}</span>
      <div
        className={`absolute inset-0 flex items-center justify-center rounded-[980px] transition-opacity ${
          validating ? "opacity-100 duration-[200ms]" : "opacity-0 duration-[180ms] pointer-events-none"
        }`}
        style={{ backgroundColor: "var(--theme-accent)" }}
      >
        <Check className="w-5 h-5" style={{ color: "var(--theme-accent-fg)" }} strokeWidth={2.5} />
      </div>
    </button>
  );
};

// ─── Sélecteur de langue ─────────────────────────────────────────────────────
interface LangSelectorProps {
  selectedLanguage: Language;
  onLanguageChange: (lang: string) => void;
  isDark: boolean;
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

const LanguageSelector = ({ selectedLanguage, onLanguageChange, isDark, isOpen, onOpen, onClose }: LangSelectorProps) => {
  const buttonRef   = useRef<HTMLButtonElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [dropPos, setDropPos] = useState<{ top: number; left: number }>({ top: 80, left: 0 });
  const LANGS: Language[] = ["FR", "EN", "ՀԱՅ"];

  useEffect(() => {
    if (!isOpen) return;
    const calc = () => {
      if (!buttonRef.current) return;
      const r = buttonRef.current.getBoundingClientRect();
      const dropW = dropdownRef.current?.offsetWidth ?? 80;
      setDropPos({ top: r.bottom + 8, left: r.left + r.width / 2 - dropW / 2 });
    };
    calc();
    const t = setTimeout(calc, 420);
    return () => clearTimeout(t);
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;
    let armed = false;
    const arm = setTimeout(() => { armed = true; }, 60);
    const handler = (e: MouseEvent) => {
      if (!armed) return;
      if (!buttonRef.current?.offsetParent) return;
      if (!buttonRef.current?.contains(e.target as Node) && !dropdownRef.current?.contains(e.target as Node)) {
        onClose();
      }
    };
    document.addEventListener("mousedown", handler);
    return () => { clearTimeout(arm); document.removeEventListener("mousedown", handler); };
  }, [isOpen, onClose]);

  useEffect(() => {
    if (!isOpen) return;
    const handler = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [isOpen, onClose]);

  const handleSelect = (lang: Language) => { onLanguageChange(lang); onClose(); };

  const textColor  = isDark ? "#FFFFFF" : "#1d1d1f";
  const dropBg     = isDark ? "rgba(24,24,28,0.97)"    : "rgba(252,252,254,0.97)";
  const dropBorder = isDark ? "rgba(255,255,255,0.12)" : "rgba(0,0,0,0.10)";
  const divider    = isDark ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.07)";
  const hoverBg    = isDark ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.05)";

  return (
    <>
      <button
        ref={buttonRef}
        onClick={() => (isOpen ? onClose() : onOpen())}
        aria-expanded={isOpen}
        aria-haspopup="listbox"
        aria-label="Changer la langue"
        className="flex items-center justify-center"
        style={{
          minWidth: 42, width: 42, height: "100%",
          background: "none", border: "none", padding: 0, cursor: "pointer",
          color: textColor,
          transition: "opacity 180ms ease, transform 180ms ease",
        }}
        onMouseEnter={(e) => { e.currentTarget.style.opacity = "0.65"; }}
        onMouseLeave={(e) => { e.currentTarget.style.opacity = "1"; }}
        onMouseDown={(e)  => { e.currentTarget.style.transform = "scale(0.90)"; }}
        onMouseUp={(e)    => { e.currentTarget.style.transform = "scale(1)"; }}
      >
        <Languages className="h-[18px] w-[18px]" strokeWidth={2.2} />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            ref={dropdownRef}
            role="listbox"
            aria-label="Sélection de la langue"
            initial={{ opacity: 0, scaleY: 0,   filter: "blur(6px)" }}
            animate={{ opacity: 1, scaleY: 1,   filter: "blur(0px)" }}
            exit={  { opacity: 0, scaleY: 0,   filter: "blur(4px)" }}
            transition={{ type: "spring", stiffness: 380, damping: 22, mass: 0.65 }}
            style={{
              position:             "fixed",
              top:                  dropPos.top,
              left:                 dropPos.left,
              transformOrigin:      "top center",
              backgroundColor:      dropBg,
              backdropFilter:       "blur(20px)",
              WebkitBackdropFilter: "blur(20px)",
              border:               `1px solid ${dropBorder}`,
              borderRadius:         14,
              overflow:             "hidden",
              zIndex:               1100,
              minWidth:             80,
              boxShadow: isDark
                ? "0 16px 48px rgba(0,0,0,0.55), 0 2px 8px rgba(0,0,0,0.3)"
                : "0 8px 32px rgba(0,0,0,0.14), 0 2px 8px rgba(0,0,0,0.07)",
            }}
          >
            {LANGS.map((lang, idx) => {
              const isSel = lang === selectedLanguage;
              return (
                <button
                  key={lang}
                  role="option"
                  aria-selected={isSel}
                  onClick={() => handleSelect(lang)}
                  style={{
                    display:      "block",
                    width:        "100%",
                    padding:      "12px 22px",
                    textAlign:    "center",
                    fontSize:     14,
                    fontFamily:   "var(--font-body)",
                    fontWeight:   isSel ? 600 : 500,
                    background:   isSel ? "var(--theme-accent)" : "transparent",
                    color:        isSel ? "var(--theme-accent-fg)" : textColor,
                    border:       "none",
                    cursor:       "pointer",
                    transition:   "background 140ms ease",
                    borderBottom: idx < LANGS.length - 1 ? `1px solid ${divider}` : "none",
                  }}
                  onMouseEnter={(e) => { if (!isSel) e.currentTarget.style.background = hoverBg; }}
                  onMouseLeave={(e) => { if (!isSel) e.currentTarget.style.background = "transparent"; }}
                >
                  {lang}
                </button>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

// ─── Sélecteur de couleur d'accent ──────────────────────────────────────────
interface ColorPickerProps {
  accentColor: AccentColor;
  onAccentChange: (color: AccentColor) => void;
  isDark: boolean;
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

const ColorPicker = ({ accentColor, onAccentChange, isDark, isOpen, onOpen, onClose }: ColorPickerProps) => {
  const buttonRef   = useRef<HTMLButtonElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [dropPos, setDropPos] = useState<{ top: number; left: number }>({ top: 80, left: 0 });

  useEffect(() => {
    if (!isOpen) return;
    const calc = () => {
      if (!buttonRef.current) return;
      const r = buttonRef.current.getBoundingClientRect();
      const dropW = dropdownRef.current?.offsetWidth ?? 120;
      setDropPos({ top: r.bottom + 8, left: r.left + r.width / 2 - dropW / 2 });
    };
    calc();
    const t = setTimeout(calc, 420);
    return () => clearTimeout(t);
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;
    let armed = false;
    const arm = setTimeout(() => { armed = true; }, 60);
    const handler = (e: MouseEvent) => {
      if (!armed) return;
      if (!buttonRef.current?.offsetParent) return;
      if (!buttonRef.current?.contains(e.target as Node) && !dropdownRef.current?.contains(e.target as Node)) {
        onClose();
      }
    };
    document.addEventListener("mousedown", handler);
    return () => { clearTimeout(arm); document.removeEventListener("mousedown", handler); };
  }, [isOpen, onClose]);

  useEffect(() => {
    if (!isOpen) return;
    const handler = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [isOpen, onClose]);

  const textColor  = isDark ? "#FFFFFF" : "#1d1d1f";
  const dropBg     = isDark ? "rgba(24,24,28,0.97)"    : "rgba(252,252,254,0.97)";
  const dropBorder = isDark ? "rgba(255,255,255,0.12)" : "rgba(0,0,0,0.10)";

  return (
    <>
      <button
        ref={buttonRef}
        onClick={() => (isOpen ? onClose() : onOpen())}
        aria-expanded={isOpen}
        aria-label="Changer la couleur principale"
        className="flex items-center justify-center"
        style={{
          minWidth: 42, width: 42, height: "100%",
          background: "none", border: "none", padding: 0, cursor: "pointer",
          color: textColor,
          transition: "opacity 180ms ease, transform 180ms ease",
        }}
        onMouseEnter={(e) => { e.currentTarget.style.opacity = "0.65"; }}
        onMouseLeave={(e) => { e.currentTarget.style.opacity = "1"; }}
        onMouseDown={(e)  => { e.currentTarget.style.transform = "scale(0.90)"; }}
        onMouseUp={(e)    => { e.currentTarget.style.transform = "scale(1)"; }}
      >
        <Palette className="h-[18px] w-[18px]" strokeWidth={2.2} />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            ref={dropdownRef}
            initial={{ opacity: 0, scaleY: 0,   filter: "blur(6px)" }}
            animate={{ opacity: 1, scaleY: 1,   filter: "blur(0px)" }}
            exit={  { opacity: 0, scaleY: 0,   filter: "blur(4px)" }}
            transition={{ type: "spring", stiffness: 380, damping: 22, mass: 0.65 }}
            style={{
              position:             "fixed",
              top:                  dropPos.top,
              left:                 dropPos.left,
              transformOrigin:      "top center",
              backgroundColor:      dropBg,
              backdropFilter:       "blur(20px)",
              WebkitBackdropFilter: "blur(20px)",
              border:               `1px solid ${dropBorder}`,
              borderRadius:         14,
              padding:              "12px 14px",
              zIndex:               1100,
              boxShadow: isDark
                ? "0 16px 48px rgba(0,0,0,0.55), 0 2px 8px rgba(0,0,0,0.3)"
                : "0 8px 32px rgba(0,0,0,0.14), 0 2px 8px rgba(0,0,0,0.07)",
            }}
          >
            <div style={{ display: "flex", gap: 10 }}>
              {ACCENT_OPTIONS.map((opt) => {
                const isSel = opt.id === accentColor;
                const swatch = isDark ? opt.dark : opt.light;
                const bg = opt.mono
                  ? "linear-gradient(to right, #1d1d1f 50%, #f5f5f5 50%)"
                  : swatch;
                return (
                  <button
                    key={opt.id}
                    onClick={() => { onAccentChange(opt.id); onClose(); }}
                    aria-label={opt.id}
                    aria-pressed={isSel}
                    style={{
                      width: 22, height: 22,
                      borderRadius: "50%",
                      background: bg,
                      backgroundOrigin: "border-box",
                      border: isSel ? `2px solid ${isDark ? "#ffffff" : "#1d1d1f"}` : "2px solid transparent",
                      cursor: "pointer",
                      padding: 0,
                      transition: "transform 140ms ease, box-shadow 140ms ease",
                      boxShadow: isSel ? `0 0 0 1px ${opt.mono ? "#888" : swatch}` : "none",
                      outline: "none",
                    }}
                    onMouseEnter={(e) => { e.currentTarget.style.transform = "scale(1.15)"; }}
                    onMouseLeave={(e) => { e.currentTarget.style.transform = "scale(1)"; }}
                  />
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

// ─── Color picker mobile (dans le burger menu) ───────────────────────────────
const ColorPickerMobile = ({ accentColor, onAccentChange, isDark, selectedLanguage, borderColor }: {
  accentColor: AccentColor;
  onAccentChange: (color: AccentColor) => void;
  isDark: boolean;
  selectedLanguage: Language;
  borderColor: string;
}) => {
  const t = translations[selectedLanguage];
  return (
    <div className="border-b pb-4 mb-0" style={{ borderColor }}>
      <div className="flex items-center justify-between py-3">
        <span className="text-lg font-medium" style={{ color: "var(--theme-fg)" }}>
          {t.accentLabel}
        </span>
        <div style={{ display: "flex", gap: 10 }}>
          {ACCENT_OPTIONS.map((opt) => {
            const isSel = opt.id === accentColor;
            const swatch = isDark ? opt.dark : opt.light;
            const bg = opt.mono
              ? "linear-gradient(to right, #1d1d1f 50%, #f5f5f5 50%)"
              : swatch;
            return (
              <button
                key={opt.id}
                onClick={() => onAccentChange(opt.id)}
                aria-pressed={isSel}
                aria-label={opt.id}
                style={{
                  width: 26, height: 26,
                  borderRadius: "50%",
                  background: bg,
                  backgroundOrigin: "border-box",
                  border: isSel ? `2px solid ${isDark ? "#ffffff" : "#1d1d1f"}` : "2px solid transparent",
                  cursor: "pointer",
                  padding: 0,
                  transition: "transform 140ms ease",
                  boxShadow: isSel ? `0 0 0 1px ${opt.mono ? "#888" : swatch}` : "none",
                  outline: "none",
                }}
                onMouseEnter={(e) => { e.currentTarget.style.transform = "scale(1.12)"; }}
                onMouseLeave={(e) => { e.currentTarget.style.transform = "scale(1)"; }}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};

// ─── Navigation principale ───────────────────────────────────────────────────
const GlobalNavigation = ({ onShowQuotes }: { onShowQuotes?: () => void }) => {
  const { isDark, accentColor, setAccentColor } = useTheme();
  const pathname = usePathname();
  const { triggerTransition } = usePageTransition();

  const [scrolledY, setScrolledY] = useState(false);
  const [langForceExpanded, setLangForceExpanded] = useState(false);
  const [langOpen, setLangOpen] = useState(false);
  const [colorPickerOpen, setColorPickerOpen] = useState(false);

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState<Language>(() => detectLanguage());
  const [logoAnimating, setLogoAnimating] = useState(false);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [showLabSoon, setShowLabSoon] = useState(false);

  useEffect(() => {
    if (!showLabSoon) return;
    const timer = setTimeout(() => setShowLabSoon(false), 2500);
    return () => clearTimeout(timer);
  }, [showLabSoon]);

  const isScrolled = scrolledY && !langForceExpanded && !langOpen && !isMenuOpen && !colorPickerOpen;


  useEffect(() => { setSelectedLanguage(detectLanguage()); }, []);

  useEffect(() => {
    const handler = (e: CustomEvent<Language>) => setSelectedLanguage(e.detail);
    window.addEventListener("languageChange", handler as EventListener);
    return () => window.removeEventListener("languageChange", handler as EventListener);
  }, []);

  const handleLanguageChange = useCallback((lang: string) => {
    const l = lang as Language;
    Analytics.languageChange(selectedLanguage, l);
    setSelectedLanguage(l);
    localStorage.setItem("preferredLanguage", l);
    window.dispatchEvent(new CustomEvent("languageChange", { detail: l }));
  }, [selectedLanguage]);

  useEffect(() => {
    const handler = () => setScrolledY(window.scrollY > 8);
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  const openLangDropdown = useCallback(() => {
    if (scrolledY) {
      setLangForceExpanded(true);
      setTimeout(() => setLangOpen(true), 380);
    } else {
      setLangOpen(true);
    }
  }, [scrolledY]);

  const closeLangDropdown = useCallback(() => {
    setLangOpen(false);
    setTimeout(() => setLangForceExpanded(false), 280);
  }, []);

  const openColorPicker = useCallback(() => {
    if (scrolledY) {
      setLangForceExpanded(true);
      setTimeout(() => setColorPickerOpen(true), 380);
    } else {
      setColorPickerOpen(true);
    }
  }, [scrolledY]);

  const closeColorPicker = useCallback(() => {
    setColorPickerOpen(false);
    setTimeout(() => setLangForceExpanded(false), 280);
  }, []);

  const handleLogoClick = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    setLogoAnimating(true);
    setTimeout(() => setLogoAnimating(false), 260);
    if (pathname === "/") {
      if (onShowQuotes) onShowQuotes();
    } else {
      triggerTransition("/", "down");
    }
  }, [pathname, onShowQuotes, triggerTransition]);

  const handleMenuToggle = useCallback(() => {
    setIsMenuOpen((prev) => !prev);
  }, []);

  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? "hidden" : "";
    window.dispatchEvent(new CustomEvent("menuStateChange", { detail: isMenuOpen }));
  }, [isMenuOpen]);

  useEffect(() => {
    const handler = (e: CustomEvent<boolean>) => setIsLightboxOpen(e.detail);
    window.addEventListener("flashconceptLightboxStateChange", handler as EventListener);
    window.addEventListener("vahanLightboxStateChange", handler as EventListener);
    return () => {
      window.removeEventListener("flashconceptLightboxStateChange", handler as EventListener);
      window.removeEventListener("vahanLightboxStateChange", handler as EventListener);
    };
  }, []);

  const prefersReducedMotion = useMemo(
    () => (typeof window !== "undefined" ? window.matchMedia("(prefers-reduced-motion: reduce)").matches : false),
    []
  );

  const t           = translations[selectedLanguage];
  const textColor   = "var(--theme-fg)";
  const navBgColor  = "var(--theme-nav-bg)";
  const borderColor = "var(--theme-border)";
  const scrolledBg  = "var(--theme-nav-scrolled)";

  const navLinks = [
    { name: t.home,     href: "/" },
    { name: t.projects, href: "/projects" },
    { name: t.skills,   href: "/skills" },
    { name: t.contact,  href: "/contact" },
    { name: t.lab,      href: "/lab", accent: true, isSoon: true },
  ];

  const logoProps = {
    onClick: handleLogoClick,
    "aria-label": "Home",
    href: "/",
    className: `flex items-center hover:opacity-80 h-full cursor-pointer relative ${
      prefersReducedMotion ? (logoAnimating ? "opacity-60" : "opacity-100") : ""
    }`,
    style: {
      color: textColor,
      transitionDuration: prefersReducedMotion ? "120ms" : "230ms",
      transform: logoAnimating && !prefersReducedMotion ? "scale(0.98)" : "scale(1)",
      transition: "opacity 230ms ease, transform 230ms ease",
    } as React.CSSProperties,
  };

  return (
    <>
      <header
        role="banner"
        className={`fixed top-0 left-0 right-0 z-[1000] ${
          isLightboxOpen ? "opacity-0 pointer-events-none" : "opacity-100"
        }`}
        style={{
          paddingTop:    isScrolled ? "12px" : "0",
          paddingLeft:   isScrolled ? "12px" : "0",
          paddingRight:  isScrolled ? "12px" : "0",
          transition: "opacity 300ms ease-in-out, padding 380ms cubic-bezier(0.4,0,0.2,1)",
        }}
      >
        <div
          style={{
            backgroundColor: isScrolled ? scrolledBg : navBgColor,
            backdropFilter:       isScrolled ? "blur(12px)" : "none",
            WebkitBackdropFilter: isScrolled ? "blur(12px)" : "none",
            borderRadius:  isScrolled ? "980px" : "0",
            borderBottom:  isScrolled ? "none" : `1px solid ${borderColor}`,
            boxShadow:     isScrolled ? (isDark ? "0 4px 20px rgba(255,255,255,0.07)" : "0 4px 12px rgba(0,0,0,0.08)") : "none",
            transition:
              "background-color 380ms cubic-bezier(0.4,0,0.2,1), " +
              "border-radius 380ms cubic-bezier(0.4,0,0.2,1), " +
              "box-shadow 380ms cubic-bezier(0.4,0,0.2,1)",
          }}
        >
          <div className="mx-auto h-16 max-w-[1200px] px-6">
            <nav role="navigation" aria-label="Navigation principale" className="flex h-full w-full items-center justify-between">

              {/* ── Desktop ── */}
              <div className="hidden h-full w-full items-center justify-between lg:flex">
                <a {...logoProps}>
                  <LogoInline isScrolled={isScrolled} className="h-4 w-auto relative z-10" />
                </a>

                <div className="flex items-center h-full gap-10">
                  {navLinks.map((link) => link.isSoon ? (
                    <button
                      key={link.name}
                      onClick={() => setShowLabSoon(true)}
                      className="flex items-center h-full font-medium text-sm px-3 no-underline hover:underline focus-visible:underline"
                      style={{
                        color: "var(--theme-accent)",
                        textDecorationColor: "var(--theme-accent)",
                        textDecorationThickness: "1px",
                        textUnderlineOffset: "2px",
                        transition: "opacity 180ms ease",
                        position: "relative",
                        background: "none", border: "none", cursor: "pointer",
                      }}
                    >
                      {link.name}
                      <span style={{
                        position: "absolute", top: "30%", right: 2,
                        width: 5, height: 5, borderRadius: "50%",
                        background: "var(--theme-accent)",
                        boxShadow: "0 0 6px var(--theme-accent)",
                        animation: "pulse 2s ease infinite",
                      }} />
                    </button>
                  ) : (
                    <Link
                      key={link.name}
                      href={link.href}
                      className="flex items-center h-full font-medium text-sm px-3 no-underline hover:underline focus-visible:underline"
                      style={{
                        color: link.accent ? "var(--theme-accent)" : textColor,
                        textDecorationColor: link.accent ? "var(--theme-accent)" : textColor,
                        textDecorationThickness: "1px",
                        textUnderlineOffset: "2px",
                        transition: "opacity 180ms ease",
                        position: "relative",
                      }}
                    >
                      {link.name}
                      {link.accent && (
                        <span style={{
                          position: "absolute", top: "30%", right: 2,
                          width: 5, height: 5, borderRadius: "50%",
                          background: "var(--theme-accent)",
                          boxShadow: "0 0 6px var(--theme-accent)",
                          animation: "pulse 2s ease infinite",
                        }} />
                      )}
                    </Link>
                  ))}

                  <ColorPicker
                    accentColor={accentColor}
                    onAccentChange={setAccentColor}
                    isDark={isDark}
                    isOpen={colorPickerOpen}
                    onOpen={openColorPicker}
                    onClose={closeColorPicker}
                  />
                  <LanguageSelector
                    selectedLanguage={selectedLanguage}
                    onLanguageChange={handleLanguageChange}
                    isDark={isDark}
                    isOpen={langOpen}
                    onOpen={openLangDropdown}
                    onClose={closeLangDropdown}
                  />
                  <ThemeToggle />
                  <ResumeButton selectedLanguage={selectedLanguage} isDark={isDark} />
                </div>
              </div>

              {/* ── Mobile ── */}
              <div className="flex w-full items-center justify-between lg:hidden">
                <a {...logoProps} className={logoProps.className.replace("h-full", "")}>
                  <LogoInline isScrolled={isScrolled} className="h-3.5 w-auto" />
                </a>

                <div className="flex items-center h-9 gap-5">
                  <ResumeButton selectedLanguage={selectedLanguage} isDark={isDark} />
                  <div className="flex items-center justify-center h-9">
                    <LanguageSelector
                      selectedLanguage={selectedLanguage}
                      onLanguageChange={handleLanguageChange}
                      isDark={isDark}
                      isOpen={langOpen}
                      onOpen={openLangDropdown}
                      onClose={closeLangDropdown}
                    />
                  </div>
                  <button
                    onClick={handleMenuToggle}
                    className="flex items-center justify-center h-9 transition-opacity duration-200 hover:opacity-80"
                    style={{ color: textColor }}
                    aria-label="Toggle menu"
                  >
                    <AnimatedBurgerIcon isOpen={isMenuOpen} isDark={isDark} />
                  </button>
                </div>
              </div>
            </nav>
          </div>
        </div>
      </header>

      {/* ── Overlay "Bientôt" ── */}
      <AnimatePresence>
        {showLabSoon && (
          <motion.div
            key="lab-soon"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.22, ease: "easeInOut" }}
            onClick={() => setShowLabSoon(false)}
            style={{
              position: "fixed", inset: 0, zIndex: 99999,
              display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
              backgroundColor: isDark ? "rgba(25,25,25,0.94)" : "rgba(245,245,245,0.94)",
              backdropFilter: "blur(20px)",
              WebkitBackdropFilter: "blur(20px)",
              cursor: "pointer",
            }}
          >
            <motion.p
              initial={{ scale: 0.72, opacity: 0, y: 24 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.72, opacity: 0, y: 24 }}
              transition={{ type: "spring", stiffness: 340, damping: 24, delay: 0.06 }}
              style={{
                margin: 0,
                fontSize: "clamp(64px, 14vw, 128px)",
                fontFamily: "var(--font-display)",
                fontWeight: 700,
                color: "var(--theme-accent)",
                lineHeight: 1,
                letterSpacing: "-0.03em",
                userSelect: "none",
              }}
            >
              {t.soon}
            </motion.p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Menu mobile overlay ── */}
      <div
        className={`fixed inset-0 top-16 z-40 transition-all duration-300 lg:hidden ${
          isMenuOpen ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
        style={{ backgroundColor: navBgColor }}
      >
        <div className="h-full overflow-y-auto px-6 pt-8 flex flex-col justify-between pb-8">
          <div className="flex flex-col gap-1">
            {navLinks.map((link) => link.isSoon ? (
              <button
                key={link.name}
                onClick={() => { setIsMenuOpen(false); setShowLabSoon(true); }}
                className="py-4 text-lg font-medium border-b hover:opacity-80 transition-opacity text-left"
                style={{
                  color: "var(--theme-accent)",
                  borderColor,
                  display: "flex", alignItems: "center", gap: 8,
                  background: "none", border: "none", borderBottom: `1px solid ${borderColor}`,
                  cursor: "pointer", padding: "16px 0",
                }}
              >
                {link.name}
                <span style={{
                  width: 6, height: 6, borderRadius: "50%", flexShrink: 0,
                  background: "var(--theme-accent)",
                  boxShadow: "0 0 6px var(--theme-accent)",
                  animation: "pulse 2s ease infinite",
                }} />
              </button>
            ) : (
              <Link
                key={link.name}
                href={link.href}
                className="py-4 text-lg font-medium border-b hover:opacity-80 transition-opacity"
                style={{
                  color: link.accent ? "var(--theme-accent)" : textColor,
                  borderColor,
                  display: "flex", alignItems: "center", gap: 8,
                }}
                onClick={() => setIsMenuOpen(false)}
              >
                {link.name}
                {link.accent && (
                  <span style={{
                    width: 6, height: 6, borderRadius: "50%", flexShrink: 0,
                    background: "var(--theme-accent)",
                    boxShadow: "0 0 6px var(--theme-accent)",
                    animation: "pulse 2s ease infinite",
                  }} />
                )}
              </Link>
            ))}
          </div>
          <div className="flex flex-col gap-0">
            <ColorPickerMobile
              accentColor={accentColor}
              onAccentChange={setAccentColor}
              isDark={isDark}
              selectedLanguage={selectedLanguage}
              borderColor={borderColor}
            />
            <ThemeToggleMobile selectedLanguage={selectedLanguage} borderColor={borderColor} onClose={() => setIsMenuOpen(false)} />
          </div>
        </div>
      </div>
    </>
  );
};

export default GlobalNavigation;

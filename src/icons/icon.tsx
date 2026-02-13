import type { FC, SVGProps } from "react";

type IconProps = SVGProps<SVGSVGElement>;

export const FacebookIcon: FC<IconProps> = (props) => (
  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
    <path d="M22.675 0h-21.35C.593 0 0 .593 0 1.326v21.348C0 23.407.593 24 1.325 24h11.495v-9.294H9.692V11.01h3.128V8.414c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.098 2.795.142v3.24l-1.918.001c-1.504 0-1.795.715-1.795 1.763v2.31h3.587l-.467 3.696h-3.12V24h6.116C23.407 24 24 23.407 24 22.674V1.326C24 .593 23.407 0 22.675 0Z" />
  </svg>
);

export const WhatsAppIcon: FC<IconProps> = (props) => (
  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
    <path d="M20.52 3.48A11.78 11.78 0 0012.01 0C5.38 0 .02 5.36.02 11.99c0 2.11.55 4.17 1.6 5.98L0 24l6.21-1.63a11.9 11.9 0 005.8 1.48h.01c6.63 0 11.99-5.36 11.99-11.99 0-3.2-1.25-6.21-3.49-8.38ZM12.02 21.83c-1.85 0-3.67-.5-5.25-1.45l-.38-.23-3.69.97.98-3.6-.25-.37a9.83 9.83 0 01-1.53-5.16c0-5.42 4.41-9.83 9.83-9.83 2.63 0 5.1 1.02 6.96 2.88a9.77 9.77 0 012.88 6.95c0 5.42-4.41 9.84-9.83 9.84Z" />
    <path d="M16.7 13.87c-.3-.15-1.76-.87-2.03-.97-.27-.1-.47-.15-.66.15-.2.3-.76.97-.93 1.17-.17.2-.34.22-.64.07-.3-.15-1.26-.46-2.4-1.47-.89-.79-1.49-1.76-1.66-2.06-.17-.3-.02-.46.13-.61.13-.13.3-.34.45-.51.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.07-.15-.66-1.6-.9-2.2-.24-.58-.48-.5-.66-.51h-.57c-.2 0-.52.07-.79.37-.27.3-1.04 1.01-1.04 2.46 0 1.45 1.06 2.85 1.21 3.05.15.2 2.08 3.18 5.04 4.46.7.3 1.25.48 1.68.62.7.22 1.34.19 1.85.12.56-.08 1.76-.72 2.01-1.42.25-.7.25-1.3.17-1.42-.08-.12-.27-.2-.57-.35Z" />
  </svg>
);

export const TikTokIcon: FC<IconProps> = (props) => (
  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
    <path d="M12.52 0h3.24c.05 1.18.49 2.3 1.25 3.26.76.96 1.76 1.68 2.9 2.08v3.33c-1.86.06-3.68-.45-5.23-1.46v6.69c0 3.42-2.77 6.1-6.19 6.1a6.14 6.14 0 01-6.3-6.11c0-3.38 2.9-6.12 6.3-6.12.35 0 .7.03 1.04.1v3.45a2.68 2.68 0 00-1.04-.21 2.68 2.68 0 00-2.7 2.68c0 1.48 1.21 2.68 2.7 2.68a2.68 2.68 0 002.7-2.68V0Z" />
  </svg>
);

export const Facebook: FC<SVGProps<SVGSVGElement>> = (props) => (
  <svg viewBox="0 0 32 32" fill="currentColor" aria-hidden="true" {...props}>
    <path d="M29 0H3C1.3 0 0 1.3 0 3v26c0 1.7 1.3 3 3 3h14V20h-4v-5h4v-4c0-4.1 2.5-6.3 6.1-6.3 1.7 0 3.1.1 3.5.1v4h-2.4c-1.9 0-2.3.9-2.3 2.2v3h5l-1 5h-4v12h6c1.7 0 3-1.3 3-3V3c0-1.7-1.3-3-3-3z" />
  </svg>
);

export const LinkedIn: FC<SVGProps<SVGSVGElement>> = (props) => (
  <svg viewBox="0 0 32 32" fill="currentColor" aria-hidden="true" {...props}>
    <path d="M29 0H3C1.3 0 0 1.3 0 3v26c0 1.7 1.3 3 3 3h26c1.7 0 3-1.3 3-3V3c0-1.7-1.3-3-3-3zM9.4 27H4.2V12h5.2v15zM6.8 10.2c-1.7 0-3-1.4-3-3 0-1.7 1.3-3 3-3s3 1.3 3 3c0 1.6-1.3 3-3 3zM27 27h-5.2v-7.5c0-1.8-.6-3-2-3s-2.2 1.3-2.2 3V27h-5.2V12h5v2.1h.1c.7-1.3 2.4-2.7 4.9-2.7 5.2 0 6.2 3.4 6.2 7.8V27z" />
  </svg>
);

export const TikTok: FC<SVGProps<SVGSVGElement>> = (props) => (
  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
    <path d="M12.52 0h3.24c.05 1.18.49 2.3 1.25 3.26.76.96 1.76 1.68 2.9 2.08v3.33c-1.86.06-3.68-.45-5.23-1.46v6.69c0 3.42-2.77 6.1-6.19 6.1a6.14 6.14 0 01-6.3-6.11c0-3.38 2.9-6.12 6.3-6.12.35 0 .7.03 1.04.1v3.45a2.68 2.68 0 00-1.04-.21 2.68 2.68 0 00-2.7 2.68c0 1.48 1.21 2.68 2.7 2.68a2.68 2.68 0 002.7-2.68V0Z" />
  </svg>
);

export const Telegram: FC<SVGProps<SVGSVGElement>> = (props) => (
  <svg viewBox="0 0 32 32" fill="currentColor" aria-hidden="true" {...props}>
    <path d="M32 6.1c0-1.2-1.3-2-2.4-1.6L2 14.6c-1.2.4-1.2 2 .1 2.3l7.8 2.3 2.9 9c.3 1 1.6 1.1 2.1.1l3.4-5.5 7.8 5.7c1.1.7 2.6-.1 2.6-1.5V6.1z" />
  </svg>
);

export const Copy: FC<SVGProps<SVGSVGElement>> = (props) => (
  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
    <rect
      x="9"
      y="9"
      width="11"
      height="11"
      rx="2"
      ry="2"
      stroke="currentColor"
      strokeWidth="2"
      fill="none"
    />
    <rect
      x="4"
      y="4"
      width="11"
      height="11"
      rx="2"
      ry="2"
      stroke="currentColor"
      strokeWidth="2"
      fill="none"
    />
    <line
      x1="11"
      y1="12"
      x2="17"
      y2="12"
      stroke="currentColor"
      strokeWidth="1.5"
    />
    <line
      x1="11"
      y1="15"
      x2="17"
      y2="15"
      stroke="currentColor"
      strokeWidth="1.5"
    />
  </svg>
);

export const Share: FC<SVGProps<SVGSVGElement>> = (props) => (
  <svg
    viewBox="0 0 24 24"
    fill="currentColor"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path d="M18 16.08C17.24 16.08 16.56 16.38 16.05 16.88L8.91 12.7C8.96 12.47 9 12.24 9 12C9 11.76 8.96 11.53 8.91 11.3L15.96 7.19C16.5 7.7 17.22 8 18 8C19.66 8 21 6.66 21 5C21 3.34 19.66 2 18 2C16.34 2 15 3.34 15 5C15 5.24 15.04 5.47 15.09 5.7L8.04 9.81C7.5 9.3 6.78 9 6 9C4.34 9 3 10.34 3 12C3 13.66 4.34 15 6 15C6.78 15 7.5 14.7 8.04 14.19L15.14 18.38C15.09 18.6 15.05 18.8 15.05 19C15.05 20.66 16.39 22 18.05 22C19.71 22 21.05 20.66 21.05 19C21.05 17.34 19.71 16 18.05 16Z" />
  </svg>
);

export const XIcon: FC<SVGProps<SVGSVGElement>> = (props) => (
  <svg
    viewBox="0 0 24 24"
    fill="currentColor"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M23.954 4.569c-.885.392-1.83.656-2.825.775 
      1.014-.611 1.794-1.574 2.163-2.723-.949.555-2.004.959-3.127 
      1.184-.897-.959-2.178-1.555-3.594-1.555-2.717 0-4.924 2.208-4.924 
      4.924 0 .39.045.765.127 1.124C7.691 8.094 4.066 6.13 1.64 
      3.161c-.427.734-.666 1.58-.666 2.475 0 1.708.87 3.216 2.188 
      4.099-.807-.026-1.566-.248-2.228-.616v.061c0 2.385 1.693 4.374 
      3.946 4.827-.413.111-.849.171-1.296.171-.317 0-.626-.03-.928-.086.627 
      1.956 2.444 3.377 4.6 3.417-1.68 1.318-3.808 2.105-6.115 
      2.105-.398 0-.79-.023-1.175-.069 2.179 1.397 4.768 2.212 
      7.548 2.212 9.057 0 14.01-7.503 14.01-14.01 0-.213-.005-.425-.014-.636.962-.695 
      1.797-1.562 2.457-2.549l-.047-.02z"
    />
  </svg>
);

export const ServiceIcon: FC<SVGProps<SVGSVGElement>> = (props) => (
  <svg
    className="w-4 h-4"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    viewBox="0 0 24 24"
    {...props}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M17 8l4 4m0 0l-4 4m4-4H3"
    />
  </svg>
);

export const CommentIcon: FC<SVGProps<SVGSVGElement>> = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={2}
    stroke="currentColor"
    className="w-4 h-4"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M8 10h.01M12 10h.01M16 10h.01M21 12c0 4.418-4.03 8-9 8-1.21 0-2.356-.21-3.38-.598L3 20l1.598-5.62A7.962 7.962 0 013 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
    />
  </svg>
);

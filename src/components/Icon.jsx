const paths = {
  mark: (
    <>
      <path d="M12 2 20 7.5V16.5L12 22 4 16.5V7.5L12 2Z" />
      <path d="M12 6.5 16.5 9v6L12 17.5 7.5 15V9L12 6.5Z" />
    </>
  ),
  spark: (
    <>
      <path d="M12 3v4.5M12 16.5V21M3 12h4.5M16.5 12H21" />
      <path d="m6.3 6.3 2.6 2.6m6.2 6.2 2.6 2.6m0-11.4-2.6 2.6M8.9 15.1l-2.6 2.6" />
    </>
  ),
  bag: (
    <>
      <path d="M5 8h14l1 13H4L5 8Z" />
      <path d="M9 8V6.5a3 3 0 0 1 6 0V8" />
      <path d="M8 11.5v1.5m8-1.5v1.5" />
    </>
  ),
  layout: (
    <>
      <rect x="3.5" y="4" width="17" height="16" rx="2.5" />
      <path d="M3.5 9.5h17M9 9.5V20" />
    </>
  ),
  grid: (
    <>
      <rect x="3.5" y="3.5" width="7" height="7" rx="1.5" />
      <rect x="13.5" y="3.5" width="7" height="7" rx="1.5" />
      <rect x="3.5" y="13.5" width="7" height="7" rx="1.5" />
      <rect x="13.5" y="13.5" width="7" height="7" rx="1.5" />
    </>
  ),
  chart: (
    <>
      <path d="M4 20h16" />
      <path d="M7 20v-6m5 6V7m5 13v-9" />
    </>
  ),
  arrow: <path d="M4 12h15m0 0-6-6m6 6-6 6" />,
  copy: (
    <>
      <rect x="9" y="9" width="11" height="11" rx="2" />
      <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
    </>
  ),
  mail: (
    <>
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="m3.5 7 8.5 6 8.5-6" />
    </>
  ),
  chat: (
    <>
      <path d="M21 11.5a8.5 8.5 0 0 1-8.5 8.5c-1.5 0-2.9-.4-4.1-1L3 20l1-5.4A8.5 8.5 0 1 1 21 11.5Z" />
      <path d="M8.5 10h7m-7 3.5h4" />
    </>
  ),
  external: (
    <>
      <path d="M14 4h6v6" />
      <path d="M20 4 11 13" />
      <path d="M18 13.5V18a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4.5" />
    </>
  ),
  scroll: (
    <>
      <path d="M12 4v10" />
      <path d="m7.5 10 4.5 4.5L16.5 10" />
    </>
  ),
}

export default function Icon({ name, size = 20, strokeWidth = 1.6, className = '' }) {
  return (
    <svg
      className={className}
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {paths[name]}
    </svg>
  )
}

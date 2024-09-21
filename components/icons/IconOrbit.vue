<template>
  <svg viewBox="0 0 160 160" width="300" height="300">
    <defs>
      <clipPath id="svgPath">
        <path d="M122.4,55.5C108.9,32.1,78.9,24,55.5,37.6S24,81.1,37.6,104.5L122.4,55.5L160,0v160H0V0h160L122.4,55.5z">
        </path>
      </clipPath>
      <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stop-color="#ebaa86"></stop>
        <stop offset="100%" stop-color="#c34528"></stop>
      </linearGradient>
    </defs>
    <circle cx="80" cy="80" r="49" fill="url(#gradient)">
      <animateTransform attributeName="transform" type="rotate" from="360 80 80" to="0 80 80" dur="4s"
        repeatCount="indefinite">
      </animateTransform>
    </circle>
    <g style="clip-path: url(#svgPath);">
      <g id="inner" transform="matrix(0.866, -0.5, 0.25, 0.433, 80, 80)">
        <path d="M 0,70 A 65,70 0 0,0 65,0 5,5 0 0,1 75,0 75,70 0 0,1 0,70Z" fill="currentColor">
          <animateTransform attributeName="transform" type="rotate" from="360 0 0" to="0 0 0" dur="4s"
            repeatCount="indefinite">
          </animateTransform>
        </path>
      </g>
    </g>
  </svg>
</template>
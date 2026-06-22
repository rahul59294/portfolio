import { ImageResponse } from 'next/og';

export const size = {
  width: 32,
  height: 32,
};
export const contentType = 'image/png';

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          fontSize: 20,
          background: '#080b12',
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: '#3b82f6',
          fontFamily: 'monospace',
          fontWeight: 'bold',
          borderRadius: '6px',
          border: '1px solid rgba(255,255,255,0.07)',
        }}
      >
        R
      </div>
    ),
    {
      ...size,
    }
  );
}

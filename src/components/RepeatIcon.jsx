export const RepeatIcon = ({color}) => {
    return (
      <span
        style={{
          margin: 0,
          padding: 0,
          fontSize: '14px',
          fontWeight: '600',
          textAlign: 'left',
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <svg
          width="15"
          height="15"
          viewBox="0 0 24 24"
          fill="none"
          stroke={color || 'var(--text-color-secondary-hover)'}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          style={{ 
            marginRight: '0.4em',
            stroke: color || 'var(--text-color-secondary)',
            color: color || 'var(--text-color-secondary)',
           }}
        >
          <polyline points="17 1 21 5 17 9" />
          <path d="M3 11V9a4 4 0 0 1 4-4h14" />
          <polyline points="7 23 3 19 7 15" />
          <path d="M21 13v2a4 4 0 0 1-4 4H3" />
        </svg>
      </span>
    )
  }
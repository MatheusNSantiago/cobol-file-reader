type Props = {
  icon?: string;
};

export const JobIconCircle = ({ icon }: Props) => {
  return (
    <div
      style={{
        borderRadius: '2rem',
        border: 'solid #00B1D2 .1rem',
        width: '2rem',
        height: '2rem',
        position: 'relative',
      }}
    >
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          flexDirection: 'column',
          alignContent: 'center',
          justifyContent: 'center',
          alignSelf: 'center',
          height: '100%',
        }}
      >
        {icon ?? String.fromCodePoint(0x1f3f7)}
      </div>
    </div>
  );
};

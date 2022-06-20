interface IConnectionProperty {
  label: string;
  value: string | number | boolean | null;
}

export function ConnectionProperty({ label, value }: IConnectionProperty) {
  return (
    <div className="connection-property">
      <span className="label">{label}</span>
      <span className="value">{value}</span>
    </div>
  );
}

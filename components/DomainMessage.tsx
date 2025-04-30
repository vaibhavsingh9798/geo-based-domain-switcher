type Props = {
    domain: string;
  };
  
  export default function DomainMessage({ domain }: Props) {
    return (
      <div className="mt-4 p-4 rounded bg-yellow-100 text-yellow-800 border border-yellow-300">
         Your domain should be: <strong>{domain}</strong>
      </div>
    );
  }
  
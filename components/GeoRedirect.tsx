// 'use client';

// import { useEffect, useState } from 'react';
// import DomainMessage from './DomainMessage';

// export default function GeoRedirect() {
//   const [suggestedDomain, setSuggestedDomain] = useState<string | null>(null);

//   useEffect(() => {
//     const detectAndRedirect = async () => {
//       if (!('geolocation' in navigator)) return;

//       navigator.geolocation.getCurrentPosition(
//         async ({ coords }) => {
//           try {
//             const res = await fetch(`/api/get-country?lat=${coords.latitude}&lng=${coords.longitude}`);
//             const data = await res.json();
//             const country = data.countryCode?.toLowerCase();

//             if (!country) return;

//             const currentHost = window.location.hostname;
//             const suggestedHost = currentHost.replace('.com', `.${country}`);
//             setSuggestedDomain(suggestedHost);

//             if (
//               currentHost.endsWith('.com') &&
//               !currentHost.endsWith(`.${country}`)
//             ) {
//               const newUrl = `${window.location.protocol}//${suggestedHost}${window.location.pathname}${window.location.search}`;
//               window.location.href = newUrl;
//             }
//           } catch (err) {
//             console.error('Failed to fetch location info:', err);
//           }
//         },
//         (err) => {
//           console.warn('Geolocation unavailable:', err);
//         }
//       );
//     };

//     detectAndRedirect();
//   }, []);

//   return <>{suggestedDomain && <DomainMessage domain={suggestedDomain} />}</>;
// }


'use client';

import { useEffect, useState } from 'react';
import DomainMessage from './DomainMessage';

export default function GeoRedirect() {
  const [suggestedDomain, setSuggestedDomain] = useState<string | null>(null);
  const [showMessage, setShowMessage] = useState(false);

  useEffect(() => {
    const detectAndRedirect = async () => {
      if (!('geolocation' in navigator)) return;

      navigator.geolocation.getCurrentPosition(
        async ({ coords }) => {
          try {
            const res = await fetch(`/api/get-country?lat=${coords.latitude}&lng=${coords.longitude}`);
            const data = await res.json();
            const country = data.countryCode?.toLowerCase();

            if (!country) return;

            const currentHost = window.location.hostname;

            // Simulate domain suggestion
            const isLocalhost = currentHost.includes('localhost') || currentHost.startsWith('127.') || currentHost.endsWith('.local');
            const suggestedHost = isLocalhost
              ? `localhost.${country}`
              : currentHost.replace('.com', `.${country}`);

            setSuggestedDomain(suggestedHost);

            // Only redirect if on a real .com domain
            if (
              !isLocalhost &&
              currentHost.endsWith('.com') &&
              !currentHost.endsWith(`.${country}`)
            ) {
              const newUrl = `${window.location.protocol}//${suggestedHost}${window.location.pathname}${window.location.search}`;
              window.location.href = newUrl;
            } else {
              setShowMessage(true); // just show message for localhost
            }
          } catch (err) {
            console.error('Failed to fetch location info:', err);
          }
        },
        (err) => {
          console.warn('Geolocation unavailable:', err);
        }
      );
    };

    detectAndRedirect();
  }, []);

  return (
    <>
      {showMessage && suggestedDomain && (
        <DomainMessage domain={suggestedDomain} />
      )}
    </>
  );
}

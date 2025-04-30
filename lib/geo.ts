export async function getCountryFromCoords(lat: string, lng: string): Promise<string | null> {
    const apiKey = process.env.BIGDATACLOUD_API_KEY;  // Access the API key from the env file
    console.log('apiKey-----', apiKey)
  if (!apiKey) {
    console.error('API key not set!');
    return null;
  }
   
   const url = `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lng}&localityLanguage=en&key=${apiKey}`;

  
    try {
        const res = await fetch(url);
        const text = await res.text();  // Get raw response as text
        console.log(text);  // Log raw response to check if it's HTML (error page) or JSON
        const data = JSON.parse(text);  // Manually parse if it's valid JSON
        return data.countryCode || null;
    } catch (err) {
      console.error('Error in reverse geocoding:', err);
      return null;
    }
  }
  
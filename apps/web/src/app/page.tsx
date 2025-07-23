'use client';
import { Button } from '@/components/ui/button';
import { useState } from 'react';

export default function Home() {
  const [apiResponse, setApiResponse] = useState<string>('');
  const handleClick = () => {
    console.log(process.env.NEXT_PUBLIC_API_ENDPOINT);
    fetch(`${process.env.NEXT_PUBLIC_API_ENDPOINT}`).then((response) =>
      response.text().then((data) => {
        setApiResponse(data);
      })
    );
  };

  return (
    <div>
      {apiResponse && (
        <div>
          <h1>API Response:</h1>
          <pre>{JSON.stringify(apiResponse, null, 2)}</pre>
        </div>
      )}
      <Button onClick={handleClick}>Click me</Button>
    </div>
  );
}

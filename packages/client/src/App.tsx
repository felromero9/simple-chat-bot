import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button.tsx';

function App() {
    const [message, setMessage] = useState('');
    useEffect(() => {
        fetch('api/hello')
            .then((res) => res.json())
            .then((data) => setMessage(data.message));
    }, []);

    console.log(`message:  ${message}`);
    return (
        <>
            <p className="font-bold p-4 text-3xl">{message}</p>
            <Button>Click me </Button>
        </>
    );
}

export default App;

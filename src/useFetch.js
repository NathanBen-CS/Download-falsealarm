import {useState, useEffect} from 'react';

const useFetch = (url) => {
    const [data, setData] = useState(null);
    const [isPending, setIsPending] = useState(true);
    const [error1, setError] = useState(null);

    useEffect(() => {
        const abortCont = new AbortController();

        fetch(url, { signal: abortCont.signal })
            .then(res => {
                console.log(res);
                if(!res.ok)
                {
                    throw Error('could not fetch the data');
                }
                return res.json();
            })
            .then((data) => {
                console.log(data);
                setData(data)
                setIsPending(false);
                setError(null);
            })
            .catch((err) => {
                if (err.name === 'AbortError')
                {
                    console.log("fetch aborted");
                }
                else
                {
                    setError(err.message);
                    setIsPending(false);
                }
            })

        return () => abortCont.abort();

    }, [url]);

    return { data, isPending, error1 }
}

export default useFetch;
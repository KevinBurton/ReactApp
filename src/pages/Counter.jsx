import React from 'react';

function Counter () {  
    const [count, setCount] = React.useState(0);
    return (
        <div>
            <h1>Counter Page</h1>
            <p>This is the counter page of the application.</p>
            <p>Count: {count}</p>
            <button onClick={() => setCount(count + 1)}>Increment</button>
            <button onClick={() => setCount(count - 1)}>Decrement</button>
        </div>
    );
}
export default Counter;
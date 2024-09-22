import { Suspense } from "react";
import { useFetch } from "./useFetch";
import { fetchData } from "./fetchData";

const apiData = fetchData("https://jsonplaceholder.typicode.com/users");

function App() {
  const { data, loading, error, handleCancelRequest } = useFetch(
    "https://jsonplaceholder.typicode.com/users"
  );

  return (
    <div className="App">
      <h1>Fetch como un pro</h1>
      <button onClick={handleCancelRequest}>Cancelar</button>
      <div className="carda">
        <ul>
          {error && <li>error {error}</li>}
          {loading && <li>loading...</li>}
          {data?.map((user) => (
            <li key={user.id}>{user.name}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;

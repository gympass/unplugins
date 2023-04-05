// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import test from './test.graphql';

console.log(test);

const App = () => {
  return (
    <div className="App">
      <pre>{JSON.stringify(test, null, 2)}</pre>
    </div>
  );
};

export default App;

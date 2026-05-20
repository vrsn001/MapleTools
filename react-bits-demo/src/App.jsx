import AnimatedList from './AnimatedList';
import Aurora from './Aurora';

const items = ['Item 1', 'Item 2', 'Item 3', 'Item 4', 'Item 5', 'Item 6', 'Item 7', 'Item 8', 'Item 9', 'Item 10'];

export default function App() {
  return (
    <div style={{ minHeight: '100vh', background: '#0f1117', color: 'white', padding: '32px' }}>
      <h1 style={{ marginTop: 0 }}>React AnimatedList Demo</h1>
      <div style={{ height: 240, marginBottom: 24, border: '1px solid #2d3348', borderRadius: 12, overflow: 'hidden' }}>
        <Aurora colorStops={['#7cff67', '#B497CF', '#5227FF']} blend={0.5} amplitude={1.0} speed={0.5} />
      </div>
      <AnimatedList
        items={items}
        onItemSelect={(item, index) => console.log(item, index)}
        showGradients={true}
        enableArrowNavigation={true}
        displayScrollbar={true}
      />
    </div>
  );
}

import './Heading.css';

function Heading({ name }) {
  return (
    <>
      <h2 className='heading__title'>{name}</h2>
      <div className='heading__separator'></div>
    </>
  );
}

export default Heading;

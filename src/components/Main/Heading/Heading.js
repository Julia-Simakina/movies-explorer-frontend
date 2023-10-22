import './Heading.css';

function Heading({ name }) {
  return (
    <>
      <div className='heading'>
        <h2 className='heading__title'>{name}</h2>
        <div className='heading__separator'></div>
      </div>
    </>
  );
}

export default Heading;

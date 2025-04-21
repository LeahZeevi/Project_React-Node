import { useParams } from 'react-router';

const GeneralCategory =() => {
    const {typeCategory} = useParams();


  return (
  
    <div>
      <h1>{typeCategory }</h1>
    </div>
  )
}

export default GeneralCategory

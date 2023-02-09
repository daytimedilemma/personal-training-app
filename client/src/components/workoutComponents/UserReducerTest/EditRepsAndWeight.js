import React, {useState} from 'react'

export default function EditRepsAndWeight(props) {
    const {setArr, sets, addArr} = props


   const [workingSet, setWorkingSet] = useState([setArr])
   function handleRepAndSetChange(id, e) {
    const { name, value } = e.target
    const input = workingSet.map(i => {
        if (id === i._id) {
            i[name] = value
        } else if(id === i.id) {
            i[name] = value
        }
        return i;
    })
    setWorkingSet(input)
}



  return (
    <div key={setArr._id}>
    {sets.exercise.weightType === "BODY WEIGHT" ?
    <span>Weight: Body Weight</span>
    :
    <>
    <label>
      Weight:  
    <input
    value={setArr.weight}
    type='number'
    name='weight'
    placeholder={`${setArr.weight}`}
    onChange={e => handleRepAndSetChange(setArr._id, e)}
    />
    </label>
    </>
    }
    <label>
      Reps: 
    <input
    type='number'
    value={setArr.reps}
    name='reps'
    placeholder={`${setArr.reps}`}
    onChange={e => handleRepAndSetChange(setArr._id, e)}
    />
    </label>
  </div>
  )
}

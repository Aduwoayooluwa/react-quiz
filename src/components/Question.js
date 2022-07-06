import React, { useState, useEffect, useRef } from 'react';

const Question = ({ data, onAnswerUpdate, numberOfQuestions, activeQuestion, onSetActiveQuestion, onSetStep }) => {
  const [selected, setSelected] = useState('');
  const [error, setError] = useState('');
  const radiosWrapper = useRef();

  useEffect(() => {
    const findCheckedInput = radiosWrapper.current.querySelector('input:checked');
    if(findCheckedInput) {
      findCheckedInput.checked = false;
    }
  }, [data]);

  const changeHandler = (e) => {
    setSelected(e.target.value);
    if(error) {
      setError('');
    }
  }
  
  const nextClickHandler = (e) => {
  
    if(selected === '') {
      return setError('Type Something');
    }
    onAnswerUpdate(prevState => [...prevState, { q: data.question, a: selected }]);
    setSelected('');
    if(activeQuestion < numberOfQuestions - 1) {
      onSetActiveQuestion(activeQuestion + 1);

    }else {
      onSetStep(3);
      
    }

  

    
  }

  return(
    <div className="card">
      <div className="card-content">
        <div className="content">
        <p>Question {data.id}</p>
          <h2 className="mb-5">{data.question}</h2>
          <audio src={data.audio} controls />
          <div className="control" ref={radiosWrapper}>
          <input type='text' className="input is-success" onChange={changeHandler} name="answer" placeholder="enter answer"/>

            {/* {data.choices.map((choice, i) => (
              <label className="radio has-background-light" key={i}>
                <input type="radio" name="answer" value={choice} onChange={changeHandler} />
                
                {choice}
              </label>
            ))} */}
          </div>
          {error && <div className="has-text-danger">{error}</div>}
          <button className="button is-link is-medium is-fullwidth mt-4" onClick={nextClickHandler}>Next</button>
        </div>
      </div>
    </div>
  );
}

export default Question;
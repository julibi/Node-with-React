//SurveyField contains logic to render
//a single label and textinput
import React from 'react';

//the input object is taken from 'props' and
//comes with callbacks
//the 'props' come from redux-form
export default ({ input, label, meta: { error, touched } }) => {
  return(
    <div>
      <label>{label}</label>
      <input {...input} style={{ marginBottom: '5px' }}/>
      <div className="red-text" style={{marginBottom: '20px'}}>
        {touched && error}
      </div>
    </div>
  );
};


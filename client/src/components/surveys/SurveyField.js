//SurveyField contains logic to render
//a single label and textinput
import React from 'react';

//the input object is taken from 'props' and
//comes with callbacks
//the 'props' come from redux-form
export default ({ input, label }) => {

  return(
    <div>
      <label>{label}</label>
      <input {...input}/>
    </div>
  );
};


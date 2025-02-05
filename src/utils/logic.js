export const updateText = (e, text, setText, operation, setOperation, parenthesis, setParenthesis) => {
  if (e.target.textContent === 'AC') {
      setText('');
      setOperation(true);
      setParenthesis(0);
      return;
  } else if (e.target.textContent === 'C') {
      if (text === '') return;

      if (text.slice(-1) === '(') {
          setParenthesis(parenthesis - 1);
          setText(text.slice(0, -1));
      } else if (text.slice(-1) === ')') {
          setParenthesis(parenthesis + 1);
          setText(text.slice(0, -1));
      } else if (text.slice(-1) === '¬') {
          setText(text.slice(0, -1));
      } else {
          setText(text.slice(0, -1));
          setOperation(!operation);
      }
      return;
  } else if (e.target.textContent === '(') {
      setParenthesis(parenthesis + 1);
  } else if (e.target.classList.contains(')')) {
      setParenthesis(parenthesis - 1);
      setText(text + ')');
      return;
  } else if (e.target.textContent === '¬') {
      setText(text + '¬');
      return;
  }

  const addText = e.target.textContent;
  setText(text + addText);

  if (e.target.textContent === ')' || e.target.textContent === '(') {
      return;
  } else {
      setOperation(!operation);
  }
};

export const addVariable = (e, variables, setVariables) => {
  e.preventDefault()
  const variableName = document.querySelector('.variable-name').value
  const variableValue = document.querySelector('.variable-value').value

  if(variableName in variables) {
    return // Agregar mensaje de 'desea sobreescribir la variable'
  }

  setVariables({ ...variables, [variableName]: variableValue})
}

export const deleteVariable = (e, variables, setVariables) => { 
  const variableName = e.target.parentElement.textContent[0]
  const newVariables = { ...variables }
  delete newVariables[variableName]
  setVariables(newVariables)
}
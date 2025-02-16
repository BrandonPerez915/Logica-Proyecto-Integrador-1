// Modifica el texto visible según la acción que realice cada boton
export function updateText(e, text, setText, operation, setOperation, parenthesis, setParenthesis, setShowTitles, setTableBody) {
  if(e.target.textContent === 'AC') {
    setShowTitles(false)
    setText('')
    setOperation(true)
    setParenthesis(0)
    setTableBody([])
    return
  } 

  else if(e.target.textContent === 'C') {
      setShowTitles(false)
      setTableBody([])

      if(text === '') return

      if(text.slice(-1) === '(') {
        setParenthesis(parenthesis - 1)
        setText(text.slice(0, -1))
      } 

      else if(text.slice(-1) === ')') {
        setParenthesis(parenthesis + 1)
        setText(text.slice(0, -1))
      } 

      else if(text.slice(-1) === '¬') {
        setText(text.slice(0, -1))
      } 

      else {
        setText(text.slice(0, -1))
        setOperation(!operation)
      }

    return 
  } 

  else if(e.target.textContent === '(') {
    setParenthesis(parenthesis + 1)
  } 

  else if(e.target.classList.contains(')')) {
    setParenthesis(parenthesis - 1)
    setText(text + ')')
    return
  } 

  else if(e.target.textContent === '¬') {
    setText(text + '¬')
    return
  }

  const addText = e.target.textContent
  setText(text + addText)

  if (e.target.textContent === ')' || e.target.textContent === '(') {
    return
  } 

  else {
    setOperation(!operation)
  }
}

export function addVariable(e, variables, setVariables) {
  e.preventDefault()
  const variableName = document.querySelector('.variable-name').value
  const variableValue = document.querySelector('.variable-value').value

  if(variableName in variables) {
    return // TO-DO: Agregar mensaje de 'desea sobreescribir la variable'
  }

  setVariables({ ...variables, [variableName]: variableValue})
}

export function deleteVariable(e, variables, setVariables) { 
  const variableName = e.target.parentElement.textContent[0]
  const newVariables = { ...variables }
  delete newVariables[variableName]
  setVariables(newVariables)
}

export function convertExpression(text, variables) {

  const replaceConditionalsAndBiconditionals = (expr) => {
    // Remplaza bicondicional por su equivalente con conjunciones y disyunciones
    expr = expr.replace(/(\([^()]*\)|\w+)\s*⇔\s*(\([^()]*\)|\w+)/g, (match, p1, p2) => {
      return `(!${p1}|${p2})&(!${p2}|${p1})`
    })

    // Remplaza condicional por su equivalente con conjunciones y disyunciones
    expr = expr.replace(/(\([^()]*\)|\w+)\s*⇒\s*(\([^()]*\)|\w+)/g, (match, p1, p2) => {
      return `(!${p1}|${p2})`
    })

    return expr
  }

  let userInput = text

  // Remplaza operadores lógicos por su operador binario correspondiente
  userInput = replaceConditionalsAndBiconditionals(userInput)     
  userInput = userInput.replace(/¬/g, '!')
  userInput = userInput.replace(/∧/g, '&')
  userInput = userInput.replace(/∨/g, '|')
  userInput = userInput.replace(/⊕/g, '^')
  
  for(let i of Object.entries(variables)) {
    // Remplaza V = 1 y F = 0
    userInput = userInput.replace(new RegExp(i[0], 'g'), i[1] === 'Verdadero' ? '1' : '0')
  }

  return userInput
}

export function addBooleanVariable(e, variables, setVariables, boolean) {
    e.preventDefault()
    const variableName = document.querySelector('.variable-name').value
  
    if(variableName in variables) {
      return // TO-DO: Agregar mensaje de 'desea sobreescribir la variable'
    }
  
    setVariables({ ...variables, [variableName]: boolean})
}

export function generateTableHeaders(input, variables) {
  // Agrega las variables primero y se ordenan alfabeticamente
  let headers = [...Object.keys(variables)]
  headers.sort((a, b) => a.localeCompare(b))

  for (let i = 0; i < input.length; i++) {
    if (input[i] === '(') {
      let parenthesesExpression = ''
      let parenthesesToClose = 1
      let j = i + 1

      while (j < input.length && parenthesesToClose > 0) {
        if (input[j] === '(') {
          parenthesesToClose++
        } 
                
        else if (input[j] === ')') {
          parenthesesToClose--
        }

        // Agrega el contenido dentro del paréntesis
        parenthesesExpression += input[j]
        j++
      }

      // Elimina el primer paréntesis de apertura y el ultimo de cierre
      parenthesesExpression = parenthesesExpression.slice(0, -1)

      if (!headers.includes(parenthesesExpression)) {
        headers.push(parenthesesExpression)
      }
    }
  }

  // Eliminar variables que no se utilizan en el input
  for(let i of Object.keys(variables)) {
    if(!input.includes(i)) {
      headers = headers.filter(a => a !== i)
    }

    // Agregar negaciones
    if(input.includes(`¬${i}`)) {
      headers.push(`¬${i}`)
    }
  }

  // Ordena las sub-expresiones según su longitud
  headers.sort((a, b) => a.length - b.length)

  return headers
}

// Genera las convinaciones de las variables usadas en el input
function generateCombinations(tableHeaders) {
  let usedVariables = tableHeaders.filter((current) => current.length === 1).reverse()
  let combinations = []

  for(let i = 0; i < 2 ** usedVariables.length; i++) {
    let currentCombination = {}

    usedVariables.forEach((varName, index) => {
      currentCombination[varName] = (i & (1 << index)) ? 'Verdadero' : 'Falso'
    })

    combinations.push(currentCombination)
  }

  return combinations
}

export function generateTableData(tableHeaders) {
    // Inicialización de la tabla
    const tableData = [] 
    // Genera las convinaciones posibles
    const combinations = generateCombinations(tableHeaders)
    // Variables que se usan para generar la tabla
    let usedVariables = tableHeaders.filter((current) => current.length === 1)

    for(let i = 0; i < 2 ** usedVariables.length; i++) {
      // Agrega una fila
      tableData.push(Array(tableHeaders.length).fill())

      for(let j = 0; j < tableHeaders.length; j++) {
        // Obtiene la expresión de la columna actual
        let currentExpression = tableHeaders[j]
        // Convierte la expresión en su equivalente binario
        currentExpression = convertExpression(currentExpression, combinations[i])

        // Actualiza la posición j de la columna actual con el resultado 
        // de evaluar currentExpression
        tableData[i][j] = eval(currentExpression) === 1 || eval(currentExpression) === true ? 'V' : 'F'
      }
    }

    return tableData
  }
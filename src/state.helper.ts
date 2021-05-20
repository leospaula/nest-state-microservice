export function stateSerializeCollection(states) {
  let responseStates = new Array()

  states.map(state => responseStates.push(stateSerializer(state)))
  
  return responseStates
}

export function stateSerializer(state) {
  return {
    code: state.id,
    uf: state.sigla,
    nome: state.nome,
    ...(state.populacao && {populacao: state.populacao})
  }
}

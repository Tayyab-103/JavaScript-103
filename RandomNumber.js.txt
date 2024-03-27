const Random = () => {

    let number = Math.random() *100;
  return (
    <div style={{'background-color': "red"}}>Random Number is: {Math.round(number)}</div>
  )
}

export default Random
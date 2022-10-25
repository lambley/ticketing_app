const Index = ({color}) => {
  console.log("initial prop is", color);
  return(
    <div>
      <h1>Landing Page</h1>
    </div>
  )
}

Index.getInitialProps = () => {
  console.log('I am on the server!');

  return { color: 'red' }
}

export default Index

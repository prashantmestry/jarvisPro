
const withUser = WrapComponent => {

    const NewComponent = (props) => {

        return <WrapComponent {...props} color="green" />
    }

    return NewComponent;
}


export default withUser;
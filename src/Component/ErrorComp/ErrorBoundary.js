import React from 'react';

class ErrorBoundary extends React.Component {

    state = {
        hasError: false
    }

    static getDerivedStateFromError(error) {
        return { hasError: true };
    }

    componentDidCatch(error, info) {
        console.log('Error found : ', info);
    }

    render() {
        if (this.state.hasError) {
            return (
                <div style={{ color: 'red' }}>Something went wrong</div>
            )
        }
        return this.props.children
    }
}

export default ErrorBoundary;
import React from 'react';

class Car extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            brand: "Ford",
            model: "Mustang",
            color: "red",
            year: 1964
        };
    }

    changeColor = () => {
        const colors = ["red", "blue", "green", "black", "yellow"];
        const nextIndex = (colors.indexOf(this.state.color) + 1) % colors.length;
        this.setState({ color: colors[nextIndex] });
    };

    render() {
        return (
            <div style={{ textAlign: "center", padding: "20px", fontFamily: "sans-serif" }}>
                <h1>My {this.state.brand}</h1>
                <p>
                    It is a <strong style={{ color: this.state.color }}>{this.state.color}</strong> {this.state.model} from {this.state.year}.
                </p>
                <button 
                    onClick={this.changeColor}
                    style={{
                        padding: "8px 16px",
                        fontSize: "14px",
                        cursor: "pointer",
                        borderRadius: "6px",
                        backgroundColor: "#0d6efd",
                        color: "#fff",
                        border: "none"
                    }}
                >
                    Change Color
                </button>
            </div>
        );
    }
}

export default Car;

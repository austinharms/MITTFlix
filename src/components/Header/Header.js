import React from "react";

class Header extends React.Component {
  state = { input: "" };

  setInput = e => {
    this.setState({ input: e.target.value });
  };

  searchMoives = e => {
    e.preventDefault();
    this.props.onSearch(this.state.input);
    this.setState({ input: "" });
  };

  render() {
    return (
      <header className="header">
        <a href="/"
          ><img
            src="https://fontmeme.com/permalink/190707/fd4735271a0d997cbe19a04408c896fc.png"
            alt="netflix-font"
            border="0"
        /></a>
        <form onSubmit={this.searchMoives} className="search">
          <input type="search" placeholder="Search for a title..." onChange={this.setInput} value={this.state.input} />
        </form>
    </header>
    );
  }
}

export default Header;

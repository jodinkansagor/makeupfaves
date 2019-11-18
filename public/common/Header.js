import Component from '../Component.js';

class Header extends Component {
    renderHTML() {
        const title = this.props.title || 'Make Up Dreams';

        return /*html*/ `
            <header>
                <img class = "logo" src="https://placebear.com/100/100" alt="make up logo">
                <h1>${title}</h1>
                <nav>
                    <a href="./">Home</a>
                    <a href="./makeup.html">Make Up</a>
                </nav>
            </header>
        `;
    }
}

export default Header;
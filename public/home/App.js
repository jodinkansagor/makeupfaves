import Component from '../Component.js';
import Header from '../common/Header.js';

class App extends Component {

    onRender(dom) {
        const header = new Header();
        dom.prepend(header.renderDOM());
    }
    

    renderHTML() {
        return /*html*/`
            <div>

                <main>
                    <p>
                        <img class="make-up" src="https://placebear.com/300/400">
                    </p>
                    <p>
                        <a href = "makeup.html">Check ya face</a>
                    </p>
                </main>
            </div>
        `;
    }
}

export default App;
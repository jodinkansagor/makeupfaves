import Component from '../Component.js';
import Header from '../common/Header.js';
// import Loading from '../common/Loading.js';
import MakeupList from './MakeupList.js';
import { getMakeups } from '../services/makeup-api.js';

class MakeupApp extends Component {

    async onRender(dom) {

        // get your header
        const header = new Header({ title: 'Get Your Face On' });
        dom.prepend(header.renderDOM());

        //get your main and error set up
        //will add Search and Paging here as well
        // const main = dom.querySelector('main');
        // const error = dom.querySelector('.error');
        // error.prependChild(main.renderDOM());

        //will add loading here

        const listSection = dom.querySelector('.list-section');

        const makeupList = new MakeupList({ makeups: [] });
        listSection.appendChild(makeupList.renderDOM());

        const loadMakeup = async() => {
            try {
                const makeups = await getMakeups();

                makeupList.update({ makeups });

                //paging would update here
            }

            catch (err) {
                console.log(err, 'didnt fetch makeup');
            }
        };

        loadMakeup();
        window.addEventListener('hashchange', () => {
            loadMakeup();
        });
    }

    renderHTML() {
        return /*html*/`
            <div>
                <p class = "error"></p>
                <main>
                    <section class = "filter-section"></section>
                    <section class = "list-section"></section>
                </main>
            </div>
        `;
    }
}

export default MakeupApp;
import Component from '../Component.js';
import MakeupItem from './MakeupItem.js';

class MakeupList extends Component {

    onRender(dom) {
        const makeups = this.props.makeups;

        makeups.forEach(makeup => {
            const props = {
                makeup: makeup,
                removeUnFavorites: this.props.removeUnFavorites
            };

            const makeupItem = new MakeupItem(props);
            const makeupItemDOM = makeupItem.renderDOM();
            dom.appendChild(makeupItemDOM);
        });
    }

    renderHTML() {
        return /*html*/`
            <ul class = "makeups"></ul>
        `;
    }
}

export default MakeupList;
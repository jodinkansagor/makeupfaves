import Component from '../Component.js';
//the following are links to fetch calls
import { makeFavorite, unFavorite } from '../services/makeup-api.js';

class MakeupItem extends Component {

    onRender(li) {
        const makeup = this.props.makeup;
        const removeUnFavorites = this.props.removeUnFavorites;
        const FavoriteButton = li.querySelector('favorite-star');
        FavoriteButton.addEventListener('click', () => {
            makeup.isFavorite = !makeup.isFavorite;
            if (makeup.isFavorite) {
                makeFavorite(makeup);
            } else {
                unFavorite(makeup.is);
                setTimeout(() => {
                    if (removeUnFavorites) {
                        li.classList.add('fade');
                        this.rootElement.remove();
                    }
                }, 3000);
            }
            FavoriteButton.classList.toggle('is-favorite');
        });
    }


    renderHTML() {

        const makeup = this.props.makeup;
        const starClass = makeup.isFavorite ? 'is-favorite' : '';

        return /*html*/`
            <li class = "makeup-item">
                <div>
                    <img src="${makeup.image}">
                    <span class = "makeup-name">${makeup.name}</span>
                    <span class = "makeup-brand">${makeup.brand}</span>
                    <button class = "favorite-star ${starClass}">💄</button>
                    <details class = "makeup-description">${makeup.description}</details>
                <div>
            </li>
        `;
    }
}

export default MakeupItem;
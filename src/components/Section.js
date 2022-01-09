export class Section {
    constructor ({ renderer }, container) {
        this._renderer = renderer;
        this._container = container;
    }
    addItem (item) {
        this._container.prepend(item);
    }
    renderItems (items) {
        const sortItems = items.sort((a,b) => {
            return new Date(a.createdAt) - new Date(b.createdAt);
        });
        sortItems.forEach((item) => {
            this._renderer(item);
        });
    }
}
import {Controller} from "@hotwired/stimulus"
import Sortable from "sortablejs"

export default class extends Controller {
    connect() {
        this.sortable = new Sortable(this.element, {
            animation: 150,
            onEnd: this.onEnd.bind(this)
        })
    }

    disconnect() {
        this.sortable?.destroy();
    }

    async onEnd({item, newIndex}) {
        const csrfToken = document.querySelector('meta[name="csrf-token"]')?.content

        await fetch(item.dataset.repositionUrl, {
            method: "PATCH",
            headers: {
                "X-CSRF-Token": csrfToken,
                "Content-Type": "application/json",
                Accept: "application/json"
            },
            body: JSON.stringify({
                position: newIndex + 1
            })
        })
    }
}
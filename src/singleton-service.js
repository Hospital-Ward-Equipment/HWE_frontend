class MySingletonService {
    constructor() {
        this.data = {}
    }
}

const instance = new MySingletonService()
export default instance
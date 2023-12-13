import {get} from '../handler/NetworkHandler'

const BaseUrl = "http://193.136.62.24/v1/";

export async function getLibrariesList() {
    try {
        const url = BaseUrl + 'library/'
        const response = await get(url)
        return response.data
    } catch (error) {
        throw error;
    }
}

export async function getBooksList(libraryId) {
    try {
        const url = BaseUrl + "library/" + libraryId + "/book";
        console.log(url)
        const response = await get(url)
        return response.data
    } catch (error) {
        throw error;
    }
}

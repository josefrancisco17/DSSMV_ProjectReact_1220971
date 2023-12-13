import {get, post, put, del} from '../handler/NetworkHandler'
import cardSheet from "@react-navigation/stack/src/views/Stack/CardSheet";

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

export async function getLibraryBooksList(libraryId) {
    try {
        const url = BaseUrl + "library/" + libraryId + "/book"
        console.log(url)
        const response = await get(url)
        return response.data
    } catch (error) {
        throw error
    }
}

export async function getBook(bookIsbn) {
    try {
        const url = BaseUrl + "book/" + bookIsbn
        const response = await get(url)
        return response.data
    } catch (error) {
        throw error
    }
}

export async function getLibrary(libraryId) {
    try {
        const url = BaseUrl + "library/" + libraryId
        const response = await get(url)
        return response.data
    } catch (error) {
        throw error
    }
}

export async function getCheckOutsList(userName) {
    try {
        const url = BaseUrl + "user/checked-out?userId=" + userName
        const response = await get(url)
        return response.data
    } catch (error) {
        throw error
    }
}

export async function getCheckOutsHistoryList(userName) {
    try {
        const url = BaseUrl + "user/checkout-history?userId=" + userName
        const response = await get(url)
        return response.data
    } catch (error) {
        throw error
    }
}

export async function getReviewsList(bookIsbn) {
    try {
        const url = BaseUrl + "book/" + bookIsbn + "/review"
        const response = await get(url)
        return response.data
    } catch (error) {
        throw error
    }
}

export async function postCheckOutBook(libraryId, bookIsbn, userName) {
    try {
        const url = BaseUrl + "library/" + libraryId + "/book/" + bookIsbn + "/checkout" + "?userId=" + userName
        const body = " "
        const response = await post(url, body)
        return response.data
    } catch (error) {
        throw error
    }
}

export async function postCheckInBook(libraryId, bookIsbn, userName) {
    try {
        libraryId = String.format("%s-%s-%s-%s-%s", libraryId.substring(0, 8), libraryId.substring(8, 12), libraryId.substring(12, 16), libraryId.substring(16, 20), libraryId.substring(20))
        const url = BaseUrl + "library/" + libraryId + "/book/" + bookIsbn + "/checkin" + "?userId=" + userName
        const body = " "
        const response = await post(url, body)
        return response.data
    } catch (error) {
        throw error
    }
}

export async function postReviewBook(libraryId, bookIsbn, userName, reviewText, recommended) {
    try {
        const url = BaseUrl + "book/" + bookIsbn + "/review?userId=" + userName
        const body = "{\"recommended\": " + recommended + ", \"review\": \"" + reviewText + "\"}"
        const response = await post(url, body)
        return response.data
    } catch (error) {
        throw error
    }
}

export async function postLibrary(libraryId, name, address, openTime, closeTime, openDays) {
    try {
        const url = BaseUrl + "library"
        const body = "{\"address\": \"" + address + "\", \"closeTime\": \"" + closeTime + "\", \"name\": \"" + name + "\", \"openDays\": \"" + openDays + "\", \"openTime\": \"" + openTime + "\"}"
        const response = await post(url, body)
        return response.data
    } catch (error) {
        throw error
    }
}

export async function postLibraryBook(libraryId, bookIsbn, libraryID, stock) {
    try {
        const url = BaseUrl + "library/" + libraryID + "/book/" + bookIsbn
        const body =  "{\"stock\": \"" + stock  + "\"}"
        const response = await post(url, body)
        return response.data
    } catch (error) {
        throw error
    }
}

export async function updateReviewBook(libraryId, bookIsbn, userName, reviewText, recommended, reviewId) {
    try {
        const url = BaseUrl + "book/" + bookIsbn + "/review/" + reviewId + "?userId=" + userName
        const body =  "{\"recommended\": " + recommended + ", \"review\": \"" + reviewText + "\"}"
        const response = await post(url, body)
        return response.data
    } catch (error) {
        throw error
    }
}

export async function deleteLibrary(libraryId) {
    try {
        const url = BaseUrl + "library/" + libraryId
        const response = await post(url)
        return response.data
    } catch (error) {
        throw error
    }
}

export async function getWeather(latitude, longitude, apikey) {
    try {
        const url = "https://api.openweathermap.org/data/2.5/weather?lat=" + latitude + "&lon=" + longitude + "&apikey=" + apikey
        const response = await get(url)
        return response.data
    } catch (error) {
        throw error
    }
}







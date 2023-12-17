import {get, post, put, del} from '../handler/NetworkHandler'
import Geolocation from "@react-native-community/geolocation";

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

export async function getMyReviewsList(userName) {
    try {
        const userReviews = []
        const libraries = await getLibrariesList()
        for (let i = 0; i < libraries.length; i++) {
            const libraryBooks = await getLibraryBooksList(libraries[i].id)
            for (let j = 0; j < libraryBooks.length; j++) {
                const reviews = await getReviewsList(libraryBooks[j].isbn)
                for(let k = 0; k < reviews.length; k ++) {
                    if (reviews[k].reviewer === userName) {
                        const reviewAlreadyExists = userReviews.some(
                            (userReview) => userReview.id === reviews[k].id
                        );
                        if (!reviewAlreadyExists) {
                            userReviews.push(reviews[k]);
                        }
                    }
                }
            }

        }
        return userReviews
    } catch (error) {
        throw error
    }
}

export async function postCheckOutBook(libraryId, bookIsbn, userName) {
    try {
        const url = BaseUrl + "library/" + libraryId + "/book/" + bookIsbn + "/checkout" + "?userId=" + userName
        const body = {}
        const response = await post(url, body)
        return response.data
    } catch (error) {
        throw error
    }
}

export async function postCheckInBook(libraryId, bookIsbn, userName) {
    try {
        const url = BaseUrl + "library/" + libraryId + "/book/" + bookIsbn + "/checkin" + "?userId=" + userName
        const body = {}
        const response = await post(url, body)
        return response.data
    } catch (error) {
        throw error
    }
}

export async function postReviewBook(bookIsbn, userName, reviewText, recommended) {
    try {
        const url = BaseUrl + "book/" + bookIsbn + "/review?userId=" + userName
        const body = {
            recommended: recommended,
            review: reviewText
        }
        const response = await post(url, body)
        return response.data
    } catch (error) {
        throw error
    }
}

export async function postLibrary(name, address, openTime, closeTime, openDays) {
    try {
        const url = BaseUrl + "library"
        const body = {
            address: address,
            closeTime: closeTime,
            name: name,
            openDays: openDays,
            openTime: openTime
        }
        const response = await post(url, body)
        return response.data
    } catch (error) {
        throw error
    }
}

export async function postLibraryBook(bookIsbn, libraryID, stock) {
    try {
        const url = BaseUrl + "library/" + libraryID + "/book/" + bookIsbn
        const body = {
            stock: stock
        }
        const response = await post(url, body)
        return response.data
    } catch (error) {
        throw error
    }
}

export async function updateReviewBook(bookIsbn, userName, reviewText, recommended, reviewId) {
    try {
        const url = BaseUrl + "book/" + bookIsbn + "/review/" + reviewId + "?userId=" + userName
        const body = {
            recommended: recommended,
            review: reviewText
        }
        const response = await put(url, body)
        return response.data
    } catch (error) {
        throw error.data
    }
}

export async function deleteLibrary(libraryId) {
    try {
        const url = BaseUrl + "library/" + libraryId
        const response = await del(url)
        return response.data
    } catch (error) {
        throw error
    }
}

export async function getWeather() {
    try {
        const position = await getCurrentPosition();
        const { latitude, longitude } = position.coords;
        const apikey = "fadb4e6924c13a4b573a0d08cc9b7731";
        const url = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&apikey=${apikey}`;
        const response = await get(url);

        const temperature = Math.round((response.data.main.temp - 273.15) * 10.0) / 10.0;
        const weather = response.data.weather[0].main;
        const cityName = response.data.name;
        return `${cityName}, ${weather}, ${temperature} ºC`;
    } catch (error) {
        console.error('Error fetching weather data: ', error);
        throw error;
    }
}

function getCurrentPosition() {
    return new Promise((resolve, reject) => {
        Geolocation.getCurrentPosition(resolve, reject);
    });
}







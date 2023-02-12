export const Validation = {
    isValidUrl(url: string) {
        const urlPattern = new RegExp('^(https?:\\/\\/)?'+ // protocol
            '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|'+ // domain name
            '((\\d{1,3}\\.){3}\\d{1,3}))'+ // OR ip (v4) address
            '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*'+ // port and path
            '(\\?[;&a-z\\d%_.~+=-]*)?'+ // query string
            '(\\#[-a-z\\d_]*)?$','i'); // fragment locator
        return urlPattern.test(url);
    },

    isValidHeurekaUrl(url: string) {
        // https://chytre-hodinky.heureka.cz/apple-watch-series-6-44mm/
        // https://mobilne-telefony.heureka.sk/apple-iphone-12-mini-64gb/
        const regex = new RegExp('https*://[^.]+.heureka.(cz|sk)/[^.]+');
        return regex.test(url);
    }
}
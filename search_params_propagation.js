$(function () {
    function getCurrentQueryParams() {
        const url = new URL(window.location.href);

        return Object.fromEntries(url.searchParams.entries());
    }

    function appendUTMToLinks() {
        const params = getCurrentQueryParams();
        // If no keys are set, don't change links
        if (Object.keys(params).length === 0) {
            return;
        }

        document.querySelectorAll("a").forEach(link => {
            const href = link.getAttribute("href");
            if (href && href.startsWith("/") && !href.includes("#") && !href.includes("mailto:") && !href.includes("tel:")) {
                const url = new URL(href, window.location.origin);

                Object.keys(params).forEach((key) => url.searchParams.append(key, params[key]));
                link.setAttribute("href", url.toString());
            }
        });
    }

    appendUTMToLinks();
});
